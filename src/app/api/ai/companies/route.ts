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
      .select('name, slug, description, city, state, phone')
      .eq('is_active', true)
      .order('name')
      .limit(Math.min(limit, 10)) // Cap at 10 results for GPT

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

    // Format companies with minimal info for GPT
    const formattedCompanies = (companies || []).map((company) => ({
      name: company.name,
      slug: company.slug,
      description: company.description,
      city: company.city,
      state: company.state,
      phone: company.phone,
    }))

    return NextResponse.json({
      companies: formattedCompanies,
      total: formattedCompanies.length,
      instructions: 'To see services for a company, call /ai/services?company={slug}',
    })
  } catch (error) {
    console.error('Error in /ai/companies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

