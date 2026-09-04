import { useEffect, useState, type ReactNode } from 'react'
import type { Lang } from './data/site'
import { DEFAULT_LANG, LanguageContext, STORAGE_KEY } from './lang'

function storedLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'tr' || stored === 'en' ? stored : DEFAULT_LANG
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(storedLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(next: Lang) {
    setLangState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (value) => value[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
