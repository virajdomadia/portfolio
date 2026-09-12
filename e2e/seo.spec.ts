import { test, expect } from '@playwright/test'

test('crawl files respond', async ({ request }) => {
  for (const [path, type] of [['/robots.txt', 'text/plain'], ['/sitemap.xml', 'xml'], ['/llms.txt', 'text/plain'], ['/manifest.webmanifest', 'manifest'], ['/icon', 'image/png'], ['/Viraj-Domadia-Resume.pdf', 'application/pdf']] as const) {
    const r = await request.get(path); expect(r.status(), path).toBe(200); expect(r.headers()['content-type'], path).toContain(type)
  }
  expect(await (await request.get('/robots.txt')).text()).toContain('GPTBot')
})

test('home has canonical, one JSON-LD graph with Person + FAQPage, and the FAQ is visible', async ({ page }) => {
  await page.goto('/')
  // Next normalises "/" to the bare origin; either form is the same canonical
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/[^/]+\/?$/)
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld).toHaveLength(1)
  const graph = JSON.parse(ld[0])['@graph'].map((n: { '@type': string }) => n['@type'])
  expect(graph).toEqual(expect.arrayContaining(['Person', 'WebSite', 'ProfilePage', 'FAQPage']))
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.getByRole('heading', { name: 'Quick answers' })).toBeVisible()
  await expect(page.getByText('Bengaluru, India · IST (UTC+5:30)')).toBeVisible()
})

test('unknown routes return a real 404', async ({ page }) => {
  const r = await page.goto('/nope'); expect(r?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Nothing/)
})

test('security headers present', async ({ request }) => {
  const h = (await request.get('/')).headers()
  expect(h['x-content-type-options']).toBe('nosniff'); expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin')
})
