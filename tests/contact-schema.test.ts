import { describe, it, expect } from 'vitest'
import { ContactSchema } from '@/lib/contact-schema'
describe('ContactSchema', () => {
  const ok = { intent: 'role', name: 'Priya', email: 'p@x.com', message: 'We are hiring a full-stack dev.', website: '' }
  it('accepts a valid payload', () => { expect(ContactSchema.safeParse(ok).success).toBe(true) })
  it('rejects a bad email and a short message', () => {
    expect(ContactSchema.safeParse({ ...ok, email: 'nope' }).success).toBe(false)
    expect(ContactSchema.safeParse({ ...ok, message: 'hi' }).success).toBe(false)
  })
  it('rejects a filled honeypot', () => { expect(ContactSchema.safeParse({ ...ok, website: 'http://spam' }).success).toBe(false) })
})
