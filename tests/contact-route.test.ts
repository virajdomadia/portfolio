import { describe, it, expect, vi } from 'vitest'
const send = vi.hoisted(() => vi.fn(async () => ({ data: { id: 'x' }, error: null })))
vi.mock('resend', () => ({ Resend: class { emails = { send } } }))
import { POST } from '@/app/api/contact/route'
const req = (body: unknown, headers: Record<string, string> = {}) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
const valid = { intent: 'hi', name: 'Priya', email: 'p@x.com', message: 'hello there viraj' }
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
  it('400 names the field that failed', async () => {
    for (const [patch, field] of [[{ name: '   ' }, 'name'], [{ name: 'a<b>' }, 'name'], [{ email: 'qa@localhost' }, 'email'], [{ message: 'x'.repeat(2001) }, 'message']] as const) {
      const r = await POST(req({ ...valid, ...patch })); expect(r.status).toBe(400)
      const j = await r.json(); expect(j.field).toBe(field); expect(j.error).toMatch(/Please/)
    }
  })
  it('a filled honeypot gets the same 200 as a real send, and nothing is sent', async () => {
    process.env.RESEND_API_KEY = 'test'; send.mockClear()
    const r = await POST(req({ ...valid, website: 'http://spam' }))
    expect(r.status).toBe(200); expect(await r.json()).toEqual({ ok: true }); expect(send).not.toHaveBeenCalled()
  })
  it('403 on a cross-site Origin; same-origin and the canonical origin pass', async () => {
    process.env.RESEND_API_KEY = 'test'
    expect((await POST(req(valid, { origin: 'https://evil.example', 'x-forwarded-for': '198.51.100.1' }))).status).toBe(403)
    expect((await POST(req(valid, { origin: 'null', 'x-forwarded-for': '198.51.100.1' }))).status).toBe(403)
    expect((await POST(req(valid, { origin: 'https://preview.vercel.app', host: 'preview.vercel.app', 'x-forwarded-for': '198.51.100.2' }))).status).toBe(200)
    expect((await POST(req(valid, { origin: 'https://virajdomadia.com', host: 'virajdomadia.com.evil', 'x-forwarded-for': '198.51.100.3' }))).status).toBe(200)
  })
})
