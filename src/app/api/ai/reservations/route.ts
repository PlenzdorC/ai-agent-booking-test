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

