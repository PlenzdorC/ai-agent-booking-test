import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Validation schema for booking requests
const BookingSchema = z.object({
  companySlug: z.string(),
  serviceId: z.string().uuid(),
  slot: z.string().datetime(),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  notes: z.string().optional(),
  agentName: z.string().optional(),
})

// POST /ai/reservations - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validationResult = BookingSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request',
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const { companySlug, serviceId, slot, customer, notes, agentName } = validationResult.data

    // Get company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('slug', companySlug)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Get service
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('id, name, duration_minutes')
      .eq('id', serviceId)
      .eq('company_id', company.id)
      .single()

    if (serviceError || !service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Calculate end time
    const startTime = new Date(slot)
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + service.duration_minutes)

    // Check if slot is still available
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('company_id', company.id)
      .eq('service_id', serviceId)
      .in('status', ['pending', 'confirmed'])
      .lte('start_time', endTime.toISOString())
      .gte('end_time', startTime.toISOString())

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { 
          error: 'Time slot no longer available',
          hint: 'Please check availability again and choose a different slot'
        },
        { status: 409 }
      )
    }

    // Create booking (use admin client to bypass RLS)
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        company_id: company.id,
        service_id: serviceId,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'confirmed',
        notes,
        booked_via: 'ai_agent',
        agent_name: agentName || 'Unknown AI Agent',
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Booking error:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Return success response
    const response = {
      success: true,
      booking: {
        id: booking.id,
        confirmationNumber: booking.id.split('-')[0].toUpperCase(),
        company: company.name,
        service: service.name,
        startTime: booking.start_time,
        endTime: booking.end_time,
        customer: {
          name: booking.customer_name,
          email: booking.customer_email,
        },
        status: booking.status,
      },
      message: `Booking confirmed! Confirmation number: ${booking.id.split('-')[0].toUpperCase()}`,
      meta: {
        bookedVia: 'AI Agent',
        agentName: agentName || 'Unknown',
      }
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error in /ai/reservations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /ai/reservations/:id - Get booking details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const email = searchParams.get('email')

    if (!bookingId || !email) {
      return NextResponse.json(
        { error: 'Missing booking ID or email' },
        { status: 400 }
      )
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(name, duration_minutes),
        company:companies(name, phone, email)
      `)
      .eq('id', bookingId)
      .eq('customer_email', email)
      .single()

    if (error || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: booking.id,
      confirmationNumber: booking.id.split('-')[0].toUpperCase(),
      company: booking.company,
      service: booking.service,
      startTime: booking.start_time,
      endTime: booking.end_time,
      status: booking.status,
      customer: {
        name: booking.customer_name,
        email: booking.customer_email,
        phone: booking.customer_phone,
      },
      notes: booking.notes,
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /ai/reservations - Edit/reschedule a booking
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, email, newSlot, newServiceId, notes } = body

    if (!bookingId || !email) {
      return NextResponse.json(
        { error: 'Missing booking ID or email' },
        { status: 400 }
      )
    }

    // Get the existing booking
    const { data: existingBooking, error: fetchError } = await supabase
      .from('bookings')
      .select('*, service:services(duration_minutes, name), company:companies(id, name)')
      .eq('id', bookingId)
      .eq('customer_email', email)
      .single()

    if (fetchError || !existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    if (existingBooking.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot edit a cancelled booking' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updates: any = {}
    
    // If changing the time slot
    if (newSlot) {
      const newStartTime = new Date(newSlot)
      const serviceDuration = existingBooking.service.duration_minutes
      const newEndTime = new Date(newStartTime)
      newEndTime.setMinutes(newEndTime.getMinutes() + serviceDuration)

      // Check if new slot is available
      const { data: conflictingBookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('company_id', existingBooking.company.id)
        .neq('id', bookingId) // Exclude current booking
        .in('status', ['pending', 'confirmed'])
        .lte('start_time', newEndTime.toISOString())
        .gte('end_time', newStartTime.toISOString())

      if (conflictingBookings && conflictingBookings.length > 0) {
        return NextResponse.json(
          { error: 'New time slot is not available' },
          { status: 409 }
        )
      }

      updates.start_time = newStartTime.toISOString()
      updates.end_time = newEndTime.toISOString()
    }

    // If changing the service
    if (newServiceId) {
      const { data: newService, error: serviceError } = await supabase
        .from('services')
        .select('id, name, duration_minutes')
        .eq('id', newServiceId)
        .eq('company_id', existingBooking.company.id)
        .single()

      if (serviceError || !newService) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        )
      }

      updates.service_id = newServiceId
      
      // Recalculate end time with new service duration
      if (newSlot || !updates.start_time) {
        const startTime = new Date(newSlot || existingBooking.start_time)
        const endTime = new Date(startTime)
        endTime.setMinutes(endTime.getMinutes() + newService.duration_minutes)
        updates.end_time = endTime.toISOString()
      }
    }

    // Update notes if provided
    if (notes !== undefined) {
      updates.notes = notes
    }

    // Update the booking
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .eq('customer_email', email)
      .select(`
        *,
        service:services(name, duration_minutes),
        company:companies(name, phone, email)
      `)
      .single()

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      booking: {
        id: updatedBooking.id,
        confirmationNumber: updatedBooking.id.split('-')[0].toUpperCase(),
        company: updatedBooking.company.name,
        service: updatedBooking.service.name,
        startTime: updatedBooking.start_time,
        endTime: updatedBooking.end_time,
        customer: {
          name: updatedBooking.customer_name,
          email: updatedBooking.customer_email,
        },
        status: updatedBooking.status,
        notes: updatedBooking.notes,
      },
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /ai/reservations - Cancel a booking
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const email = searchParams.get('email')

    if (!bookingId || !email) {
      return NextResponse.json(
        { error: 'Missing booking ID or email' },
        { status: 400 }
      )
    }

    // Update booking status to cancelled (use admin client to bypass RLS)
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .eq('customer_email', email)
      .select()
      .single()

    if (error || !booking) {
      return NextResponse.json(
        { error: 'Booking not found or already cancelled' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: {
        id: booking.id,
        status: booking.status,
      }
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

