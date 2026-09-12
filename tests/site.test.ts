import { describe, it, expect, afterEach } from 'vitest'
import { siteUrl, absolute } from '@/lib/site'

describe('site', () => {
  const orig = process.env.NEXT_PUBLIC_SITE_URL
  afterEach(() => { if (orig === undefined) delete process.env.NEXT_PUBLIC_SITE_URL; else process.env.NEXT_PUBLIC_SITE_URL = orig })
  it('falls back to the vercel origin and strips trailing slashes', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(siteUrl()).toBe('https://virajdomadia.vercel.app')
    process.env.NEXT_PUBLIC_SITE_URL = 'https://virajdomadia.com/'
    expect(siteUrl()).toBe('https://virajdomadia.com')
    expect(absolute('/llms.txt')).toBe('https://virajdomadia.com/llms.txt')
  })
})
