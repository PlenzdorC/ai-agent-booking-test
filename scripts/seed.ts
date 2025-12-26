// Seed script to create a test company for demo purposes
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('🌱 Seeding database...')

  // Create test company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: 'Test Dental Clinic',
      slug: 'test-dental',
      email: 'contact@testdental.com',
      phone: '+1 (555) 123-4567',
      description: 'A friendly dental clinic for testing AI booking',
      timezone: 'America/New_York',
    })
    .select()
    .single()

  if (companyError) {
    console.error('Error creating company:', companyError)
    return
  }

  console.log('✅ Created company:', company.name)

  // Create test services
  const services = [
    {
      company_id: company.id,
      name: 'Dental Cleaning',
      description: 'Regular dental cleaning and checkup',
      duration_minutes: 30,
      price: 100,
      currency: 'USD',
      is_active: true,
    },
    {
      company_id: company.id,
      name: 'Dental Checkup',
      description: 'Comprehensive dental examination',
      duration_minutes: 45,
      price: 150,
      currency: 'USD',
      is_active: true,
    },
    {
      company_id: company.id,
      name: 'Teeth Whitening',
      description: 'Professional teeth whitening service',
      duration_minutes: 60,
      price: 300,
      currency: 'USD',
      is_active: true,
    },
  ]

  const { error: servicesError } = await supabase
    .from('services')
    .insert(services)

  if (servicesError) {
    console.error('Error creating services:', servicesError)
    return
  }

  console.log('✅ Created', services.length, 'services')

  console.log('\n🎉 Seeding complete!')
  console.log(`\nVisit: http://localhost:3000/${company.slug}`)
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })

