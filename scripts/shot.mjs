import { chromium, devices } from '@playwright/test'
const [,, url, out, mode = 'desktop', scrollTo = '0'] = process.argv
const browser = await chromium.launch()
const ctx = await browser.newContext(mode === 'phone' ? devices['Pixel 7'] : { viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(y => window.scrollTo(0, y), Number(scrollTo))
await page.waitForTimeout(1500)
await page.screenshot({ path: out })
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
console.log(JSON.stringify({ errors, overflow }))
await browser.close()
