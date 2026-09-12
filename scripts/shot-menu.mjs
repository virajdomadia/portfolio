import { chromium, devices } from '@playwright/test'
const browser = await chromium.launch()
const page = await (await browser.newContext(devices['Pixel 7'])).newPage()
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(900)
await page.screenshot({ path: process.argv[2] })
await browser.close()
