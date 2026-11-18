// The contact form's rules, shared by the form and the API's ContactSchema so the browser rejects exactly what the
// server would. No zod here: the form imports this, and zod would otherwise land in the client bundle.
export const NAME = { min: 2, max: 80 }
export const MESSAGE = { min: 10, max: 2000 }
// no line breaks, control characters or tags (the name goes into the email subject)
export const NAME_RE = /^[^\p{Cc}<>]+$/u
// zod's own email pattern (z.regexes.email), which ContactSchema's .email() applies; tests/contact-schema.test.ts fails if they drift
export const EMAIL_RE = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/

export type ContactField = 'intent' | 'name' | 'email' | 'message'
export const FIELD_ERROR: Record<ContactField, string> = {
  intent: 'Please pick what this is about.',
  name: `Please enter your name (${NAME.min}–${NAME.max} characters, no < or >).`,
  email: 'Please enter a full email address, like you@company.com.',
  message: `Please write a message of ${MESSAGE.min} to ${MESSAGE.max.toLocaleString('en')} characters.`,
}

/** The first field that breaks a rule, checked after trimming the way the server does; null when all pass. */
export function invalidField(v: { name: string; email: string; message: string }): ContactField | null {
  const name = v.name.trim(), email = v.email.trim(), message = v.message.trim()
  if (name.length < NAME.min || name.length > NAME.max || !NAME_RE.test(name)) return 'name'
  if (!EMAIL_RE.test(email)) return 'email'
  if (message.length < MESSAGE.min || message.length > MESSAGE.max) return 'message'
  return null
}
