import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { springs } from '../motion'
import { ArrowUpRight, ICON_WEIGHT } from '../icons'

/*
 * The hero's single call to action. On hover the padding swaps sides while the
 * icon disc travels from the right edge to the left and turns, so the button
 * reads as one object rearranging itself rather than as a label with a
 * decoration stuck to it.
 *
 * Sizes worth keeping in step if this ever changes:
 *   disc      3rem (size-12), inset 0.25rem from the edge
 *   travel    calc(100% - 3.25rem)  =  disc width + that inset
 *   padding   the crowded side always reserves 4rem for the disc
 *
 * Everything is gated behind motion-safe. Under reduced motion the disc stays
 * where it is instead of snapping across, which is the point: an instant jump
 * is still motion.
 */
export default function HeroCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.98 }}
      transition={springs.press}
      className="group relative inline-flex h-14 items-center overflow-hidden rounded-full bg-accent pl-8 text-base font-medium whitespace-nowrap text-on-accent pr-16 motion-safe:transition-[padding] motion-safe:duration-500 motion-safe:hover:pr-8 motion-safe:hover:pl-16"
    >
      <span className="relative z-10">{children}</span>

      <span
        aria-hidden
        className="absolute top-1 right-1 grid size-12 place-items-center rounded-full bg-on-accent text-accent motion-safe:transition-all motion-safe:duration-500 motion-safe:group-hover:right-[calc(100%-3.25rem)] motion-safe:group-hover:rotate-45"
      >
        <ArrowUpRight size={18} weight={ICON_WEIGHT} />
      </span>
    </motion.a>
  )
}
