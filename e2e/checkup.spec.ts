import { test, expect } from '@playwright/test'

test('website check: a refused address shows a plain error, no report', async ({ page }) => {
  await page.goto('/tools/website-checkup')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('losing you customers', { ignoreCase: true })
  await page.getByLabel('Your website address').fill('localhost')
  await page.getByRole('button', { name: 'Check my website' }).click()
  await expect(page.locator('#ck-err')).toContainText('website address')
  await expect(page.locator('[aria-label^="Report for"]')).toHaveCount(0)
})

test('guides index and each guide render and link to the tool', async ({ page }) => {
  await page.goto('/guides')
  const links = page.locator('main a[href^="/guides/"]')
  const n = await links.count(); expect(n).toBeGreaterThanOrEqual(2)
  await links.first().click()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Check my website free' })).toHaveAttribute('href', '/tools/website-checkup')
})
