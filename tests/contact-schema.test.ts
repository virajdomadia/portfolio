import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { ContactSchema } from '@/lib/contact-schema'
import { EMAIL_RE, invalidField } from '@/lib/contact-rules'
describe('ContactSchema', () => {
  const ok = { intent: 'role', name: 'Priya', email: 'p@x.com', message: 'We are hiring a full-stack dev.', website: '' }
  it('accepts a valid payload', () => { expect(ContactSchema.safeParse(ok).success).toBe(true) })
  it('rejects a bad email and a short message', () => {
    expect(ContactSchema.safeParse({ ...ok, email: 'nope' }).success).toBe(false)
    expect(ContactSchema.safeParse({ ...ok, message: 'hi' }).success).toBe(false)
  })
  it('rejects line breaks and tags in the name, keeps accents and emoji', () => {
    expect(ContactSchema.safeParse({ ...ok, name: 'Priya\r\nBcc: x@y.z' }).success).toBe(false)
    expect(ContactSchema.safeParse({ ...ok, name: '<script>alert(1)</script>' }).success).toBe(false)
    expect(ContactSchema.safeParse({ ...ok, name: 'Zoë O’Brien-Ñúñez 😀' }).success).toBe(true)
  })
  it('rejects a filled honeypot', () => { expect(ContactSchema.safeParse({ ...ok, website: 'http://spam' }).success).toBe(false) })
  it('the form rules (no zod) agree with the schema', () => {
    expect(EMAIL_RE.source).toBe(z.regexes.email.source)
    const cases = [
      { name: 'Priya', email: 'p@x.com', message: 'We are hiring a full-stack dev.' },
      { name: '   ', email: 'p@x.com', message: 'We are hiring a full-stack dev.' },
      { name: 'Priya <b>', email: 'p@x.com', message: 'We are hiring a full-stack dev.' },
      { name: 'Priya', email: 'qa@localhost', message: 'We are hiring a full-stack dev.' },
      { name: 'Priya', email: '  p@x.com ', message: 'x'.repeat(2000) },
      { name: 'Priya', email: 'p@x.com', message: 'x'.repeat(2001) },
      { name: 'Priya', email: 'p@x.com', message: '   short    ' },
    ]
    for (const c of cases) expect(invalidField(c) === null, JSON.stringify(c).slice(0, 80)).toBe(ContactSchema.safeParse({ ...ok, ...c }).success)
  })
})
