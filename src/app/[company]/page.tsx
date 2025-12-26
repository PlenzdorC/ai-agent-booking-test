import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LocalBusinessSchema, BookActionSchema } from '@/types'
import BookingWidget from '@/components/BookingWidget'
import { Calendar, Clock, Phone, Mail } from 'lucide-react'

interface CompanyPageProps {
  params: {
    company: string
  }
}

export async function generateMetadata({ params }: CompanyPageProps) {
  const { data: company } = await supabase
    .from('companies')
    .select('name, description')
    .eq('slug', params.company)
    .single()

  if (!company) {
    return {
      title: 'Company Not Found',
    }
  }

  return {
    title: `Book ${company.name} | AgentBook`,
    description: company.description || `Book appointments with ${company.name}`,
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  // Fetch company data
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.company)
    .single()

  if (companyError || !company) {
    notFound()
  }

  // Fetch services
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('company_id', company.id)
    .eq('is_active', true)
    .order('name')

  // Generate JSON-LD schema for AI agents
  const businessSchema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description || undefined,
    telephone: company.phone || undefined,
    email: company.email,
  }

  const bookActionSchema: BookActionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/ai/reservations`,
      httpMethod: 'POST',
      contentType: 'application/json',
    },
    result: {
      '@type': 'Reservation',
      name: `Appointment at ${company.name}`,
    },
  }

  return (
    <>
      {/* JSON-LD Schema for AI Agents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookActionSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex items-center justify-between">
              {company.logo_url ? (
                <img 
                  src={company.logo_url} 
                  alt={company.name}
                  className="h-12 w-auto"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              )}
              <div className="text-sm text-gray-500">
                Powered by <span className="font-semibold text-primary-600">AgentBook</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                
                {company.description && (
                  <p className="text-gray-600 mb-6">{company.description}</p>
                )}

                <div className="space-y-3">
                  {company.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <a 
                        href={`tel:${company.phone}`}
                        className="hover:text-primary-600"
                      >
                        {company.phone}
                      </a>
                    </div>
                  )}
                  
                  {company.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <a 
                        href={`mailto:${company.email}`}
                        className="hover:text-primary-600"
                      >
                        {company.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* AI-Optimized Marker */}
                <div 
                  className="mt-6 rounded-lg bg-primary-50 p-4 border border-primary-200"
                  data-ai-optimized="true"
                >
                  <p className="text-sm text-primary-900 font-medium mb-1">
                    🤖 AI Booking Enabled
                  </p>
                  <p className="text-xs text-primary-700">
                    Book with ChatGPT, Claude, or any AI assistant
                  </p>
                </div>
              </div>

              {/* Services List */}
              <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
                <div className="space-y-4">
                  {services?.map((service) => (
                    <div 
                      key={service.id}
                      className="border-l-4 border-primary-500 pl-4"
                      data-ai-action="service-info"
                      data-service-id={service.id}
                      data-service-name={service.name}
                      data-duration={service.duration_minutes}
                    >
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      )}
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration_minutes} min</span>
                        {service.price && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{service.currency} {service.price}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="lg:col-span-2">
              <div 
                className="rounded-lg bg-white p-8 shadow-sm"
                data-ai-action="booking-widget"
                data-company-slug={company.slug}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Book an Appointment
                  </h2>
                  <p className="text-gray-600">
                    Choose a service and time that works for you
                  </p>
                </div>

                <BookingWidget 
                  companySlug={company.slug}
                  services={services || []}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

