import { chromium } from '@playwright/test'
const sites = { tripsmith: 'https://tripsmith.vercel.app', frontrow: 'https://frontrow-viraj.vercel.app', pagecraft: 'https://pagecraft-viraj.vercel.app', offcut: 'https://offcut-viraj.vercel.app', skillroom: 'https://skillroom-viraj.vercel.app', platter: 'https://platter-viraj.vercel.app' }
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
for (const [slug, url] of Object.entries(sites)) {
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(6500) // let hero animations reach their resting state
  await page.screenshot({ path: `public/images/projects/${slug}.jpg`, type: 'jpeg', quality: 82 })
  console.log('shot', slug)
  await page.close()
}
await browser.close()
