'use client'
import { useState } from 'react'
import { content } from '@/lib/content'
import s from './Contact.module.css'

type State = { status: 'idle' | 'sending' | 'sent' | 'error'; error?: string }

export default function ContactForm() {
  const { contact, person } = content
  const [state, setState] = useState<State>({ status: 'idle' })
  const [intent, setIntent] = useState(contact.intents[0].value)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget; if (!form.checkValidity()) { form.reportValidity(); return }
    const fd = new FormData(form)
    const body = { intent, name: fd.get('name'), email: fd.get('email'), message: fd.get('message'), website: fd.get('website') ?? '' }
    setState({ status: 'sending' })
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      if (r.ok) setState({ status: 'sent' }); else setState({ status: 'error', error: (await r.json().catch(() => ({}))).error ?? 'Could not send. Please email me directly.' })
    } catch { setState({ status: 'error', error: 'Could not send. Please email me directly.' }) }
  }
  if (state.status === 'sent') return <div className={s.sent} role="status"><b>{contact.sentTitle}</b>{contact.sentBody}</div>
  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.chips} role="radiogroup" aria-label="What is this about?">
        {contact.intents.map((it) => <label key={it.value}><input type="radio" name="intent" value={it.value} checked={intent === it.value} onChange={() => setIntent(it.value)} />{it.label}</label>)}
      </div>
      <div className={s.field}><label htmlFor="f-name">Your name</label><input id="f-name" name="name" placeholder="Priya Sharma" autoComplete="name" required minLength={2} /></div>
      <div className={s.field}><label htmlFor="f-mail">Email</label><input id="f-mail" name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></div>
      <div className={s.field}><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" rows={3} placeholder="We're building a booking platform and need…" required minLength={10} /></div>
      <div className={s.hp} aria-hidden="true"><label htmlFor="f-web">Website</label><input id="f-web" name="website" tabIndex={-1} autoComplete="off" /></div>
      {state.status === 'error' && <div className={s.err} role="alert">{state.error} <a href={`mailto:${person.email}`}>{person.email}</a></div>}
      <div className={s.row}>
        <button className="btn" type="submit" disabled={state.status === 'sending'}><span>{state.status === 'sending' ? 'Sending…' : 'Send message →'}</span></button>
        <small>Or email <a href={`mailto:${person.email}`}>{person.email}</a> directly</small>
      </div>
    </form>
  )
}
