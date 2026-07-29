import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Crawford Young.',
}

const CONTACT_EMAIL = 'hello@crawfordyoung.dev'

const LINKS = [
  {
    id: 'email',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    label: CONTACT_EMAIL,
    note: 'Best for anything substantive.',
    external: false,
  },
  {
    id: 'github',
    href: 'https://github.com/Crawford-Young',
    icon: Github,
    label: 'GitHub',
    note: 'Source for most of what is listed under Projects.',
    external: true,
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/crawford-young/',
    icon: Linkedin,
    label: 'LinkedIn',
    note: 'Work history and the occasional post.',
    external: true,
  },
] as const

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        Get in touch
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-3">Contact</h1>
      <p className="text-muted-foreground mb-14">
        Questions about a project, a bug in something I shipped, or work — email is the surest way
        to reach me.
      </p>

      <ul className="space-y-6">
        {LINKS.map((link) => (
          <li key={link.id} className="flex items-start gap-4">
            <link.icon className="h-5 w-5 mt-0.5 text-accent shrink-0" aria-hidden="true" />
            <div>
              <Link
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {link.label}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">{link.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
