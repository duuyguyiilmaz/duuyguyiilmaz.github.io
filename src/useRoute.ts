import { useEffect, useState } from 'react'
import { pages } from './data/site'

const ids = pages.map((page) => page.id)
const fallback = ids[0]

/** The route id for an unknown address. Not a page in `pages`, so it never appears in the nav. */
export const NOT_FOUND = 'not-found'

/*
 * Only `#/something` is a route. A bare `#anchor` is an in-page jump (the skip
 * link uses one) and must leave the current page alone, which is why this
 * returns null for those rather than falling through to a page id.
 *
 * A `#/` address that matches no page resolves to NOT_FOUND rather than quietly
 * showing About: a visitor following a stale link deserves to know it was stale.
 */
function currentRoute(): string | null {
  const hash = window.location.hash
  if (!hash || hash === '#') return fallback
  if (!hash.startsWith('#/')) return null

  const id = hash.slice(2)
  if (!id) return fallback
  return ids.includes(id) ? id : NOT_FOUND
}

/**
 * Routing through the hash rather than the History API: it needs no server
 * rewrite rule, so the same build works on GitHub Pages, Cloudflare or anywhere
 * else. Back/forward and shareable links (`.../#/projects`) still work.
 *
 * Returns the active route and the direction of the last change (1 = moved
 * right in the nav, -1 = left), so pages can enter from the side they live on.
 */
export function useRoute() {
  const [route, setRoute] = useState(() => currentRoute() ?? fallback)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    function onHashChange() {
      setRoute((previous) => {
        const next = currentRoute()
        if (next === null || next === previous) return previous

        setDirection(Math.sign(ids.indexOf(next) - ids.indexOf(previous)))
        return next
      })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* Only on a real page change, so the skip link's jump is not scrolled away. */
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return { route, direction }
}
