'use client'
import { useEffect, useRef } from 'react'
/** Adds html.inverted while the wrapped section is ≥30% visible (the page goes dark). */
export default function InvertOnView({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver((e) => document.documentElement.classList.toggle('inverted', e[0].isIntersecting), { threshold: .3 })
    io.observe(el); return () => { io.disconnect(); document.documentElement.classList.remove('inverted') }
  }, [])
  return <div ref={ref}>{children}</div>
}
