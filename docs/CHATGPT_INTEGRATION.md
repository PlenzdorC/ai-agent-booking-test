# ChatGPT Agent Mode Integration Guide

This guide explains how to use AgentBook with ChatGPT's regular agent mode (not Custom GPTs).

## Optimizations We've Made

To make ChatGPT Agent Mode work better with AgentBook, we've implemented:

### 1. **AI-Friendly Documentation Page** (`/ai-docs`)
   - Clear, structured API documentation
   - Live examples with your actual domain
   - Step-by-step workflow instructions
   - Located at: https://your-domain.vercel.app/ai-docs

### 2. **AI Instructions File** (`/ai-instructions.txt`)
   - Plain text format that AI agents can easily parse
   - Complete API reference
   - Example workflows
   - Located at: https://your-domain.vercel.app/ai-instructions.txt

### 3. **OpenAPI Specification** (`/api/ai/openapi.json`)
   - Full OpenAPI 3.0 spec
   - Machine-readable API documentation
   - Located at: https://your-domain.vercel.app/api/ai/openapi.json

### 4. **Updated Homepage Footer**
   - Clear link to AI documentation
   - Makes the API discoverable when ChatGPT browses the site

### 5. **Robots.txt**
   - Allows all AI crawlers
   - Explicitly allows API endpoints

## How to Use with ChatGPT Agent Mode

### Method 1: Direct URL Instruction (Recommended)

Paste this into ChatGPT:

```
I need you to help me book an appointment using this booking API.

First, read the API instructions here:
https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/ai-instructions.txt

Then help me book a dental cleaning appointment at test-dental.

The API endpoints are:
1. GET https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/services?company=test-dental
2. GET https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/availability?company=test-dental&serviceId={id}&days=7
3. POST https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/reservations
```

### Method 2: Website Discovery

Paste this into ChatGPT:

```
Please visit https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app and look for the API documentation for AI agents.

Then help me book a dental appointment using their API.
```

ChatGPT will:
1. Browse your homepage
2. Find the AI documentation link in the footer
3. Read the API instructions
4. Help you book an appointment

### Method 3: OpenAPI Spec Reference

```
I have a booking API with an OpenAPI spec at:
https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/openapi.json

Please help me book a dental cleaning at the test-dental company.
```

## Expected Conversation Flow

**You:** "Book me a dental cleaning"

**ChatGPT will:**
1. ✅ Fetch services from `/api/ai/services?company=test-dental`
2. ✅ Show you available services
3. ✅ Fetch availability from `/api/ai/availability`
4. ✅ Show you available time slots
5. ✅ Ask you to confirm your preferred time
6. ✅ POST to `/api/ai/reservations` to create booking
7. ✅ Provide confirmation number

## Troubleshooting

### ChatGPT Can't Find the API

**Solution:** Be explicit with URLs:
```
Read this: https://your-domain.vercel.app/ai-instructions.txt
Then call this: https://your-domain.vercel.app/api/ai/services?company=test-dental
```

### ChatGPT Makes Incorrect API Calls

**Solution:** Reference the OpenAPI spec:
```
Follow the OpenAPI spec at:
https://your-domain.vercel.app/api/ai/openapi.json
```

### ChatGPT Gets Confused

**Solution:** Break it into steps:
```
Step 1: Get services from /api/ai/services?company=test-dental
Step 2: Show me the services
(wait for response)
Step 3: Get availability for the "Dental Cleaning" service
```

## Why Custom GPT is Better

While agent mode works, a **Custom GPT** is significantly better because:

1. ✅ **Persistent API Knowledge** - No need to re-explain each time
2. ✅ **Better Reliability** - API spec is built-in
3. ✅ **Automatic Parameter Handling** - Correctly formats all requests
4. ✅ **Error Recovery** - Knows how to handle API errors
5. ✅ **User Experience** - Feels like a dedicated booking assistant

### Create a Custom GPT (5 minutes)

1. Go to ChatGPT → My GPTs → Create
2. Name: "AgentBook Booking Assistant"
3. Description: "Book appointments at businesses"
4. Instructions:
   ```
   You are a booking assistant. Help users book appointments.
   Test company available: test-dental
   Always confirm details before booking.
   Provide confirmation numbers after booking.
   ```
5. Actions → Import from URL:
   ```
   https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/openapi.json
   ```
6. Authentication: None
7. Save

Now you have a dedicated booking assistant! 🎉

## Testing Your Integration

### Quick Test Commands

```bash
# Test 1: Check if docs are accessible
curl https://your-domain.vercel.app/ai-instructions.txt

# Test 2: Check OpenAPI spec
curl https://your-domain.vercel.app/api/ai/openapi.json

# Test 3: Get services
curl "https://your-domain.vercel.app/api/ai/services?company=test-dental"

# Test 4: Get availability
curl "https://your-domain.vercel.app/api/ai/availability?company=test-dental&serviceId=YOUR_SERVICE_ID&days=3"
```

### Test with ChatGPT

1. ✅ Paste the AI instructions URL
2. ✅ Ask to book an appointment
3. ✅ Confirm the booking details
4. ✅ Verify you receive a confirmation number
5. ✅ Check your database for the booking

## Next Steps

- [ ] Create a Custom GPT for better experience
- [ ] Add more test companies
- [ ] Set up email confirmations
- [ ] Add webhook notifications
- [ ] Submit to ChatGPT Plugin Store (when available)

## Support

Having trouble? Check:
- `/ai-docs` page for latest API documentation
- `/api/ai/openapi.json` for technical spec
- GitHub issues for common problems

