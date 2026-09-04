import { createContext, useContext } from 'react'
import type { Lang, Localized } from './data/site'

export const STORAGE_KEY = 'lang'
export const DEFAULT_LANG: Lang = 'en'

export type LanguageValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Picks the current language out of a Localized string. */
  t: (value: Localized) => string
}

export const LanguageContext = createContext<LanguageValue | null>(null)

export function useLang() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLang must be used inside a LanguageProvider')
  return value
}
