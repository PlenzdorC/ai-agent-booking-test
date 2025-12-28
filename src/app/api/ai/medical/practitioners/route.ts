import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /ai/medical/practitioners - List doctors/staff at a medical practice
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companySlug = searchParams.get('company')
    
    if (!companySlug) {
      return NextResponse.json(
        { 
          error: 'Missing company parameter',
          hint: 'Use ?company=company-slug' 
        },
        { status: 400 }
      )
    }

    // Get company
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

    // Verify it's a medical practice
    if (company.industry !== 'medical') {
      return NextResponse.json(
        { error: 'This endpoint is for medical practices only' },
        { status: 400 }
      )
    }

    // Get active staff/practitioners
    const { data: practitioners, error: staffError } = await supabase
      .from('staff')
      .select('id, name, email, role')
      .eq('company_id', company.id)
      .eq('is_active', true)
      .order('name')

    if (staffError) {
      return NextResponse.json(
        { error: 'Failed to fetch practitioners' },
        { status: 500 }
      )
    }

    // For now, if no staff in DB, return placeholder info
    const formattedPractitioners = practitioners && practitioners.length > 0 
      ? practitioners.map(p => ({
          id: p.id,
          name: p.name,
          role: p.role === 'admin' ? 'Primary Physician' : 'Healthcare Provider',
          availabilityEndpoint: `/ai/availability?company=${companySlug}&practitionerId=${p.id}`,
        }))
      : [{
          name: company.name,
          role: 'Healthcare Provider',
          note: 'Book any available appointment - staff will be assigned',
          availabilityEndpoint: `/ai/availability?company=${companySlug}`,
        }]

    return NextResponse.json({
      practice: company.name,
      practitioners: formattedPractitioners,
      total: formattedPractitioners.length,
      bookingEndpoint: `/ai/medical/reservations`,
    })
  } catch (error) {
    console.error('Error fetching practitioners:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

