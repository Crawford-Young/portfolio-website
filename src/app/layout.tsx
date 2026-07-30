import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { PillNav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site-routes'
import './globals.css'

const SITE_DESCRIPTION =
  'AI products and developer tools by Crawford Young — Cybond, @crawfordyoung/ui, and more. Shipped, tested, and live.'

// `metadataBase` on its own emits nothing: it resolves RELATIVE urls inside other
// metadata fields, so the openGraph block below is what actually advertises a
// canonical origin. Do not "simplify" it away — without it this page carries no
// og:url and no canonical link, and that absence looks identical to correctness.
// No `images` key: this repo ships no OG image, and naming one would serve a 404
// to every social scraper. `other` carries the AdSense verification tag in the
// SERVED html, so verification does not depend on the crawler running the
// lazyOnload loader below; the id is a literal on purpose, since binding it to
// NEXT_PUBLIC_ADSENSE_CLIENT would let an unset var silently remove it.
export const metadata: Metadata = {
  title: { default: 'Crawford Young', template: '%s | Crawford Young' },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Crawford Young',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'Crawford Young',
    type: 'website',
  },
  other: { 'google-adsense-account': 'ca-pub-4628379278051632' },
}

// Verification loader only — no ad units ship in this repo. Unset (everywhere but
// production) means the script never renders, so tests, e2e, axe, and local
// Lighthouse all run against the ad-free page.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <PillNav />
          <main className="pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {ADSENSE_CLIENT ? (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        ) : null}
      </body>
    </html>
  )
}
