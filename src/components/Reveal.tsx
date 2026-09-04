import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { reveal } from '../motion'

type RevealProps = {
  children: ReactNode
  /** Position in a list; drives the stagger delay. */
  index?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'aside'
}

/**
 * Wraps a block so it arrives as it enters the viewport. Under reduced motion
 * the whole thing collapses to plain, already-visible markup: no travel, no
 * fade, no delay. That is the point of the wrapper, so nothing downstream has
 * to remember to check.
 */
export default function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reveal.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={{ ...reveal.transition, delay: reveal.stagger(index) }}
    >
      {children}
    </Component>
  )
}
