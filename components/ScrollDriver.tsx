'use client'
import { useEffect } from 'react'
import { bandProgress, coverProgress, parallaxOffset, spanProgress, stickyProgress, velocitySkew, viewProgress, wordsProgress } from '@/lib/scroll'

/** Writes the scroll-progress CSS variables and toggles reveal classes. Mount once in the layout. */
export default function ScrollDriver() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    let lastY = window.scrollY, skewTimer: number | undefined, raf: number | null = null

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    document.querySelectorAll('[data-reveal], .hd').forEach((el) => io.observe(el))

    const tick = () => {
      const vh = window.innerHeight
      root.style.setProperty('--sp', String(window.scrollY / Math.max(1, root.scrollHeight - vh)))

      document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => {
        const r = el.getBoundingClientRect(); const mode = el.dataset.progress
        let p = 0
        if (mode === 'sticky') p = stickyProgress(r.top, r.height, vh)
        else if (mode === 'view') p = viewProgress(r.top, vh)
        else if (mode === 'words') p = wordsProgress(r.top, vh)
        else if (mode === 'band') p = bandProgress(r.top, r.height, vh)
        else if (mode === 'span') { el.style.setProperty('--P', String(reduce ? 1 : spanProgress(r.top, r.height, vh))); return }
        el.style.setProperty('--p', String(reduce ? (mode === 'sticky' ? 0 : 1) : p))
      })

      const slides = document.querySelectorAll<HTMLElement>('[data-slide]')
      let active = 0
      slides.forEach((el, i) => {
        const next = slides[i + 1]
        const c = next ? coverProgress(next.getBoundingClientRect().top, vh) : 0
        el.style.setProperty('--c', String(reduce ? 0 : c))
        if (el.getBoundingClientRect().top <= vh * 0.5) active = i
      })
      document.querySelectorAll<HTMLElement>('[data-dot]').forEach((d, i) => d.classList.toggle('on', i === active))

      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--py', reduce ? '0' : parallaxOffset(r.top, r.height, vh).toFixed(1))
      })

      if (!reduce) {
        const delta = window.scrollY - lastY; lastY = window.scrollY
        const skew = velocitySkew(delta) + 'deg'
        document.querySelectorAll<HTMLElement>('[data-skew]').forEach((m) => m.style.setProperty('--skew', skew))
        window.clearTimeout(skewTimer)
        skewTimer = window.setTimeout(() => document.querySelectorAll<HTMLElement>('[data-skew]').forEach((m) => m.style.setProperty('--skew', '0deg')), 120)
      }
    }
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = null; tick() }) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    tick(); const t = window.setTimeout(tick, 500)
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); window.clearTimeout(t); window.clearTimeout(skewTimer); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return null
}
