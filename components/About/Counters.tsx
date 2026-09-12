'use client'
import { useEffect, useRef } from 'react'
import { content } from '@/lib/content'
import s from './About.module.css'

type Revealable = HTMLElement & { __reveal?: () => void }

export default function Counters() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current; if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = (n: HTMLElement) => {
      const to = Number(n.dataset.count); if (reduce) { n.textContent = String(to); return }
      const t0 = performance.now(), dur = 1100
      const step = (t: number) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); n.textContent = String(Math.round(to * e)); if (p < 1) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    }
    const tiles = Array.from(root.querySelectorAll<Revealable>('[data-reveal]'))
    tiles.forEach((tile) => { tile.__reveal = () => tile.querySelectorAll<HTMLElement>('[data-count]').forEach(run) })
    // ScrollDriver adds `.in` when the tile scrolls into view; that's the trigger
    const mo = new MutationObserver(() => tiles.forEach((tile) => { if (tile.classList.contains('in') && !tile.dataset.done) { tile.dataset.done = '1'; tile.__reveal?.() } }))
    tiles.forEach((tile) => mo.observe(tile, { attributes: true, attributeFilter: ['class'] }))
    return () => mo.disconnect()
  }, [])
  return (
    <div ref={ref} className={s.stats}>
      {content.about.counters.map((c, i) => (
        <div key={c.label} className={s.stat} data-reveal data-delay={String(i)}><div className={s.n}><span data-count={c.to}>0</span>{c.suffix && <i>{c.suffix}</i>}</div><small>{c.label}</small></div>
      ))}
    </div>
  )
}
