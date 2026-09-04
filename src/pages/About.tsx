import { useLang } from '../lang'
import { pages, person, skillGroups, ui } from '../data/site'
import HeroCta from '../components/HeroCta'
import Reveal from '../components/Reveal'

/*
 * TODO (Duygu): drop a square portrait at src/assets/portrait.jpg, then
 *
 *   import portrait from '../assets/portrait.jpg'
 *
 * and pass it below. Until then the plate falls back to a monogram, which is a
 * deliberate placeholder rather than a broken image.
 */
const portrait: string | null = null

/**
 * The one image on the landing page. It carries the hero's right column, so it
 * has to hold its own at large sizes: a thick glass plate, the monogram set in
 * the mono face, and the ground showing through behind it.
 */
function PortraitPlate() {
  return (
    <div className="glass-thick card-wash relative aspect-square w-full overflow-hidden rounded-[1.75rem]">
      {portrait ? (
        <img
          src={portrait}
          alt={person.name}
          width={640}
          height={640}
          className="size-full object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <span
            aria-hidden
            className="font-mono text-[clamp(4rem,14vw,7.5rem)] leading-none font-extralight tracking-[-0.06em] text-label-tertiary"
          >
            {person.initials}
          </span>
        </div>
      )}
    </div>
  )
}

export default function About() {
  const { t } = useLang()

  return (
    <div>
      {/*
       * Hero, asymmetric split. Four text elements and no more: one metadata
       * line, the name, one short paragraph, the buttons. Everything longer
       * moves to the section below so the buttons stay above the fold.
       */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <div>
          <p className="text-caption uppercase text-label-secondary">
            {t(person.role)} · {t(person.location)}
          </p>

          <h1 className="text-display mt-5 text-label">{person.name}</h1>

          {/* Wider measure than the usual 46ch: at this length a narrow column runs to ten lines. */}
          <p className="mt-6 max-w-[64ch] leading-relaxed text-label-secondary">
            {t(person.intro)}
          </p>

          {/*
           * One button, not two. GitHub sits in the nav dock and in the footer
           * already, and a second pill next to this one would compete with the
           * only thing the hero is asking the reader to do.
           */}
          <div className="mt-8">
            <HeroCta href={`#/${pages[1].id}`}>{t(ui.projectsCta)}</HeroCta>
          </div>
        </div>

        {/*
         * Follows the text on phones: the name should be the first thing read,
         * and putting the plate first would push the buttons off the screen.
         */}
        <div className="mx-auto w-full max-w-[14rem] sm:max-w-[17rem] lg:mx-0 lg:ml-auto lg:max-w-[22rem]">
          <PortraitPlate />
        </div>
      </section>

      {/*
       * Skills as rows, not cards. Elevation would say these four groups sit
       * above the page, and they do not - a single hairline between them is
       * the whole hierarchy they need.
       */}
      <section className="mt-24 lg:mt-32">
        <h2 className="text-heading text-label">{t(ui.skillsTitle)}</h2>

        <dl className="mt-8 divide-y divide-separator border-t border-separator">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title.en}
              index={index}
              className="grid gap-3 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <dt className="text-sm font-medium text-label">{t(group.title)}</dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-fill px-3 py-1 text-sm text-label-secondary"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </div>
  )
}
