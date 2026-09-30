'use client'
import Image from 'next/image'
import { useState } from 'react'
import s from './Walkthrough.module.css'

/** Narrated walkthrough: a thumbnail until clicked, so YouTube costs nothing on page load. */
export default function Walkthrough({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false)
  return (
    <section className={s.wt} aria-labelledby="walkthrough-h">
      <h2 id="walkthrough-h" className={s.h}>Walkthrough</h2>
      <div className={s.box}>
        {on
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={`${title} walkthrough video`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          : <button type="button" className={s.play} onClick={() => setOn(true)} aria-label={`Play the ${title} walkthrough video`}>
              <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" width={480} height={360} sizes="(max-width: 900px) 100vw, 900px" />
              <span aria-hidden="true">▶</span>
            </button>}
      </div>
    </section>
  )
}
