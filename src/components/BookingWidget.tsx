'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Mail, Phone, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { t } = useLanguage()
  const [step, setStep] = useState<'service' | 'time' | 'details' | 'confirmed'>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')

  // Expose API for AI agents to control the booking widget
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).AgentBookAPI = {
        getServices: () => services,
        selectService: (serviceId: string) => {
          const service = services.find(s => s.id === serviceId)
          if (service) {
            handleServiceSelect(service)
            return { success: true, service: service.name }
          }
          return { success: false, error: 'Service not found' }
        },
        getAvailableSlots: () => availableSlots,
        selectSlot: (slot: string) => {
          if (availableSlots.includes(slot)) {
            handleSlotSelect(slot)
            return { success: true, slot }
          }
          return { success: false, error: 'Slot not available' }
        },
        setCustomerInfo: (name: string, email: string, phone?: string) => {
          setCustomerName(name)
          setCustomerEmail(email)
          if (phone) setCustomerPhone(phone)
          return { success: true }
        },
        confirmBooking: async () => {
          const form = document.querySelector('[data-ai-booking-form]') as HTMLFormElement
          if (form) {
            form.requestSubmit()
            return { success: true, message: 'Booking submitted' }
          }
          return { success: false, error: 'Form not ready' }
        },
        getState: () => ({
          currentStep: step,
          selectedService: selectedService?.name,
          selectedSlot,
          customerName,
          customerEmail,
          totalAvailableSlots: availableSlots.length,
          confirmationNumber,
        }),
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).AgentBookAPI
      }
    }
  }, [services, availableSlots, step, selectedService, selectedSlot, customerName, customerEmail, confirmationNumber])

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
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.booking.confirmed}</h3>
        <p className="text-gray-600 mb-4">
          {t.booking.confirmationMessage}
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-2">{t.booking.confirmationNumber}</p>
          <p className="text-3xl font-bold text-primary-600">{confirmationNumber}</p>
          <div className="mt-4 pt-4 border-t border-gray-200 text-left">
            <p className="text-sm text-gray-600">{t.booking.service}: {selectedService?.name}</p>
            <p className="text-sm text-gray-600">{t.booking.time}: {formatDateTime(selectedSlot!)}</p>
            <p className="text-sm text-gray-600">{t.booking.email}: {customerEmail}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {t.booking.confirmationEmail} {customerEmail}
        </p>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <form onSubmit={handleBooking} data-ai-booking-form className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.booking.yourDetails}</h3>
          
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-primary-900 font-medium">{t.booking.selectedTime}</p>
            <p className="text-primary-700">{formatDateTime(selectedSlot!)}</p>
            <p className="text-sm text-primary-700 mt-1">{selectedService?.name}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t.booking.name} *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  data-ai-field="customer-name"
                  aria-label="Your full name for the booking"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.booking.email} *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  data-ai-field="customer-email"
                  aria-label="Your email address for booking confirmation"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                {t.booking.phone}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  data-ai-field="customer-phone"
                  aria-label="Your phone number (optional)"
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
            {t.booking.back}
          </button>
          <button
            type="submit"
            disabled={loading}
            data-ai-action="confirm-booking"
            aria-label="Confirm and complete your booking"
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {loading ? t.booking.booking : t.booking.confirmBooking}
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
            {t.booking.changeService}
          </button>
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            {t.booking.selectTime} {selectedService?.name}
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">{t.booking.loading}</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{t.booking.noSlots}</p>
            <p className="text-sm text-gray-500 mt-2">{t.booking.contactDirect}</p>
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
                        data-ai-action="select-timeslot"
                        data-ai-slot={slot}
                        data-ai-date={date}
                        data-ai-time={time}
                        aria-label={`Book appointment at ${time} on ${date}`}
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
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.booking.selectService}</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            disabled={loading}
            data-ai-action="select-service"
            data-ai-service-id={service.id}
            data-ai-service-name={service.name}
            data-ai-duration={service.duration_minutes}
            data-ai-price={service.price}
            aria-label={`Select ${service.name} - ${service.duration_minutes} minutes - ${service.price ? `${service.currency} ${service.price}` : 'pricing varies'}`}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h4 className="font-semibold text-gray-900">{service.name}</h4>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{service.duration_minutes} {t.booking.minutes}</span>
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

