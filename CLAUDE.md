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
- **GitHub API data** fetched via RSC with ISR. Keep revalidation intervals in `src/lib/github.ts`. Do not fetch client-side.
- **`motion` is intentional.** Portfolio is a showcase — Framer Motion is justified here. Still wrap all animations in `prefers-reduced-motion` guards.
- **Lighthouse 100 in all categories** except Performance relaxes to 90+ when motion effects are active (per workspace React Bits rule).
- **No Storybook.** Components come from `@crawfordyoung/ui` which has its own Storybook. This repo has no stories.

---

## Adjusted Definition of Done

Workspace DoD applies with these exceptions:

- Storybook: **skip** — not applicable for a consumer app
- Sentry: **enabled** — client-side error monitoring, session replay, and tracing via `@sentry/nextjs`
- Rate limiting: **skip** — no user-facing endpoints
- Lighthouse Performance: **90+** (not 100) — `motion` animations affect score

All other workspace DoD items remain required.

---

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
