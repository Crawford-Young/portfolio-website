import { defineConfig, devices } from '@playwright/test'

// Port is configurable so concurrent sessions can run e2e on a fresh port without
// reusing another session's dev server. E2E_BASE_URL overrides both, so the same
// specs can run against a live deployment instead of a local server.
const PORT = process.env.PORT ?? '3000'
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Local retry absorbs the Turbopack dev-server race on concurrent MDX first-compiles
  // (random project/writing route 500s "Unexpected end of JSON input"; prod prerenders all
  // routes fine — same class as instrumenttuner's guide pages). A retried test runs alone,
  // which is the condition under which the compile succeeds; failing the retry is real.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
