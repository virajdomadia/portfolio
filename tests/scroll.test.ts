import { describe, it, expect } from 'vitest'
import { clamp01, stickyProgress, viewProgress, wordsProgress, spanProgress, bandProgress, coverProgress, parallaxOffset, velocitySkew } from '@/lib/scroll'

describe('scroll maths', () => {
  it('clamps', () => { expect(clamp01(-1)).toBe(0); expect(clamp01(2)).toBe(1); expect(clamp01(.4)).toBe(.4) })
  it('sticky: 0 at top, 1 when the wrapper has scrolled its extra height', () => {
    expect(stickyProgress(0, 1600, 1000)).toBe(0)
    expect(stickyProgress(-600, 1600, 1000)).toBe(1)
    expect(stickyProgress(-300, 1600, 1000)).toBeCloseTo(.5)
    expect(stickyProgress(0, 800, 1000)).toBe(1) // shorter than viewport → treated as done
  })
  it('view: 0 when entering at the bottom, 1 at ~45% of viewport', () => {
    expect(viewProgress(950, 1000)).toBe(0)
    expect(viewProgress(450, 1000)).toBe(1)
  })
  it('words: 0 at 88% of vh, 1 at 33%', () => {
    expect(wordsProgress(880, 1000)).toBe(0)
    expect(wordsProgress(330, 1000)).toBeCloseTo(1)
  })
  it('span: 0 when the stack top is at 60% of vh, 1 when fully scrolled', () => {
    expect(spanProgress(600, 2000, 1000)).toBe(0)
    expect(spanProgress(-800, 2000, 1000)).toBe(1)
  })
  it('band: centre of element through the viewport', () => { expect(bandProgress(1000, 500, 1000)).toBe(0); expect(bandProgress(-500, 500, 1000)).toBe(1) })
  it('cover: how far the next slide has risen over the viewport', () => { expect(coverProgress(1000, 1000)).toBe(0); expect(coverProgress(0, 1000)).toBe(1) })
  it('parallax: 0 at viewport centre, negative below', () => { expect(parallaxOffset(400, 200, 1000)).toBe(0); expect(parallaxOffset(900, 200, 1000)).toBeLessThan(0) })
  it('skew clamps to ±10 degrees', () => { expect(velocitySkew(1000)).toBe(10); expect(velocitySkew(-1000)).toBe(-10); expect(velocitySkew(10)).toBeCloseTo(1.8) })
})
