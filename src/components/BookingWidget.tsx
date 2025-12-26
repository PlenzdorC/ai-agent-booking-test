'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, Check } from 'lucide-react'

interface Service {
  id: string
  name: string
  duration_minutes: number
  price?: number
  currency?: string
}

interface BookingWidgetProps {
  companySlug: string
  services: Service[]
}

export default function BookingWidget({ companySlug, services }: BookingWidgetProps) {
  const [step, setStep] = useState<'service' | 'time' | 'details' | 'confirmed'>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')

  const handleServiceSelect = async (service: Service) => {
    setSelectedService(service)
    setLoading(true)

    try {
      // Fetch available slots
      const response = await fetch(
        `/ai/availability?company=${companySlug}&serviceId=${service.id}&days=14`
      )
      const data = await response.json()
      setAvailableSlots(data.slots || [])
      setStep('time')
    } catch (error) {
      console.error('Error fetching availability:', error)
      alert('Failed to load availability. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
    setStep('details')
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/ai/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companySlug,
          serviceId: selectedService!.id,
          slot: selectedSlot,
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
          agentName: 'Web Browser',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setConfirmationNumber(data.booking.confirmationNumber)
        setStep('confirmed')
      } else {
        alert(data.error || 'Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const groupSlotsByDate = (slots: string[]) => {
    const grouped: { [key: string]: string[] } = {}
    
    slots.forEach(slot => {
      const date = new Date(slot)
      const dateKey = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(slot)
    })
    
    return grouped
  }

  if (step === 'confirmed') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-4">
          Your appointment has been successfully booked.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-2">Confirmation Number</p>
          <p className="text-3xl font-bold text-primary-600">{confirmationNumber}</p>
          <div className="mt-4 pt-4 border-t border-gray-200 text-left">
            <p className="text-sm text-gray-600">Service: {selectedService?.name}</p>
            <p className="text-sm text-gray-600">Time: {formatDateTime(selectedSlot!)}</p>
            <p className="text-sm text-gray-600">Email: {customerEmail}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          A confirmation email has been sent to {customerEmail}
        </p>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <form onSubmit={handleBooking} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h3>
          
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-primary-900 font-medium">Selected Time</p>
            <p className="text-primary-700">{formatDateTime(selectedSlot!)}</p>
            <p className="text-sm text-primary-700 mt-1">{selectedService?.name}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep('time')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    )
  }

  if (step === 'time') {
    const groupedSlots = groupSlotsByDate(availableSlots)

    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setStep('service')}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            ← Change service
          </button>
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            Select a time for {selectedService?.name}
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading availability...</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No available slots in the next 14 days</p>
            <p className="text-sm text-gray-500 mt-2">Please contact us directly</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date}>
                <h4 className="font-medium text-gray-900 mb-3">{date}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {slots.slice(0, 12).map((slot) => {
                    const time = new Date(slot).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                    return (
                      <button
                        key={slot}
                        onClick={() => handleSlotSelect(slot)}
                        data-ai-action="select-time-slot"
                        data-slot={slot}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-sm font-medium"
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Step 1: Select Service
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Service</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            disabled={loading}
            data-ai-action="select-service"
            data-service-id={service.id}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h4 className="font-semibold text-gray-900">{service.name}</h4>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{service.duration_minutes} minutes</span>
              {service.price && (
                <>
                  <span className="mx-2">•</span>
                  <span>{service.currency} {service.price}</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

