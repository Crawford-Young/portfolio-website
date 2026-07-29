import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/lib/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What crawfordyoung.dev collects, why, and what you can do about it.',
}

const EFFECTIVE_DATE = 'July 28, 2026'
const CONTACT_EMAIL = 'hello@crawfordyoung.dev'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Legal</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-3">Privacy Policy</h1>
      <p className="text-muted-foreground mb-14">Effective {EFFECTIVE_DATE}.</p>

      <div className="space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">What this policy covers</h2>
          <p>
            This policy applies to crawfordyoung.dev, operated by Crawford Young. It explains what
            information the site collects, why, and what you can do about it.
          </p>
          <p className="mt-3">
            It does not cover sites this one links to. Once you follow a link away from
            crawfordyoung.dev, that site&apos;s own policy applies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Information collected</h2>
          <p>This site collects very little.</p>
          <ul className="mt-3 space-y-3 list-disc pl-5">
            <li>
              <strong className="text-foreground">Server logs.</strong> The hosting provider
              (Vercel) records standard request data — IP address, user agent, requested path,
              timestamp — for security and reliability. These logs are retained by Vercel under
              their own policy and are not used to build a profile of you.
            </li>
            <li>
              <strong className="text-foreground">Analytics.</strong> Aggregate page-view counts via
              Vercel Analytics and Vercel Speed Insights. These measure traffic and page performance
              in aggregate. They do not use cookies and do not track you across other sites.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Advertising</h2>
          <p>This site may display advertising served by Google.</p>
          <ul className="mt-3 space-y-3 list-disc pl-5">
            <li>Google is a third-party vendor and uses cookies to serve ads on this site.</li>
            <li>
              Google&apos;s use of advertising cookies — including the DoubleClick cookie — enables
              it and its partners to serve ads to you based on your visit to this site and other
              sites on the internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{' '}
              <Link
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4"
              >
                Ads Settings
              </Link>
              .
            </li>
            <li>
              Many other third-party vendors&apos; cookies can be disabled at{' '}
              <Link
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4"
              >
                aboutads.info
              </Link>
              .
            </li>
            <li>
              Third-party vendors&apos; use of cookies on this site is governed by Google&apos;s{' '}
              <Link
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4"
              >
                advertising policies
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
          <p>A cookie is a small file a site stores in your browser.</p>
          <ul className="mt-3 space-y-3 list-disc pl-5">
            <li>Advertising cookies are set by Google as described above.</li>
            <li>
              <strong className="text-foreground">Preference storage.</strong> Your light or dark
              theme choice is stored locally in your browser. It never leaves your device and is not
              a tracking cookie.
            </li>
          </ul>
          <p className="mt-3">
            You can block or delete cookies through your browser settings. Blocking advertising
            cookies does not prevent you from using the site; you will simply see less relevant ads.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Your rights under GDPR</h2>
          <p>
            If you are in the European Economic Area or the United Kingdom, you have the right to
            access, correct, or erase personal data held about you, to object to or restrict its
            processing, and to data portability. Because this site holds no account or contact
            database, in practice this concerns server logs and advertising cookies.
          </p>
          <p className="mt-3">
            To exercise any of these rights, email{' '}
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </Link>
            . You also have the right to complain to your local data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Your rights under CCPA</h2>
          <p>
            If you are a California resident, you have the right to know what personal information
            is collected and to request its deletion.
          </p>
          <p className="mt-3">
            Personal information is not sold, and never has been. To make a request, email{' '}
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Changes to this policy</h2>
          <p>
            This policy may be updated as the site changes. The effective date above reflects the
            most recent revision. Material changes will be noted on this page rather than announced
            separately.
          </p>
        </section>
      </div>
    </div>
  )
}
