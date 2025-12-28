'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, ArrowRight, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Company info
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('USA')
  const [timezone, setTimezone] = useState('America/New_York')

  // Service info
  const [serviceName, setServiceName] = useState('')
  const [serviceDuration, setServiceDuration] = useState('30')
  const [servicePrice, setServicePrice] = useState('')

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate slug from company name
      const slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      // Call registration API
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName,
          slug,
          email,
          phone,
          description,
          address,
          city,
          state,
          postal_code: postalCode,
          country,
          timezone,
          service: {
            name: serviceName,
            duration_minutes: parseInt(serviceDuration),
            price: servicePrice ? parseFloat(servicePrice) : null,
            currency: 'USD',
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Success! Redirect to the new company booking page
      router.push(`/${slug}`)
    } catch (error: any) {
      console.error('Registration error:', error)
      alert(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">AgentBook</h1>
            <a href="/" className="text-sm text-gray-600 hover:text-primary-600">
              ← Back to home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 1 ? <Check className="h-6 w-6" /> : '1'}
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <span className="mx-8">Company Info</span>
            <span className="mx-8">First Service</span>
          </div>
        </div>

        {/* Form Cards */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {step === 1 ? (
            <form onSubmit={handleCompanySubmit}>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <Building2 className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
                <p className="text-gray-600 mt-2">
                  Let's get started with some basic information about your business
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Acme Dental Clinic"
                  />
                  {companyName && (
                    <p className="mt-1 text-sm text-gray-500">
                      Your booking page: {companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.agentbook.com
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="contact@acmedental.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Briefly describe your business..."
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="NY"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="USA">United States</option>
                      <option value="Deutschland">Germany</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone *
                  </label>
                  <select
                    id="timezone"
                    required
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Europe/Berlin">Berlin (CET)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleServiceSubmit}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Your First Service</h2>
                <p className="text-gray-600 mt-2">
                  What service would you like to offer? You can add more later.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Dental Cleaning, Consultation, Haircut"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="serviceDuration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes) *
                    </label>
                    <select
                      id="serviceDuration"
                      required
                      value={serviceDuration}
                      onChange={(e) => setServiceDuration(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Price (optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="servicePrice"
                        min="0"
                        step="0.01"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Booking Page
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Benefits Footer */}
        {step === 1 && (
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">🚀</div>
              <p className="mt-2 text-sm font-semibold text-gray-900">Quick Setup</p>
              <p className="text-xs text-gray-600">Live in 5 minutes</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">🤖</div>
              <p className="mt-2 text-sm font-semibold text-gray-900">AI-Optimized</p>
              <p className="text-xs text-gray-600">ChatGPT ready</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">💼</div>
              <p className="mt-2 text-sm font-semibold text-gray-900">Free Trial</p>
              <p className="text-xs text-gray-600">No credit card</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

