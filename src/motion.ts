import type { Transition } from 'motion/react'

/**
 * Apple expresses springs as damping ratio + response rather than
 * mass/stiffness/damping. Motion's `bounce` + `duration` maps to the same pair:
 * bounce 0 is critically damped (damping 1.0), duration is the response.
 *
 * Default to no overshoot. Bounce is reserved for motion that follows momentum
 * (a flick or a drag release) where overshoot reads as physical rather than
 * decorative.
 */
export const springs = {
  /** Move / reposition: damping 1.0, response 0.4 */
  ui: { type: 'spring', bounce: 0, duration: 0.4 },
  /** Press feedback, must feel immediate, so a shorter response. */
  press: { type: 'spring', bounce: 0, duration: 0.25 },
  /** Momentum-driven: damping ~0.8, response 0.4 */
  momentum: { type: 'spring', bounce: 0.2, duration: 0.4 },
  /** Drawer / sheet: damping ~0.8, response 0.3 */
  sheet: { type: 'spring', bounce: 0.2, duration: 0.3 },
} satisfies Record<string, Transition>

/**
 * Scroll reveal. The job is hierarchy, not decoration: an item arrives a beat
 * after the one above it, so the eye is handed the list in reading order
 * instead of meeting all of it at once. Deliberately small travel and a single
 * pass (`once: true`) - content that re-animates every time it scrolls back
 * into view is a distraction, not a reveal.
 */
export const reveal = {
  distance: 18,
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  /** Enough of the element on screen that the motion reads as intentional. */
  viewport: { once: true, amount: 0.25 },
  /** Per-index delay for lists. Capped so long lists don't crawl. */
  stagger: (index: number) => Math.min(index, 6) * 0.06,
} as const
