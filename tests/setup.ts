import '@testing-library/jest-dom/vitest'

// jsdom lacks these; components guard on them but tests need stable stubs
class IO { observe() {} unobserve() {} disconnect() {} takeRecords() { return [] } root = null; rootMargin = ''; thresholds = [] }
;(globalThis as any).IntersectionObserver = IO
;(globalThis as any).ResizeObserver = IO
window.matchMedia = window.matchMedia || ((q: string) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false } }) as MediaQueryList)
