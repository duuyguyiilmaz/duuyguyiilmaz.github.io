import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '../lang'
import { pages, ui } from '../data/site'
import { projects, type Project } from '../data/projects'
import { reveal, springs } from '../motion'
import PageHeader from '../components/PageHeader'
import ProjectShot from '../components/ProjectShot'
import { ArrowUpRight, ICON_WEIGHT } from '../icons'

/*
 * The card reveals on scroll, but hover and press keep their own timing: the
 * reveal easing is deliberately slow, and reusing it for feedback would make
 * every press feel like the page had stalled.
 *
 * The card is not itself a link. The screenshots are a carousel now, and
 * buttons inside an anchor are invalid markup and a trap for anyone using a
 * keyboard - so the title and the source line carry the link instead.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang()
  const reduced = useReducedMotion()

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: reveal.distance }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={{ ...reveal.transition, delay: reveal.stagger(index) }}
      whileHover={reduced ? undefined : { y: -4, transition: springs.press }}
      className={`group flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7 ${
        project.featured ? 'glass-thick card-wash' : 'glass'
      }`}
    >
      {/*
       * Words on one side, the running app on the other. The image column is
       * the wider of the two: a screenshot shrunk to fit beside a paragraph
       * shows nothing, and showing it is the whole reason it is here. Phones
       * stack, text first.
       */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-12">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            {/*
             * The mark sits beside the title rather than under it: with a
             * screenshot in the next column, a second image stacked in this
             * one is one picture too many. The plate is white because these
             * are app marks drawn for a white ground. `alt=""` - the title
             * says the same thing, right next to it.
             */}
            {project.logo && (
              <img
                src={project.logo}
                alt=""
                width={256}
                height={256}
                loading="lazy"
                className="size-14 shrink-0 rounded-xl bg-white object-contain sm:size-16"
              />
            )}

            <h2 className={project.featured ? 'text-title text-label' : 'text-heading text-label'}>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.title}
              </a>
            </h2>

            <span className="text-meta ml-auto shrink-0 text-label-tertiary">{project.year}</span>
          </div>

          <p
            className={`mt-5 leading-relaxed text-label-secondary ${
              project.featured ? 'text-body-lg' : ''
            }`}
          >
            {t(project.summary)}
          </p>

          {/*
           * Tags and the link share one line rather than stacking into two: on
           * its own row the link was a third of the card's height for four
           * words.
           *
           * The row itself never wraps - the pill is `shrink-0` and holds the
           * right edge, and it is the tag list that runs onto a second line
           * when it runs out of room. Letting the row wrap instead dropped the
           * pill below the tags on the card with five of them and kept it
           * inline on the card with four, so the same link sat in two
           * different places down the page.
           */}
          <div className="mt-6 flex items-center justify-between gap-x-6">
            <ul className="flex min-w-0 flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-caption rounded-full bg-fill px-2.5 py-1 text-label-secondary"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="source-pill group/link flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t(ui.viewSource)}
              <ArrowUpRight
                size={17}
                weight={ICON_WEIGHT}
                className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {project.shots && project.shots.length > 0 && project.shape && (
          <ProjectShot shots={project.shots} shape={project.shape} label={project.title} />
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useLang()

  return (
    <div>
      {/* Title only: the cards say what they are, a lead would repeat them. */}
      <PageHeader title={t(pages[1].label)} />

      {/*
       * One card per row, in the order they are written in the data file. No
       * sort: with a short list, the order is a decision, not something to
       * derive from a year that two projects share anyway.
       */}
      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
