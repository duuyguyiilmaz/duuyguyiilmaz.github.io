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
      className="relative grid size-7 shrink-0 place-items-center rounded-full text-label-secondary transition-colors hover:bg-fill hover:text-label"
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
            className="text-caption relative rounded-full px-2 py-1 uppercase sm:px-2.5"
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

/**
 * The portrait stands in for the wordmark. At this size a face is read faster
 * than a name, and it costs a fraction of the row - so unlike the wordmark it
 * stays on at phone widths too.
 *
 * 32px is the tallest thing the row already contains (a nav pill is 14px of
 * text plus its padding), so the plate is as large as it can be without the
 * bar growing around it.
 *
 * On hover it lifts, the way the avatar-group component does, but by 3px
 * rather than the published 10: this sits inside a 48px bar, and a plate that
 * jumps out of its own row reads as a glitch. No label - the name is on the
 * page it leads to, and `aria-label` still says it for a screen reader.
 *
 * Until a file is dropped at public/avatar.png the plate holds its place empty
 * rather than showing a broken-image icon.
 */
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
      className="relative size-8 shrink-0 rounded-full bg-fill"
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

/**
 * A floating pane rather than a bar pinned to the window edge - content passes
 * underneath it, and the ground shifting behind the glass as you scroll is what
 * makes it read as a material.
 *
 * It has to stay on one line at every width, so below `sm` the wordmark drops
 * to initials rather than letting the row wrap.
 */
export default function Nav({ route }: { route: string }) {
  const { t } = useLang()

  return (
    <header className="fixed inset-x-0 top-3 z-20 px-3 sm:top-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-3xl items-center justify-between gap-1 rounded-full py-2 pr-1.5 pl-3 sm:gap-3 sm:pr-2 sm:pl-5">
        <Portrait />

        {/*
         * Fills the gap the wordmark used to leave. Hidden below md: measured at
         * 640px the row overflows by a few pixels with the dock in it, and a nav
         * that wraps to two lines is worse than one without shortcuts. Below
         * that width the footer carries the same accounts.
         */}
        <AccountDock className="hidden md:flex" />

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-0.5">
            {pages.map((page) => {
              const selected = route === page.id
              return (
                <li key={page.id}>
                  <motion.a
                    href={`#/${page.id}`}
                    aria-current={selected ? 'page' : undefined}
                    whileTap={{ scale: 0.96 }}
                    transition={springs.press}
                    className={`relative block rounded-full px-2 py-1.5 text-sm whitespace-nowrap transition-colors sm:px-3 ${
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
          <LanguageControl />
          <ThemeControl />
        </div>
      </nav>
    </header>
  )
}
