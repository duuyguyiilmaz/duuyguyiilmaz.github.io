import { useLang } from '../lang'
import { pages, ui } from '../data/site'
import { experiences, type Experience as Entry } from '../data/experience'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

/**
 * LinkedIn's shape: the company mark on the left, and against it a stack that
 * reads role, then company, then when, then where, then what you did. That
 * order is worth copying - it answers the reader's questions in the order they
 * ask them - but the styling stays this site's, so the page does not look like
 * a screenshot of somewhere else.
 */
function LogoPlate({ entry }: { entry: Entry }) {
  if (entry.logo) {
    return (
      <img
        src={entry.logo}
        alt=""
        width={128}
        height={128}
        loading="lazy"
        className={`size-16 shrink-0 rounded-xl bg-white object-contain sm:size-20 ${
          entry.logoFramed ? 'ring-2 ring-white' : ''
        }`}
      />
    )
  }

  /* No logo yet: the initial on a tinted plate, rather than a broken image. */
  return (
    <div
      aria-hidden
      className="grid size-16 shrink-0 place-items-center rounded-xl bg-fill font-medium text-label-secondary sm:size-20"
    >
      {entry.organization.trim().charAt(0).toUpperCase()}
    </div>
  )
}

export default function Experience() {
  const { t } = useLang()

  return (
    <div>
      <PageHeader title={t(pages[2].label)} />

      {experiences.length === 0 ? (
        <p className="text-body-lg max-w-[52ch] text-label-secondary">{t(ui.experienceEmpty)}</p>
      ) : (
        <div className="divide-y divide-separator border-t border-separator">
          {experiences.map((entry, index) => (
            <Reveal key={entry.slug} index={index} as="article" className="flex gap-4 py-8 sm:gap-5">
              <LogoPlate entry={entry} />

              <div className="min-w-0">
                <h2 className="text-heading text-label">{t(entry.role)}</h2>

                {/*
                 * Company and employment type on one line, dates and length on
                 * the next, place on the third - the same three lines LinkedIn
                 * sets under a role, in the same order.
                 */}
                <p className="mt-1 text-sm text-label-secondary">
                  <span className="font-medium text-accent">{entry.organization}</span>
                  {entry.employment && <> · {t(entry.employment)}</>}
                </p>

                <p className="text-meta mt-1.5 text-label-tertiary">
                  {t(entry.period)}
                  {entry.duration && <> · {t(entry.duration)}</>}
                </p>

                {entry.location && (
                  <p className="text-meta mt-1 text-label-tertiary">{t(entry.location)}</p>
                )}

                <ul className="mt-5 space-y-2.5 text-label-secondary">
                  {entry.description.map((line) => (
                    <li key={line.en} className="leading-relaxed">
                      {t(line)}
                    </li>
                  ))}
                </ul>

                {entry.tags && entry.tags.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-caption rounded-full bg-fill px-2.5 py-1 text-label-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
