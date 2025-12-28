import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /ai/medical/search - Find healthcare providers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const state = searchParams.get('state')
    const specialty = searchParams.get('specialty') // dental, general, dermatology, etc.
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '10')

    let query = supabase
      .from('companies')
      .select('name, slug, description, city, state, phone, email')
      .eq('is_active', true)
      .eq('industry', 'medical')
      .order('name')
      .limit(Math.min(limit, 20))

    // Filter by city
    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    // Filter by state
    if (state) {
      query = query.ilike('state', `%${state}%`)
    }

    // Filter by specialty (search in name or description)
    if (specialty) {
      query = query.or(`name.ilike.%${specialty}%,description.ilike.%${specialty}%`)
    }

    // General search
    if (search) {
      query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data: providers, error } = await query

    if (error) {
      console.error('Error fetching medical providers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch healthcare providers' },
        { status: 500 }
      )
    }

    const formattedProviders = (providers || []).map((provider) => ({
      name: provider.name,
      slug: provider.slug,
      description: provider.description,
      location: `${provider.city}, ${provider.state}`,
      city: provider.city,
      state: provider.state,
      phone: provider.phone,
      bookingEndpoint: `/ai/medical/reservations`,
      servicesEndpoint: `/ai/services?company=${provider.slug}`,
    }))

    return NextResponse.json({
      providers: formattedProviders,
      total: formattedProviders.length,
      industry: 'medical',
      instructions: 'To see available services and specialists, call /ai/services?company={slug}',
    })
  } catch (error) {
    console.error('Error in medical search:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

