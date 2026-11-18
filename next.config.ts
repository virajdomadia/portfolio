import type { NextConfig } from 'next'

const headers = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // structural CSP: blocks plugins, <base> hijacking, off-site form posts and framing; scripts/styles stay unrestricted for Next's inline bootstrap
  { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
]

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() { return [{ source: '/(.*)', headers }] },
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
