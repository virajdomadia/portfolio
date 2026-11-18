import { describe, it, expect } from 'vitest'
import { ContactSchema } from '@/lib/contact-schema'
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
})
