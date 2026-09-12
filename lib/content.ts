import type { Content, Layer } from './content-schema'
export type { Content, Project, Tool, Experience, Layer } from './content-schema'

// All copy and data for the site — values agreed with Viraj in content/decisions.md (2026-09-12).
// Plain data only (no zod at runtime) so client components can import it cheaply; tests/content.test.ts validates it.
const GH = 'https://github.com/virajdomadia'
const LI = 'https://www.linkedin.com/in/viraj-domadia-6b89751b5'

export const content: Content = {
  person: {
    name: 'Viraj Domadia', first: 'Viraj', last: 'Domadia',
    role: 'Frontend-heavy full-stack developer', roleShort: 'Full-stack developer', jobTitle: 'Software Engineer',
    city: 'Bengaluru', region: 'Karnataka', country: 'India', countryCode: 'IN', origin: 'Mumbai', tz: 'IST (UTC+5:30)',
    email: 'virajdomadia6@gmail.com', phone: '+918828091294', phoneDisplay: '+91 88280 91294',
    github: GH, linkedin: LI, resume: '/Viraj-Domadia-Resume.pdf', available: 'Available · 2026',
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Viraj Domadia is a frontend-heavy full-stack developer based in Bengaluru, originally from Mumbai. He works with React, Next.js, TypeScript, Node.js, Express, FastAPI, PostgreSQL and MongoDB. He is a Software Engineer at Zapigo, where he owns the web frontend and built Personal Invites end to end. In 2024 he moved from IT operations into full-stack development through self-directed upskilling, after roles at Venus Vacations and Accenture. He is completing an online MCA at Amity University (2025–2027) and is open to full-time and freelance work, on-site in Bengaluru or remote.',
    employer: { name: 'Zapigo', url: 'https://zapigo.com' },
  },
  hero: {
    eyebrow: ['Frontend-heavy full-stack developer', 'Bengaluru, IN', 'Open to full-time & freelance'],
    lede: 'I build the client, the server and the data layer — React, Next.js, Node, Postgres and Mongo — and ship them as products: at Zapigo I own the web frontend and built Personal Invites end to end.',
    corners: ['Viraj Domadia', 'Bengaluru · IST', 'React · Next · Node', 'Building since 2024'],
    stats: [{ n: '2+', label: 'years building' }, { n: '1', label: 'product live' }, { n: '3', label: 'companies' }],
    bgAlt: 'Illustration of a developer at a desk with three monitors',
  },
  marquee: {
    stack: ['React', 'Next.js', 'TypeScript', 'Node', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Tailwind'],
    b: ['Software Engineer @ Zapigo', 'Personal Invites · live', 'Bengaluru · IST', 'Open to full-time & freelance', 'Frontend-heavy full-stack'],
  },
  about: {
    quote: 'I moved from IT operations into full-stack development, and today I build the web at Zapigo. I like code a reviewer can read in one sitting.',
    quoteBold: ['IT operations', 'Zapigo'],
    photoAlt: 'Illustration of a developer planning a web project at a whiteboard',
    captions: ['Bengaluru · IST', 'Open to work'],
    counters: [{ to: 2, suffix: '+', label: 'years building' }, { to: 3, suffix: '', label: 'companies' }, { to: 30, suffix: 's', label: 'to create an invite' }],
    rail: 'About — Viraj Domadia — Bengaluru — 2026 —',
  },
  experience: [
    { year: '2025', period: '→ now', title: 'Software Engineer · Zapigo', org: 'Zapigo', orgUrl: 'https://zapigo.com', start: '2025-10', end: null,
      desc: 'Own the frontend of zapigo.com: Next.js 16, React 19, TypeScript, Tailwind v4, TanStack Query, Zustand and React Aria, with Vitest + Playwright tests and Sentry monitoring. Built Personal Invites end to end — create and share a digital invitation in under 30 seconds — including its FastAPI + PostgreSQL backend.',
      chips: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'TanStack Query', 'FastAPI', 'PostgreSQL'], kind: 'job' },
    { year: '2024', period: '– 2025', title: 'IT Executive · Venus Vacations Pvt. Ltd', org: 'Venus Vacations Pvt. Ltd', start: '2024-07', end: '2025-11',
      desc: 'Ran the company’s IT and hardware. Alongside that, built the company website with a custom booking engine end to end — React front, Node/Express API, MongoDB — taken through internal review, not deployed.',
      chips: ['React', 'Node · Express', 'MongoDB'], kind: 'job' },
    { year: '2022', period: '– 2023', title: 'Application Development Associate · Accenture', org: 'Accenture', orgUrl: 'https://www.accenture.com', start: '2022-12', end: '2023-07',
      desc: 'Backup and support engineer on an enterprise client account: monitored NetBackup jobs, handled incidents and restores, and worked to SLAs in a large operations team.',
      chips: ['NetBackup', 'Incident support', 'Enterprise IT'], kind: 'job' },
    { year: '2025', period: '– 2027', title: 'MCA · Amity University', org: 'Amity University', orgUrl: 'https://www.amity.edu', start: '2025-07', end: '2027-06',
      desc: 'Online MCA, alongside full-time work.', extra: 'B.Sc. IT · Narsee Monjee College of Commerce and Economics, Mumbai University · 2019–2022 · 8.33 CGPA', kind: 'study' },
  ],
  education: [
    { degree: 'Master of Computer Applications (online)', school: 'Amity University', schoolUrl: 'https://www.amity.edu', years: '2025–2027' },
    { degree: 'B.Sc. Information Technology', school: 'Narsee Monjee College of Commerce and Economics, Mumbai University', years: '2019–2022', note: '8.33 CGPA' },
  ],
  projects: [],
  comingSoon: {
    heading: 'Six projects,', headingBold: 'built properly.',
    lead: 'The tutorial apps are gone. Each of these is built to prove one production concern — and ships with a live URL, public repo, tests and a case study.',
    items: [
      { title: 'Booking platform with real payments', proves: 'Razorpay checkout, webhooks, refunds', stack: ['Next.js', 'Node', 'MongoDB', 'Razorpay'] },
      { title: '“Ask your documents” RAG assistant', proves: 'Embeddings, retrieval, streaming, citations', stack: ['Next.js', 'Claude API', 'Atlas Vector Search'] },
      { title: 'GST invoicing SaaS', proves: 'Multi-tenancy, RBAC, PostgreSQL, PDFs', stack: ['Next.js', 'PostgreSQL', 'Prisma'] },
      { title: 'Real-time collaborative kanban', proves: 'Presence, optimistic updates, queues', stack: ['Socket.io', 'Redis', 'BullMQ'] },
      { title: 'Uptime monitor & status page', proves: 'Cron workers, alerts, Docker, CI, tests', stack: ['Node', 'Postgres', 'Docker'] },
      { title: 'Bengaluru open-data dashboard', proves: 'Scheduled ingestion, aggregations, caching', stack: ['Next.js', 'MongoDB', 'Recharts'] },
    ],
    note: 'First one lands here soon. Until then, the code I ship every day is at zapigo.com.',
  },
  tools: [
    { key: 'react', name: 'React', layer: 'client', years: 2, brand: '#61DAFB' },
    { key: 'nextdotjs', name: 'Next.js', layer: 'client', years: 2, brand: '#1F1B10' },
    { key: 'typescript', name: 'TypeScript', layer: 'client', years: 1, brand: '#3178C6' },
    { key: 'javascript', name: 'JavaScript', layer: 'client', years: 2, brand: '#F7DF1E' },
    { key: 'tailwindcss', name: 'Tailwind CSS', layer: 'client', years: 2, brand: '#06B6D4' },
    { key: 'html5', name: 'HTML5', layer: 'client', years: 2, brand: '#E34F26' },
    { key: 'css3', name: 'CSS3', layer: 'client', years: 2, brand: '#1572B6' },
    { key: 'reactquery', name: 'TanStack Query', layer: 'client', years: 1, brand: '#FF4154' },
    { key: 'zustand', name: 'Zustand', layer: 'client', years: 1, brand: '#443E38' },
    { key: 'framer', name: 'Framer Motion', layer: 'client', years: 1, brand: '#0055FF' },
    { key: 'nodedotjs', name: 'Node.js', layer: 'server', years: 2, brand: '#5FA04E' },
    { key: 'express', name: 'Express', layer: 'server', years: 2, brand: '#1F1B10' },
    { key: 'fastapi', name: 'FastAPI', layer: 'server', years: 1, brand: '#009688' },
    { key: 'socketdotio', name: 'Socket.io', layer: 'server', years: 1, brand: '#1F1B10' },
    { key: 'jsonwebtokens', name: 'JWT', layer: 'server', years: 2, brand: '#1F1B10' },
    { key: 'mongodb', name: 'MongoDB', layer: 'data', years: 2, brand: '#47A248' },
    { key: 'mongoose', name: 'Mongoose', layer: 'data', years: 2, brand: '#880000' },
    { key: 'postgresql', name: 'PostgreSQL', layer: 'data', years: 1, brand: '#4169E1' },
    { key: 'prisma', name: 'Prisma', layer: 'data', years: 1, brand: '#2D3748' },
    { key: 'firebase', name: 'Firebase', layer: 'data', years: 1, brand: '#DD2C00' },
    { key: 'cloudinary', name: 'Cloudinary', layer: 'data', years: 1, brand: '#3448C5' },
    { key: 'git', name: 'Git', layer: 'tooling', years: 2, brand: '#F05032' },
    { key: 'github', name: 'GitHub', layer: 'tooling', years: 2, brand: '#1F1B10' },
    { key: 'docker', name: 'Docker', layer: 'tooling', years: 1, brand: '#2496ED' },
    { key: 'vercel', name: 'Vercel', layer: 'tooling', years: 2, brand: '#1F1B10' },
    { key: 'postman', name: 'Postman', layer: 'tooling', years: 2, brand: '#FF6C37' },
    { key: 'figma', name: 'Figma', layer: 'tooling', years: 1, brand: '#F24E1E' },
    { key: 'vitest', name: 'Vitest', layer: 'tooling', years: 1, brand: '#00A35C' },
    { key: 'playwright', name: 'Playwright', layer: 'tooling', years: 1, brand: '#2EAD33' },
    { key: 'sentry', name: 'Sentry', layer: 'tooling', years: 1, brand: '#362D59' },
  ],
  stack: { heading: 'What I ship with,', headingBold: 'by layer.', note: 'Real logos, years of real use, grouped by where each tool lives. Hover a pill.' },
  band: { headline: 'Build. Ship. Repeat.', sub: 'Code first, slides never — what I build at work is live at zapigo.com, and the next six projects land here.', alt: 'Illustration of a developer coding at night with a laptop and two monitors' },
  contact: {
    heading: 'Tell me what', headingBold: 'you’re building.',
    lead: 'A role, a project, a question — a few lines is enough. I reply within a day, usually with questions of my own.',
    intents: [{ value: 'role', label: 'Hiring for a role' }, { value: 'project', label: 'A freelance project' }, { value: 'hi', label: 'Just saying hi' }],
    practical: ['Bengaluru, India · IST (UTC+5:30)', 'Open to full-time, freelance, remote', 'Replies within 24h'],
    sentTitle: 'Sent.', sentBody: 'Thanks — I’ll get back to you within a day. Meanwhile, my code is on GitHub.',
  },
  faq: [
    { q: 'Is Viraj Domadia available for work?', a: 'Yes — open to full-time roles and freelance projects, in Bengaluru or remote. Replies within a day.' },
    { q: 'What does Viraj build with?', a: 'React and Next.js with TypeScript on the client; Node/Express and FastAPI APIs; PostgreSQL and MongoDB. Currently a Software Engineer at Zapigo, where he owns the web frontend.' },
    { q: 'Where is Viraj based?', a: 'Bengaluru, India (IST, UTC+5:30); originally from Mumbai. Works with remote teams across time zones.' },
    { q: 'How do I contact Viraj?', a: 'The form on this page, email virajdomadia6@gmail.com, or call +91 88280 91294.' },
  ],
  seo: {
    siteName: 'Viraj Domadia',
    title: 'Viraj Domadia — Frontend-heavy full-stack developer, Bengaluru',
    description: 'Frontend-heavy full-stack developer in Bengaluru — React, Next.js, TypeScript, Node, FastAPI, Postgres, MongoDB. Software Engineer at Zapigo. Open to work.',
    keywords: ['Viraj Domadia', 'frontend heavy full stack developer', 'full stack developer Bengaluru', 'react developer Bengaluru', 'Next.js developer Bangalore', 'full stack developer Mumbai', 'MERN developer India', 'freelance web developer Bengaluru', 'software engineer Zapigo'],
    sameAs: [GH, LI],
  },
  footer: { tech: 'Next.js · Tailwind · TypeScript' },
}

export const LAYERS: { key: Layer; label: string }[] = [
  { key: 'client', label: 'Client' }, { key: 'server', label: 'Server' }, { key: 'data', label: 'Data' }, { key: 'tooling', label: 'Tooling' },
]
