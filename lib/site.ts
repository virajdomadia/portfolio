/** The canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel; everything (metadata, sitemap, JSON-LD, llms.txt) derives from it. */
export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virajdomadia.vercel.app').replace(/\/+$/, '')
export const absolute = (path: string) => `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`
