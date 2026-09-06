export type Lang = 'en' | 'tr'

/** Every user-facing string on the site is written once, in both languages. */
export type Localized = Record<Lang, string>

export const person = {
  name: 'Duygu Yılmaz',
  initials: 'DY',
  email: 'duyguuyiilmaz7@gmail.com',
  github: 'https://github.com/duuyguyiilmaz',
  /*
   * Any account left as an empty string is dropped from the nav and the footer
   * automatically, so a blank never ships as a dead link.
   *
   * The %C4%B1 in the LinkedIn slug is the percent-encoded Turkish dotless i.
   * Keep it encoded: the raw character works in a browser bar but breaks when
   * the link is copied into places that do not re-encode it.
   */
  linkedin: 'https://www.linkedin.com/in/duygu-y%C4%B1lmaz-566722244/',
  leetcode: 'https://leetcode.com/u/duuyguyiilmaz/',
  role: {
    en: 'Computer Engineering student',
    tr: 'Bilgisayar mühendisliği öğrencisi',
  },
  /* Joined to `role` with a single separator in the hero, so no divider here. */
  location: {
    en: 'Akdeniz University, Antalya',
    tr: 'Akdeniz Üniversitesi, Antalya',
  },
  /* Hero copy, sitting under the name. */
  intro: {
    en: 'I’m a Computer Engineering student passionate about Computer Science, software development, and continuous learning. I’m focused on developing a strong foundation in computer science by improving my problem-solving skills, exploring different areas of technology, and building projects that help me turn what I learn into practice. I enjoy learning new concepts, challenging myself with programming problems, and continuously expanding my technical knowledge.',
    tr: 'Bilgisayar mühendisliği öğrencisiyim; bilgisayar bilimine, yazılım geliştirmeye ve sürekli öğrenmeye tutkuluyum. Problem çözme becerimi geliştirerek, teknolojinin farklı alanlarını keşfederek ve öğrendiklerimi pratiğe dökmemi sağlayan projeler yaparak bilgisayar biliminde sağlam bir temel kurmaya odaklanıyorum. Yeni kavramlar öğrenmekten, programlama problemleriyle kendimi zorlamaktan ve teknik bilgimi sürekli genişletmekten keyif alıyorum.',
  },
}

/**
 * Each entry is a page, not a section of one long scroll - the nav switches
 * between them and only one is on screen at a time. Order here is the order in
 * the nav, and it also decides which way a page slides in: moving right in this
 * list enters from the right.
 *
 * To add "Certificates" or "Contributions" later: add a line here and a matching
 * case in App.tsx.
 */
export const pages = [
  { id: 'about', label: { en: 'About', tr: 'Hakkımda' } },
  { id: 'projects', label: { en: 'Projects', tr: 'Projeler' } },
  { id: 'experience', label: { en: 'Experience', tr: 'Deneyim' } },
]

/**
 * Order here is the order down the page, and it also picks the shade: the
 * first group wears the darkest wine, the last the lightest. Four `tone`
 * classes are defined in index.css - keep this list to four groups, or add a
 * `.tone-5` there before adding a fifth here.
 */
export const skillGroups = [
  {
    title: { en: 'Languages', tr: 'Diller' },
    items: ['Java', 'Kotlin', 'TypeScript', 'SQL'],
  },
  {
    title: { en: 'Backend & Databases', tr: 'Backend & Veritabanları' },
    items: ['ASP.NET Core Web API', 'PostgreSQL', 'Redis', 'Firebase'],
  },
  {
    title: { en: 'Mobile & Web', tr: 'Mobil & Web' },
    items: ['React', 'Vite', 'Tailwind CSS', 'Android SDK'],
  },
  {
    title: { en: 'Tools & Technologies', tr: 'Araçlar & Teknolojiler' },
    items: [
      'Git',
      'GitHub Actions',
      'Docker',
      'Gradle',
      'Swagger/OpenAPI',
      'Postman',
      'Vitest',
      'Stripe',
    ],
  },
]

export const ui = {
  projectsCta: { en: 'See projects', tr: 'Projelere bak' },
  experienceEmpty: {
    en: 'Nothing to list here yet. The projects page is the fuller picture for now.',
    tr: 'Burada henüz listelenecek bir şey yok. Şimdilik projeler sayfası daha eksiksiz bir resim veriyor.',
  },
  skillsTitle: { en: 'Skills', tr: 'Yetenekler' },
  /* The address follows this sentence as a link, so it no longer says where to write. */
  contactLead: {
    en: 'Open to internships and junior roles.',
    tr: 'Staj ve junior pozisyonlara açığım.',
  },
  viewSource: { en: 'Source', tr: 'Kaynak kod' },
  notFoundTitle: { en: 'That page does not exist', tr: 'Böyle bir sayfa yok' },
  notFoundLead: {
    en: 'The link you followed points somewhere this site does not have. The three pages above are all of it.',
    tr: 'Geldiğiniz bağlantı bu sitede olmayan bir yeri gösteriyor. Yukarıdaki üç sayfa sitenin tamamı.',
  },
  notFoundCta: { en: 'Back to the start', tr: 'Başa dön' },
  skipToContent: { en: 'Skip to content', tr: 'İçeriğe geç' },
  emailLabel: { en: 'Email', tr: 'E-posta' },
  accountsLabel: { en: 'Find me on', tr: 'Bana ulaş' },
  themeLabel: { en: 'Theme', tr: 'Tema' },
  themeSystem: { en: 'system', tr: 'sistem' },
  themeLight: { en: 'light', tr: 'açık' },
  themeDark: { en: 'dark', tr: 'koyu' },
}
