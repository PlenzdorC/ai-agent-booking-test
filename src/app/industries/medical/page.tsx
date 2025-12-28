'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, Users, CheckCircle, MessageSquare, Bell } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function MedicalPage() {
  const { t, locale } = useLanguage()
  
  const content = {
    en: {
      hero: {
        title: 'AI-Powered Booking for Healthcare',
        subtitle: 'Let Your Patients Book Appointments Through ChatGPT',
        description: 'Modern healthcare scheduling that works 24/7 through AI assistants',
      },
      problem: {
        title: 'The Challenge in Healthcare Scheduling',
        points: [
          { title: 'Phone Tag Frustration', desc: 'Patients wait on hold, receptionists overwhelmed' },
          { title: 'After-Hours Missed Opportunities', desc: 'No bookings possible outside office hours' },
          { title: 'No-Shows & Cancellations', desc: 'Last-minute cancellations leave gaps in your schedule' },
          { title: 'Manual Coordination', desc: 'Staff spends hours managing appointments instead of patient care' },
        ],
      },
      solution: {
        title: 'AI-Native Booking for Modern Healthcare',
        description: 'Patients simply ask ChatGPT or Claude: "Book me a checkup with Dr. Smith next Tuesday"',
        features: [
          { icon: MessageSquare, title: 'Natural Language Booking', desc: 'Patients book in seconds through AI chat' },
          { icon: Calendar, title: 'Smart Scheduling', desc: 'Auto-detect conflicts, buffer times, and availability' },
          { icon: Bell, title: 'Automatic Reminders', desc: 'Reduce no-shows with intelligent notifications' },
          { icon: Users, title: 'Multi-Provider Support', desc: 'Manage multiple doctors and specialists' },
        ],
      },
      demo: {
        title: 'See It In Action',
        example: {
          patient: 'I need a dental checkup next week',
          ai: 'I found Dr. Mueller\'s practice in Berlin. Available slots:\n• Tuesday, Jan 7 at 2:00 PM\n• Wednesday, Jan 8 at 10:00 AM\n• Thursday, Jan 9 at 3:30 PM\n\nWhich time works for you?',
          patientResponse: 'Tuesday at 2pm please',
          aiConfirm: '✅ Booked! Your dental checkup with Dr. Mueller is confirmed for Tuesday, January 7 at 2:00 PM.\n\nConfirmation #: MD7821\nAddress: Dental Practice, Berlin\n\nYou\'ll receive a reminder 24 hours before.',
        },
      },
      benefits: {
        title: 'Why Healthcare Providers Choose AgentBook',
        items: [
          '📈 40% reduction in no-shows with AI reminders',
          '⏰ 24/7 booking availability',
          '🎯 70% less time spent on phone scheduling',
          '😊 Higher patient satisfaction scores',
          '💰 Fill last-minute cancellations automatically',
          '🔒 HIPAA-compliant and secure',
        ],
      },
      cta: {
        title: 'Start Your Free Trial Today',
        subtitle: 'Join forward-thinking healthcare providers',
        trial: 'Start Free 30-Day Trial',
        demo: 'Schedule a Demo',
      },
    },
    de: {
      hero: {
        title: 'KI-gestützte Terminbuchung für Gesundheitswesen',
        subtitle: 'Lassen Sie Ihre Patienten Termine über ChatGPT buchen',
        description: 'Moderne Gesundheitsplanung, die 24/7 über KI-Assistenten funktioniert',
      },
      problem: {
        title: 'Die Herausforderung bei der Terminplanung im Gesundheitswesen',
        points: [
          { title: 'Telefon-Frust', desc: 'Patienten warten in der Warteschleife, Empfangspersonal überlastet' },
          { title: 'Verpasste Chancen nach Feierabend', desc: 'Keine Buchungen außerhalb der Öffnungszeiten möglich' },
          { title: 'Ausfälle & Stornierungen', desc: 'Kurzfristige Absagen hinterlassen Lücken im Zeitplan' },
          { title: 'Manuelle Koordination', desc: 'Personal verbringt Stunden mit Terminverwaltung statt Patientenbetreuung' },
        ],
      },
      solution: {
        title: 'KI-Native Buchung für modernes Gesundheitswesen',
        description: 'Patienten fragen einfach ChatGPT oder Claude: "Buche mir eine Untersuchung bei Dr. Schmidt nächsten Dienstag"',
        features: [
          { icon: MessageSquare, title: 'Natürliche Sprachbuchung', desc: 'Patienten buchen in Sekunden per KI-Chat' },
          { icon: Calendar, title: 'Intelligente Planung', desc: 'Automatische Erkennung von Konflikten, Pufferzeiten und Verfügbarkeit' },
          { icon: Bell, title: 'Automatische Erinnerungen', desc: 'Reduzieren Sie Ausfälle mit intelligenten Benachrichtigungen' },
          { icon: Users, title: 'Multi-Arzt-Unterstützung', desc: 'Verwalten Sie mehrere Ärzte und Spezialisten' },
        ],
      },
      demo: {
        title: 'Sehen Sie es in Aktion',
        example: {
          patient: 'Ich brauche einen Zahnarzttermin nächste Woche',
          ai: 'Ich habe die Praxis von Dr. Müller in Berlin gefunden. Verfügbare Termine:\n• Dienstag, 7. Jan um 14:00 Uhr\n• Mittwoch, 8. Jan um 10:00 Uhr\n• Donnerstag, 9. Jan um 15:30 Uhr\n\nWelche Zeit passt Ihnen?',
          patientResponse: 'Dienstag um 14 Uhr bitte',
          aiConfirm: '✅ Gebucht! Ihre Zahnuntersuchung bei Dr. Müller ist bestätigt für Dienstag, 7. Januar um 14:00 Uhr.\n\nBestätigungs-Nr.: MD7821\nAdresse: Zahnarztpraxis, Berlin\n\nSie erhalten 24 Stunden vorher eine Erinnerung.',
        },
      },
      benefits: {
        title: 'Warum Gesundheitsdienstleister AgentBook wählen',
        items: [
          '📈 40% weniger Ausfälle dank KI-Erinnerungen',
          '⏰ 24/7 Buchungsverfügbarkeit',
          '🎯 70% weniger Zeit für Telefontermine',
          '😊 Höhere Patientenzufriedenheit',
          '💰 Füllen Sie kurzfristige Absagen automatisch',
          '🔒 DSGVO-konform und sicher',
        ],
      },
      cta: {
        title: 'Starten Sie Ihre kostenlose Testversion',
        subtitle: 'Schließen Sie sich fortschrittlichen Gesundheitsanbietern an',
        trial: '30 Tage kostenlos testen',
        demo: 'Demo vereinbaren',
      },
    },
  }

  const c = locale === 'de' ? content.de : content.en

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative h-32 w-32">
                <Image
                  src="/images/categories/medical.png"
                  alt="Healthcare"
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
                className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
              >
                {c.cta.trial}
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                {c.cta.demo} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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

      {/* Solution Section */}
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
                  <Icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Example */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
            {c.demo.title}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="max-w-md rounded-lg bg-blue-600 text-white p-4">
                <p className="text-sm font-semibold mb-1">Patient</p>
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
              <div className="max-w-md rounded-lg bg-blue-600 text-white p-4">
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

      {/* Benefits */}
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

      {/* Final CTA */}
      <section className="bg-blue-600 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {c.cta.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            {c.cta.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm hover:bg-gray-100 transition-all"
            >
              {c.cta.trial}
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-blue-100 transition-colors"
            >
              {c.cta.demo} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

