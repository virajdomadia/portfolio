'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GROUPS, score, speedCheck, topFixes, verdict, type Check, type Group } from '@/lib/checkup/analyze'
import { content } from '@/lib/content'
import s from './Checkup.module.css'

type Result = { url: string; checks: Check[] }
type Speed = { state: 'idle' | 'running' | 'failed' } | { state: 'done'; perf: number; lcp?: string }
type State = { status: 'idle' | 'checking' } | { status: 'error'; error: string } | { status: 'done'; result: Result }

const STEPS = ['Opening your website like a phone would…', 'Reading what Google sees…', 'Looking for call, WhatsApp and enquiry buttons…', 'Checking how it looks when shared…', 'Putting the report together…']
const ICON: Record<Check['status'], string> = { pass: '✓', warn: '!', fail: '✕' }
const LABEL: Record<Check['status'], string> = { pass: 'Good', warn: 'Could be better', fail: 'Fix this' }
const pageUrl = () => `${window.location.origin}/tools/website-checkup`

export default function Checkup() {
  const [input, setInput] = useState('')
  const [state, setState] = useState<State>({ status: 'idle' })
  const [speed, setSpeed] = useState<Speed>({ state: 'idle' })
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const report = useRef<HTMLDivElement>(null)
  const run = useRef(0)

  const check = useCallback(async (raw: string) => {
    const url = raw.trim()
    if (!url) { setState({ status: 'error', error: 'Please enter your website address, like mybakery.in.' }); return }
    const id = ++run.current
    setState({ status: 'checking' }); setSpeed({ state: 'running' }); setStep(0)
    const post = (path: string) => fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url }) })
    post('/api/checkup/speed').then(async (r) => {
      const j = await r.json().catch(() => ({}))
      if (run.current !== id) return
      setSpeed(r.ok && typeof j.perf === 'number' ? { state: 'done', perf: j.perf, lcp: j.lcp } : { state: 'failed' })
    }).catch(() => { if (run.current === id) setSpeed({ state: 'failed' }) })
    try {
      const r = await post('/api/checkup')
      const j = await r.json().catch(() => ({}))
      if (run.current !== id) return
      if (!r.ok) { setState({ status: 'error', error: j.error ?? 'Something went wrong. Please try again.' }); setSpeed({ state: 'idle' }); return }
      setState({ status: 'done', result: j as Result })
      const host = new URL((j as Result).url).hostname
      window.history.replaceState(null, '', `?url=${encodeURIComponent(host)}`)
    } catch {
      if (run.current === id) setState({ status: 'error', error: 'Couldn’t reach the checker. Check your connection and try again.' })
    }
  }, [])

  // a shared link (?url=mybakery.in) runs the check straight away
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('url')
    if (u) { setInput(u); void check(u) }
  }, [check])

  useEffect(() => {
    if (state.status !== 'checking') return
    const t = setInterval(() => setStep((n) => Math.min(n + 1, STEPS.length - 1)), 1600)
    return () => clearInterval(t)
  }, [state.status])

  useEffect(() => { if (state.status === 'done') report.current?.focus() }, [state.status])

  const checks = state.status === 'done'
    ? [...state.result.checks, ...(speed.state === 'done' ? [speedCheck(speed.perf, speed.lcp)] : [])]
    : []
  const total = score(checks), v = verdict(total), fixes = topFixes(checks)
  const host = state.status === 'done' ? new URL(state.result.url).hostname.replace(/^www\./, '') : ''
  const share = `https://wa.me/?text=${encodeURIComponent(`I ran a free health check on my website (${total}/100). Check yours in 20 seconds: ${state.status === 'done' ? pageUrl() : ''}`)}`
  const talk = `https://wa.me/${content.person.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi Viraj, I ran the free website check on ${host} (score ${total}/100). Can you help me fix the top issues?`)}`

  return (
    <div className={s.tool}>
      <form className={s.form} onSubmit={(e) => { e.preventDefault(); void check(input) }} noValidate>
        <label htmlFor="ck-url" className="sr-only">Your website address</label>
        <input id="ck-url" className={s.input} type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="yourbusiness.in"
          value={input} onChange={(e) => setInput(e.target.value)} aria-invalid={state.status === 'error' || undefined} aria-describedby={state.status === 'error' ? 'ck-err' : 'ck-note'} />
        <button className={`btn ${s.go}`} type="submit" disabled={state.status === 'checking'}><span>{state.status === 'checking' ? 'Checking…' : 'Check my website'}</span></button>
      </form>
      <p id="ck-note" className={s.note}>Free · No sign-up · About 20 seconds</p>
      {state.status === 'error' && <p id="ck-err" className={s.err} role="alert">{state.error}</p>}

      {state.status === 'checking' && (
        <div className={s.loading} role="status" aria-live="polite">
          <span className={s.spinner} aria-hidden="true" />
          <span>{STEPS[step]}</span>
        </div>
      )}

      {state.status === 'done' && (
        <div ref={report} className={s.report} tabIndex={-1} aria-label={`Report for ${host}`}>
          <header className={s.summary}>
            <div className={`${s.dial} ${total >= 75 ? s.dialPass : total >= 45 ? s.dialWarn : ''}`} style={{ '--v': total } as React.CSSProperties} role="img" aria-label={`Score ${total} out of 100`}>
              <b>{total}</b><small>/100</small>
            </div>
            <div>
              <p className="mono">Report for {host}</p>
              <h2 className={s.verdict}>{v.label}</h2>
              <p className={s.line}>{v.line}</p>
              {speed.state === 'running' && <p className={s.pending}><span className={s.spinner} aria-hidden="true" /> Google’s phone speed test is still running. The score will update.</p>}
              {speed.state === 'failed' && <p className={s.pending}>Google’s speed test didn’t finish this time, so speed isn’t in the score.</p>}
            </div>
          </header>

          {fixes.length > 0 && (
            <section className={s.fixes} aria-labelledby="ck-fixes">
              <h3 id="ck-fixes" className={s.h3}>Fix these first</h3>
              <ol>{fixes.map((c, i) => (
                <li key={c.id} className={s.fix}>
                  <span className={s.num}>{i + 1}</span>
                  <div><b>{c.title}</b><p>{c.found}</p><p className={s.how}><em>How to fix:</em> {c.fix}</p></div>
                </li>
              ))}</ol>
            </section>
          )}

          <div className={s.actions}>
            <a className="btn" href={talk} target="_blank" rel="noopener noreferrer"><span>Get these fixed: WhatsApp Viraj</span></a>
            <a className="btn o" href={share} target="_blank" rel="noopener noreferrer"><span>Share this tool</span></a>
            <button className="btn o" type="button" onClick={() => { void navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }}><span>{copied ? 'Link copied' : 'Copy report link'}</span></button>
          </div>

          {(Object.keys(GROUPS) as Group[]).map((g) => {
            const list = checks.filter((c) => c.group === g)
            if (!list.length) return null
            const ok = list.filter((c) => c.status === 'pass').length
            return (
              <section key={g} className={s.group} aria-labelledby={`ck-${g}`}>
                <div className={s.groupHd}><h3 id={`ck-${g}`} className={s.h3}>{GROUPS[g].title}</h3><span className="mono">{ok}/{list.length} good</span></div>
                <p className={s.blurb}>{GROUPS[g].blurb}</p>
                <ul className={s.list}>{list.map((c) => (
                  <li key={c.id}>
                    <details className={`${s.item} ${s[c.status]}`}>
                      <summary><span className={s.badge} aria-hidden="true">{ICON[c.status]}</span><span className={s.title}>{c.title}</span><span className={s.state}>{LABEL[c.status]}</span></summary>
                      <div className={s.body}>
                        <p><em>What we found:</em> {c.found}</p>
                        <p><em>Why it matters:</em> {c.why}</p>
                        {c.status !== 'pass' && <p><em>How to fix:</em> {c.fix}</p>}
                      </div>
                    </details>
                  </li>
                ))}</ul>
              </section>
            )
          })}

          <aside className={s.cta}>
            <p className="mono">Want a hand?</p>
            <p className={s.ctaLine}>I’m Viraj, a full-stack developer in Bengaluru. Send me this report on WhatsApp and I’ll reply with exactly how I’d fix your top 3 issues. Free, no obligation.</p>
            <div className={s.actions}>
              <a className="btn" href={talk} target="_blank" rel="noopener noreferrer"><span>WhatsApp me the report</span></a>
              <button className="btn o" type="button" onClick={() => { setState({ status: 'idle' }); setSpeed({ state: 'idle' }); setInput(''); window.history.replaceState(null, '', window.location.pathname); document.getElementById('ck-url')?.focus() }}><span>Check another site</span></button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
