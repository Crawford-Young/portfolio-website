# CLAUDE.md — Crawford-Young Portfolio

Inherits all rules from `~/code/CLAUDE.md`. Project-specific overrides and context below.

---

## Project Context

Personal portfolio site deployed on Vercel. No backend, no database, no auth. Static content with live GitHub API data fetched at build time via ISR.

**Live URL:** https://crawfordyoung.dev (or Vercel deployment URL)
**Deployment:** Vercel (migrated from GitHub Pages)

---

## Stack Overrides

| Concern         | This project                                | Workspace default            |
| --------------- | ------------------------------------------- | ---------------------------- |
| UI components   | `@crawfordyoung/ui` (own component library) | Custom Radix+CVA per project |
| Animation       | `motion` (Framer Motion v12)                | Tailwind transitions only    |
| Database        | None                                        | Neon / MongoDB               |
| Auth            | None                                        | Auth.js v5                   |
| Forms           | None                                        | Server Actions + Zod         |
| Storybook       | Not used (consumer, not a library)          | Required                     |
| Rate limiting   | Not applicable                              | Upstash                      |
| Background jobs | Not applicable                              | Trigger.dev                  |
| Email           | Not applicable                              | Resend                       |

---

## Key Constraints

- **No DB, no auth, no server actions.** This is a display site — keep it that way.
- **Uses own component library** (`@crawfordyoung/ui`). Never copy-paste components in — update the library and consume the new version.
- **GitHub API data** fetched via RSC with ISR. Keep revalidation intervals in `src/server/queries/github.ts`. Do not fetch client-side.
- **`motion` is intentional.** Portfolio is a showcase — Framer Motion is justified here. Still wrap all animations in `prefers-reduced-motion` guards.
- **Lighthouse 100 in all categories** except Performance relaxes to 90+ when motion effects are active (per workspace React Bits rule).
- **No Storybook.** Components come from `@crawfordyoung/ui` which has its own Storybook. This repo has no stories.

---

## Component Library Consumption

`src/app/globals.css` maps `@crawfordyoung/ui` CSS variables → Tailwind v4 utilities via `@theme inline` — **any new library token needs a mapping line added there after a ui bump.**

The same file also carries three consumer-side patches for gaps in the library, each an upstream-fix candidate — remove the corresponding override once a future `@crawfordyoung/ui` release ships the fix:

| Patch                                                                                     | Why it lives here                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion `@keyframes` + `--animate-accordion-*` tokens in a second `@theme inline` block | The library's Accordion keyframes ship in its Tailwind-v3 preset, which this Tailwind-v4 CSS-first setup does not consume                                                             |
| `prefers-reduced-motion` guard on `[class*='animate-accordion']`                          | Library Accordion applies `data-[state]:animate-accordion-*` unguarded                                                                                                                |
| `:root:not(.dark) .text-accent { color: rgb(4 120 87) }`                                  | Library light theme keeps `--accent` at emerald-500 (~2.5:1 on white) — fails WCAG AA as text. Buttons are unaffected: light theme pairs `bg-accent` with black `--accent-foreground` |

---

## Adjusted Definition of Done

Workspace DoD applies with these exceptions:

- Storybook: **skip** — not applicable for a consumer app
- Sentry: **enabled** — client-side error monitoring, session replay, and tracing via `@sentry/nextjs`
- Rate limiting: **skip** — no user-facing endpoints
- Lighthouse Performance: **90+** (not 100) — `motion` animations affect score

All other workspace DoD items remain required.

---

## Error Boundaries

- Root (`src/app/error.tsx`) and global (`src/app/global-error.tsx`) boundaries render `RouteErrorFallback` (`@crawfordyoung/ui` ≥0.24.0) with `homeHref="/"` — placement rule: root/global boundaries get the home link (no surviving shell nav); segment boundaries would not.
- Both capture to Sentry via `useEffect(() => Sentry.captureException(error), [error])`.
- `src/app/**` is excluded from the vitest coverage `include` allowlist — `tests/unit/root-error.test.tsx` and `tests/unit/global-error.test.tsx` are behavioral, not coverage-feeding.
- **Known tooling gap:** `postcss.config.mjs` uses the Next.js/Tailwind-v4 string-plugin form (`plugins: ['@tailwindcss/postcss']`), which Vite's own postcss loader (used by vitest) cannot resolve — any test that transitively imports a `.css` file fails with `Invalid PostCSS Plugin found`. `global-error.tsx` imports `@/app/globals.css` so design tokens resolve outside the app shell; its test mocks that import (`vi.mock('@/app/globals.css', () => ({}))`) to route around the gap. A real fix (postcss config format vitest can also load, or a vitest CSS alias) is unscoped housekeeping — not fixed here.

## Crawlability & AdSense (adsense-w1)

- **`src/lib/site-routes.ts` is the single source for `SITE_URL` and the sitemap route list.** `src/app/robots.ts` and `src/app/sitemap.ts` are thin wrappers over it, and `metadataBase` in the root layout is pinned to the same constant — **never to an env var.** A canonical origin is a published fact about this host; an env-derived one is correct locally and can be wrong in the deployed artifact, where no local gate reaches it (a sibling repo shipped a production `og:url` of `http://localhost:3000` this way). New pages get added to the route list, not hand-written into the sitemap.
- **No ad units ship in this repo.** `src/app/layout.tsx` carries the AdSense verification loader only; unit placement is a post-approval decision, and a unit on a page without substantive prose is the policy violation AdSense names explicitly.
- **`metadataBase` alone advertises nothing — the `openGraph` block is what does it.** `metadataBase` only resolves RELATIVE URLs inside other metadata fields, so before the `openGraph` block landed this site served no `og:` tags and no canonical link at all, on a pinned `metadataBase`. That absence is invisible to any check hunting a WRONG origin, which is how it survived the whole W1 wave and its production sweep. Do not remove the block as redundant, and keep `url: '/'` relative so the origin has exactly one source. There is deliberately **no `images` key** — this repo ships no OG image and naming one would serve a 404 to every social scraper.
- **AdSense verification does not rely on JS.** `metadata.other['google-adsense-account']` puts the verification tag in the served HTML. The `adsbygoogle` loader is `strategy="lazyOnload"`, so it appears only after the browser executes JS — fine for ad serving, a bad bet for a verification crawler. The publisher id in `other` is a literal on purpose: binding it to `NEXT_PUBLIC_ADSENSE_CLIENT` would let an unset Vercel var silently delete the snippet, which is exactly what happened to the loader (W1 issue #11).
- **`tests/e2e/compliance.spec.ts` runs against a configurable base URL** — `PORT` for local, `E2E_BASE_URL` for production. Nine tests: `ads.txt` (200, `text/plain`, publisher line byte-exact), `robots.txt` (200, carries `Sitemap:`), `sitemap.xml` (200, lists `/privacy`), the `/privacy` and `/contact` headings, `og:url === SITE_URL`, the verification meta tag asserted against the RAW response body (a rendered-DOM check would pass on the loader alone), the debug routes 404ing, and a real 404 on an unknown path. **The `just check` e2e recipe passes no `PORT`**, and `reuseExistingServer: !CI` will silently drive whatever dev server already holds the port — run the e2e segment as `PORT=<own port> pnpm exec playwright test` whenever another session is live.
- **No Sentry debug routes.** `/sentry-example-page` and its API route were removed — crawlable, contentless, and deliberately error-throwing. Don't reintroduce them; test Sentry from a scratch branch.

## Deployment

- Deployed automatically on push to `main` via Vercel
- Preview deployments on every PR
- No manual deploy steps needed
- Environment variables managed in Vercel dashboard (see `~/code/docs/Crawford-Young.github.io/` for context)

## CI / Testing

- Required CI workflow name for E2E: **"E2E Accessibility"** — this name is enforced as a branch protection rule; renaming it breaks the required check
- Playwright `webServer` uses `pnpm dev` (not `pnpm build && pnpm start`)
- After every push to a PR, run `gh pr checks <number> --watch` and wait for green before moving on

---

## Planning Docs

`~/code/docs/Crawford-Young.github.io/` — specs, plans, and ADRs for this project.
