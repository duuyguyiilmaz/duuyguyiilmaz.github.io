import type { Localized } from './site'

export type Experience = {
  slug: string
  /** Shown as written, e.g. "Jul - Aug 2026". Keep it short. */
  period: Localized
  organization: string
  role: Localized
  /** One to three bullets: what you actually did, not the job description. */
  highlights: Localized[]
  tags: string[]
}

/**
 * TODO (Duygu): this entry is a placeholder so the page has something to show.
 * Replace `organization` and the second highlight with the real internship
 * before this goes public - "Company name" on a live portfolio reads worse than
 * no experience page at all.
 *
 * Emptying this array is also fine: the page falls back to a written message
 * instead of rendering a blank rail.
 */
export const experiences: Experience[] = [
  {
    slug: 'internship-2026',
    period: { en: 'Summer 2026', tr: '2026 Yaz' },
    organization: 'Company name',
    role: { en: 'Software Engineering Intern', tr: 'Yazılım Mühendisliği Stajyeri' },
    highlights: [
      {
        en: 'Worked on the React frontend of a travel assistant, wiring the interface to a .NET API.',
        tr: 'Bir seyahat asistanının React arayüzünde çalıştım, arayüzü .NET API\'sine bağladım.',
      },
      {
        en: 'Replace this line with a specific thing you built or fixed.',
        tr: 'Bu satırı yaptığın ya da düzelttiğin somut bir şeyle değiştir.',
      },
    ],
    tags: ['React', 'TypeScript', '.NET'],
  },
]
