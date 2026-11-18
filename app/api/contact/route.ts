import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactSchema } from '@/lib/contact-schema'
import { FIELD_ERROR, type ContactField } from '@/lib/contact-rules'
import { siteUrl } from '@/lib/site'

const hits = new Map<string, number[]>() // naive per-instance rate limit: 5 / 10 min per IP
function limited(ip: string) { const now = Date.now(), win = hits.get(ip)?.filter((t) => now - t < 600_000) ?? []; win.push(now); hits.set(ip, win); return win.length > 5 }

// Browsers send Origin on every POST, same-origin included, so a browser request from another site always carries a
// foreign one: accept the canonical origin and the host the request came in on (previews, localhost). A request with
// no Origin is not from a browser page (curl, a server); refusing it would stop no one, since such a client can set
// any Origin it likes, so it falls through to the same validation and rate limit as everyone else.
function crossSite(req: Request) {
  const origin = req.headers.get('origin')
  if (origin === null) return false
  if (origin === siteUrl()) return false
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  try { return !host || new URL(origin).host !== host } catch { return true } // "null" (sandboxed frames) or garbage
}

export async function POST(req: Request) {
  if (crossSite(req)) return NextResponse.json({ error: 'Cross-site requests are not accepted.' }, { status: 403 })
  const body: unknown = await req.json().catch(() => null)
  // honeypot filled: a bot. Answer exactly as a real send does and send nothing, so it learns nothing.
  const website = (body as { website?: unknown } | null)?.website
  if (typeof website === 'string' && website !== '') return NextResponse.json({ ok: true })
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0]
    if (typeof field === 'string' && field in FIELD_ERROR) return NextResponse.json({ error: FIELD_ERROR[field as ContactField], field }, { status: 400 })
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 })
  }
  // count only valid submissions, so a visitor fixing typos is never locked out
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local'
  if (limited(ip)) return NextResponse.json({ error: 'Too many messages. Please email me directly.' }, { status: 429 })
  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ error: 'Mail is not configured. Please email me directly.' }, { status: 500 })
  const { intent, name, email, message } = parsed.data
  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>', to: process.env.CONTACT_TO ?? 'virajdomadia6@gmail.com', replyTo: email,
    subject: `[Portfolio · ${intent}] ${name}`, text: `${name} <${email}>\nintent: ${intent}\n\n${message}`,
  })
  if (error) return NextResponse.json({ error: 'Could not send right now. Please email me directly.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
