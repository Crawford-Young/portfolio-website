import type { Metadata } from 'next'
import AboutContent from '@/content/about.mdx'
import { Prose } from '@/components/writing/prose'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who Crawford Young is, and what he builds.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About',
    description: 'Who Crawford Young is, and what he builds.',
    url: '/about',
    siteName: 'Crawford Young',
    type: 'profile',
  },
}

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Prose>
        <AboutContent />
      </Prose>
    </div>
  )
}
