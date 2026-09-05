import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'

type SkillMarqueeProps = {
  items: readonly string[]
  /** Odd rows drift left, even rows right, so the block does not read as one sheet sliding. */
  reverse?: boolean
}

/* Pixels per second. Slow enough to read a chip as it goes past. */
const speed = 26
const chipClass = 'rounded-full bg-fill px-3 py-1 text-sm whitespace-nowrap text-label-secondary'

function Chips({ items }: { items: readonly string[] }) {
  /* The trailing padding is the gap to the next copy; see the note in index.css. */
  return (
    <span className="flex shrink-0 gap-2 pr-2">
      {items.map((item) => (
        <span key={item} className={chipClass}>
          {item}
        </span>
      ))}
    </span>
  )
}

/**
 * One skill group as a loop that never stops.
 *
 * The track is the list repeated an even number of times, and the animation
 * shifts it by half its width - so the second half arrives exactly where the
 * first started and there is no seam. Half the track has to be at least as wide
 * as the visible row, or the loop runs out of chips before it comes round and
 * a gap crosses the screen; a short group like Languages is therefore repeated
 * more times than a long one, not fewer.
 *
 * Only the first copy is real content. The rest are hidden from screen readers
 * so the group is not read out four times over.
 *
 * Under reduced motion this is the wrapped row it has always been - every chip
 * visible at once, nothing moving, nothing clipped.
 */
export default function SkillMarquee({ items, reverse = false }: SkillMarqueeProps) {
  const reduced = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState({ copy: 0, frame: 0 })

  useEffect(() => {
    const frame = frameRef.current
    const copy = copyRef.current
    if (!frame || !copy || reduced) return

    const measure = () =>
      setWidth({
        copy: copy.getBoundingClientRect().width,
        frame: frame.getBoundingClientRect().width,
      })
    measure()

    /* Widths move with the font loading and with the viewport, not just on mount. */
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [items, reduced])

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={chipClass}>
            {item}
          </span>
        ))}
      </div>
    )
  }

  /* Copies per half of the track. Enough to cover the row, never fewer than one. */
  const perHalf = width.copy ? Math.max(1, Math.ceil(width.frame / width.copy)) : 1
  /* One cycle travels half the track, so that width sets the time. */
  const duration = (width.copy * perHalf) / speed

  return (
    /*
     * The mask fades both ends so chips dissolve at the edges instead of being
     * chopped by the overflow, which is what makes the loop read as endless.
     */
    <div
      ref={frameRef}
      className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]"
    >
      <div
        className="marquee-track flex w-max"
        data-direction={reverse ? 'reverse' : undefined}
        style={{ '--marquee-duration': duration ? `${duration}s` : undefined } as CSSProperties}
      >
        {Array.from({ length: perHalf * 2 }, (_, index) => (
          <div
            key={index}
            ref={index === 0 ? copyRef : undefined}
            aria-hidden={index === 0 ? undefined : true}
            className="flex shrink-0"
          >
            <Chips items={items} />
          </div>
        ))}
      </div>
    </div>
  )
}
