import { useCallback, useEffect, useState, type ReactNode } from 'react'
import {
  THEME_ORDER,
  THEME_STORAGE_KEY,
  ThemeContext,
  type ResolvedTheme,
  type ThemeChoice,
} from './theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/* Must stay in step with --color-cream and --color-ink in index.css. */
const GROUND: Record<ResolvedTheme, string> = {
  light: '#f1ece6',
  dark: '#14110f',
}

/* localStorage throws in some private-browsing modes, so every touch is guarded. */
function storedChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    return 'system'
  }
}

function systemPrefersDark() {
  return window.matchMedia(DARK_QUERY).matches
}

/**
 * Owns the theme choice and writes the resolved value onto <html> as
 * data-theme, which is the only hook the stylesheet has. The matching inline
 * script in index.html does the same thing before React mounts; this provider
 * takes over from there and keeps them in agreement.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(storedChoice)
  const [systemIsDark, setSystemIsDark] = useState(systemPrefersDark)

  /* Following the OS means following it after load too, not just at load. */
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystemIsDark(event.matches)

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const resolved: ResolvedTheme = choice === 'system' ? (systemIsDark ? 'dark' : 'light') : choice

  useEffect(() => {
    document.documentElement.dataset.theme = resolved

    const meta = document.getElementById('theme-color')
    if (meta instanceof HTMLMetaElement) meta.content = GROUND[resolved]
  }, [resolved])

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* The choice still applies for this visit; it just will not be remembered. */
    }
  }, [])

  const cycle = useCallback(() => {
    setChoiceState((previous) => {
      const next = THEME_ORDER[(THEME_ORDER.indexOf(previous) + 1) % THEME_ORDER.length]
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* As above. */
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice, cycle }}>
      {children}
    </ThemeContext.Provider>
  )
}
