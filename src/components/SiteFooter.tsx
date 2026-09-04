import { useLang } from '../lang'
import { person, ui } from '../data/site'

/**
 * Contact used to be a full block here with a heading and a filled button. The
 * nav dock already carries the same four accounts, so the button was the second
 * ask on the page for the same thing and it went.
 *
 * What stays is the part the icons cannot say: that I am looking for work. The
 * address stays too, spelled out rather than hidden behind an envelope, because
 * below 768px the dock is hidden and this is the only place it appears.
 */
export default function SiteFooter() {
  const { t } = useLang()

  const accounts = [
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
    { label: 'LeetCode', href: person.leetcode },
  ].filter((account) => account.href)

  return (
    <footer className="glass-thick mt-28 mb-6 rounded-[1.75rem] px-8 py-7 sm:px-10">
      <p className="max-w-[60ch] text-label-secondary">
        {t(ui.contactLead)}{' '}
        <a
          href={`mailto:${person.email}`}
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {person.email}
        </a>
      </p>

      <div className="text-caption mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-separator pt-5 text-label-tertiary">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>

        <ul className="ml-auto flex flex-wrap gap-x-4 gap-y-1">
          {accounts.map((account) => (
            <li key={account.label}>
              <a
                href={account.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-label"
              >
                {account.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
