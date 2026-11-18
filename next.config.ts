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
  images: { remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }] },
}

export default nextConfig
