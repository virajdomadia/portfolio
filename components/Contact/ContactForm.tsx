'use client'
import { useEffect, useRef, useState } from 'react'
import { content } from '@/lib/content'
import { FIELD_ERROR, MESSAGE, NAME, invalidField, type ContactField } from '@/lib/contact-rules'
import s from './Contact.module.css'

// field set: a rule it breaks (checked here, or named by the server's 400), shown under that field
type State = { status: 'idle' | 'sending' | 'sent' | 'error'; error?: string; field?: ContactField }
const ID: Record<Exclude<ContactField, 'intent'>, string> = { name: 'f-name', email: 'f-mail', message: 'f-msg' }

export default function ContactForm() {
  const { contact, person } = content
  const [state, setState] = useState<State>({ status: 'idle' })
  const [intent, setIntent] = useState(contact.intents[0].value)
  const sent = useRef<HTMLDivElement>(null)
  useEffect(() => { if (state.status === 'sent') sent.current?.focus() }, [state.status])
  useEffect(() => { if (state.field && state.field !== 'intent') document.getElementById(ID[state.field])?.focus() }, [state])
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget), str = (k: string) => String(fd.get(k) ?? '')
    const field = invalidField({ name: str('name'), email: str('email'), message: str('message') })
    if (field) { setState({ status: 'error', error: FIELD_ERROR[field], field }); return }
    const body = { intent, name: str('name').trim(), email: str('email').trim(), message: str('message').trim(), website: str('website') }
    setState({ status: 'sending' })
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      if (r.ok) { setState({ status: 'sent' }); return }
      const j = await r.json().catch(() => ({}))
      setState({ status: 'error', error: j.error ?? 'Could not send. Please email me directly.', field: j.field in FIELD_ERROR ? j.field : undefined })
    } catch { setState({ status: 'error', error: 'Could not send. Please email me directly.' }) }
  }
  // editing the field that was flagged clears its message
  const onInput = (e: React.FormEvent<HTMLFormElement>) => { if (state.field && (e.target as HTMLInputElement).name === state.field) setState({ status: 'idle' }) }
  // tabIndex -1: focus moves here after a send, so screen readers hear it and keyboard users are not dropped at the top
  if (state.status === 'sent') return <div ref={sent} className={s.sent} role="status" tabIndex={-1}><b>{contact.sentTitle}</b> {contact.sentBody}</div>
  const fieldProps = (f: Exclude<ContactField, 'intent'>) => state.field === f ? { 'aria-invalid': true, 'aria-describedby': `${ID[f]}-err` } : {}
  const fieldError = (f: Exclude<ContactField, 'intent'>) => state.field === f && <p id={`${ID[f]}-err`} className={s.fieldErr}>{state.error}</p>
  return (
    <form className={s.form} onSubmit={onSubmit} onInput={onInput} noValidate>
      <div className={s.chips} role="radiogroup" aria-label="What is this about?">
        {contact.intents.map((it) => <label key={it.value}><input type="radio" name="intent" value={it.value} checked={intent === it.value} onChange={() => setIntent(it.value)} />{it.label}</label>)}
      </div>
      <div className={s.field}><label htmlFor="f-name">Your name</label><input id="f-name" name="name" placeholder="Priya Sharma" autoComplete="name" required minLength={NAME.min} maxLength={NAME.max} pattern="[^<>]+" {...fieldProps('name')} /></div>
      {fieldError('name')}
      <div className={s.field}><label htmlFor="f-mail">Email</label><input id="f-mail" name="email" type="email" placeholder="you@company.com" autoComplete="email" required {...fieldProps('email')} /></div>
      {fieldError('email')}
      <div className={s.field}><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" rows={3} placeholder="We're building a booking platform and need…" required minLength={MESSAGE.min} maxLength={MESSAGE.max} {...fieldProps('message')} /></div>
      {fieldError('message')}
      <div className={s.hp} aria-hidden="true"><label htmlFor="f-web">Website</label><input id="f-web" name="website" tabIndex={-1} autoComplete="off" /></div>
      {state.status === 'error' && (!state.field || state.field === 'intent') && <div className={s.err} role="alert">{state.error} <a href={`mailto:${person.email}`}>{person.email}</a></div>}
      <div className={s.row}>
        <button className="btn" type="submit" disabled={state.status === 'sending'}><span>{state.status === 'sending' ? 'Sending…' : 'Send message →'}</span></button>
        <small>Or email <a href={`mailto:${person.email}`}>{person.email}</a> directly</small>
      </div>
    </form>
  )
}
