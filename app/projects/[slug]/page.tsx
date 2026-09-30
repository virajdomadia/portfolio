import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetail from '@/components/ProjectDetail/ProjectDetail'
import Footer from '@/components/Footer'
import { detailProjects, getDetailProject } from '@/lib/projects'
import { projectJsonLd } from '@/lib/seo'
import { content } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

// Only projects with a detail block get a page; every other slug is the site's 404.
export const dynamicParams = false
export function generateStaticParams() { return detailProjects().map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getDetailProject((await params).slug)
  if (!p) return {}
  const title = `${p.title} — ${p.category}`, path = `/projects/${p.slug}`, description = p.detail.pitch
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: 'article', url: path, siteName: content.seo.siteName, locale: 'en_IN', title, description, modifiedTime: p.detail.updated },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Page({ params }: Props) {
  const p = getDetailProject((await params).slug)
  if (!p) notFound()
  return (
    <>
      <ProjectDetail p={p} />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(p)) }} />
    </>
  )
}
