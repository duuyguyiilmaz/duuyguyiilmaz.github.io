import CoverflowCarousel from './CoverflowCarousel'

type ProjectShotProps = {
  shots: readonly string[]
  shape: 'phone' | 'window'
  /** The project's name, so the controls say which carousel they drive. */
  label: string
}

/*
 * The screenshots' own proportions, so a shot is never cropped or stretched:
 * 560x877 for the phone captures, 1400x683 for the web ones.
 */
const geometry = {
  phone: {
    aspect: 560 / 877,
    cardWidth: 'clamp(124px, 26vw, 168px)',
    /* The bezel is the frame; the screen keeps its own corner inside it. */
    cardClassName:
      'rounded-[1.75rem] border border-separator bg-(--color-label)/85 p-1.5 shadow-[0_18px_40px_-24px_var(--glass-shadow)]',
    imageClassName: 'rounded-[1.4rem]',
  },
  window: {
    aspect: 1400 / 683,
    cardWidth: 'clamp(230px, 54vw, 380px)',
    cardClassName:
      'rounded-2xl border border-separator shadow-[0_18px_40px_-24px_var(--glass-shadow)]',
    imageClassName: '',
  },
} as const

/**
 * The project's screenshots on a coverflow rail: the current one faces you,
 * the rest rake away behind it. Each card keeps the frame of the thing the
 * shot was taken on - a device outline for an app, a rounded pane for a web
 * app - because a screenshot without one reads as a picture pasted onto the
 * page rather than as software running.
 *
 * Nothing advances on its own. The reader drags, or uses the carets, the dots
 * or the arrow keys.
 *
 * `alt=""` throughout - the shots repeat what the summary beside them already
 * says, so a screen reader gets it once, in words.
 */
export default function ProjectShot({ shots, shape, label }: ProjectShotProps) {
  const { aspect, cardWidth, cardClassName, imageClassName } = geometry[shape]

  return (
    <CoverflowCarousel
      slides={shots.map((src) => ({ src, alt: '' }))}
      aspect={aspect}
      cardWidth={cardWidth}
      cardClassName={cardClassName}
      imageClassName={imageClassName}
      label={label}
      className="mx-auto w-full"
    />
  )
}
