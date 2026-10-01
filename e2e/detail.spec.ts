import { test, expect } from '@playwright/test'

const URL = '/projects/tripsmith'

test('detail page: gallery by keyboard, a clip plays, lightbox opens and closes', async ({ page }) => {
  const r = await page.goto(URL); expect(r?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Tripsmith' })).toBeVisible()
  const gallery = page.getByRole('region', { name: 'Tripsmith gallery' })
  await expect(page.getByText(/Item 1 of 12 · Home — search by place, month and budget/)).toBeVisible()
  await gallery.focus(); await page.keyboard.press('ArrowRight')
  await expect(page.getByText(/Item 2 of 12 · Search to package/)).toBeVisible()
  const v = gallery.locator('video')
  await expect.poll(() => v.evaluate((el: HTMLVideoElement) => !el.paused && el.currentTime > 0), { timeout: 10_000 }).toBe(true)
  await page.getByRole('button', { name: 'Fullscreen' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
})

test('reduced motion: a selected clip stays paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(URL)
  await page.getByRole('link', { name: 'Show Search to package (video)' }).click()
  await page.waitForTimeout(1500)
  expect(await page.getByRole('region', { name: 'Tripsmith gallery' }).locator('video').evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
})

test('without JavaScript: first image, full case study and linked thumbnails render', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto(URL)
  await expect(page.getByRole('img', { name: 'Tripsmith home page: headline over a Kerala backwaters photo and a search by place, month and budget' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Key decisions' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Show Search to package (video)' })).toHaveAttribute('href', '/projects/tripsmith/browse.mp4')
  await ctx.close()
})

test('SEO: canonical, one JSON-LD graph with SoftwareSourceCode + BreadcrumbList, OG image responds', async ({ page, request }) => {
  await page.goto(URL)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/projects\/tripsmith$/)
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld).toHaveLength(1)
  expect(JSON.parse(ld[0])['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual(['SoftwareSourceCode', 'BreadcrumbList'])
  const og = await request.get(`${URL}/opengraph-image`); expect(og.status()).toBe(200); expect(og.headers()['content-type']).toContain('image/png')
})

test('a project without a detail page is a 404, and only Tripsmith links to one from home', async ({ page, request }) => {
  expect((await page.goto('/projects/frontrow'))?.status()).toBe(404)
  expect((await request.get('/projects/frontrow/opengraph-image')).status()).toBe(404)
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'View project →' })).toHaveCount(1)
  await page.getByRole('link', { name: 'View project →' }).click()
  await expect(page).toHaveURL(/\/projects\/tripsmith$/)
})

test('nav from the detail page returns to home sections', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop nav only')
  await page.goto(URL)
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Stack' }).click()
  await expect(page).toHaveURL(/\/#stack$/)
  await expect(page.locator('#stack')).toBeInViewport()
})

test('no horizontal scroll at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto(URL)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('soft navigation back to home re-arms reveals', async ({ page }) => {
  await page.goto(URL)
  await page.getByRole('link', { name: '← All projects' }).click()
  await expect(page).toHaveURL(/\/#project-tripsmith$/)
  await expect(page.locator('#project-tripsmith')).toBeInViewport() // let the hash scroll settle before scrolling on
  const first = page.locator('#stack [data-reveal]').first()
  await page.locator('#stack').scrollIntoViewIfNeeded()
  await first.scrollIntoViewIfNeeded() // #stack is taller than the phone viewport, so bring its first reveal itself on screen
  await expect(first).toHaveClass(/\bin\b/)
})
