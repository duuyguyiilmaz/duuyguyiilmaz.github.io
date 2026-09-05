import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'
import { useRef, useState, type ReactNode } from 'react'
import { useLang } from '../lang'
import { person, ui } from '../data/site'
import { EnvelopeSimple, GithubLogo, ICON_WEIGHT, LeetCodeLogo, LinkedinLogo } from '../icons'
import { tick } from '../sound'

/* Icons grow near the cursor while the navigation row keeps a fixed height. */
const RESTING = 22
const MAGNIFIED = 32
/** How far from an icon the cursor still lifts it. */
const REACH = 88
const SPRING: SpringOptions = { mass: 0.1, stiffness: 170, damping: 14 }

/*
 * The glyph is stored as a ready-made element rather than as a component, so
 * Phosphor's icons and the vendored LeetCode mark can sit in one list without a
 * shared prop signature. Each is created with `size-full` so the dock sizes it
 * through CSS.
 */
type Account = {
  id: string
  label: string
  href: string
  icon: ReactNode
}

function AccountItem({
  account,
  mouseX,
  reduced,
}: {
  account: Account
  mouseX: MotionValue<number>
  reduced: boolean | null
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [labelShown, setLabelShown] = useState(false)

  /*
   * Read straight off the motion value: putting the pointer position in React
   * state would re-render the whole row on every mouse move and stutter.
   */
  const offset = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return REACH * 2
    return x - rect.x - rect.width / 2
  })

  const target = useTransform(offset, [-REACH, 0, REACH], [RESTING, MAGNIFIED, RESTING])
  const size = useSpring(target, SPRING)
  const external = account.href.startsWith('http')

  return (
    <a
      ref={ref}
      href={account.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={account.label}
      /*
       * One tick as the cursor arrives on this icon, so sweeping the dock
       * sounds like passing over detents. Mouse only: on a touchscreen this
       * fires on the tap that follows the link, which would be a click sound
       * for leaving the page. Nothing plays once the cursor is off the dock.
       */
      onPointerEnter={(event) => event.pointerType === 'mouse' && tick()}
      onMouseEnter={() => setLabelShown(true)}
      onMouseLeave={() => setLabelShown(false)}
      onFocus={() => setLabelShown(true)}
      onBlur={() => setLabelShown(false)}
      className="relative flex h-11 min-w-11 items-center justify-center px-0.5 md:h-8 md:min-w-0 text-label-secondary transition-colors hover:text-label focus-visible:text-label"
    >
      <motion.span
        className="flex items-center justify-center"
        style={reduced ? { width: RESTING, height: RESTING } : { width: size, height: size }}
      >
        {account.icon}
      </motion.span>

      {/* Labels appear below the icons to stay within the viewport. */}
      <AnimatePresence>
        {labelShown && (
          <motion.span
            initial={reduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            role="tooltip"
            className="glass text-caption pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full px-2.5 py-1 whitespace-nowrap text-label"
          >
            {account.label}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  )
}

/**
 * The accounts a visitor might want to reach me through, in the empty stretch
 * of the nav. Anything without a URL in `site.ts` is filtered out here, so a
 * half-filled account never ships as a link to nowhere.
 */
export default function AccountDock({ className = '' }: { className?: string }) {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  const accounts: Account[] = [
    {
      id: 'github',
      label: 'GitHub',
      href: person.github,
      icon: <GithubLogo className="size-full" weight={ICON_WEIGHT} />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: person.linkedin,
      icon: <LinkedinLogo className="size-full" weight={ICON_WEIGHT} />,
    },
    {
      id: 'leetcode',
      label: 'LeetCode',
      href: person.leetcode,
      icon: <LeetCodeLogo className="size-full" />,
    },
    {
      id: 'email',
      label: t(ui.emailLabel),
      href: person.email ? `mailto:${person.email}` : '',
      icon: <EnvelopeSimple className="size-full" weight={ICON_WEIGHT} />,
    },
  ].filter((account) => account.href)

  if (accounts.length === 0) return null

  return (
    <div
      role="group"
      aria-label={t(ui.accountsLabel)}
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={`flex items-end gap-0.5 ${className}`}
    >
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} mouseX={mouseX} reduced={reduced} />
      ))}
    </div>
  )
}
