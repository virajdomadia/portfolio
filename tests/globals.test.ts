import { describe, it, expect } from 'vitest'
import fs from 'node:fs'

const css = fs.readFileSync('app/globals.css', 'utf8')

describe('globals.css tokens', () => {
  it('defines the Butter palette exactly', () => {
    expect(css).toMatch(/--bg:\s*#F7E6A2/i)
    expect(css).toMatch(/--ink:\s*#1F1B10/i)
    expect(css).toMatch(/--acc:\s*#1C3BFF/i)
    expect(css).toMatch(/--acc-2:\s*#FFC800/i)
  })
  it('never uses Inter', () => { expect(css.toLowerCase()).not.toContain('inter,') })
  it('gates hidden reveal state behind html.js', () => {
    expect(css).toMatch(/html\.js \[data-reveal\]:not\(\.in\)/)
  })
  it('honours reduced motion', () => { expect(css).toContain('prefers-reduced-motion: reduce') })
})
