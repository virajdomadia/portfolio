import type { Detail } from '@/lib/content'
import s from './CaseStudy.module.css'

const longDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/** Problem → what I built → key decisions → versions → outcome. Server-rendered, no JS. */
export default function CaseStudy({ d }: { d: Detail }) {
  const { problem, built, decisions, outcome } = d.sections
  return (
    <article className={s.cs}>
      <section><h2>The problem</h2><p>{problem}</p></section>
      <section><h2>What I built</h2><p>{built}</p></section>
      <section>
        <h2>Key decisions</h2>
        <ol className={s.dec}>{decisions.map((x) => <li key={x.title}><h3>{x.title}</h3><p>{x.body}</p></li>)}</ol>
      </section>
      <section>
        <h2>Versions</h2>
        <ul className={s.ver}>{d.versions.map((v) => <li key={v.name} data-state={v.state}><b>{v.name}</b> <span>{v.state === 'shipped' ? 'Shipped' : 'Next'}</span><p>{v.summary}</p></li>)}</ul>
      </section>
      <section><h2>Outcome</h2><p>{outcome}</p></section>
      <p className={s.upd}>Updated <time dateTime={d.updated}>{longDate(d.updated)}</time></p>
    </article>
  )
}
