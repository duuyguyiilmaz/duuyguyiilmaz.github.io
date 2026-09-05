import type { ReactNode } from 'react'

type SkillGroupButtonProps = {
  children: ReactNode
  /** 1-4, picks the shade from the ramp in index.css. */
  tone: number
}

/*
 * The hero's button shape reused for the skill groups, one size down and
 * without the link. It is a label, not a control: no href, no tab stop, and
 * nothing written in the disc - an arrow or a count would promise a page or a
 * meaning that is not there. The disc is a plain mark, and its travel on hover
 * is the whole point of it.
 *
 * It sizes to its own text rather than filling the column, so "Languages" stays
 * short and only "Tools & Technologies" runs long.
 *
 * Sizes worth keeping in step if this changes:
 *   disc      2.25rem (size-9), inset 0.25rem from the edge
 *   travel    calc(100% - 2.5rem)  =  disc width + that inset
 *   padding   the crowded side always reserves 3rem for the disc
 *
 * Colour comes from --tone / --on-tone, set by the .tone-N class. Everything
 * that moves is behind motion-safe.
 */
export default function SkillGroupButton({ children, tone }: SkillGroupButtonProps) {
  return (
    <span
      className={`tone-${tone} group relative inline-flex h-11 items-center overflow-hidden rounded-full bg-(--tone) pl-5 text-sm font-medium whitespace-nowrap text-(--on-tone) pr-12 motion-safe:transition-[padding] motion-safe:duration-500 motion-safe:hover:pr-5 motion-safe:hover:pl-12`}
    >
      <span className="relative z-10">{children}</span>

      <span
        aria-hidden
        className="absolute top-1 right-1 size-9 rounded-full bg-(--on-tone) motion-safe:transition-all motion-safe:duration-500 motion-safe:group-hover:right-[calc(100%-2.5rem)]"
      />
    </span>
  )
}
