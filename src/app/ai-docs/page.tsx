import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agent API Documentation - AgentBook',
  description: 'API documentation for AI agents to book appointments. OpenAPI spec available.',
}

export default function AIDocsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">AI Agent API Documentation</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="font-semibold">🤖 For AI Agents:</p>
        <p className="mt-2">
          OpenAPI Specification: <a href={`${baseUrl}/api/ai/openapi.json`} className="text-blue-600 underline">{baseUrl}/api/ai/openapi.json</a>
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <p className="mb-4">This API allows AI agents to book appointments at various businesses.</p>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-bold mb-2">Test Company Available:</h3>
          <ul className="list-disc ml-6">
            <li><strong>Company Slug:</strong> test-dental</li>
            <li><strong>Company Name:</strong> Test Dental Clinic</li>
            <li><strong>Services:</strong> Dental Checkup, Dental Cleaning, Teeth Whitening</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-mono text-green-600 font-bold mb-2">GET /api/ai/services</h3>
            <p className="mb-2">List all services for a company</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
              {baseUrl}/api/ai/services?company=test-dental
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-mono text-green-600 font-bold mb-2">GET /api/ai/availability</h3>
            <p className="mb-2">Get available time slots for a service</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
              {baseUrl}/api/ai/availability?company=test-dental&serviceId=&#123;SERVICE_ID&#125;&days=7
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-mono text-blue-600 font-bold mb-2">POST /api/ai/reservations</h3>
            <p className="mb-2">Create a new booking</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto mb-2">
              {baseUrl}/api/ai/reservations
            </div>
            <p className="text-sm text-gray-600 mb-2">Request Body:</p>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "companySlug": "test-dental",
  "serviceId": "uuid-here",
  "slot": "2025-12-30T14:00:00Z",
  "customer": {
    "name": "Customer Name",
    "email": "customer@example.com",
    "phone": "+1234567890"
  },
  "notes": "Optional notes",
  "agentName": "ChatGPT"
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Example Workflow</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Call <code className="bg-gray-100 px-2 py-1 rounded">/api/ai/services?company=test-dental</code> to get available services</li>
          <li>Extract the service ID from the response</li>
          <li>Call <code className="bg-gray-100 px-2 py-1 rounded">/api/ai/availability</code> with the service ID to get available time slots</li>
          <li>Select a slot and call <code className="bg-gray-100 px-2 py-1 rounded">POST /api/ai/reservations</code> to book</li>
          <li>Return the confirmation number to the user</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Response Format</h2>
        <p>All endpoints return JSON. Successful bookings return a confirmation number.</p>
        <p className="mt-2">Error responses include helpful <code className="bg-gray-100 px-2 py-1 rounded">hint</code> fields for debugging.</p>
      </section>

      <section className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <h2 className="text-xl font-bold mb-2">📝 Note for AI Agents</h2>
        <p>Always confirm with the user before creating a booking. Provide the confirmation number after successful booking.</p>
      </section>
    </div>
  )
}

