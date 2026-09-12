'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { content } from '@/lib/content'
import s from './About.module.css'

export default function Portrait() {
  const ref = useRef<HTMLElement>(null)
  const { photoAlt, captions } = content.about
  const move = (e: React.MouseEvent) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg'); el.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg') }
  const leave = () => { ref.current?.style.setProperty('--ry', '0deg'); ref.current?.style.setProperty('--rx', '0deg') }
  return (
    <div className={s.tilt} onMouseMove={move} onMouseLeave={leave}>
      <figure ref={ref} className={s.pic} data-reveal="none" data-parallax>
        <Image src="/images/about.jpg" alt={photoAlt} fill sizes="(max-width: 820px) 100vw, 460px" />
        <figcaption className={s.cap}><span>{captions[0]}</span><span className={s.live}><i aria-hidden="true" />{captions[1]}</span></figcaption>
      </figure>
    </div>
  )
}
