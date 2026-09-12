import { content } from '@/lib/content'
import s from './Marquee.module.css'

function Band({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className={`${s.band} ${reverse ? s.rev : ''}`} data-skew aria-hidden="true">
      <div className={s.inner}>{doubled.map((t, i) => <span key={i}><em className={s.item}>{t}</em><i className={s.dot}>·</i></span>)}</div>
    </div>
  )
}
export default function Marquee() {
  return <><Band items={content.marquee.stack} /><Band items={content.marquee.projects} reverse /></>
}
