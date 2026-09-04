import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '../lang'
import { pages, ui } from '../data/site'
import { projects, type Project } from '../data/projects'
import { reveal, springs } from '../motion'
import PageHeader from '../components/PageHeader'
import { ArrowUpRight, ICON_WEIGHT } from '../icons'

/*
 * Tailwind only ships classes it can see as literal strings, so the spans are
 * written out rather than built from a number.
 */
const SPAN = {
  12: 'md:col-span-12',
  7: 'md:col-span-7',
  5: 'md:col-span-5',
} as const

type Cell = { project: Project; span: string; wide: boolean }

/**
 * Shapes the grid around however many projects exist, so it never leaves a
 * blank cell. Cards flow into 7/5 pairs that flip direction on each row, and an
 * odd one at the end spans the full width instead of sitting beside a hole.
 *
 * Nothing spans the full width just for being featured: a 1200px card holding
 * one column of text is mostly empty, which reads as a bug rather than as
 * emphasis. Featured entries earn their weight from the accent wash and the
 * larger title instead.
 */
function layout(ordered: Project[]): Cell[] {
  const cells: Cell[] = []
  const lastIsOdd = ordered.length % 2 === 1

  ordered.forEach((project, index) => {
    if (lastIsOdd && index === ordered.length - 1) {
      cells.push({ project, span: SPAN[12], wide: true })
      return
    }

    const row = Math.floor(index / 2)
    const first = index % 2 === 0
    const wideFirst = row % 2 === 0
    const span = first === wideFirst ? SPAN[7] : SPAN[5]

    cells.push({ project, span, wide: false })
  })

  return cells
}

/*
 * The card reveals on scroll, but hover and press keep their own timing: the
 * reveal easing is deliberately slow, and reusing it for feedback would make
 * every press feel like the page had stalled.
 */
function ProjectCard({ project, index, wide }: Cell & { index: number }) {
  const { t } = useLang()
  const reduced = useReducedMotion()

  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      initial={reduced ? false : { opacity: 0, y: reveal.distance }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={{ ...reveal.transition, delay: reveal.stagger(index) }}
      whileHover={reduced ? undefined : { y: -4, transition: springs.press }}
      whileTap={{ scale: 0.985, transition: springs.press }}
      className={`group flex h-full flex-col rounded-[1.75rem] p-7 sm:p-8 ${
        project.featured ? 'glass-thick card-wash' : 'glass'
      }`}
    >
      {/*
       * The full-width card puts the title and the summary in adjacent columns
       * so its right half carries text rather than air. Everything narrower
       * stacks them, which is also the mobile shape for both.
       */}
      <div className={wide ? 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10' : ''}>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className={project.featured ? 'text-title text-label' : 'text-heading text-label'}>
            {project.title}
          </h2>
          <span className="text-meta shrink-0 text-label-tertiary">{project.year}</span>
        </div>

        <p
          className={`mt-3 leading-relaxed text-label-secondary ${
            project.featured ? 'text-body-lg' : ''
          } ${wide ? 'md:mt-0' : ''}`}
        >
          {t(project.summary)}
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="text-caption rounded-full bg-fill px-2.5 py-1 text-label-secondary"
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* Pushed to the bottom so the affordance lines up across cards of different heights. */}
      <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
        {t(ui.viewSource)}
        <ArrowUpRight
          size={15}
          weight={ICON_WEIGHT}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </motion.a>
  )
}

export default function Projects() {
  const { t } = useLang()

  const ordered = [...projects].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year,
  )

  return (
    <div>
      <PageHeader title={t(pages[1].label)} lead={t(ui.projectsLead)} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {layout(ordered).map((cell, index) => (
          <div key={cell.project.slug} className={cell.span}>
            <ProjectCard {...cell} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
