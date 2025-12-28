import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching

// OpenAPI specification for AI agents to discover and use the API
// This is crucial for ChatGPT plugins, Claude integrations, etc.
export async function GET() {
  const openApiSpec = {
    openapi: '3.1.0',
    info: {
      title: 'AgentBook AI-Optimized Booking API',
      description: 'RESTful API designed for AI agents to book appointments and manage reservations',
      version: '1.0.0',
      contact: {
        name: 'AgentBook API Support',
        email: 'api@agentbook.com',
      },
      termsOfService: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test.vercel.app'}/privacy`,
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test.vercel.app',
        description: 'Production server',
      },
    ],
    paths: {
      '/ai/companies': {
        get: {
          operationId: 'searchCompanies',
          summary: 'Search for companies by location or category',
          description: 'Find businesses that use AgentBook. Search by city, state, category, or general search term.',
          parameters: [
            {
              name: 'search',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Search term (searches name, city, and description)',
            },
            {
              name: 'city',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by city (e.g., "New York", "Los Angeles")',
            },
            {
              name: 'state',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by state (e.g., "NY", "CA")',
            },
            {
              name: 'category',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by business category (e.g., "dental", "salon", "medical")',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', default: 20 },
              description: 'Maximum number of results to return',
            },
          ],
          responses: {
            200: {
              description: 'List of matching companies',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      companies: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string', description: 'Company name' },
                            slug: { type: 'string', description: 'Company slug - use this with /ai/services endpoint' },
                            description: { type: 'string' },
                            city: { type: 'string' },
                            state: { type: 'string' },
                            phone: { type: 'string' },
                          },
                        },
                      },
                      total: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/ai/services': {
        get: {
          operationId: 'listServices',
          summary: 'List all services for a company',
          description: 'Get all available services offered by a company',
          parameters: [
            {
              name: 'company',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Company slug (e.g., "acme-dental")',
            },
          ],
          responses: {
            200: {
              description: 'List of services',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      company: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          description: { type: 'string' },
                          contact: {
                            type: 'object',
                            properties: {
                              phone: { type: 'string' },
                              email: { type: 'string' },
                            },
                          },
                        },
                      },
                      services: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            duration: { type: 'number' },
                            price: { type: 'number' },
                            currency: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/ai/availability': {
        get: {
          operationId: 'getAvailability',
          summary: 'Get available time slots',
          description: 'Retrieve available booking slots for a specific service',
          parameters: [
            {
              name: 'company',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Company slug',
            },
            {
              name: 'serviceId',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uuid' },
              description: 'Service ID',
            },
            {
              name: 'date',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'date' },
              description: 'Start date (YYYY-MM-DD). Defaults to today.',
            },
            {
              name: 'days',
              in: 'query',
              required: false,
              schema: { type: 'integer', default: 7 },
              description: 'Number of days to check ahead',
            },
          ],
          responses: {
            200: {
              description: 'Available time slots',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      serviceId: { type: 'string' },
                      duration: { type: 'number' },
                      slots: {
                        type: 'array',
                        items: { type: 'string', format: 'date-time' },
                      },
                      timezone: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/ai/reservations': {
        post: {
          operationId: 'createBooking',
          summary: 'Create a new booking',
          description: 'Book an appointment for a customer',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['companySlug', 'serviceId', 'slot', 'customer'],
                  properties: {
                    companySlug: { type: 'string' },
                    serviceId: { type: 'string', format: 'uuid' },
                    slot: { type: 'string', format: 'date-time' },
                    customer: {
                      type: 'object',
                      required: ['name', 'email'],
                      properties: {
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phone: { type: 'string' },
                      },
                    },
                    notes: { type: 'string' },
                    agentName: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Booking created successfully',
            },
            409: {
              description: 'Time slot no longer available',
            },
          },
        },
        get: {
          operationId: 'getBooking',
          summary: 'Get booking details',
          description: 'Retrieve details of a specific booking',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
            {
              name: 'email',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'email' },
            },
          ],
          responses: {
            200: {
              description: 'Booking details',
            },
          },
        },
        patch: {
          operationId: 'updateBooking',
          summary: 'Edit or reschedule a booking',
          description: 'Change the time, service, or notes for an existing booking',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['bookingId', 'email'],
                  properties: {
                    bookingId: { 
                      type: 'string', 
                      format: 'uuid',
                      description: 'Booking ID to update'
                    },
                    email: { 
                      type: 'string', 
                      format: 'email',
                      description: 'Customer email for verification'
                    },
                    newSlot: { 
                      type: 'string', 
                      format: 'date-time',
                      description: 'New appointment time (optional)'
                    },
                    newServiceId: { 
                      type: 'string', 
                      format: 'uuid',
                      description: 'New service ID (optional)'
                    },
                    notes: { 
                      type: 'string',
                      description: 'Updated notes (optional)'
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Booking updated successfully',
            },
            404: {
              description: 'Booking not found',
            },
            409: {
              description: 'New time slot not available',
            },
          },
        },
        delete: {
          operationId: 'cancelBooking',
          summary: 'Cancel a booking',
          description: 'Cancel an existing booking',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
            {
              name: 'email',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'email' },
            },
          ],
          responses: {
            200: {
              description: 'Booking cancelled successfully',
            },
          },
        },
      },
    },
    '/ai/medical/search': {
      get: {
        operationId: 'searchMedicalProviders',
        summary: 'Search for healthcare providers',
        description: 'Find medical practices, clinics, and healthcare providers. Returns only medical/healthcare businesses.',
        tags: ['Medical'],
        parameters: [
          {
            name: 'city',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by city',
          },
          {
            name: 'state',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by state',
          },
          {
            name: 'specialty',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Medical specialty (e.g., "dental", "dermatology", "general practice")',
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'General search term',
          },
        ],
        responses: {
          200: {
            description: 'List of healthcare providers',
          },
        },
      },
    },
    '/ai/medical/practitioners': {
      get: {
        operationId: 'listPractitioners',
        summary: 'List doctors and healthcare providers',
        description: 'Get list of doctors, dentists, or healthcare staff at a medical practice',
        tags: ['Medical'],
        parameters: [
          {
            name: 'company',
            in: 'query',
            required: true,
            schema: { type: 'string' },
            description: 'Medical practice slug',
          },
        ],
        responses: {
          200: {
            description: 'List of practitioners',
          },
        },
      },
    },
    '/ai/medical/reservations': {
      post: {
        operationId: 'createMedicalAppointment',
        summary: 'Book a medical appointment',
        description: 'Create a medical appointment with healthcare-specific information like insurance, reason for visit, allergies, etc.',
        tags: ['Medical'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['companySlug', 'serviceId', 'slot', 'patient'],
                properties: {
                  companySlug: { type: 'string', description: 'Medical practice slug' },
                  serviceId: { type: 'string', format: 'uuid', description: 'Service/procedure ID' },
                  slot: { type: 'string', format: 'date-time', description: 'Appointment datetime' },
                  patient: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                      name: { type: 'string', description: 'Patient full name' },
                      email: { type: 'string', format: 'email', description: 'Patient email' },
                      phone: { type: 'string', description: 'Patient phone number' },
                      dateOfBirth: { type: 'string', format: 'date', description: 'Patient date of birth (YYYY-MM-DD)' },
                      insuranceProvider: { type: 'string', description: 'Insurance provider name (e.g., BlueCross, Aetna)' },
                      reasonForVisit: { type: 'string', description: 'Chief complaint or reason for appointment' },
                      allergies: { type: 'string', description: 'Known allergies' },
                      currentMedications: { type: 'string', description: 'Current medications' },
                    },
                  },
                  notes: { type: 'string', description: 'Additional notes' },
                  agentName: { type: 'string', description: 'Name of AI agent making the booking' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Medical appointment created successfully',
          },
          409: {
            description: 'Time slot no longer available',
          },
        },
      },
    },
    components: {
      schemas: {},
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  }

  return NextResponse.json(openApiSpec, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store'
    }
  })
}

