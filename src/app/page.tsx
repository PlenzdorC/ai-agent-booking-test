'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bot, Calendar, Zap, Shield, Clock, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
              <Bot className="mr-2 h-4 w-4" />
              {t.home.hero.badge}
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              {t.home.hero.title}
              <span className="block text-primary-600">{t.home.hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              {t.home.hero.description}
              <span className="block mt-2 font-semibold">{t.home.hero.descriptionBold}</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all"
              >
                {t.home.hero.ctaPrimary}
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                {t.home.hero.ctaSecondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">{t.home.features.title}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.home.features.subtitle}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Bot className="h-8 w-8 text-primary-600" />}
              title={t.home.features.aiNative.title}
              description={t.home.features.aiNative.description}
            />
            <Feature
              icon={<Zap className="h-8 w-8 text-primary-600" />}
              title={t.home.features.instantSetup.title}
              description={t.home.features.instantSetup.description}
            />
            <Feature
              icon={<Calendar className="h-8 w-8 text-primary-600" />}
              title={t.home.features.smartScheduling.title}
              description={t.home.features.smartScheduling.description}
            />
            <Feature
              icon={<Shield className="h-8 w-8 text-primary-600" />}
              title={t.home.features.secure.title}
              description={t.home.features.secure.description}
            />
            <Feature
              icon={<Clock className="h-8 w-8 text-primary-600" />}
              title={t.home.features.availability.title}
              description={t.home.features.availability.description}
            />
            <Feature
              icon={<Globe className="h-8 w-8 text-primary-600" />}
              title={t.home.features.yourDomain.title}
              description={t.home.features.yourDomain.description}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.home.howItWorks.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t.home.howItWorks.subtitle}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Step
              number="1"
              title={t.home.howItWorks.step1.title}
              description={t.home.howItWorks.step1.description}
            />
            <Step
              number="2"
              title={t.home.howItWorks.step2.title}
              description={t.home.howItWorks.step2.description}
            />
            <Step
              number="3"
              title={t.home.howItWorks.step3.title}
              description={t.home.howItWorks.step3.description}
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.home.useCases.title}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <UseCase image="/images/categories/medical.png" name={t.home.useCases.medical} />
            <UseCase image="/images/categories/salons.png" name={t.home.useCases.salons} />
            <UseCase image="/images/categories/restaurants.png" name={t.home.useCases.restaurants} />
            <UseCase image="/images/categories/legal.png" name={t.home.useCases.legal} />
            <UseCase image="/images/categories/consulting.png" name={t.home.useCases.consulting} />
            <UseCase image="/images/categories/fitness.png" name={t.home.useCases.fitness} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.home.cta.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-100">
            {t.home.cta.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              {t.home.cta.primary}
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-semibold leading-6 text-white hover:text-primary-100 transition-colors"
            >
              {t.home.cta.secondary} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">{t.home.footer.businesses}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white transition-colors">{t.common.signUp}</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">{t.common.demo}</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">{t.common.pricing}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.home.footer.developers}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-docs" className="hover:text-white transition-colors">{t.home.footer.apiDocs}</Link></li>
                <li><Link href="/api/ai/openapi.json" className="hover:text-white transition-colors">{t.home.footer.openApiSpec}</Link></li>
                <li><a href="https://github.com" className="hover:text-white transition-colors">{t.common.github}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.home.footer.aiAgents}</h3>
              <p className="text-gray-400 text-sm">
                {t.home.footer.aiAgentsText}{' '}
                <Link href="/ai-docs" className="text-primary-400 hover:text-primary-300">
                  {t.home.footer.apiDocs}
                </Link>
                {' '}or access our{' '}
                <Link href="/api/ai/openapi.json" className="text-primary-400 hover:text-primary-300">
                  {t.home.footer.openApiSpec}
                </Link>.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <div className="mb-4">
              <Link href="/privacy" className="text-gray-400 hover:text-white mx-3">{t.home.footer.privacy}</Link>
              <span className="text-gray-600">•</span>
              <Link href="/ai-docs" className="text-gray-400 hover:text-white mx-3">{t.home.footer.apiDocs}</Link>
            </div>
            <p>{t.home.footer.copyright}</p>
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

function UseCase({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all group">
      <div className="w-full h-32 relative overflow-hidden bg-gray-100">
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
      </div>
      <div className="p-4 w-full bg-white">
        <div className="text-sm font-semibold text-gray-900 text-center">{name}</div>
      </div>
    </div>
  )
}