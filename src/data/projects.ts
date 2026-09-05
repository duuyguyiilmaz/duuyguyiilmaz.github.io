import type { Localized } from './site'

export type Project = {
  /** Stable key for React lists. */
  slug: string
  year: number
  repo: string
  /** Optional live demo; omit if there is none. */
  demo?: string
  tags: string[]
  /**
   * Square logo under `public/projects/`, referenced by URL rather than
   * imported: these are the projects' own marks, not this site's artwork, and
   * keeping them out of the bundle means swapping one is dropping in a file.
   * Omit it and the card simply has no plate.
   */
  logo?: string
  /**
   * Screenshots of the thing running, under `public/projects/`. They sit on a
   * carousel the reader moves themselves, in this order, so it is worth putting
   * them in the order someone would meet the app. `shape` picks the frame and
   * the shot's proportions: a phone gets a device outline, a web app a rounded
   * pane. Omit `shots` and the project keeps the text-only layout.
   */
  shots?: string[]
  shape?: 'phone' | 'window'
  title: string
  summary: Localized
  /** Shown first, above the rest of the list. */
  featured?: boolean
}

/**
 * Add a project by appending an object here. The Projects page renders this
 * array in order, one full-width card each - so the order below is the order
 * on the page.
 *
 * `summary` says what the project does and what it is for. The stack belongs
 * in `tags` and in the repo; a paragraph of technology names tells a reader
 * nothing about the project that the README does not tell them better.
 */
export const projects: Project[] = [
  {
    slug: 'pusulai',
    year: 2026,
    repo: 'https://github.com/mertosmanayhan/PusulAI',
    tags: ['.NET 9', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    logo: '/projects/pusulai.png',
    /* Chat driving a flight search, then hotels, plans, reservations, admin. */
    shots: [
      '/projects/pusulai-1.webp',
      '/projects/pusulai-2.webp',
      '/projects/pusulai-3.webp',
      '/projects/pusulai-4.webp',
      '/projects/pusulai-5.webp',
    ],
    shape: 'window',
    title: 'PusulAI',
    featured: true,
    summary: {
      en: 'A travel assistant, built as a team project. You describe the trip you want in your own words and it plans it: finds the flights and the hotels, puts an itinerary together, and carries you through to booking. The aim is to make planning a trip one conversation instead of a dozen open tabs.',
      tr: 'Ekip projesi olarak yapılmış bir seyahat asistanı. İstediğin geziyi kendi cümlelerinle anlatıyorsun, o planlıyor: uçuşları ve otelleri buluyor, bir program çıkarıyor ve rezervasyona kadar götürüyor. Amaç, bir geziyi planlamayı onlarca açık sekmeden çıkarıp tek bir konuşmaya indirmek.',
    },
  },
  {
    slug: 'campusnote',
    year: 2026,
    repo: 'https://github.com/duuyguyiilmaz/CampusNote',
    tags: ['Kotlin', 'Android', 'Firebase', 'Firestore'],
    logo: '/projects/campusnote.png',
    /* The app in order: splash, onboarding, sign-in, validation, department
     * picker, the locked feed, upload, leaderboard. */
    shots: [
      '/projects/campusnote-1.webp',
      '/projects/campusnote-2.webp',
      '/projects/campusnote-3.webp',
      '/projects/campusnote-4.webp',
      '/projects/campusnote-5.webp',
      '/projects/campusnote-6.webp',
      '/projects/campusnote-7.webp',
      '/projects/campusnote-8.webp',
    ],
    shape: 'phone',
    title: 'CampusNote',
    featured: true,
    summary: {
      en: 'An Android app for sharing lecture notes inside a university department, built on one rule: the feed stays locked until you upload a note of your own. The aim is an archive that keeps growing, because everyone reading from it has also put something into it.',
      tr: 'Üniversite bölümü içinde ders notu paylaşmak için bir Android uygulaması, tek bir kural üzerine kurulu: kendi notunu yüklemeden akış açılmıyor. Amaç, okuyan herkesin aynı zamanda bir şey koyduğu için büyümeye devam eden bir arşiv.',
    },
  },
]
