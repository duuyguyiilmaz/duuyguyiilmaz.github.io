import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LanguageProvider } from './i18n'
import { ThemeProvider } from './ThemeProvider'
import { useLang } from './lang'
import { NOT_FOUND, useRoute } from './useRoute'
import { springs } from './motion'
import { ui } from './data/site'
import Nav from './components/Nav'
import SiteFooter from './components/SiteFooter'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import NotFound from './pages/NotFound'

const routes: Record<string, () => React.JSX.Element> = {
  about: About,
  projects: Projects,
  experience: Experience,
  [NOT_FOUND]: NotFound,
}

/**
 * First thing in the tab order and invisible until it is focused, so a keyboard
 * visitor can jump the nav instead of tabbing through it on every page.
 */
function SkipLink() {
  const { t } = useLang()

  return (
    <a
      href="#content"
      className="glass sr-only rounded-full px-5 py-2.5 text-sm font-medium text-label focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-20"
    >
      {t(ui.skipToContent)}
    </a>
  )
}

function Site() {
  const { route, direction } = useRoute()
  const reduced = useReducedMotion()
  const Page = routes[route] ?? About

  /*
   * Pages sit side by side in the nav, so they enter from the side they live on
   * and leave the way they came: the spatial relationship stays honest. Under
   * reduced motion this collapses to a cross-fade with no travel.
   */
  const offset = reduced ? 0 : 24 * (direction || 1)

  return (
    <div className="relative min-h-[100dvh] text-label">
      {/*
       * Fixed, so content travels across it and the colour behind the glass
       * changes. The grain rides on this layer for the same reason: it never
       * scrolls, so it never triggers a repaint.
       */}
      <div aria-hidden className="ground fixed inset-0 -z-10">
        <div className="ground-grain" />
      </div>

      <SkipLink />
      <Nav route={route} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Enough to clear the floating nav and no more: a hero that starts halfway down reads as a bug. */}
        {/*
         * tabIndex -1 so the skip link can actually move focus here. Without it
         * the browser scrolls but leaves focus on <body>, and the next Tab goes
         * straight back to the nav the visitor just asked to skip.
         */}
        <main id="content" tabIndex={-1} className="pt-24 sm:pt-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={route}
              initial={{ opacity: 0, x: offset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -offset }}
              transition={springs.sheet}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Site />
      </LanguageProvider>
    </ThemeProvider>
  )
}
