// Seed script to create test companies for German state capitals
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// German state capitals with test companies
const germanCompanies = [
  // Berlin
  { city: 'Berlin', state: 'Berlin', name: 'Zahnarztpraxis Mitte', type: 'dental', phone: '+49 30 1234567' },
  { city: 'Berlin', state: 'Berlin', name: 'Friseur Salon Kreuzberg', type: 'salon', phone: '+49 30 2345678' },
  
  // München (Bavaria)
  { city: 'München', state: 'Bayern', name: 'Dental Care München', type: 'dental', phone: '+49 89 1234567' },
  { city: 'München', state: 'Bayern', name: 'Beauty Studio Schwabing', type: 'salon', phone: '+49 89 2345678' },
  
  // Hamburg
  { city: 'Hamburg', state: 'Hamburg', name: 'Zahnarzt am Hafen', type: 'dental', phone: '+49 40 1234567' },
  { city: 'Hamburg', state: 'Hamburg', name: 'Wellness Oase Hamburg', type: 'wellness', phone: '+49 40 2345678' },
  
  // Stuttgart (Baden-Württemberg)
  { city: 'Stuttgart', state: 'Baden-Württemberg', name: 'Praxis Dr. Schmidt', type: 'medical', phone: '+49 711 1234567' },
  { city: 'Stuttgart', state: 'Baden-Württemberg', name: 'Friseur Königstraße', type: 'salon', phone: '+49 711 2345678' },
  
  // Düsseldorf (North Rhine-Westphalia)
  { city: 'Düsseldorf', state: 'Nordrhein-Westfalen', name: 'Dental Zentrum Rhein', type: 'dental', phone: '+49 211 1234567' },
  { city: 'Düsseldorf', state: 'Nordrhein-Westfalen', name: 'Beauty Lounge Altstadt', type: 'salon', phone: '+49 211 2345678' },
  
  // Frankfurt (Hesse)
  { city: 'Frankfurt', state: 'Hessen', name: 'Zahnarztpraxis Mainufer', type: 'dental', phone: '+49 69 1234567' },
  { city: 'Frankfurt', state: 'Hessen', name: 'Spa & Wellness Frankfurt', type: 'wellness', phone: '+49 69 2345678' },
  
  // Dresden (Saxony)
  { city: 'Dresden', state: 'Sachsen', name: 'Dental Praxis Elbe', type: 'dental', phone: '+49 351 1234567' },
  { city: 'Dresden', state: 'Sachsen', name: 'Friseursalon Altstadt', type: 'salon', phone: '+49 351 2345678' },
  
  // Hannover (Lower Saxony)
  { city: 'Hannover', state: 'Niedersachsen', name: 'Zahnarzt Zentrum Nord', type: 'dental', phone: '+49 511 1234567' },
  { city: 'Hannover', state: 'Niedersachsen', name: 'Beauty Studio Mitte', type: 'salon', phone: '+49 511 2345678' },
  
  // Köln (North Rhine-Westphalia)
  { city: 'Köln', state: 'Nordrhein-Westfalen', name: 'Dental Dom', type: 'dental', phone: '+49 221 1234567' },
  { city: 'Köln', state: 'Nordrhein-Westfalen', name: 'Wellness am Rhein', type: 'wellness', phone: '+49 221 2345678' },
  
  // Leipzig (Saxony)
  { city: 'Leipzig', state: 'Sachsen', name: 'Praxis am Markt', type: 'medical', phone: '+49 341 1234567' },
]

// Service templates based on business type
const serviceTemplates = {
  dental: [
    { name: 'Zahnreinigung', nameEn: 'Dental Cleaning', duration: 30, price: 80 },
    { name: 'Kontrolluntersuchung', nameEn: 'Check-up', duration: 45, price: 120 },
    { name: 'Zahnaufhellung', nameEn: 'Teeth Whitening', duration: 60, price: 250 },
  ],
  salon: [
    { name: 'Haarschnitt', nameEn: 'Haircut', duration: 45, price: 45 },
    { name: 'Färben', nameEn: 'Hair Coloring', duration: 90, price: 85 },
    { name: 'Styling', nameEn: 'Hair Styling', duration: 30, price: 35 },
  ],
  medical: [
    { name: 'Allgemeine Untersuchung', nameEn: 'General Examination', duration: 30, price: 60 },
    { name: 'Beratungsgespräch', nameEn: 'Consultation', duration: 20, price: 40 },
  ],
  wellness: [
    { name: 'Massage', nameEn: 'Massage', duration: 60, price: 75 },
    { name: 'Gesichtsbehandlung', nameEn: 'Facial Treatment', duration: 45, price: 65 },
    { name: 'Maniküre', nameEn: 'Manicure', duration: 30, price: 35 },
  ],
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function seedGermanCompanies() {
  console.log('🇩🇪 Seeding German companies...\n')

  for (const companyData of germanCompanies) {
    const slug = createSlug(companyData.name)
    
    // Create company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        slug,
        email: `kontakt@${slug}.de`,
        phone: companyData.phone,
        description: `Professionelle ${companyData.type === 'dental' ? 'Zahnmedizin' : companyData.type === 'salon' ? 'Friseurdienstleistungen' : companyData.type === 'medical' ? 'medizinische Versorgung' : 'Wellness-Behandlungen'} in ${companyData.city}`,
        city: companyData.city,
        state: companyData.state,
        country: 'Deutschland',
        postal_code: '10001',
        timezone: 'Europe/Berlin',
        website: `https://${slug}.de`,
        is_active: true,
      })
      .select()
      .single()

    if (companyError) {
      if (companyError.code === '23505') {
        console.log(`⏭️  ${companyData.name} already exists, skipping...`)
        continue
      }
      console.error(`❌ Error creating ${companyData.name}:`, companyError.message)
      continue
    }

    console.log(`✅ Created: ${company.name} (${company.city})`)

    // Create services
    const services = serviceTemplates[companyData.type as keyof typeof serviceTemplates] || []
    
    for (const service of services) {
      const { error: serviceError } = await supabase
        .from('services')
        .insert({
          company_id: company.id,
          name: service.name,
          description: `${service.nameEn} / ${service.name}`,
          duration_minutes: service.duration,
          price: service.price,
          currency: 'EUR',
          is_active: true,
        })

      if (serviceError) {
        console.error(`  ⚠️  Error creating service ${service.name}:`, serviceError.message)
      } else {
        console.log(`    ➕ Service: ${service.name} (${service.duration}min, €${service.price})`)
      }
    }
  }

  console.log('\n🎉 German companies seeded successfully!')
  console.log(`\nTotal companies: ${germanCompanies.length}`)
  console.log('\nTest with:')
  console.log('curl "https://ai-agent-booking-test.vercel.app/api/ai/companies?city=Berlin"')
  console.log('curl "https://ai-agent-booking-test.vercel.app/api/ai/companies?state=Bayern"')
}

seedGermanCompanies()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })

