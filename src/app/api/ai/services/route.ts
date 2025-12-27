import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /ai/services - List all services for a company
// This endpoint is designed to be easily consumable by AI agents
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

    // Get company by slug
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name, description, phone, email')
      .eq('slug', companySlug)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Get active services for this company
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .eq('company_id', company.id)
      .eq('is_active', true)
      .order('name')

    if (servicesError) {
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      )
    }

    // Format response for AI agents
    const response = {
      company: {
        name: company.name,
        description: company.description,
        contact: {
          phone: company.phone,
          email: company.email,
        }
      },
      services: services?.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        duration: service.duration_minutes,
        price: service.price,
        currency: service.currency,
      })) || [],
      meta: {
        aiOptimized: true,
        version: '1.0',
        endpoints: {
          availability: `/ai/availability?company=${companySlug}&serviceId={serviceId}`,
          book: `/ai/reservations`,
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in /ai/services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

