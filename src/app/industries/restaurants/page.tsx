'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, UtensilsCrossed, Clock, Users, CheckCircle, Calendar } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RestaurantsPage() {
  const { locale } = useLanguage()
  
  const content = locale === 'de' ? {
    hero: 'KI-Reservierungen für Restaurants',
    subtitle: 'Gäste reservieren über ChatGPT',
    cta: 'Kostenlos starten',
    demo: 'Demo buchen',
  } : {
    hero: 'AI Reservations for Restaurants',
    subtitle: 'Guests book tables through ChatGPT',
    cta: 'Start Free Trial',
    demo: 'Book Demo',
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-end mb-4"><LanguageSwitcher /></div>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <Image src="/images/categories/restaurants.png" alt="Restaurants" width={128} height={128} className="rounded-2xl" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">{content.hero}</h1>
            <p className="mt-6 text-xl text-gray-600">{content.subtitle}</p>
            <div className="mt-10 flex gap-x-6 justify-center">
              <Link href="/register" className="rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-500">
                {content.cta} <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link href="/demo" className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                {content.demo} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

