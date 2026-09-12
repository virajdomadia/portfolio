import { chromium, devices } from '@playwright/test'
const browser = await chromium.launch()
const measure = async (css) => {
  const page = await (await browser.newContext(devices['Pixel 7'])).newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  if (css) { await page.addStyleTag({ content: css }); await page.reload({ waitUntil: 'networkidle' }); await page.addStyleTag({ content: css }); await page.waitForTimeout(300) }
  const r = await page.evaluate(() => ({ inner: window.innerWidth, client: document.documentElement.clientWidth, scrollW: document.documentElement.scrollWidth }))
  console.log(JSON.stringify(css || 'baseline'), r); await page.close()
}
await measure()
await measure('html, body { overflow-x: clip }')
await measure('html { overflow-x: hidden } body { overflow-x: clip }')
await measure('.sw { overflow-x: clip }')
await browser.close()
