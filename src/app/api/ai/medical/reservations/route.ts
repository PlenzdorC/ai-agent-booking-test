import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Enhanced validation schema for medical bookings
const MedicalBookingSchema = z.object({
  companySlug: z.string(),
  serviceId: z.string().uuid(),
  slot: z.string().datetime(),
  patient: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(), // YYYY-MM-DD format
    insuranceProvider: z.string().optional(),
    reasonForVisit: z.string().optional(),
    allergies: z.string().optional(),
    currentMedications: z.string().optional(),
  }),
  notes: z.string().optional(),
  agentName: z.string().optional(),
})

// POST /ai/medical/reservations - Create a medical appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validationResult = MedicalBookingSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request',
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const { companySlug, serviceId, slot, patient, notes, agentName } = validationResult.data

    // Get company and verify it's a medical practice
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name, industry')
      .eq('slug', companySlug)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Medical practice not found' },
        { status: 404 }
      )
    }

    // Optional: Verify it's actually a medical company
    if (company.industry && company.industry !== 'medical') {
      return NextResponse.json(
        { 
          error: 'This endpoint is for medical practices only',
          hint: 'Use /api/ai/reservations for general bookings'
        },
        { status: 400 }
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

    // Create medical booking with healthcare-specific fields
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        company_id: company.id,
        service_id: serviceId,
        customer_name: patient.name,
        customer_email: patient.email,
        customer_phone: patient.phone,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'confirmed',
        notes,
        booked_via: 'ai_agent',
        agent_name: agentName || 'Unknown AI Agent',
        // Medical-specific fields
        patient_date_of_birth: patient.dateOfBirth || null,
        insurance_provider: patient.insuranceProvider || null,
        reason_for_visit: patient.reasonForVisit || null,
        allergies: patient.allergies || null,
        current_medications: patient.currentMedications || null,
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Medical booking error:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      )
    }

    // Return success response with medical context
    const response = {
      success: true,
      appointment: {
        id: booking.id,
        confirmationNumber: booking.id.split('-')[0].toUpperCase(),
        practice: company.name,
        service: service.name,
        appointmentTime: booking.start_time,
        duration: service.duration_minutes,
        patient: {
          name: booking.customer_name,
          email: booking.customer_email,
        },
        status: booking.status,
        insuranceOnFile: !!patient.insuranceProvider,
      },
      message: `Medical appointment confirmed! Confirmation number: ${booking.id.split('-')[0].toUpperCase()}`,
      instructions: {
        arrival: 'Please arrive 10 minutes early to complete any necessary paperwork',
        insurance: patient.insuranceProvider 
          ? `Please bring your ${patient.insuranceProvider} insurance card`
          : 'Please bring your insurance information',
        cancellation: 'To cancel or reschedule, please call at least 24 hours in advance',
      },
      meta: {
        bookedVia: 'AI Agent',
        agentName: agentName || 'Unknown',
        industry: 'medical',
      }
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error in medical reservations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

