import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { springs } from '../motion'

type PressableLinkProps = {
  href: string
  children: ReactNode
  /** Rendered after the label, at the label's own size. */
  icon?: ReactNode
  className?: string
}

/**
 * The secondary button, used in the footer and on the not-found page. The hero
 * has its own larger one in HeroCta; there was a `secondary` and a `quiet`
 * variant here too, and both went unused once the hero dropped to a single
 * call to action.
 *
 * Accent-filled: cream on wine measures about 6.9:1 in light and the lifted
 * wine carries about 4.8:1 in dark, so the label stays readable in both without
 * a second accent entering the palette.
 *
 * Feedback fires on pointer-down (whileTap), not on click - waiting for release
 * to acknowledge a press is what makes an interface feel dead.
 *
 * Labels never wrap: a CTA that breaks onto a second line reads as a layout
 * bug, so keep them to two or three words.
 */
export default function PressableLink({
  href,
  children,
  icon,
  className = '',
}: PressableLinkProps) {
  const external = href.startsWith('http') || href.startsWith('mailto:')

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileTap={{ scale: 0.97 }}
      transition={springs.press}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium whitespace-nowrap text-on-accent transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      {icon}
    </motion.a>
  )
}
