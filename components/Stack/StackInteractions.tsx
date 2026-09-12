'use client'
import { useEffect, useRef } from 'react'

/** Proximity dock: pills near the cursor grow, lift and take their brand colour. Pointer devices only. */
export default function StackInteractions({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current; if (!host) return
    const g = host.querySelector<HTMLElement>('[data-groups]')
    if (!g) return
    const pills = Array.from(g.querySelectorAll<HTMLElement>('.tpill'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = !window.matchMedia('(hover: hover)').matches
    if (reduce || touch) return
    let mx = -1e4, my = -1e4, raf: number | null = null
    const dock = () => {
      pills.forEach((p) => {
        const r = p.getBoundingClientRect(), d = Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my), k = Math.max(0, 1 - d / 170)
        p.style.setProperty('--s', (1 + k * .1).toFixed(3)); p.style.setProperty('--ty', (-k * 4).toFixed(1) + 'px')
        const svgEl = p.querySelector('svg')
        if (svgEl) svgEl.style.fill = k > .35 ? getComputedStyle(p).getPropertyValue('--b') : ''
      })
    }
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (raf) return; raf = requestAnimationFrame(() => { raf = null; dock() }) }
    const onLeave = () => { mx = my = -1e4; dock() }
    g.addEventListener('mousemove', onMove); g.addEventListener('mouseleave', onLeave)
    return () => { g.removeEventListener('mousemove', onMove); g.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref}>{children}</div>
}
