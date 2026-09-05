import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { CaretLeft, CaretRight, ICON_WEIGHT } from '../icons'

/* Shared by both carets; only the side differs. */
const caret =
  'absolute top-1/2 z-[200] grid size-9 -translate-y-1/2 place-items-center rounded-full ' +
  'bg-surface text-label ring-1 ring-separator shadow-[0_6px_18px_-6px_var(--glass-shadow)] ' +
  'outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent'

export type CoverflowSlide = {
  src: string
  alt: string
}

type CoverflowCarouselProps = {
  slides: readonly CoverflowSlide[]
  /** Card width over height. The frame's height is derived from it. */
  aspect: number
  /** Degrees the first neighbour tilts. */
  rotate?: number
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number
  /** Viewer distance as a multiple of card width - smaller is a wider lens. */
  perspective?: number
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number
  /** Opacity lost per step from the centre. */
  fade?: number
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string
  /** Space between cards, as a fraction of card width. */
  gap?: number
  /** Names the carousel for assistive tech. */
  label: string
  className?: string
  cardClassName?: string
  imageClassName?: string
}

/**
 * A coverflow rail: the current shot faces the reader, its neighbours rake away
 * to either side. Adapted from the 21st.dev component - the mechanism is the
 * original's, the chrome is this site's (Phosphor carets, the site's tokens,
 * no shadcn `cn`).
 *
 * It never advances on its own. Drag it, use the carets, the dots, or the
 * arrow keys; nothing moves until someone moves it. That is deliberate - a
 * screenshot that swaps itself out while you are reading it is a race.
 *
 * `alt` still belongs on every slide, but on this site the shots repeat what
 * the summary beside them says, so the callers pass "".
 */
export default function CoverflowCarousel({
  slides,
  aspect,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(148px, 22vw, 260px)',
  gap = 0.05,
  label,
  className,
  cardClassName,
  imageClassName,
}: CoverflowCarouselProps) {
  const count = slides.length
  const reduced = useReducedMotion()

  const frameRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = useRef(0)
  /** Where the current settle is headed. Stepping off `pos` instead would
      swallow a keypress that lands mid-flight, before the round-off moves. */
  const targetRef = useRef(0)
  const widthRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const dragRef = useRef<{ id: number; x: number; pos: number; v: number; t: number } | null>(null)

  const [selected, setSelected] = useState(0)

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  )

  /*
   * Paint straight to the DOM. Sixty state updates a second would re-render
   * every card for numbers React never needs to see.
   */
  const paint = useCallback(() => {
    const width = widthRef.current
    if (!width) return
    const pitch = width * (1 + gap)
    const pos = posRef.current

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      /*
       * Fold the distance into the shorter way round the ring. This is the
       * whole looping mechanism - no cloned nodes, no shuffling the DOM.
       */
      let offset = index - pos
      offset = ((offset % count) + count) % count
      if (offset > count / 2) offset -= count

      const distance = Math.abs(offset)
      /*
       * Both the tilt and the recession ease off as cards travel out -
       * doubling the distance adds only about half again as much of each. A
       * linear ramp folds the second card shut; this keeps it readable.
       */
      const ramp = Math.pow(distance, falloff)
      /* Capped short of edge-on so a far card never turns its back. */
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset)

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`

      /*
       * A card is teleported across the ring at exactly half a turn out, so it
       * has to be gone by then or the jump is visible.
       */
      const edge = Math.min(1, Math.max(0, count / 2 - distance))
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge)
      card.style.zIndex = String(100 - Math.round(distance))
    })
  }, [count, depth, fade, falloff, gap, rotate])

  const settle = useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      targetRef.current = target
      setSelected(indexAt(target))

      /* Reduced motion: land on the card, no glide. */
      if (reduced) {
        posRef.current = target
        paint()
        rafRef.current = null
        return
      }

      const step = () => {
        const remaining = target - posRef.current
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target
          paint()
          rafRef.current = null
          return
        }
        /* Exponential ease-out, not a spring: no overshoot wanted here. */
        posRef.current += remaining * 0.16
        paint()
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [indexAt, paint, reduced],
  )

  const goTo = useCallback(
    (index: number) => {
      /* Take the shorter way round rather than unwinding the whole ring. */
      settle(index + Math.round((targetRef.current - index) / count) * count)
    },
    [count, settle],
  )

  const nudge = useCallback(
    (by: number) => settle(Math.round(targetRef.current) + by),
    [settle],
  )

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    targetRef.current = posRef.current
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return

    const pitch = widthRef.current * (1 + gap)
    if (!pitch) return

    const now = performance.now()
    const previous = posRef.current
    posRef.current = drag.pos - (event.clientX - drag.x) / pitch
    /* Cards per second, for the throw. */
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000
    drag.t = now

    const index = indexAt(posRef.current)
    if (index !== selected) setSelected(index)
    paint()
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    /* Let a flick carry, but never more than two cards. */
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18))
    settle(Math.round(posRef.current + carried))
  }

  /*
   * Card width drives pitch, depth and perspective, so it is the only thing
   * worth measuring - and only when the box actually changes.
   */
  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const measure = () => {
      const card = cardRefs.current[0]
      if (!card) return
      widthRef.current = card.offsetWidth
      paint()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [paint])

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  return (
    <div
      className={className}
      style={{ '--cf-card': cardWidth } as React.CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              nudge(-1)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              nudge(1)
            }
          }}
          /* Vertical padding keeps the drop shadows clear of the overflow clip. */
          className="cursor-grab overflow-hidden py-8 outline-none focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            /* Horizontal drag is ours; the page keeps vertical scrolling. */
            touchAction: 'pan-y',
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: `calc(var(--cf-card) / ${aspect})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${count}`}
                className={`absolute top-0 left-1/2 overflow-hidden will-change-transform ${
                  cardClassName ?? ''
                }`}
                style={{ width: 'var(--cf-card)', aspectRatio: String(aspect) }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading={index === 0 ? undefined : 'lazy'}
                  className={`h-full w-full select-none object-cover ${imageClassName ?? ''}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/*
         * Opaque, not glass: these sit over the screenshots, and a translucent
         * button on a dark screenshot in dark mode disappears into it. A solid
         * surface plus a hairline ring keeps them readable on any shot.
         */}
        <button
          type="button"
          aria-label={`${label}: previous`}
          onClick={() => nudge(-1)}
          className={caret + ' left-0'}
        >
          <CaretLeft size={16} weight={ICON_WEIGHT} />
        </button>
        <button
          type="button"
          aria-label={`${label}: next`}
          onClick={() => nudge(1)}
          className={caret + ' right-0'}
        >
          <CaretRight size={16} weight={ICON_WEIGHT} />
        </button>
      </div>

      {/* One dash per shot, the current one in the accent - and each is a target. */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`${label}: ${index + 1} / ${count}`}
            aria-current={index === selected}
            onClick={() => goTo(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === selected ? 'w-5 bg-accent' : 'w-1.5 bg-label-tertiary'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
