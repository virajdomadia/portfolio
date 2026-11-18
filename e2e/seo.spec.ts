import { test, expect } from '@playwright/test'

test('crawl files respond', async ({ request }) => {
  for (const [path, type] of [['/robots.txt', 'text/plain'], ['/sitemap.xml', 'xml'], ['/llms.txt', 'text/plain'], ['/manifest.webmanifest', 'manifest'], ['/icon', 'image/png'], ['/Viraj-Domadia-Resume.pdf', 'application/pdf']] as const) {
    const r = await request.get(path); expect(r.status(), path).toBe(200); expect(r.headers()['content-type'], path).toContain(type)
  }
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toContain('GPTBot'); expect(robots).not.toMatch(/^Host:/m)
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
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
})

test('security headers present', async ({ request }) => {
  const h = (await request.get('/')).headers()
  expect(h['x-content-type-options']).toBe('nosniff'); expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(h['strict-transport-security']).toBe('max-age=63072000; includeSubDomains')
})

test('public media is cached for a day, pages are not', async ({ request }) => {
  for (const path of ['/projects/tripsmith/home.webp', '/projects/tripsmith/browse.mp4', '/Viraj-Domadia-Resume.pdf', '/llms.txt', '/llms-full.txt', '/images/hero-desk.jpg']) {
    const cc = (await request.get(path)).headers()['cache-control']
    expect(cc, path).toContain('max-age=86400'); expect(cc, path).not.toContain('immutable')
  }
  expect((await request.get('/projects/tripsmith')).headers()['cache-control']).not.toContain('max-age=86400')
})
