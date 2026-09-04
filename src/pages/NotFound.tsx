import { useLang } from '../lang'
import { pages, ui } from '../data/site'
import PressableLink from '../components/PressableLink'
import { ArrowRight, ICON_WEIGHT } from '../icons'

/**
 * Reached only from a hash that matches no page. It is a dead end by
 * definition, so the one thing it owes the visitor is a way out.
 */
export default function NotFound() {
  const { t } = useLang()

  return (
    <div className="max-w-[52ch] py-10">
      <h1 className="text-title text-label">{t(ui.notFoundTitle)}</h1>
      <p className="text-body-lg mt-3 text-label-secondary">{t(ui.notFoundLead)}</p>

      <div className="mt-8">
        <PressableLink
          href={`#/${pages[0].id}`}
          icon={<ArrowRight size={16} weight={ICON_WEIGHT} />}
        >
          {t(ui.notFoundCta)}
        </PressableLink>
      </div>
    </div>
  )
}
