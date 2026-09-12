import { content } from '@/lib/content'
import s from './About.module.css'

export default function ExperienceStack() {
  return (
    <div className={s.exp} data-progress="span">
      {content.experience.map((e, i) => (
        <article key={e.title} className={s.card} style={{ ['--i' as string]: i }} data-reveal>
          <span className={s.idx} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div className={s.yr}>{e.year}<small>{e.period}</small></div>
          <div><b>{e.title}</b><p>{e.desc}</p>{e.chips && <div className={s.chips}>{e.chips.map((c) => <span key={c}>{c}</span>)}</div>}</div>
        </article>
      ))}
    </div>
  )
}
