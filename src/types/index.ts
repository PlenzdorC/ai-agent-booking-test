// Core types for the AI-optimized booking platform

export interface Company {
  id: string
  name: string
  slug: string // For subdomain: {slug}.yourdomain.com
  email: string
  phone?: string
  description?: string
  logo_url?: string
  custom_domain?: string
  timezone: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  company_id: string
  name: string
  description?: string
  duration_minutes: number
  price?: number
  currency?: string
  buffer_time_minutes?: number // Time between appointments
  is_active: boolean
  created_at: string
}

export interface Staff {
  id: string
  company_id: string
  name: string
  email: string
  role: 'admin' | 'staff'
  is_active: boolean
  created_at: string
}

export interface Availability {
  id: string
  staff_id: string
  day_of_week: number // 0-6 (Sunday-Saturday)
  start_time: string // HH:MM format
  end_time: string // HH:MM format
  is_available: boolean
}

export interface Booking {
  id: string
  company_id: string
  service_id: string
  staff_id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  start_time: string // ISO datetime
  end_time: string // ISO datetime
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  booked_via: 'web' | 'ai_agent' | 'api'
  agent_name?: string // e.g., 'ChatGPT', 'Claude'
  created_at: string
  updated_at: string
}

// AI Agent specific types
export interface AIAgentToken {
  id: string
  user_id: string
  agent_name: string
  token: string
  scopes: string[]
  expires_at: string
  created_at: string
}

export interface AIBookingRequest {
  serviceId: string
  slot: string // ISO datetime
  customer: {
    name: string
    email: string
    phone?: string
  }
  notes?: string
}

export interface AIAvailabilitySlot {
  start: string // ISO datetime
  end: string // ISO datetime
  available: boolean
  staffId?: string
}

export interface AIServiceInfo {
  id: string
  name: string
  description?: string
  duration: number // minutes
  price?: number
  currency?: string
}

// JSON-LD Schema.org types
export interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  name: string
  description?: string
  telephone?: string
  email?: string
  address?: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
}

export interface BookActionSchema {
  '@context': 'https://schema.org'
  '@type': 'ReserveAction'
  target: {
    '@type': 'EntryPoint'
    urlTemplate: string
    httpMethod: 'POST'
    contentType: 'application/json'
  }
  result: {
    '@type': 'Reservation'
    name: string
  }
}

