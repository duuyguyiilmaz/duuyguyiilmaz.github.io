import { createContext, useContext } from 'react'

export const THEME_STORAGE_KEY = 'theme'

/**
 * Three states, not two. "system" is the default and it is a real choice: it
 * follows the reader's OS and keeps following it when they change it later. A
 * plain light/dark switch has no way to say "whatever my machine says".
 */
export type ThemeChoice = 'system' | 'light' | 'dark'

/** What "system" actually came out as, and the only thing the CSS ever sees. */
export type ResolvedTheme = 'light' | 'dark'

export const THEME_ORDER: ThemeChoice[] = ['system', 'light', 'dark']

export type ThemeValue = {
  choice: ThemeChoice
  resolved: ResolvedTheme
  setChoice: (choice: ThemeChoice) => void
  /** Advances system to light to dark and back around. */
  cycle: () => void
}

export const ThemeContext = createContext<ThemeValue | null>(null)

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside a ThemeProvider')
  return value
}
