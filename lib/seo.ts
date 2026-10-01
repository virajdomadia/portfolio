import { content } from './content'
import { absolute, siteUrl } from './site'
import type { DetailProject } from './projects'

const { person, seo, faq, tools, hero, education } = content
const ID = { person: () => `${siteUrl()}/#person`, site: () => `${siteUrl()}/#website`, page: () => `${siteUrl()}/#profile` }
const place = (city: string, region?: string) => ({ '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: city, ...(region ? { addressRegion: region } : {}), addressCountry: person.countryCode } })

/** One @graph for the home page. Every fact here is also visible on the page (Google's structured-data policy). */
// Text on the home OG image (app/opengraph-image.tsx), derived from content so it never drifts from the site.
export function homeOgText() {
  const { person, marquee } = content
  return {
    eyebrow: `${person.role} · ${person.city}`.toUpperCase(),
    stack: `${marquee.stack.slice(0, 5).join(' · ')} — open to full-time & freelance`,
  }
}

export function jsonLdGraph() {
  const personNode = {
    '@type': 'Person', '@id': ID.person(), name: person.name, givenName: person.first, familyName: person.last,
    url: siteUrl(), image: absolute('/opengraph-image'), description: person.bio,
    jobTitle: person.jobTitle, email: `mailto:${person.email}`, telephone: person.phone,
    homeLocation: place(person.city, person.region), birthPlace: place(person.origin, 'Maharashtra'), nationality: { '@type': 'Country', name: person.country },
    worksFor: { '@type': 'Organization', name: person.employer.name, url: person.employer.url },
    hasOccupation: { '@type': 'Occupation', name: person.role, occupationLocation: { '@type': 'City', name: person.city } },
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school, ...(e.schoolUrl ? { url: e.schoolUrl } : {}) })),
    knowsAbout: [...tools.map((t) => t.name), 'MERN stack', 'REST APIs', 'WebSockets', 'Frontend architecture'],
    knowsLanguage: person.languages.map((l) => ({ '@type': 'Language', name: l })),
    sameAs: seo.sameAs,
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode,
      { '@type': 'WebSite', '@id': ID.site(), url: siteUrl(), name: seo.siteName, description: seo.description, inLanguage: 'en', publisher: { '@id': ID.person() } },
      { '@type': 'ProfilePage', '@id': ID.page(), url: siteUrl(), name: seo.title, isPartOf: { '@id': ID.site() }, about: { '@id': ID.person() }, mainEntity: { '@id': ID.person() }, description: hero.lede, dateModified: new Date().toISOString().slice(0, 10) },
      { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }
}

/** BreadcrumbList for inner pages (Phase B: /projects/<slug>). */
export function breadcrumbs(items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absolute(it.path) })) }
}

/** @graph for /projects/<slug>: the software itself + the visible breadcrumb. */
export function projectJsonLd(p: DetailProject) {
  const path = `/projects/${p.slug}`
  const crumbs = breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/#projects' }, { name: p.title, path }]) as Partial<ReturnType<typeof breadcrumbs>>
  delete crumbs['@context']
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode', '@id': `${absolute(path)}#software`, name: p.title, description: p.detail.pitch,
        url: p.live, codeRepository: p.repo, programmingLanguage: p.stack, dateModified: p.detail.updated,
        image: p.detail.media.map((m) => absolute(m.kind === 'image' ? m.src : m.poster)),
        mainEntityOfPage: absolute(path),
        author: { '@type': 'Person', '@id': ID.person(), name: person.name, url: siteUrl() },
      },
      crumbs,
    ],
  }
}
