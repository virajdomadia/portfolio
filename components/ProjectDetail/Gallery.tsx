'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Media } from '@/lib/content'
import s from './Gallery.module.css'

const still = (m: Media) => (m.kind === 'image' ? m.src : m.poster)
const file = (m: Media) => (m.kind === 'image' ? m.src : m.mp4)
const dur = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Stage + thumbnail strip + lightbox for any mix of images and clips. Item 0 is server-rendered (a clip's poster until hydration). */
export default function Gallery({ media, title }: { media: Media[]; title: string }) {
  const n = media.length
  const [i, setI] = useState(0)
  const [hydrated, setHydrated] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [broken, setBroken] = useState<ReadonlySet<number>>(new Set())
  const video = useRef<HTMLVideoElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const go = (k: number) => setI(((k % n) + n) % n)
  const m = media[i]
  const isVideo = m.kind === 'clip' && hydrated && !broken.has(i)

  useEffect(() => setHydrated(true), [])
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (!reducedMotion()) v.play()?.catch(() => {})
    return () => v.pause()
  }, [i, isVideo])

  const onKey = (e: KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
  }
  const onDown = (e: PointerEvent) => {
    if ((e.target as Element).closest('video, button')) return
    startX.current = e.clientX
  }
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current; startX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1)
  }
  const fail = () => setBroken((b) => new Set(b).add(i))

  const render = (big: boolean) =>
    m.kind === 'clip' && isVideo
      ? <video key={`v${i}${big}`} ref={big ? undefined : video} className={s.media} muted playsInline loop controls preload={big ? 'auto' : 'none'} poster={m.poster} aria-label={m.alt} autoPlay={big && !reducedMotion()}>
          <source src={m.webm} type="video/webm" />
          <source src={m.mp4} type="video/mp4" onError={fail} />
        </video>
      : <Image key={`i${i}${big}`} className={s.media} src={still(m)} alt={m.alt} width={1600} height={1000} sizes={big ? '100vw' : '(max-width: 900px) 100vw, 760px'} priority={i === 0 && !big} />

  return (
    <div className={s.gallery}>
      <div className={s.stage} role="region" aria-roledescription="carousel" aria-label={`${title} gallery`} tabIndex={0} onKeyDown={onKey} onPointerDown={onDown} onPointerUp={onUp}>
        {render(false)}
        {n > 1 && <>
          <button type="button" className={`${s.arrow} ${s.prev}`} aria-label="Previous" onClick={() => go(i - 1)}>←</button>
          <button type="button" className={`${s.arrow} ${s.next}`} aria-label="Next" onClick={() => go(i + 1)}>→</button>
        </>}
        <button type="button" className={s.full} onClick={() => { dialog.current?.showModal(); setLightbox(true) }}>Fullscreen</button>
      </div>
      <p className={s.cap} aria-live="polite">
        {n > 1 ? `Item ${i + 1} of ${n} · ` : ''}{m.caption}{broken.has(i) ? ' — video could not load' : ''}
      </p>
      {n > 1 && (
        <ol className={s.strip}>
          {media.map((t, k) => (
            <li key={k}>
              <a href={file(t)} className={s.thumb} aria-current={k === i || undefined} aria-label={`Show ${t.caption}${t.kind === 'clip' ? ' (video)' : ''}`} onClick={(e) => { e.preventDefault(); go(k) }}>
                <Image src={still(t)} alt="" width={160} height={100} sizes="160px" />
                {t.kind === 'clip' && <span className={s.badge}>▶ {dur(t.seconds)}</span>}
              </a>
            </li>
          ))}
        </ol>
      )}
      <dialog ref={dialog} className={s.dialog} onClose={() => setLightbox(false)} aria-label={`${title} — ${m.caption}`}>
        <button type="button" className={s.close} onClick={() => dialog.current?.close()}>Close</button>
        {lightbox && render(true)}
      </dialog>
    </div>
  )
}
