import Image from 'next/image'
import { content } from '@/lib/content'
import s from './Band.module.css'

export default function Band() {
  const { headline, sub, alt } = content.band
  return (
    <section className={s.band} data-progress="band" aria-label={headline}>
      <div className={s.img}><Image src="/images/band.jpg" alt={alt} fill sizes="100vw" /></div>
      <div className={`wrap ${s.txt}`}>
        <p className={s.big} aria-label={headline}>{[...headline].map((c, i) => c === ' ' ? ' ' : <span key={i} className={s.ch} data-ch style={{ ['--i' as string]: i }} aria-hidden="true">{c}</span>)}</p>
        <p className={s.sub}>{sub}</p>
      </div>
    </section>
  )
}
