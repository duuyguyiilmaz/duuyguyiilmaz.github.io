import type { Localized } from './site'

export type Experience = {
  slug: string
  organization: string
  /**
   * Square logo under `public/experience/`. Without one the entry falls back to
   * a lettered plate, which is what LinkedIn does too.
   */
  logo?: string
  /**
   * Set on a logo that carries its own dark ground: the plate gets a white ring
   * so the mark stays a distinct object instead of bleeding into the page.
   */
  logoFramed?: boolean
  role: Localized
  /** Internship, Part-time, Full-time - whatever LinkedIn shows under the role. */
  employment?: Localized
  /** Shown as written, e.g. "Jul 2026 - Aug 2026". */
  period: Localized
  /** The bracketed length LinkedIn puts after the dates, e.g. "2 mos". */
  duration?: Localized
  /** Place and arrangement on one line, e.g. "Antalya, Türkiye · On-site". */
  location?: Localized
  /** The description, one entry per paragraph or bullet. */
  description: Localized[]
  /** Omit on a role with no stack to list; the row is dropped rather than left empty. */
  tags?: string[]
}

/**
 * Straight from LinkedIn. The English is Duygu's own text, word for word; the
 * Turkish is a translation of it.
 *
 *
 * Emptying this array is also fine: the page falls back to a written message
 * instead of rendering a blank rail.
 */
export const experiences: Experience[] = [
  {
    slug: 'san-tsg-2026',
    organization: 'SAN TSG',
    /* The wordmark is wide, so the file letterboxes it on the logo's own navy. */
    logo: '/experience/san-tsg.png',
    logoFramed: true,
    role: { en: 'Intern', tr: 'Stajyer' },
    employment: { en: 'Internship', tr: 'Stajyer' },
    period: { en: 'Jun 2026 - Jul 2026', tr: 'Haz 2026 - Tem 2026' },
    duration: { en: '2 mos', tr: '2 ay' },
    location: { en: 'Antalya, Türkiye', tr: 'Antalya, Türkiye' },
    description: [
      {
        en: 'During my internship at SAN TSG & Paximum, I worked as a Frontend Developer on the development of PusulAI, an AI-powered travel assistant designed to provide a conversational travel booking experience. I developed responsive and user-friendly interfaces using React, TypeScript, Vite, Tailwind CSS, while integrating them with ASP.NET Core Web APIs. Throughout the project, I collaborated closely with backend developers and gained practical exposure to Clean Architecture, PostgreSQL, Entity Framework Core, Redis, Docker, JWT authentication, Google OAuth, and AI service integrations. This experience strengthened my understanding of full-stack software development, agile teamwork, and the importance of building scalable, secure, and user-focused applications.',
        tr: "SAN TSG & Paximum'daki stajım boyunca, sohbet üzerinden seyahat rezervasyonu deneyimi sunmak için tasarlanmış, yapay zekâ destekli seyahat asistanı PusulAI'ın geliştirilmesinde Frontend Developer olarak çalıştım. React, TypeScript, Vite ve Tailwind CSS kullanarak duyarlı ve kullanıcı dostu arayüzler geliştirdim, bunları ASP.NET Core Web API'leriyle entegre ettim. Proje boyunca backend geliştiricileriyle yakın çalıştım; Clean Architecture, PostgreSQL, Entity Framework Core, Redis, Docker, JWT kimlik doğrulama, Google OAuth ve yapay zekâ servis entegrasyonları konularında uygulamalı deneyim kazandım. Bu deneyim, full-stack yazılım geliştirme, çevik takım çalışması ve ölçeklenebilir, güvenli, kullanıcı odaklı uygulamalar kurmanın önemi konusundaki kavrayışımı güçlendirdi.",
      },
    ],
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'ASP.NET Core',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
  },
  {
    slug: 'tegv-2026',
    organization: 'TEGV - Türkiye Eğitim Gönüllüleri Vakfı',
    logo: '/experience/tegv.png',
    role: { en: 'Volunteer', tr: 'Gönüllü' },
    period: { en: 'Feb 2026 - May 2026', tr: 'Şub 2026 - May 2026' },
    duration: { en: '4 mos', tr: '4 ay' },
    location: { en: 'Antalya, Türkiye', tr: 'Antalya, Türkiye' },
    description: [
      {
        en: "Volunteering at the Turkish Education Volunteers Foundation (TEGV) gave me the opportunity to support children's English learning in an engaging and encouraging environment. Beyond teaching, I learned the value of patience, effective communication, and inspiring young learners to gain confidence in themselves and their abilities.",
        tr: 'Türkiye Eğitim Gönüllüleri Vakfı (TEGV) bünyesinde gönüllü olarak çalışmak, çocukların İngilizce öğrenmesini keyifli ve cesaretlendirici bir ortamda desteklememe imkân verdi. Öğretmenin ötesinde; sabrın, etkili iletişimin ve çocuklara kendilerine ve yeteneklerine güvenmeleri için ilham vermenin değerini öğrendim.',
      },
    ],
  },
]
