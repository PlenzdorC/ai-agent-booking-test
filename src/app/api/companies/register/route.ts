import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().default('USA'),
  timezone: z.string().default('America/New_York'),
  service: z.object({
    name: z.string().min(2, 'Service name must be at least 2 characters'),
    duration_minutes: z.number().min(5).max(480),
    price: z.number().nullable().optional(),
    currency: z.string().default('USD'),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validationResult = RegisterSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request',
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const { service, ...companyData } = validationResult.data

    // Check if slug already exists
    const { data: existingCompany } = await supabaseAdmin
      .from('companies')
      .select('id')
      .eq('slug', companyData.slug)
      .single()

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company slug already exists. Please choose a different name.' },
        { status: 409 }
      )
    }

    // Create company
    const { data: company, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert({
        ...companyData,
        is_active: true,
      })
      .select()
      .single()

    if (companyError) {
      console.error('Error creating company:', companyError)
      return NextResponse.json(
        { error: 'Failed to create company' },
        { status: 500 }
      )
    }

    // Create first service
    const { data: createdService, error: serviceError } = await supabaseAdmin
      .from('services')
      .insert({
        company_id: company.id,
        name: service.name,
        duration_minutes: service.duration_minutes,
        price: service.price,
        currency: service.currency || 'USD',
        is_active: true,
      })
      .select()
      .single()

    if (serviceError) {
      console.error('Error creating service:', serviceError)
      // Rollback: delete company if service creation fails
      await supabaseAdmin.from('companies').delete().eq('id', company.id)
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
      },
      service: {
        id: createdService.id,
        name: createdService.name,
      },
      bookingUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test.vercel.app'}/${company.slug}`,
    }, { status: 201 })
  } catch (error) {
    console.error('Error in company registration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

