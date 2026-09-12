import { content } from './content'
import { absolute, siteUrl } from './site'

const { person, seo, faq, tools, hero, education } = content
const ID = { person: () => `${siteUrl()}/#person`, site: () => `${siteUrl()}/#website`, page: () => `${siteUrl()}/#profile` }
const place = (city: string, region?: string) => ({ '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: city, ...(region ? { addressRegion: region } : {}), addressCountry: person.countryCode } })

/** One @graph for the home page. Every fact here is also visible on the page (Google's structured-data policy). */
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
