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

    // Every tick is split into a read phase (all getBoundingClientRect calls) and a write phase
    // (all style.setProperty calls) so the browser lays out once, not once per element.
    const tick = () => {
      const vh = window.innerHeight
      const y = window.scrollY

      const progress = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]')).map((el) => ({ el, r: el.getBoundingClientRect(), mode: el.dataset.progress }))
      const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]')).map((el) => ({ el, top: el.getBoundingClientRect().top }))
      const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({ el, r: el.getBoundingClientRect() }))
      const dots = document.querySelectorAll<HTMLElement>('[data-dot]')
      const skewEls = document.querySelectorAll<HTMLElement>('[data-skew]')
      const scrollH = root.scrollHeight

      root.style.setProperty('--sp', String(y / Math.max(1, scrollH - vh)))

      for (const { el, r, mode } of progress) {
        let p = 0
        if (mode === 'sticky') p = stickyProgress(r.top, r.height, vh)
        else if (mode === 'view') p = viewProgress(r.top, vh)
        else if (mode === 'words') p = wordsProgress(r.top, vh)
        else if (mode === 'band') p = bandProgress(r.top, r.height, vh)
        else if (mode === 'span') { el.style.setProperty('--P', String(reduce ? 1 : spanProgress(r.top, r.height, vh))); continue }
        el.style.setProperty('--p', String(reduce ? (mode === 'sticky' ? 0 : 1) : p))
      }

      let active = 0
      slides.forEach(({ el, top }, i) => {
        const next = slides[i + 1]
        const c = next ? coverProgress(next.top, vh) : 0
        el.style.setProperty('--c', String(reduce ? 0 : c))
        if (top <= vh * 0.5) active = i
      })
      dots.forEach((d, i) => d.classList.toggle('on', i === active))

      for (const { el, r } of parallax) el.style.setProperty('--py', reduce ? '0' : parallaxOffset(r.top, r.height, vh).toFixed(1))

      if (!reduce) {
        const delta = y - lastY; lastY = y
        const skew = velocitySkew(delta) + 'deg'
        skewEls.forEach((m) => m.style.setProperty('--skew', skew))
        window.clearTimeout(skewTimer)
        skewTimer = window.setTimeout(() => skewEls.forEach((m) => m.style.setProperty('--skew', '0deg')), 120)
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
