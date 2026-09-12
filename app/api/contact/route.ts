import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactSchema } from '@/lib/contact-schema'

const hits = new Map<string, number[]>() // naive per-instance rate limit: 5 / 10 min per IP
function limited(ip: string) { const now = Date.now(), win = hits.get(ip)?.filter((t) => now - t < 600_000) ?? []; win.push(now); hits.set(ip, win); return win.length > 5 }

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local'
  if (limited(ip)) return NextResponse.json({ error: 'Too many messages. Please email me directly.' }, { status: 429 })
  const parsed = ContactSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form — name, a valid email and a message of at least 10 characters.' }, { status: 400 })
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
