# AI-Optimized API Documentation

## Overview

The AgentBook API is specifically designed for AI agents (ChatGPT, Claude, etc.) to easily book appointments on behalf of users. All endpoints return structured JSON and follow RESTful conventions.

## Base URL

```
Production: https://agentbook.com
Development: http://localhost:3000
```

## Authentication

Currently, the booking endpoints are public (for MVP). Future versions will support:
- OAuth 2.0 Device Flow for AI agents
- API keys for third-party integrations
- JWT tokens for user-specific actions

## Endpoints

### 1. List Services

Get all services offered by a company.

**Endpoint:** `GET /ai/services`

**Parameters:**
- `company` (required): Company slug

**Example Request:**
```bash
curl "https://agentbook.com/ai/services?company=acme-dental"
```

**Example Response:**
```json
{
  "company": {
    "name": "Acme Dental",
    "description": "Professional dental care",
    "contact": {
      "phone": "+1-555-0123",
      "email": "info@acmedental.com"
    }
  },
  "services": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Dental Cleaning",
      "description": "Regular checkup and cleaning",
      "duration": 30,
      "price": 100,
      "currency": "USD"
    }
  ],
  "meta": {
    "aiOptimized": true,
    "version": "1.0",
    "endpoints": {
      "availability": "/ai/availability?company=acme-dental&serviceId={serviceId}",
      "book": "/ai/reservations"
    }
  }
}
```

### 2. Get Availability

Get available time slots for a service.

**Endpoint:** `GET /ai/availability`

**Parameters:**
- `company` (required): Company slug
- `serviceId` (required): Service UUID
- `date` (optional): Start date in YYYY-MM-DD format (default: today)
- `days` (optional): Number of days to look ahead (default: 7)

**Example Request:**
```bash
curl "https://agentbook.com/ai/availability?company=acme-dental&serviceId=123e4567-e89b-12d3-a456-426614174000&date=2025-02-01&days=7"
```

**Example Response:**
```json
{
  "serviceId": "123e4567-e89b-12d3-a456-426614174000",
  "duration": 30,
  "slots": [
    "2025-02-01T09:00:00Z",
    "2025-02-01T09:30:00Z",
    "2025-02-01T10:00:00Z"
  ],
  "timezone": "America/New_York",
  "meta": {
    "totalSlots": 120,
    "showing": 50,
    "dateRange": {
      "from": "2025-02-01",
      "to": "2025-02-08"
    }
  }
}
```

### 3. Create Booking

Book an appointment.

**Endpoint:** `POST /ai/reservations`

**Request Body:**
```json
{
  "companySlug": "acme-dental",
  "serviceId": "123e4567-e89b-12d3-a456-426614174000",
  "slot": "2025-02-01T09:00:00Z",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0199"
  },
  "notes": "First time patient",
  "agentName": "ChatGPT"
}
```

**Example Request:**
```bash
curl -X POST "https://agentbook.com/ai/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "acme-dental",
    "serviceId": "123e4567-e89b-12d3-a456-426614174000",
    "slot": "2025-02-01T09:00:00Z",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "agentName": "ChatGPT"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "booking": {
    "id": "987fcdeb-51a2-43f1-9876-543210987654",
    "confirmationNumber": "987FCDEB",
    "company": "Acme Dental",
    "service": "Dental Cleaning",
    "startTime": "2025-02-01T09:00:00Z",
    "endTime": "2025-02-01T09:30:00Z",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "confirmed"
  },
  "message": "Booking confirmed! Confirmation number: 987FCDEB",
  "meta": {
    "bookedVia": "AI Agent",
    "agentName": "ChatGPT"
  }
}
```

### 4. Get Booking Details

Retrieve details of an existing booking.

**Endpoint:** `GET /ai/reservations`

**Parameters:**
- `id` (required): Booking UUID
- `email` (required): Customer email for verification

**Example Request:**
```bash
curl "https://agentbook.com/ai/reservations?id=987fcdeb-51a2-43f1-9876-543210987654&email=john@example.com"
```

### 5. Cancel Booking

Cancel an existing booking.

**Endpoint:** `DELETE /ai/reservations`

**Parameters:**
- `id` (required): Booking UUID
- `email` (required): Customer email for verification

**Example Request:**
```bash
curl -X DELETE "https://agentbook.com/ai/reservations?id=987fcdeb-51a2-43f1-9876-543210987654&email=john@example.com"
```

## OpenAPI Specification

A complete OpenAPI 3.0 specification is available at:
```
GET /ai/openapi.json
```

This can be used to automatically generate client SDKs and for AI agent discovery.

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "hint": "Optional hint for resolution"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (e.g., slot already booked)
- `500` - Internal Server Error

## Rate Limiting

(Coming soon)

## Webhooks

(Coming soon)

## AI Agent Best Practices

1. **Always check availability** before attempting to book
2. **Validate customer data** before sending requests
3. **Handle 409 errors** by rechecking availability
4. **Store confirmation numbers** to help users manage bookings
5. **Use the agentName field** to help businesses understand booking sources

