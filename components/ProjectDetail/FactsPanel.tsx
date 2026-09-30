import type { DetailProject } from '@/lib/projects'
import s from './FactsPanel.module.css'

export default function FactsPanel({ p }: { p: DetailProject }) {
  const { detail: d } = p
  const facts: [string, string][] = [['Role', d.facts.role], ['Year', d.facts.year], ['Status', p.status], ['Version', d.facts.version]]
  return (
    <div className={s.panel}>
      <span className={s.kicker}>{p.category}</span>
      <h1 className={s.title}>{p.title}</h1>
      <p className={s.pitch}>{d.pitch}</p>
      <dl className={s.facts}>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <div className={s.tags}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
      <div className={s.acts}>
        <a className="btn" href={p.live} target="_blank" rel="noreferrer"><span>Open live ↗</span></a>
        <a className="btn o" href={p.repo} target="_blank" rel="noreferrer"><span>View code</span></a>
      </div>
    </div>
  )
}
