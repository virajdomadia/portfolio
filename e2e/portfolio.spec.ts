import { test, expect } from '@playwright/test'

test('sections, anchors and no horizontal overflow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Viraj/)
  for (const id of ['about', 'projects', 'stack', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  await page.getByRole('link', { name: 'Stack', exact: true }).first().click().catch(() => {})
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  expect(overflow).toBe(false)
})

test('reduced motion renders everything visible', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' }); const page = await ctx.newPage()
  await page.goto('/')
  const hidden = await page.evaluate(() => Array.from(document.querySelectorAll('[data-reveal]')).filter((el) => getComputedStyle(el).opacity === '0').length)
  expect(hidden).toBe(0)
})

test('contact form validates and shows the fallback on server error', async ({ page }) => {
  await page.route('**/api/contact', (r) => r.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Mail is not configured. Please email me directly.' }) }))
  await page.goto('/#contact')
  await page.getByLabel('Your name').fill('Priya Sharma')
  await page.getByLabel('Email').fill('priya@example.com')
  await page.getByLabel('Message').fill('We need a booking platform built.')
  await page.getByRole('button', { name: /Send message/ }).click()
  // Next's route announcer is also role=alert; pick ours by its mailto fallback
  await expect(page.getByRole('alert').filter({ has: page.locator('a[href^="mailto:"]') })).toContainText('email me directly')
})

test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone project only')
  await page.goto('/')
  const burger = page.getByRole('button', { name: 'Open menu' })
  await burger.click()
  await expect(page.locator('html')).toHaveClass(/menu-open/)
  await page.locator('#menu').getByRole('link', { name: /Stack/ }).click()
  await expect(page.locator('html')).not.toHaveClass(/menu-open/)
  await expect(page.locator('#stack')).toBeInViewport()
})

test('no console errors on load', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  await page.goto('/'); await page.mouse.wheel(0, 6000); await page.waitForTimeout(500)
  expect(errors).toEqual([])
})
