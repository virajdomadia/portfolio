import type { NextConfig } from 'next'

const headers = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // structural CSP: blocks plugins, <base> hijacking, off-site form posts and framing; scripts/styles stay unrestricted for Next's inline bootstrap
  { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
  // every *.virajdomadia.com is a Vercel project, HTTPS only, so subdomains can be pinned too (no preload: that is hard to undo)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
]
// public/ media, the résumé and llms*.txt: Vercel serves them with max-age=0, so every view revalidates. Their names
// carry no hash, so not immutable: a day fresh, then a week of serving the old copy while it refetches.
const media = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }]
const mediaSources = [
  '/projects/:slug/:file(.+\\.(?:webp|jpg|jpeg|png|mp4|webm))', // files only: /projects/:slug itself is a page
  '/images/:path*',
  '/Viraj-Domadia-Resume.pdf',
  '/:file(llms(?:-full)?\\.txt)',
]

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() { return [{ source: '/(.*)', headers }, ...mediaSources.map((source) => ({ source, headers: media }))] },
  // Vercel Hobby allows 5,000 image transformations a month. Every distinct source × width × quality is one
  // transformation, so keep that set small and closed: local images only (the YouTube thumbnail is served by
  // YouTube, unoptimized), two qualities, a few widths, and cache each result for the 31-day maximum.
  images: {
    qualities: [60, 75],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 2678400,
  },
}

export default nextConfig
