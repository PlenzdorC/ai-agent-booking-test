import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - AgentBook',
  description: 'Privacy Policy for AgentBook AI-powered booking platform',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <p className="text-sm text-gray-600 mb-8">
          Last updated: December 27, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            AgentBook ("we", "our", or "us") operates the booking platform accessible at 
            ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app. This Privacy Policy explains how 
            we collect, use, and protect your information when you use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Booking Information</h3>
          <p className="text-gray-700 mb-4">
            When you make a booking through our service or AI assistants, we collect:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Booking preferences and appointment details</li>
            <li>Information about which AI agent was used (e.g., "ChatGPT")</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>Process and confirm your bookings</li>
            <li>Send booking confirmations and reminders</li>
            <li>Communicate with you about your appointments</li>
            <li>Improve our service and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
          <p className="text-gray-700 mb-4">
            Your data is stored securely using Supabase, a SOC 2 Type 2 compliant database provider. 
            We implement industry-standard security measures to protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Assistant Integration</h2>
          <p className="text-gray-700 mb-4">
            When you book through AI assistants like ChatGPT or Claude:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>Your booking data is transmitted securely to our API</li>
            <li>We record which AI assistant was used for analytics purposes</li>
            <li>The AI assistant provider may have their own privacy policies governing your conversation</li>
            <li>We do not store or access your conversation history with the AI assistant</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">We use the following third-party services:</p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li><strong>Supabase</strong> - Database and authentication</li>
            <li><strong>Vercel</strong> - Hosting and deployment</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Each of these services has their own privacy policies governing how they handle data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Cancel bookings at any time</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We retain your booking information for as long as necessary to provide our services 
            and comply with legal obligations. Cancelled bookings are marked as cancelled but 
            not deleted for record-keeping purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use minimal cookies necessary for the functioning of our service. We do not 
            use tracking or advertising cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our service is not intended for children under 13. We do not knowingly collect 
            personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: privacy@agentbook.com
          </p>
        </section>

        <div className="border-t pt-6 mt-8">
          <p className="text-sm text-gray-600">
            This privacy policy is designed to comply with GDPR, CCPA, and other major privacy regulations.
          </p>
        </div>
      </div>
    </div>
  )
}

