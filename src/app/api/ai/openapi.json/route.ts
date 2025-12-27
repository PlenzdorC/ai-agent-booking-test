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
      termsOfService: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app'}/privacy`,
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://agentbook.com',
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
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            description: { type: 'string' },
                            city: { type: 'string' },
                            state: { type: 'string' },
                            phone: { type: 'string' },
                            email: { type: 'string' },
                            servicesCount: { type: 'number' },
                            bookingUrl: { type: 'string' },
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

