/*
 * One icon family for the whole site (Phosphor), imported one file at a time
 * rather than through the package barrel, which pulls in every glyph it ships.
 *
 * Weight is standardised at "regular" by the ICON_WEIGHT constant below. If a
 * glyph is missing, add it here - never hand-draw an SVG path in a component.
 */
export { ArrowRight } from '@phosphor-icons/react/dist/icons/ArrowRight'
export { ArrowUpRight } from '@phosphor-icons/react/dist/icons/ArrowUpRight'
export { CaretLeft } from '@phosphor-icons/react/dist/icons/CaretLeft'
export { CaretRight } from '@phosphor-icons/react/dist/icons/CaretRight'
export { GithubLogo } from '@phosphor-icons/react/dist/icons/GithubLogo'
export { LinkedinLogo } from '@phosphor-icons/react/dist/icons/LinkedinLogo'
export { EnvelopeSimple } from '@phosphor-icons/react/dist/icons/EnvelopeSimple'
export { Sun } from '@phosphor-icons/react/dist/icons/Sun'
export { Moon } from '@phosphor-icons/react/dist/icons/Moon'
export { Monitor } from '@phosphor-icons/react/dist/icons/Monitor'
export { default as LeetCodeLogo } from './components/LeetCodeLogo'

export const ICON_WEIGHT = 'regular' as const
