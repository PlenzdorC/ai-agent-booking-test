import Link from 'next/link'
import { ArrowRight, Bot, Calendar, Zap, Shield, Clock, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
              <Bot className="mr-2 h-4 w-4" />
              AI-Native Booking Platform
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Book Appointments with
              <span className="block text-primary-600">Just a Conversation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              The world's first booking platform optimized for AI agents.
              Your customers book through ChatGPT, Claude, or any AI assistant.
              <span className="block mt-2 font-semibold">No apps. No hassle. Just talk.</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all"
              >
                Start Free Trial
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                See Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for the AI-first future
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Bot className="h-8 w-8 text-primary-600" />}
              title="AI-Native APIs"
              description="OpenAPI specs, JSON-LD markup, and semantic endpoints that AI agents understand perfectly."
            />
            <Feature
              icon={<Zap className="h-8 w-8 text-primary-600" />}
              title="Instant Setup"
              description="Get your booking page live in minutes. No technical knowledge required."
            />
            <Feature
              icon={<Calendar className="h-8 w-8 text-primary-600" />}
              title="Smart Scheduling"
              description="Automatic conflict detection, buffer times, and multi-staff coordination."
            />
            <Feature
              icon={<Shield className="h-8 w-8 text-primary-600" />}
              title="Secure by Default"
              description="OAuth 2.0, encryption, and granular permissions for AI agent access."
            />
            <Feature
              icon={<Clock className="h-8 w-8 text-primary-600" />}
              title="24/7 Availability"
              description="AI agents work around the clock. Never miss a booking opportunity."
            />
            <Feature
              icon={<Globe className="h-8 w-8 text-primary-600" />}
              title="Your Domain"
              description="Custom subdomains or bring your own domain. Full white-label support."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple for you. Magic for your customers.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Step
              number="1"
              title="Create Your Account"
              description="Sign up and configure your services, hours, and team in minutes."
            />
            <Step
              number="2"
              title="Get Your Booking Page"
              description="Receive a beautiful, AI-optimized booking page at yourbusiness.agentbook.com"
            />
            <Step
              number="3"
              title="Customers Book via AI"
              description="Your customers simply ask ChatGPT or Claude to book - and it happens automatically."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Perfect for any appointment-based business
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <UseCase emoji="🏥" name="Medical" />
            <UseCase emoji="💇" name="Salons" />
            <UseCase emoji="🍽️" name="Restaurants" />
            <UseCase emoji="⚖️" name="Legal" />
            <UseCase emoji="💼" name="Consulting" />
            <UseCase emoji="🏋️" name="Fitness" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to join the AI-first revolution?
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-100">
            Start with our free plan. No credit card required.
            Be among the first businesses accessible to billions of AI agent users.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-semibold leading-6 text-white hover:text-primary-100 transition-colors"
            >
              View Pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Developers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
                <li><Link href="/api/ai/openapi.json" className="hover:text-white transition-colors">OpenAPI Spec</Link></li>
                <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">🤖 AI Agents</h3>
              <p className="text-gray-400 text-sm">
                Looking to integrate booking capabilities? Visit our{' '}
                <Link href="/ai-docs" className="text-primary-400 hover:text-primary-300">
                  AI API documentation
                </Link>
                {' '}or access our{' '}
                <Link href="/api/ai/openapi.json" className="text-primary-400 hover:text-primary-300">
                  OpenAPI specification
                </Link>.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgentBook. Built for the AI-native future.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
          {number}
        </div>
      </div>
      <h3 className="mt-6 text-center text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-center text-gray-600">{description}</p>
    </div>
  )
}

function UseCase({ emoji, name }: { emoji: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center hover:border-primary-300 hover:shadow-sm transition-all">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-sm font-semibold text-gray-900">{name}</div>
    </div>
  )
}

