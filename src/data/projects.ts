import type { Localized } from './site'

export type Project = {
  /** Stable key for React lists. */
  slug: string
  year: number
  repo: string
  /** Optional live demo; omit if there is none. */
  demo?: string
  tags: string[]
  title: string
  summary: Localized
  /** Shown first, above the rest of the list. */
  featured?: boolean
}

/**
 * Add a project by appending an object here. The Projects page renders whatever
 * is in this array, featured first and then newest first.
 *
 * The grid shapes itself around the count, so it never leaves an empty cell:
 * featured entries take the full width, the rest fall into pairs.
 */
export const projects: Project[] = [
  {
    slug: 'campusnote',
    year: 2026,
    repo: 'https://github.com/duuyguyiilmaz/CampusNote',
    tags: ['Kotlin', 'Android', 'Firebase', 'Firestore'],
    title: 'CampusNote',
    featured: true,
    summary: {
      en: 'An Android app for sharing lecture notes within a university department, built around contribution fairness: the department feed stays locked until you upload a note of your own. Firebase Auth for accounts, Firestore security rules to enforce the rule server-side.',
      tr: 'Üniversite bölümü içinde ders notu paylaşmak için bir Android uygulaması. Katkı adaleti üzerine kurulu: kendi notunu yüklemeden bölüm akışı açılmıyor. Hesaplar için Firebase Auth, kuralı sunucu tarafında zorlamak için Firestore güvenlik kuralları.',
    },
  },
  {
    slug: 'pusulai',
    year: 2026,
    repo: 'https://github.com/mertosmanayhan/PusulAI',
    tags: ['.NET 9', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    title: 'PusulAI',
    featured: true,
    summary: {
      en: 'A team project: a travel assistant that turns natural-language requests into hotel and flight searches, with card payments and AI-assisted trip planning. .NET backend, React frontend, PostgreSQL and Redis behind Docker Compose.',
      tr: 'Bir ekip projesi: doğal dildeki istekleri otel ve uçak aramalarına çeviren, kart ödemeli rezervasyon ve yapay zekâ destekli seyahat planlaması sunan bir asistan. .NET backend, React arayüz, Docker Compose arkasında PostgreSQL ve Redis.',
    },
  },
  {
    slug: 'arduino-projects',
    year: 2026,
    repo: 'https://github.com/duuyguyiilmaz/arduino-projects',
    tags: ['C++', 'Arduino', 'Electronics'],
    title: 'Arduino Projects',
    summary: {
      en: 'A growing collection of small embedded-systems experiments: timing, digital I/O and LED driving on an Uno, each one wired and documented from scratch.',
      tr: 'Küçük gömülü sistem denemelerinden oluşan, büyümeye devam eden bir koleksiyon: Uno üzerinde zamanlama, dijital giriş/çıkış ve LED sürme. Her biri sıfırdan kurulup belgelendi.',
    },
  },
  {
    slug: 'cse102t-java-practice',
    year: 2025,
    repo: 'https://github.com/duuyguyiilmaz/CSE102T-Java-Practice',
    tags: ['Java', 'OOP'],
    title: 'Java OOP Practice',
    summary: {
      en: 'Object-oriented design exercises written alongside my second Java course: a bus system, a car rental system and a flight reservation system, each modelled with its own class hierarchy.',
      tr: 'İkinci Java dersim boyunca yazdığım nesne yönelimli tasarım alıştırmaları: otobüs sistemi, araç kiralama sistemi ve uçuş rezervasyon sistemi. Her biri kendi sınıf hiyerarşisiyle modellendi.',
    },
  },
  {
    slug: 'cse101-java-exercises',
    year: 2025,
    repo: 'https://github.com/duuyguyiilmaz/CSE101-Java-Exercises',
    tags: ['Java', 'Fundamentals'],
    title: 'Java Fundamentals',
    summary: {
      en: 'Where I started: control flow, arrays and string handling, worked through as small programs such as an ATM simulation and a date calculator.',
      tr: 'Başladığım yer: kontrol yapıları, diziler ve metin işleme. ATM simülasyonu ve tarih hesaplayıcı gibi küçük programlar üzerinden çalışıldı.',
    },
  },
]
