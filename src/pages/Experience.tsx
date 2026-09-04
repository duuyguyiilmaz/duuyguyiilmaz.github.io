import { useLang } from '../lang'
import { pages, ui } from '../data/site'
import { experiences } from '../data/experience'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

/**
 * A timeline, not another stack of glass cards. Projects already uses panes;
 * repeating them here would make the two pages read as the same page with
 * different words. The period sits in its own column in the mono face so the
 * dates line up down the rail, and one hairline per entry does the separating.
 */
export default function Experience() {
  const { t } = useLang()

  return (
    <div>
      <PageHeader title={t(pages[2].label)} lead={t(ui.experienceLead)} />

      {experiences.length === 0 ? (
        <p className="text-body-lg max-w-[52ch] text-label-secondary">{t(ui.experienceEmpty)}</p>
      ) : (
        <div className="divide-y divide-separator border-t border-separator">
          {experiences.map((entry, index) => (
            <Reveal
              key={entry.slug}
              index={index}
              as="article"
              className="grid gap-4 py-9 sm:grid-cols-[9rem_1fr] sm:gap-10"
            >
              <p className="text-meta pt-1.5 text-label-tertiary sm:text-right">{t(entry.period)}</p>

              <div>
                <h2 className="text-heading text-label">{t(entry.role)}</h2>
                <p className="mt-1 text-sm font-medium text-accent">{entry.organization}</p>

                <ul className="mt-5 space-y-2.5 text-label-secondary">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight.en} className="leading-relaxed">
                      {t(highlight)}
                    </li>
                  ))}
                </ul>

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
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
