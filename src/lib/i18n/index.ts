import { de } from './de'
import { en } from './en'

export type Locale = 'en' | 'de'

const translations = {
  en,
  de,
}

export function getTranslations(locale: Locale = 'en') {
  return translations[locale] || translations.en
}

export { de, en }
export type { Translation } from './de'

