// Report types and scoring, shared by the server (analyze) and the browser. No HTML parser here, so it stays small.

export type Group = 'google' | 'phone' | 'contact' | 'trust'
export type Status = 'pass' | 'warn' | 'fail'
export type Check = { id: string; group: Group; status: Status; title: string; found: string; why: string; fix: string; weight: number }

export const GROUPS: Record<Group, { title: string; blurb: string }> = {
  google: { title: 'Can Google find you?', blurb: 'If Google can’t read your site, people searching for what you sell never see it.' },
  phone: { title: 'Does it work on a phone?', blurb: 'Most of your visitors are on a phone, often on mobile data.' },
  contact: { title: 'Can customers reach you in one tap?', blurb: 'Every extra step between “interested” and “talking to you” loses people.' },
  trust: { title: 'Does it look trustworthy?', blurb: 'People decide in seconds whether a business is real and active.' },
}

/** 0–100: full weight for a pass, a third for a warning, nothing for a failure. */
export function score(checks: Check[]): number {
  const total = checks.reduce((s, c) => s + c.weight, 0)
  if (!total) return 0
  const got = checks.reduce((s, c) => s + (c.status === 'pass' ? c.weight : c.status === 'warn' ? c.weight / 3 : 0), 0)
  return Math.round((got / total) * 100)
}

/** The fixes worth doing first: failures before warnings, heaviest first. */
export function topFixes(checks: Check[], n = 3): Check[] {
  const rank = (c: Check) => (c.status === 'fail' ? 2 : 1) * c.weight
  return checks.filter((c) => c.status !== 'pass').sort((a, b) => rank(b) - rank(a)).slice(0, n)
}

export function verdict(s: number): { label: string; line: string } {
  if (s >= 85) return { label: 'Strong', line: 'Your site does the basics well. The gains now are in speed and turning more visitors into enquiries.' }
  if (s >= 65) return { label: 'Decent, with leaks', line: 'Customers can find and use your site, but a few gaps are quietly costing you enquiries.' }
  if (s >= 40) return { label: 'Losing customers', line: 'Several basics are missing, so people who find you are likely leaving without contacting you.' }
  return { label: 'Needs urgent work', line: 'Google and phone visitors are struggling with this site. The fixes below are quick wins.' }
}

/** PageSpeed mobile performance score (0–100) → a phone-group check, merged in once the slower speed test finishes. */
export function speedCheck(perf: number, lcp?: string): Check {
  return { id: 'speed', group: 'phone', weight: 12, title: 'Loads fast on a phone (Google’s test)',
    status: perf >= 75 ? 'pass' : perf >= 45 ? 'warn' : 'fail',
    found: `Google’s mobile speed score: ${perf}/100${lcp ? `; the main content appears after ${lcp}` : ''}.`,
    why: 'Over half of phone visitors leave a page that takes more than 3 seconds. Google also ranks faster sites higher.',
    fix: 'Compress photos (WebP, under 200 KB), remove unused plugins and chat widgets, and use good hosting.' }
}
