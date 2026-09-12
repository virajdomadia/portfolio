import { defineConfig, devices } from '@playwright/test'

// PORT lets e2e run alongside another Next app on 3000 (e.g. `PORT=3100 pnpm e2e`).
const port = process.env.PORT ?? '3000'
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  webServer: { command: `pnpm build && pnpm start -p ${port}`, url: baseURL, reuseExistingServer: !process.env.CI, timeout: 180_000 },
  use: { baseURL },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
})
