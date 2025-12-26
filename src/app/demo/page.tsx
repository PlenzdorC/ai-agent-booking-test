import Link from 'next/link'
import { MessageSquare, Calendar, CheckCircle, ArrowRight } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">AgentBook</h1>
            <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            See AI Booking in Action
          </h1>
          <p className="text-xl text-gray-600">
            Watch how easy it is for users to book appointments through AI assistants
          </p>
        </div>

        {/* Demo Conversation */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-800 px-6 py-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="ml-4 text-sm text-gray-300">ChatGPT</span>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4 bg-gray-50 min-h-[500px]">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                  <p>Book me a dental cleaning at Acme Dental for next Tuesday at 2pm</p>
                </div>
              </div>

              {/* AI Thinking */}
              <div className="flex">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-gray-600 italic">Checking availability...</p>
                </div>
              </div>

              {/* AI Response 1 */}
              <div className="flex">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-gray-900">
                    I found availability at Acme Dental for Tuesday, February 4th at 2:00 PM for a dental cleaning (30 minutes).
                    Should I book this for you?
                  </p>
                </div>
              </div>

              {/* User Confirmation */}
              <div className="flex justify-end">
                <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                  <p>Yes please! My name is John Doe, email john@example.com</p>
                </div>
              </div>

              {/* AI Booking */}
              <div className="flex">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                  <p className="text-gray-600 italic">Creating booking...</p>
                </div>
              </div>

              {/* AI Confirmation */}
              <div className="flex">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm border-2 border-green-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">✅ Booking Confirmed!</p>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                        <p><span className="font-medium">Business:</span> Acme Dental</p>
                        <p><span className="font-medium">Service:</span> Dental Cleaning</p>
                        <p><span className="font-medium">Date:</span> Tuesday, February 4, 2025</p>
                        <p><span className="font-medium">Time:</span> 2:00 PM</p>
                        <p><span className="font-medium">Duration:</span> 30 minutes</p>
                        <p><span className="font-medium">Confirmation:</span> #987FCDEB</p>
                      </div>
                      <p className="text-gray-600 mt-3">
                        A confirmation email has been sent to john@example.com. 
                        If you need to cancel or reschedule, just let me know!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <MessageSquare className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Natural Conversation</h3>
              <p className="text-sm text-gray-600">Just talk naturally - no forms or buttons to click</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Availability</h3>
              <p className="text-sm text-gray-600">AI checks live availability and prevents double-booking</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
              <p className="text-sm text-gray-600">Booking confirmed in seconds with email notification</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to enable AI booking for your business?
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/test-dental"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                Try Live Demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • Set up in 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

