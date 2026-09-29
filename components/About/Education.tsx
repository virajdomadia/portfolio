import { content } from '@/lib/content'
import s from './About.module.css'

/** Degrees as a quiet ruled list under the job cards — kept apart so the timeline reads as work only. */
export default function Education() {
  return (
    <div className={s.edu} data-reveal>
      <h3 className={s.eduH}>Education</h3>
      <ul>
        {content.education.map((e) => (
          <li key={e.degree}>
            <b>{e.schoolUrl ? <a href={e.schoolUrl} target="_blank" rel="noreferrer">{e.degree}</a> : e.degree}</b>
            <time>{e.years}</time>
            <span>{e.school}</span>
            {e.note && <small>{e.note}</small>}
          </li>
        ))}
      </ul>
    </div>
  )
}
