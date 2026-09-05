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

/** Button-styled link with press feedback, used on the not-found page. */
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
