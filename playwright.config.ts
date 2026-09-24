import { defineConfig, devices } from '@playwright/test'

// PORT lets e2e run alongside another Next app on 3000 (e.g. `PORT=3100 pnpm e2e`).
const port = process.env.PORT ?? '3000'
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  // `gracefulShutdown` because the run would otherwise finish and then hang: on the CI runner all
  // 18 tests completed in 12 s and the process sat there until the job timeout, with `next-server`
  // still alive as an orphan. SIGTERM through the `pnpm build && pnpm start` shell wrapper does not
  // reach it, so give it half a second and then take the tree down.
  webServer: {
    command: `pnpm build && pnpm start -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 500 },
  },
  use: { baseURL },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
})
