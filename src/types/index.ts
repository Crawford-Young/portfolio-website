export type Project = {
  slug: string
  title: string
  description: string
  tech: string[]
  url?: string
  repo?: string
  npm?: string
  flagship?: boolean
  pitch?: string // marketing pitch shown in flagship/featured contexts
  ctaLabel?: string // primary CTA text, e.g. 'Try it live'
  screenshot?: string // public-dir path, e.g. '/screenshots/cybond.png'
}

export type WorkExperience = {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: string
  bullets?: string[]
  stats?: { label: string; value: number; suffix: string }[]
}

export type Education = {
  id: string
  institution: string
  degree: string
  period: string
  achievements?: string[]
  activities?: string[]
}

export type HobbyDetail = {
  id: string
  icon: string // Lucide icon name (PascalCase), resolved to a component at render time
  label: string // always-visible card text
  detail?: string // expanded body text — omit for link-only cards
  href?: string // when present the card is a link, not an expander
}

export type Hobby = {
  id: string
  title: string
  description: string
  accentColor: string
  photo: string // public-dir path, e.g. '/outdoors.jpeg'
  details: HobbyDetail[]
}
