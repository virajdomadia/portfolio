// Perf probe: prints paint + LCP candidates and font arrival under slow-4G/4x-CPU emulation. Run against `pnpm start`.
import { chromium, devices } from '@playwright/test'
const run = async (label, setup) => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext(devices['Pixel 7'])
  const page = await ctx.newPage()
  const cdp = await ctx.newCDPSession(page)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  await cdp.send('Network.enable')
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 })
  await page.addInitScript(() => {
    window.__lcp = []; window.__paint = []
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push({ t: Math.round(e.startTime), size: e.size, el: e.element ? e.element.tagName + '.' + [...e.element.classList].join('.').slice(0, 30) : null }) }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__paint.push(e.name + ':' + Math.round(e.startTime)) }).observe({ type: 'paint', buffered: true })
  })
  await setup(page)
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const fonts = await page.evaluate(() => performance.getEntriesByType('resource').filter(r => /woff2/.test(r.name)).map(r => r.name.split('/').pop().slice(0, 12) + '@' + Math.round(r.responseEnd)))
  console.log(label, JSON.stringify(await page.evaluate(() => [window.__paint, window.__lcp])), fonts.join(' '))
  await browser.close()
}
await run('throttled  ', async () => {})
await run('no fonts   ', async (p) => p.route(/\.woff2?$/, (r) => r.abort()))
