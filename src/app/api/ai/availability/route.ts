import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateTimeSlots, isSlotAvailable } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// GET /ai/availability - Get available time slots for a service
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companySlug = searchParams.get('company')
    const serviceId = searchParams.get('serviceId')
    const dateParam = searchParams.get('date') // YYYY-MM-DD
    const daysAhead = parseInt(searchParams.get('days') || '7')

    if (!companySlug || !serviceId) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters',
          hint: 'Use ?company=company-slug&serviceId=service-id&date=YYYY-MM-DD (optional)&days=7 (optional)'
        },
        { status: 400 }
      )
    }

    // Get company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, timezone')
      .eq('slug', companySlug)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Get service details
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('duration_minutes, buffer_time_minutes')
      .eq('id', serviceId)
      .eq('company_id', company.id)
      .single()

    if (serviceError || !service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Calculate date range
    const startDate = dateParam ? new Date(dateParam) : new Date()
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + daysAhead)

    // Get existing bookings in this range
    const { data: bookings } = await supabase
      .from('bookings')
      .select('start_time, end_time')
      .eq('company_id', company.id)
      .eq('service_id', serviceId)
      .in('status', ['pending', 'confirmed'])
      .gte('start_time', startDate.toISOString())
      .lte('start_time', endDate.toISOString())

    const bookedSlots = bookings?.map(b => ({
      start: new Date(b.start_time),
      end: new Date(b.end_time)
    })) || []

    // Generate available slots
    // For simplicity, assuming 9 AM - 5 PM business hours
    // In production, this would check staff availability
    const availableSlots: string[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const daySlots = generateTimeSlots(9, 17, service.duration_minutes, currentDate)
      
      daySlots.forEach(slot => {
        if (slot > new Date() && isSlotAvailable(slot, bookedSlots, service.duration_minutes)) {
          availableSlots.push(slot.toISOString())
        }
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    const response = {
      serviceId,
      duration: service.duration_minutes,
      slots: availableSlots.slice(0, 50), // Limit to 50 slots for AI agents
      timezone: company.timezone,
      meta: {
        totalSlots: availableSlots.length,
        showing: Math.min(availableSlots.length, 50),
        dateRange: {
          from: startDate.toISOString().split('T')[0],
          to: endDate.toISOString().split('T')[0]
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in /ai/availability:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

