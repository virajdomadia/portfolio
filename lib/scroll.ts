export const clamp01 = (n: number) => (n <= 0 ? 0 : n > 1 ? 1 : n)

/** wrapper taller than the viewport with a sticky child: 0 at top → 1 when the extra height is scrolled */
export const stickyProgress = (top: number, height: number, vh: number) => {
  const total = height - vh
  return total > 0 ? clamp01(-top / total) : 1
}
/** giant section words: enter at the bottom (0) → settled by ~45% of the viewport (1) */
export const viewProgress = (top: number, vh: number) => clamp01((vh * 0.95 - top) / (vh * 0.5))
/** word-by-word reveal: starts when the block's top hits 88% of vh, done at 33% */
export const wordsProgress = (top: number, vh: number) => clamp01((vh * 0.88 - top) / (vh * 0.55))
/** stacking cards: 0 when the stack's top is at 60% of vh → 1 when the stack has scrolled through */
export const spanProgress = (top: number, height: number, vh: number) => {
  const total = height - vh * 0.6
  return total > 0 ? clamp01((vh * 0.6 - top) / total) : 1
}
/** parallax band: position of the element through the viewport, 0 (below) → 1 (above) */
export const bandProgress = (top: number, height: number, vh: number) => clamp01((vh - top) / (vh + height))
/** cover slides: how far the NEXT slide has risen over the viewport */
export const coverProgress = (nextTop: number, vh: number) => clamp01((vh - nextTop) / vh)
/** parallax offset in px: 0 when centred, ±40 at the edges */
export const parallaxOffset = (top: number, height: number, vh: number) => (((vh / 2) - (top + height / 2)) / vh) * 40 || 0
/** marquee skew from scroll velocity, clamped to ±10° */
export const velocitySkew = (delta: number) => Math.max(-10, Math.min(10, delta * 0.18))
