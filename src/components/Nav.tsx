import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLang } from '../lang'
import { useTheme, type ThemeChoice } from '../theme'
import { pages, person, ui } from '../data/site'
import type { Lang, Localized } from '../data/site'
import { springs } from '../motion'
import { ICON_WEIGHT, Monitor, Moon, Sun } from '../icons'
import AccountDock from './AccountDock'

const languages: Lang[] = ['en', 'tr']

const themeIcons = { system: Monitor, light: Sun, dark: Moon }
const themeNames: Record<ThemeChoice, Localized> = {
  system: ui.themeSystem,
  light: ui.themeLight,
  dark: ui.themeDark,
}

/**
 * One button that steps through system, light and dark rather than a two-state
 * sun/moon flip. The flip has nowhere to put "follow my machine", which is the
 * state most people actually want and the one this site starts in.
 *
 * The icon crossfades in place: swapping the glyph instantly reads as a
 * flicker, and this is the only thing on screen that changed.
 */
function ThemeControl() {
  const { t } = useLang()
  const { choice, cycle } = useTheme()
  const reduced = useReducedMotion()
  const Icon = themeIcons[choice]

  return (
    <motion.button
      type="button"
      onClick={cycle}
      aria-label={`${t(ui.themeLabel)}: ${t(themeNames[choice])}`}
      title={`${t(ui.themeLabel)}: ${t(themeNames[choice])}`}
      whileTap={{ scale: 0.9 }}
      transition={springs.press}
      className="relative grid size-11 md:size-7 shrink-0 place-items-center rounded-full text-label-secondary transition-colors hover:bg-fill hover:text-label"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={choice}
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.7 }}
          transition={springs.press}
          className="absolute grid place-items-center"
        >
          <Icon size={16} weight={ICON_WEIGHT} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

/**
 * The selected pill travels to the new segment rather than blinking between
 * states, so the change reads as one object moving.
 */
function LanguageControl() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex shrink-0 rounded-full bg-fill p-0.5">
      <button
        type="button"
        onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
        aria-label={lang === 'en' ? 'Switch to Turkish' : '?ngilizceye ge?'}
        className="grid size-11 place-items-center rounded-full text-sm font-medium uppercase md:hidden"
      >
        {lang}
      </button>
      {languages.map((option) => {
        const selected = option === lang
        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={selected}
            whileTap={{ scale: 0.94 }}
            transition={springs.press}
            className="text-caption relative hidden rounded-full px-2.5 py-1 uppercase md:block"
          >
            {selected && (
              <motion.span
                layoutId="language-pill"
                transition={springs.ui}
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <span className={selected ? 'relative text-on-accent' : 'relative text-label-secondary'}>
              {option}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

/** Profile image linking to About; hide a failed image and keep its background. */
function Portrait() {
  const reduced = useReducedMotion()
  const [ok, setOk] = useState(true)

  return (
    <motion.a
      href={`#/${pages[0].id}`}
      aria-label={person.name}
      whileHover={reduced ? undefined : { y: -3, scale: 1.18 }}
      whileTap={{ scale: 0.94 }}
      transition={springs.press}
      /* No ring of ours: the artwork draws its own, and two would be a seam. */
      className="relative size-11 md:size-8 shrink-0 rounded-full bg-fill"
    >
      {ok && (
        <img
          src="/avatar.png"
          alt=""
          width={64}
          height={64}
          onError={() => setOk(false)}
          draggable={false}
          className="size-full rounded-full object-cover"
        />
      )}
    </motion.a>
  )
}

/** Fixed navigation with page links, account shortcuts, language and theme controls. */
export default function Nav({ route }: { route: string }) {
  const { t } = useLang()

  return (
    <header className="fixed inset-x-0 top-3 z-20 px-3 sm:top-4 sm:px-6">
      <nav className="glass mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-x-1 gap-y-2 rounded-3xl p-2 md:flex md:justify-between md:gap-3 md:rounded-full md:py-2 md:pr-2 md:pl-5">
        <Portrait />

        <ul className="col-span-2 flex min-w-0 items-center justify-end gap-0.5 md:order-2">
            {pages.map((page) => {
              const selected = route === page.id
              return (
                <li key={page.id}>
                  <motion.a
                    href={`#/${page.id}`}
                    aria-current={selected ? 'page' : undefined}
                    whileTap={{ scale: 0.96 }}
                    transition={springs.press}
                    className={`relative flex min-h-11 items-center justify-center rounded-full px-2 text-sm whitespace-nowrap transition-colors md:min-h-0 md:px-3 md:py-1.5 ${
                      selected ? 'text-label' : 'text-label-secondary hover:text-label'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={springs.ui}
                        className="absolute inset-0 rounded-full bg-fill"
                      />
                    )}
                    <span className="relative">{t(page.label)}</span>
                  </motion.a>
                </li>
              )
            })}
        </ul>
        <AccountDock className="col-span-2 md:order-1" />
        <div className="flex items-center justify-end gap-0.5 md:order-3 md:gap-2">
          <LanguageControl />
          <ThemeControl />
        </div>
      </nav>
    </header>
  )
}
