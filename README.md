# Crawford Young — Portfolio

Marketing site for projects (Cybond, Cy's Music, `@crawfordyoung/ui`), with the person as backup. Built with Next.js App Router, deployed on Vercel.

Live at **https://crawfordyoung.dev**.

## Site Structure

- **Home** (`src/app/page.tsx`): Hero (pitch H1 "I build AI products and developer tools.", avatar eyebrow, "Try Cybond" + GitHub CTAs) → three full-width `FlagshipSection`s with alternating screenshot sides (`@crawfordyoung/ui`, Cybond, Cy's Music) → "More projects" grid (`ProjectCard`) → "About the builder" bento strip (About / Hobbies teaser / GitHub stats / Contact, `id="contact"` anchor).
- **Projects page**: flagships first (full-width, pitch copy via `ProjectCard`'s `featured` prop), then the rest in a 2-column grid.
- **Hobbies page**: per-hobby `Accordion` (single-open, from `@crawfordyoung/ui`) replacing the old expandable cards.
- **Writing hub** (`src/app/writing/`): `/writing` lists three poem collections and one short story; each piece lives at `/writing/<slug>` with per-poem anchor links. Content is MDX — see [Writing & content pipeline](#writing--content-pipeline).
- **About page** (`src/app/about/`): ~400-word first-person bio rendered from `src/content/about.mdx`, linked last in the nav.
- **Project detail pages** (`src/app/projects/[slug]/`): each project carries a 300–600-word MDX write-up (problem → approach → what I'd do differently → what broke) rendered below the CTA row.
- **Privacy page** (`src/app/privacy/page.tsx`) and **Contact page** (`src/app/contact/page.tsx`): the two AdSense-required legal/contact surfaces, linked from the footer. Contact publishes `hello@crawfordyoung.dev`.
- **Crawlability surfaces**: `src/app/robots.ts` and `src/app/sitemap.ts` are thin wrappers over `src/lib/site-routes.ts` (which owns `SITE_URL` and the route list — logic lives in `src/lib/` because `src/app/**` is outside the vitest coverage allowlist). `public/ads.txt` carries the AdSense publisher line. `tests/e2e/compliance.spec.ts` asserts the whole contract — `ads.txt`, `robots.txt`, `sitemap.xml`, the legal page, a real 404 on an unknown path — against a configurable base URL (`PORT` / `E2E_BASE_URL`), so the same spec runs against dev in the gate and against production after deploy. The Sentry debug routes were removed: they were crawlable, contentless, and deliberately error-throwing.

### Writing & content pipeline

All long-form prose is MDX compiled by `@next/mdx`. The moving parts:

- **Registry** — `src/data/writing.ts` (zod-validated): collections, poems (with anchor slugs), and the story. The hub, collection pages, sitemap, and content tests all derive from it.
- **Content** — `src/content/writing/<slug>.mdx` (collections + story), `src/content/projects/<slug>.mdx` (project write-ups), `src/content/about.mdx`.
- **Content maps** — `src/app/writing/content-map.ts` and `src/app/projects/[slug]/content-map.ts` hold explicit static `import()` entries per slug (Turbopack cannot follow template-literal dynamic imports).

**Adding a piece** = registry entry + `.mdx` file + content-map line. The unit tests in `tests/unit/writing-content.test.ts` are registry-driven: they compile each raw MDX source via `@mdx-js/mdx` and enforce word-count floors (collections 400, story 800, project write-ups 300, about 350), plus an orphan-file check — a forgotten registry entry or stray `.mdx` fails the suite.

`src/content/` is prettier-ignored: poem line breaks are content, and prettier's MDX parser is experimental.

### Project data model

`Project` (`src/types`) has optional flagship fields, populated in `src/data/projects.ts`:

- `flagship: boolean` — shows in the home/projects flagship treatment
- `pitch: string` — marketing copy for flagship/featured contexts
- `screenshot: string` — `public/screenshots/` path, 1440×900
- `ctaLabel: string` — primary CTA text (e.g. "Try it live")

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

Run `just check` for the full local gate (lint, types, tests, build, e2e).

> **Local dev note:** the GitHub stats card renders zeros locally without a `GITHUB_TOKEN` in `.env.local` — it falls back gracefully on the GitHub API's 401. Vercel has the token set, so production/preview deployments show real stats.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Error Boundaries

- `src/app/error.tsx` (root boundary) and `src/app/global-error.tsx` (global boundary, catches errors in the root layout itself) both render `RouteErrorFallback` from `@crawfordyoung/ui` with `homeHref="/"` — a home link is the only surviving nav at these two levels since the app shell may not have rendered.
- Both boundaries capture the error to Sentry (`@sentry/nextjs`) via a `useEffect`.
- Segment-level boundaries (none currently in this repo) keep the app shell and do not need `homeHref` — the shell nav already gets the user home.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy

Deployed automatically on push to `main` via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more.
