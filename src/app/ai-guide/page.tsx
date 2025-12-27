import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Assistant Guide - AgentBook',
  description: 'Guide for AI assistants to interact with AgentBook booking interface',
}

export default function AIGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Assistant Booking Guide</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-900">
            <strong>For AI Agents:</strong> This page explains how to interact with AgentBook's booking interface
            programmatically or via UI automation.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Option 1: JavaScript API (Recommended)</h2>
          
          <p className="text-gray-700 mb-4">
            When on a booking page, a global <code className="bg-gray-100 px-2 py-1 rounded">window.AgentBookAPI</code> object
            is available with the following methods:
          </p>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm">{`// Check if API is available
if (window.AgentBookAPI) {
  
  // 1. Get list of available services
  const services = window.AgentBookAPI.getServices()
  // Returns: [{ id, name, duration_minutes, price, currency }, ...]
  
  // 2. Select a service by ID
  window.AgentBookAPI.selectService('service-id-here')
  // Returns: { success: true, service: "Service Name" }
  
  // 3. Get available time slots (after selecting service)
  const slots = window.AgentBookAPI.getAvailableSlots()
  // Returns: ["2025-12-30T14:00:00Z", "2025-12-30T15:00:00Z", ...]
  
  // 4. Select a time slot
  window.AgentBookAPI.selectSlot('2025-12-30T14:00:00Z')
  // Returns: { success: true, slot: "..." }
  
  // 5. Fill customer information
  window.AgentBookAPI.setCustomerInfo(
    'John Doe',           // name
    'john@example.com',   // email
    '+1234567890'         // phone (optional)
  )
  // Returns: { success: true }
  
  // 6. Complete the booking
  await window.AgentBookAPI.confirmBooking()
  // Returns: { success: true, message: "Booking submitted" }
  
  // 7. Check current state anytime
  const state = window.AgentBookAPI.getState()
  // Returns: { currentStep, selectedService, selectedSlot, ... }
}
`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Complete Example</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">{`// Complete booking flow
async function bookAppointment() {
  // 1. Get services and select first one
  const services = window.AgentBookAPI.getServices()
  window.AgentBookAPI.selectService(services[0].id)
  
  // 2. Wait a moment for slots to load
  await new Promise(r => setTimeout(r, 1000))
  
  // 3. Get and select first available slot
  const slots = window.AgentBookAPI.getAvailableSlots()
  window.AgentBookAPI.selectSlot(slots[0])
  
  // 4. Fill customer details
  window.AgentBookAPI.setCustomerInfo(
    'AI User', 
    'ai@example.com'
  )
  
  // 5. Confirm booking
  await window.AgentBookAPI.confirmBooking()
  
  // 6. Check result
  const state = window.AgentBookAPI.getState()
  return state.confirmationNumber
}
`}</pre>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Option 2: UI Interaction via Data Attributes</h2>
          
          <p className="text-gray-700 mb-4">
            All interactive elements have <code className="bg-gray-100 px-2 py-1 rounded">data-ai-*</code> attributes
            for easy identification:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Step 1: Select Service</h3>
              <p className="text-gray-700 text-sm mb-2">Look for buttons with:</p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li><code>data-ai-action="select-service"</code></li>
                <li><code>data-ai-service-id="[uuid]"</code></li>
                <li><code>data-ai-service-name="Service Name"</code></li>
                <li><code>data-ai-duration="30"</code></li>
                <li><code>data-ai-price="100"</code></li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Step 2: Select Time Slot</h3>
              <p className="text-gray-700 text-sm mb-2">After service selection, look for:</p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li><code>data-ai-action="select-timeslot"</code></li>
                <li><code>data-ai-slot="2025-12-30T14:00:00Z"</code></li>
                <li><code>data-ai-date="Monday, December 30"</code></li>
                <li><code>data-ai-time="2:00 PM"</code></li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Step 3: Fill Customer Details</h3>
              <p className="text-gray-700 text-sm mb-2">Fill inputs with:</p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li><code>data-ai-field="customer-name"</code></li>
                <li><code>data-ai-field="customer-email"</code></li>
                <li><code>data-ai-field="customer-phone"</code> (optional)</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Step 4: Confirm Booking</h3>
              <p className="text-gray-700 text-sm mb-2">Click button with:</p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li><code>data-ai-action="confirm-booking"</code></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">ARIA Labels</h2>
          <p className="text-gray-700 mb-4">
            All interactive elements also have descriptive <code className="bg-gray-100 px-2 py-1 rounded">aria-label</code> attributes
            for accessibility and AI understanding:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>"Select [Service Name] - [Duration] minutes - $[Price]"</li>
            <li>"Book appointment at [Time] on [Date]"</li>
            <li>"Your full name for the booking"</li>
            <li>"Your email address for booking confirmation"</li>
            <li>"Confirm and complete your booking"</li>
          </ul>
        </section>

        <section className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Best Practices for AI Agents</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Always prefer the JavaScript API over UI automation when available</li>
            <li>Check <code>getState()</code> to verify each step completed successfully</li>
            <li>Wait for asynchronous operations (like loading slots) to complete</li>
            <li>Always confirm booking details with the user before calling <code>confirmBooking()</code></li>
            <li>After booking, capture and display the confirmation number to the user</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

