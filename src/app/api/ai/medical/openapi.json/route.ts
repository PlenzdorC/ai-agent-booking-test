import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Medical-specific OpenAPI specification
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test.vercel.app'
  
  const medicalOpenApiSpec = {
    openapi: '3.1.0',
    info: {
      title: 'AgentBook Medical Booking API',
      description: 'Specialized API for booking healthcare appointments with medical-specific fields like insurance, medical history, and reason for visit.',
      version: '1.0.0',
      contact: {
        name: 'AgentBook Medical API Support',
        email: 'medical@agentbook.com',
      },
      termsOfService: `${baseUrl}/privacy`,
    },
    servers: [
      {
        url: baseUrl,
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Medical',
        description: 'Healthcare-specific endpoints',
      },
    ],
    paths: {
      '/ai/medical/search': {
        get: {
          operationId: 'searchMedicalProviders',
          summary: 'Search for healthcare providers',
          description: 'Find medical practices, dental clinics, and healthcare providers by location and specialty.',
          tags: ['Medical'],
          parameters: [
            {
              name: 'city',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by city (e.g., "New York", "Berlin")',
              example: 'New York',
            },
            {
              name: 'state',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by state (e.g., "NY", "CA")',
              example: 'NY',
            },
            {
              name: 'specialty',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Medical specialty (e.g., "dental", "dermatology", "general practice")',
              example: 'dental',
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
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      providers: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            description: { type: 'string' },
                            location: { type: 'string' },
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
      '/ai/medical/practitioners': {
        get: {
          operationId: 'listPractitioners',
          summary: 'List doctors at a practice',
          description: 'Get list of doctors, dentists, and healthcare staff available at a specific practice',
          tags: ['Medical'],
          parameters: [
            {
              name: 'company',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Medical practice slug',
              example: 'test-dental',
            },
          ],
          responses: {
            200: {
              description: 'List of practitioners',
            },
          },
        },
      },
      '/ai/services': {
        get: {
          operationId: 'listMedicalServices',
          summary: 'List medical services',
          description: 'Get all medical services/procedures offered by a healthcare provider',
          tags: ['Medical'],
          parameters: [
            {
              name: 'company',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Medical practice slug',
              example: 'test-dental',
            },
          ],
          responses: {
            200: {
              description: 'List of medical services',
            },
          },
        },
      },
      '/ai/availability': {
        get: {
          operationId: 'getMedicalAvailability',
          summary: 'Get appointment availability',
          description: 'Check available appointment slots for a medical service',
          tags: ['Medical'],
          parameters: [
            {
              name: 'company',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Medical practice slug',
            },
            {
              name: 'serviceId',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uuid' },
              description: 'Medical service/procedure ID',
            },
            {
              name: 'date',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'date' },
              description: 'Start date (YYYY-MM-DD)',
            },
            {
              name: 'days',
              in: 'query',
              required: false,
              schema: { type: 'integer', default: 7 },
              description: 'Number of days ahead to check',
            },
          ],
          responses: {
            200: {
              description: 'Available appointment slots',
            },
          },
        },
      },
      '/ai/medical/reservations': {
        post: {
          operationId: 'createMedicalAppointment',
          summary: 'Book a medical appointment',
          description: 'Create a healthcare appointment with medical-specific information including insurance, medical history, allergies, and reason for visit.',
          tags: ['Medical'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['companySlug', 'serviceId', 'slot', 'patient'],
                  properties: {
                    companySlug: { 
                      type: 'string',
                      description: 'Medical practice slug',
                      example: 'test-dental',
                    },
                    serviceId: { 
                      type: 'string',
                      format: 'uuid',
                      description: 'Medical service/procedure ID',
                    },
                    slot: { 
                      type: 'string',
                      format: 'date-time',
                      description: 'Appointment datetime in ISO format',
                      example: '2025-12-30T14:00:00Z',
                    },
                    patient: {
                      type: 'object',
                      required: ['name', 'email'],
                      properties: {
                        name: { 
                          type: 'string',
                          description: 'Patient full name',
                          example: 'John Doe',
                        },
                        email: { 
                          type: 'string',
                          format: 'email',
                          description: 'Patient email for confirmations',
                          example: 'john@example.com',
                        },
                        phone: { 
                          type: 'string',
                          description: 'Patient phone number',
                          example: '+1234567890',
                        },
                        dateOfBirth: { 
                          type: 'string',
                          format: 'date',
                          description: 'Patient date of birth (YYYY-MM-DD) - optional but recommended',
                          example: '1990-01-15',
                        },
                        insuranceProvider: { 
                          type: 'string',
                          description: 'Insurance provider name (e.g., BlueCross, Aetna, UnitedHealthcare)',
                          example: 'BlueCross BlueShield',
                        },
                        reasonForVisit: { 
                          type: 'string',
                          description: 'Chief complaint or reason for appointment',
                          example: 'Regular dental checkup',
                        },
                        allergies: { 
                          type: 'string',
                          description: 'Known allergies (comma-separated)',
                          example: 'Penicillin, Latex',
                        },
                        currentMedications: { 
                          type: 'string',
                          description: 'Current medications (comma-separated)',
                          example: 'Aspirin 81mg daily',
                        },
                      },
                    },
                    notes: { 
                      type: 'string',
                      description: 'Additional notes or special requests',
                    },
                    agentName: { 
                      type: 'string',
                      description: 'Name of AI agent making the booking',
                      example: 'ChatGPT',
                    },
                  },
                },
                example: {
                  companySlug: 'test-dental',
                  serviceId: 'd11ab103-2f17-47ad-8a81-9aa5845b3811',
                  slot: '2025-12-30T14:00:00Z',
                  patient: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '+1234567890',
                    dateOfBirth: '1990-01-15',
                    insuranceProvider: 'BlueCross BlueShield',
                    reasonForVisit: 'Dental cleaning and checkup',
                    allergies: 'None',
                  },
                  agentName: 'ChatGPT',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Medical appointment created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      appointment: {
                        type: 'object',
                        properties: {
                          confirmationNumber: { type: 'string' },
                          practice: { type: 'string' },
                          service: { type: 'string' },
                          appointmentTime: { type: 'string' },
                          status: { type: 'string' },
                        },
                      },
                      message: { type: 'string' },
                      instructions: {
                        type: 'object',
                        properties: {
                          arrival: { type: 'string' },
                          insurance: { type: 'string' },
                          cancellation: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
            409: {
              description: 'Time slot no longer available',
            },
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

  return NextResponse.json(medicalOpenApiSpec, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store'
    }
  })
}
