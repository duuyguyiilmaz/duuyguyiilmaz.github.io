import { useLang } from '../lang'
import { person, ui } from '../data/site'

/** Contact details and account links, also available when the nav dock is hidden. */
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
