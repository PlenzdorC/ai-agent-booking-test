import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /ai/companies - Search and list companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') // Search by name, location, or description
    const city = searchParams.get('city')
    const state = searchParams.get('state')
    const category = searchParams.get('category') // e.g., "dental", "salon", "medical"
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = supabase
      .from('companies')
      .select('id, name, slug, description, city, state, country, phone, email, timezone, website')
      .eq('is_active', true)
      .order('name')
      .limit(limit)

    // Filter by city
    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    // Filter by state
    if (state) {
      query = query.ilike('state', `%${state}%`)
    }

    // Search across name, city, and description
    if (search) {
      query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Category search in description or name
    if (category) {
      query = query.or(`name.ilike.%${category}%,description.ilike.%${category}%`)
    }

    const { data: companies, error } = await query

    if (error) {
      console.error('Error fetching companies:', error)
      return NextResponse.json(
        { error: 'Failed to fetch companies' },
        { status: 500 }
      )
    }

    // For each company, get service count
    const companiesWithServices = await Promise.all(
      (companies || []).map(async (company) => {
        const { count } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id)
          .eq('is_active', true)

        return {
          ...company,
          servicesCount: count || 0,
          bookingUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app'}/${company.slug}`,
          apiEndpoints: {
            services: `/ai/services?company=${company.slug}`,
            availability: `/ai/availability?company=${company.slug}&serviceId={serviceId}`,
            book: `/ai/reservations`,
          },
        }
      })
    )

    return NextResponse.json({
      companies: companiesWithServices,
      total: companiesWithServices.length,
      filters: {
        city,
        state,
        search,
        category,
      },
      meta: {
        message: companiesWithServices.length === 0 
          ? 'No companies found matching your criteria. Try broader search terms.'
          : `Found ${companiesWithServices.length} compan${companiesWithServices.length === 1 ? 'y' : 'ies'}`,
      },
    })
  } catch (error) {
    console.error('Error in /ai/companies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

