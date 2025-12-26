# AI Agent Integration Guide

## Overview

This guide helps AI agents (ChatGPT, Claude, custom agents) integrate with AgentBook to enable natural language booking experiences.

## Integration Approaches

### 1. ChatGPT Plugin / GPT Actions

Create a GPT Action using our OpenAPI spec:

```yaml
openapi: 3.0.0
info:
  title: AgentBook Booking API
  version: 1.0.0
servers:
  - url: https://agentbook.com
# ... rest from /ai/openapi.json
```

**Steps:**
1. Go to ChatGPT → Create GPT
2. In Actions → Import from URL
3. Use: `https://agentbook.com/ai/openapi.json`
4. Configure authentication (none for MVP)

### 2. Claude MCP (Model Context Protocol)

```python
# Example MCP tool definition
tools = [
    {
        "name": "book_appointment",
        "description": "Book an appointment at a business",
        "input_schema": {
            "type": "object",
            "properties": {
                "company": {"type": "string"},
                "service": {"type": "string"},
                "datetime": {"type": "string"},
                "customer_name": {"type": "string"},
                "customer_email": {"type": "string"}
            }
        }
    }
]
```

### 3. Custom AI Agents (LangChain, etc.)

```python
from langchain.tools import Tool

def book_appointment(company, service_id, slot, customer):
    """Book an appointment via AgentBook API"""
    import requests
    
    response = requests.post(
        "https://agentbook.com/ai/reservations",
        json={
            "companySlug": company,
            "serviceId": service_id,
            "slot": slot,
            "customer": customer,
            "agentName": "CustomAgent"
        }
    )
    return response.json()

booking_tool = Tool(
    name="BookAppointment",
    func=book_appointment,
    description="Book appointments at businesses"
)
```

## Conversation Flow Examples

### Example 1: Simple Booking

**User:** "Book me a dental cleaning at Acme Dental next Tuesday at 2pm"

**Agent Steps:**
1. Extract company: "acme-dental" (slug)
2. Call `/ai/services?company=acme-dental` to get services
3. Find "Dental Cleaning" service ID
4. Calculate next Tuesday at 2pm → "2025-02-04T14:00:00Z"
5. Call `/ai/availability` to verify slot is available
6. Call `/ai/reservations` to book
7. Respond with confirmation

**Agent Response:** "✅ Booked! Your dental cleaning at Acme Dental is confirmed for Tuesday, February 4th at 2:00 PM. Confirmation number: 987FCDEB. You'll receive an email at your address."

### Example 2: Finding Available Slots

**User:** "When is Acme Dental available this week?"

**Agent Steps:**
1. Call `/ai/services?company=acme-dental`
2. Call `/ai/availability` with current date + 7 days
3. Group slots by day and present options

**Agent Response:** "Acme Dental has availability this week:
- Tuesday: 9:00 AM, 10:30 AM, 2:00 PM
- Wednesday: 9:00 AM, 11:00 AM, 3:00 PM
- Thursday: 10:00 AM, 1:00 PM, 4:00 PM

Which time works best for you?"

### Example 3: Cancellation

**User:** "Cancel my appointment at Acme Dental"

**Agent Steps:**
1. Check if user has booking ID (from previous conversation)
2. If not, ask for confirmation number or email
3. Call `DELETE /ai/reservations?id={id}&email={email}`

**Agent Response:** "Your appointment at Acme Dental has been cancelled. You should receive a confirmation email shortly."

## Semantic HTML Data Attributes

When parsing company booking pages, look for these data attributes:

```html
<button 
  data-ai-action="book-appointment"
  data-service-id="123e4567-e89b-12d3-a456-426614174000"
  data-service-name="Dental Cleaning"
  data-duration="30"
>
  Book Now
</button>
```

## JSON-LD Schema

Every company page includes JSON-LD markup:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Dental",
  "telephone": "+1-555-0123",
  "action": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://agentbook.com/ai/reservations",
      "httpMethod": "POST"
    }
  }
}
```

## Error Handling for Agents

### Slot No Longer Available (409)

```python
try:
    response = book_appointment(...)
except ConflictError:
    # Fetch new availability
    slots = get_availability(...)
    # Suggest alternative to user
    return f"That time is no longer available. How about {slots[0]}?"
```

### Company Not Found (404)

```python
if response.status_code == 404:
    return "I couldn't find that business. Could you check the name?"
```

## Best Practices for AI Agents

### 1. Confirm Before Booking
Always confirm with the user before making a booking:
```
"I found availability at Acme Dental for Tuesday at 2pm. 
Should I book this for you?"
```

### 2. Collect Required Information
Ensure you have:
- Customer name
- Customer email
- Preferred date/time
- Service type (if multiple options)

### 3. Provide Clear Confirmations
After booking, always provide:
- Confirmation number
- Business name
- Date and time
- Cancellation instructions

### 4. Handle Ambiguity
```
User: "Book me at the dentist"
Agent: "I found Acme Dental nearby. Is this the right place?"
```

### 5. Respect Time Zones
- Always convert user's local time to UTC for API calls
- Display times in user's local timezone
- Company timezone is provided in availability response

## Testing Your Integration

### Test Company
```
Company Slug: test-dental
Services: Dental Cleaning (30 min), Checkup (15 min)
Always has availability for testing
```

### Test API Calls
```bash
# Get services
curl "https://agentbook.com/ai/services?company=test-dental"

# Check availability
curl "https://agentbook.com/ai/availability?company=test-dental&serviceId=test-service-id"

# Book appointment
curl -X POST "https://agentbook.com/ai/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "test-dental",
    "serviceId": "test-service-id",
    "slot": "2025-02-01T14:00:00Z",
    "customer": {
      "name": "Test User",
      "email": "test@example.com"
    },
    "agentName": "TestAgent"
  }'
```

## Webhook Support (Coming Soon)

Register webhooks to receive notifications:
- `booking.created`
- `booking.cancelled`
- `booking.updated`

## Support

Questions about integration?
- Email: integrations@agentbook.com
- Discord: [Join our community](#)
- Documentation: https://docs.agentbook.com

