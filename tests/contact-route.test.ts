import { describe, it, expect, vi } from 'vitest'
vi.mock('resend', () => ({ Resend: class { emails = { send: vi.fn(async () => ({ data: { id: 'x' }, error: null })) } } }))
import { POST } from '@/app/api/contact/route'
const req = (body: unknown) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
describe('POST /api/contact', () => {
  it('400 on invalid payload', async () => { const r = await POST(req({ name: 'x' })); expect(r.status).toBe(400) })
  it('500 when the API key is missing', async () => { delete process.env.RESEND_API_KEY; const r = await POST(req({ intent: 'hi', name: 'Priya', email: 'p@x.com', message: 'hello there viraj' })); expect(r.status).toBe(500) })
  it('does not count invalid submissions toward the rate limit', async () => {
    process.env.RESEND_API_KEY = 'test'
    const from = (body: unknown) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.7' }, body: JSON.stringify(body) })
    for (let i = 0; i < 8; i++) expect((await POST(from({ name: 'x' }))).status).toBe(400)
    expect((await POST(from({ intent: 'hi', name: 'Priya', email: 'p@x.com', message: 'hello there viraj' }))).status).toBe(200)
  })
  it('200 on success', async () => { process.env.RESEND_API_KEY = 'test'; const r = await POST(req({ intent: 'hi', name: 'Priya', email: 'p@x.com', message: 'hello there viraj' })); expect(r.status).toBe(200); expect(await r.json()).toEqual({ ok: true }) })
})
