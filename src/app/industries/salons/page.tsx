'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Scissors, Users, CheckCircle, MessageSquare, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function SalonsPage() {
  const { t, locale } = useLanguage()
  
  const content = {
    en: {
      hero: {
        title: 'AI Booking for Hair Salons & Beauty Studios',
        subtitle: 'Your Clients Book Through ChatGPT - 24/7',
        description: 'Stop playing phone tag. Let AI handle your appointments.',
      },
      problem: {
        title: 'Common Salon Booking Challenges',
        points: [
          { title: 'Constant Phone Interruptions', desc: 'Calls disrupt client services and styling sessions' },
          { title: 'Last-Minute Cancellations', desc: 'Empty chairs = lost revenue' },
          { title: 'After-Hours Bookings Lost', desc: 'Clients can\'t book when you\'re closed' },
          { title: 'Double Bookings', desc: 'Manual calendars lead to scheduling conflicts' },
        ],
      },
      solution: {
        title: 'Smart Booking for Modern Salons',
        description: 'Clients simply say: "Book me a haircut at Salon Marie tomorrow at 3pm"',
        features: [
          { icon: Scissors, title: 'Stylist-Specific Booking', desc: 'Clients can request their favorite stylist' },
          { icon: Calendar, title: 'Real-Time Availability', desc: 'Always show current open slots' },
          { icon: Sparkles, title: 'Service Packages', desc: 'Bundle haircut + color + styling' },
          { icon: Users, title: 'Team Management', desc: 'Manage multiple stylists effortlessly' },
        ],
      },
      demo: {
        title: 'Example Conversation',
        example: {
          patient: 'I need a haircut and highlights this Friday',
          ai: 'I found Salon Style in München. Available stylists Friday:\n\n• Maria - 10:00 AM (Haircut + Highlights, 120 min)\n• Lisa - 2:00 PM (Haircut + Highlights, 120 min)\n• Anna - 4:30 PM (Haircut + Highlights, 120 min)\n\nWhich time works?',
          patientResponse: '2pm with Lisa sounds perfect',
          aiConfirm: '✅ Booked! Haircut + Highlights with Lisa\n\nFriday, Jan 10 at 2:00 PM\nDuration: 2 hours\nPrice: €145\n\nConfirmation #: SL8293\n\nYou\'ll get a reminder 1 day before.',
        },
      },
      benefits: {
        title: 'Why Salons Love AgentBook',
        items: [
          '💇 Book 3x more appointments per day',
          '📱 24/7 booking - never miss a client',
          '💰 Reduce no-shows by 50%',
          '⏰ Save 10+ hours/week on phone calls',
          '😊 Happier clients, less frustration',
          '📊 Smart analytics on popular services',
        ],
      },
      cta: {
        title: 'Transform Your Salon Booking',
        subtitle: 'Join 500+ salons using AI-powered scheduling',
        trial: 'Start Free Trial',
        demo: 'Book a Demo',
      },
    },
    de: {
      hero: {
        title: 'KI-Buchung für Friseursalons & Beauty-Studios',
        subtitle: 'Ihre Kunden buchen über ChatGPT - 24/7',
        description: 'Schluss mit Telefon-Pingpong. Lassen Sie KI Ihre Termine verwalten.',
      },
      problem: {
        title: 'Häufige Salon-Buchungsherausforderungen',
        points: [
          { title: 'Ständige Telefonunterbrechungen', desc: 'Anrufe stören Kundenservice und Styling-Sessions' },
          { title: 'Kurzfristige Absagen', desc: 'Leere Stühle = verlorene Einnahmen' },
          { title: 'Verpasste Buchungen nach Feierabend', desc: 'Kunden können nicht buchen, wenn Sie geschlossen sind' },
          { title: 'Doppelbuchungen', desc: 'Manuelle Kalender führen zu Terminüberschneidungen' },
        ],
      },
      solution: {
        title: 'Intelligente Buchung für moderne Salons',
        description: 'Kunden sagen einfach: "Buche mir einen Haarschnitt bei Salon Marie morgen um 15 Uhr"',
        features: [
          { icon: Scissors, title: 'Stylisten-spezifische Buchung', desc: 'Kunden können ihren Lieblingsstylisten anfragen' },
          { icon: Calendar, title: 'Echtzeit-Verfügbarkeit', desc: 'Zeigen Sie immer aktuelle freie Termine' },
          { icon: Sparkles, title: 'Service-Pakete', desc: 'Bündeln Sie Schnitt + Farbe + Styling' },
          { icon: Users, title: 'Team-Management', desc: 'Verwalten Sie mehrere Stylisten mühelos' },
        ],
      },
      demo: {
        title: 'Beispiel-Gespräch',
        example: {
          patient: 'Ich brauche einen Haarschnitt und Strähnchen am Freitag',
          ai: 'Ich habe Salon Style in München gefunden. Verfügbare Stylisten Freitag:\n\n• Maria - 10:00 Uhr (Schnitt + Strähnchen, 120 Min)\n• Lisa - 14:00 Uhr (Schnitt + Strähnchen, 120 Min)\n• Anna - 16:30 Uhr (Schnitt + Strähnchen, 120 Min)\n\nWelche Zeit passt?',
          patientResponse: '14 Uhr mit Lisa klingt perfekt',
          aiConfirm: '✅ Gebucht! Haarschnitt + Strähnchen mit Lisa\n\nFreitag, 10. Jan um 14:00 Uhr\nDauer: 2 Stunden\nPreis: €145\n\nBestätigungs-Nr.: SL8293\n\nSie erhalten 1 Tag vorher eine Erinnerung.',
        },
      },
      benefits: {
        title: 'Warum Salons AgentBook lieben',
        items: [
          '💇 3x mehr Termine pro Tag',
          '📱 24/7 Buchung - verpassen Sie keine Kunden',
          '💰 50% weniger Ausfälle',
          '⏰ Sparen Sie 10+ Stunden/Woche bei Telefonaten',
          '😊 Zufriedenere Kunden, weniger Frust',
          '📊 Smarte Analysen zu beliebten Services',
        ],
      },
      cta: {
        title: 'Transformieren Sie Ihre Salon-Buchung',
        subtitle: 'Schließen Sie sich 500+ Salons mit KI-gesteuerter Terminplanung an',
        trial: 'Kostenlos testen',
        demo: 'Demo buchen',
      },
    },
  }

  const c = locale === 'de' ? content.de : content.en

  return (
    <main className="min-h-screen">
      {/* Similar structure as Medical page */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative h-32 w-32">
                <Image
                  src="/images/categories/salons.png"
                  alt="Salons"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {c.hero.subtitle}
            </p>
            <p className="mt-4 text-lg text-gray-500">
              {c.hero.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-lg bg-pink-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-pink-500 transition-all"
              >
                {c.cta.trial}
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-pink-600 transition-colors"
              >
                {c.cta.demo} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
            {c.problem.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.problem.points.map((point, idx) => (
              <div key={idx} className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">{point.title}</h3>
                <p className="text-red-700">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {c.solution.title}
            </h2>
            <p className="text-xl text-gray-600 italic">"{c.solution.description}"</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.solution.features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="rounded-lg border border-gray-200 bg-white p-6">
                  <Icon className="h-8 w-8 text-pink-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
            {c.demo.title}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="max-w-md rounded-lg bg-pink-600 text-white p-4">
                <p className="text-sm font-semibold mb-1">Client</p>
                <p>{c.demo.example.patient}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-md rounded-lg bg-gray-100 p-4">
                <p className="text-sm font-semibold mb-1 text-gray-900">AI Assistant</p>
                <p className="text-gray-700 whitespace-pre-line">{c.demo.example.ai}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-md rounded-lg bg-pink-600 text-white p-4">
                <p>{c.demo.example.patientResponse}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-md rounded-lg bg-green-100 border border-green-200 p-4">
                <p className="text-sm font-semibold mb-1 text-green-900">AI Assistant</p>
                <p className="text-green-800 whitespace-pre-line">{c.demo.example.aiConfirm}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
            {c.benefits.title}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.benefits.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pink-600 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {c.cta.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-pink-100">
            {c.cta.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-pink-600 shadow-sm hover:bg-gray-100 transition-all"
            >
              {c.cta.trial}
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-pink-100 transition-colors"
            >
              {c.cta.demo} <span aria-hidden="true">→</span>
              </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

