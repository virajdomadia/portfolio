import { chromium, devices } from '@playwright/test'
const browser = await chromium.launch()
const page = await (await browser.newContext(devices['Pixel 7'])).newPage()
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
const out = await page.evaluate(() => {
  const w = document.documentElement.clientWidth
  return [...document.querySelectorAll('body *')].map(el => ({ r: el.getBoundingClientRect(), el })).filter(x => x.r.right > w + 1 && x.r.width > 0).slice(0, 12).map(x => `${x.el.tagName}.${[...x.el.classList].join('.')} right=${Math.round(x.r.right)} w=${Math.round(x.r.width)}`)
})
console.log(out.join('\n'))
await browser.close()
