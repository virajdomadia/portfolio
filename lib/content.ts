import type { Content, Layer } from './content-schema'
export type { Content, Project, Tool, Experience, Layer } from './content-schema'

// All copy and data for the site. Plain data only (no zod at runtime) so client components can import it cheaply;
// tests/content.test.ts validates it against ContentSchema.
const GH = 'https://github.com/virajdomadia'

export const content: Content = {
  person: { name: 'Viraj Domadia', first: 'Viraj', last: 'Domadia', role: 'Full-stack developer', city: 'Mumbai, IN', email: 'virajdomadia6@gmail.com', github: GH, linkedin: 'https://www.linkedin.com/in/virajdomadia', resume: '/Viraj-Domadia-Resume.pdf', available: 'Available · 2026' },
  hero: {
    eyebrow: ['Full-stack developer', 'Mumbai, IN', 'Available for full-time & freelance'],
    lede: "I build the client, the server and the data layer — React, Node, MongoDB — and I've shipped all three at Accenture and Venus Vacations.",
    corners: ['Viraj Domadia', 'Mumbai · IST', 'Full-stack · MERN', 'Est. 2022'],
    stats: [{ n: '3+', label: 'years' }, { n: '5', label: 'apps live' }, { n: '2', label: 'companies' }],
  },
  marquee: { stack: ['React', 'Next.js', 'TypeScript', 'Node', 'Express', 'Socket.io', 'MongoDB', 'Tailwind', 'Docker'], projects: ['Smart Job Board', 'Real-Time Chat', 'E-Commerce', 'Expense Tracker', 'Ecommerce UI'] },
  about: {
    quote: "I've built UI libraries for Accenture and booking platforms for Venus Vacations. I like code a reviewer can read in one sitting.",
    quoteBold: ['Accenture', 'Venus Vacations'],
    photoAlt: 'Viraj planning a web project at a whiteboard',
    captions: ['Mumbai · IST', 'Open to work'],
    counters: [{ to: 3, suffix: '+', label: 'years shipping' }, { to: 5, suffix: '', label: 'deployed MERN apps' }, { to: 2, suffix: '', label: 'companies, enterprise & startup' }],
    rail: 'About — Viraj Domadia — Mumbai — 2026 —',
  },
  experience: [
    { year: '2024', period: '→ now', title: 'Venus Vacations · Full Stack Developer', org: 'Venus Vacations Pvt. Ltd', desc: 'Built and maintained full-stack travel platforms — booking flows, admin tooling, payments. React client, Node/Express API, MongoDB underneath.', chips: ['React', 'Node · Express', 'MongoDB'], kind: 'job' },
    { year: '2022', period: '– 2024', title: 'Accenture · Application Development Associate', org: 'Accenture', desc: 'Enterprise-grade UI components in React, used across large client programmes.', chips: ['React', 'TypeScript', 'Design systems'], kind: 'job' },
    { year: '2025', period: '– 2027', title: 'MCA · Amity University', org: 'Amity University', desc: 'Specialising in full-stack development, alongside client work.', kind: 'study' },
    { year: '2019', period: '– 2022', title: 'B.Sc. IT · Narsee Monjee College', org: 'Narsee Monjee College', desc: 'Graduated with First Class.', kind: 'study' },
  ],
  projects: [
    { slug: 'smart-job-board', code: 'SJB', title: 'Smart Job Board', category: 'full-stack', blurb: 'Role-based auth for seekers and employers, résumé uploads to Cloudinary, personal dashboards and AI job–résumé matching.', stack: ['React', 'Node', 'Express', 'MongoDB', 'JWT'], live: 'https://example.com/job-board', repo: `${GH}/smart-job-board`, image: '/images/projects/smart-job-board.svg' },
    { slug: 'real-time-chat', code: 'RTC', title: 'Real-Time Chat', category: 'real-time', blurb: 'One-to-one messaging over WebSockets with a JWT handshake, reconnect on token refresh and a REST API for history.', stack: ['Socket.io', 'Express', 'MongoDB'], live: 'https://example.com/chat', repo: `${GH}/real-time-chat`, image: '/images/projects/real-time-chat.svg' },
    { slug: 'e-commerce', code: 'SHOP', title: 'E-Commerce', category: 'full-stack', blurb: 'Storefront with admin-only product CRUD, cart and checkout, JWT sessions with bcrypt.', stack: ['React', 'Express', 'MongoDB', 'bcrypt'], live: 'https://example.com/store', repo: `${GH}/e-commerce`, image: '/images/projects/e-commerce.svg' },
    { slug: 'expense-tracker', code: 'EXP', title: 'Expense Tracker', category: 'full-stack', blurb: 'Categorised expenses with CRUD, filtering and a summary dashboard.', stack: ['React', 'Express', 'MongoDB', 'Tailwind'], live: 'https://example.com/expenses', repo: `${GH}/expense-tracker`, image: '/images/projects/expense-tracker.svg' },
    { slug: 'ecommerce-ui', code: 'UI', title: 'Ecommerce UI', category: 'frontend', blurb: 'Frontend-only store: listings, details and cart — built to drop onto any API.', stack: ['React', 'Tailwind', 'JavaScript'], live: 'https://example.com/store-ui', repo: `${GH}/ecommerce-ui`, image: '/images/projects/ecommerce-ui.svg' },
  ],
  work: { after: 'All five are deployed with public repos.', afterCta: 'All repos on GitHub ↗' },
  tools: [
    { key: 'react', name: 'React', layer: 'client', years: 3, brand: '#61DAFB' },
    { key: 'nextdotjs', name: 'Next.js', layer: 'client', years: 2, brand: '#1F1B10' },
    { key: 'typescript', name: 'TypeScript', layer: 'client', years: 2, brand: '#3178C6' },
    { key: 'javascript', name: 'JavaScript', layer: 'client', years: 3, brand: '#F7DF1E' },
    { key: 'tailwindcss', name: 'Tailwind CSS', layer: 'client', years: 3, brand: '#06B6D4' },
    { key: 'html5', name: 'HTML5', layer: 'client', years: 3, brand: '#E34F26' },
    { key: 'css3', name: 'CSS3', layer: 'client', years: 3, brand: '#1572B6' },
    { key: 'greensock', name: 'GSAP', layer: 'client', years: 1, brand: '#0AE448' },
    { key: 'nodedotjs', name: 'Node.js', layer: 'server', years: 3, brand: '#5FA04E' },
    { key: 'express', name: 'Express', layer: 'server', years: 3, brand: '#1F1B10' },
    { key: 'socketdotio', name: 'Socket.io', layer: 'server', years: 2, brand: '#1F1B10' },
    { key: 'jsonwebtokens', name: 'JWT', layer: 'server', years: 3, brand: '#1F1B10' },
    { key: 'mongodb', name: 'MongoDB', layer: 'data', years: 3, brand: '#47A248' },
    { key: 'mongoose', name: 'Mongoose', layer: 'data', years: 3, brand: '#880000' },
    { key: 'firebase', name: 'Firebase', layer: 'data', years: 2, brand: '#DD2C00' },
    { key: 'cloudinary', name: 'Cloudinary', layer: 'data', years: 2, brand: '#3448C5' },
    { key: 'git', name: 'Git', layer: 'tooling', years: 3, brand: '#F05032' },
    { key: 'github', name: 'GitHub', layer: 'tooling', years: 3, brand: '#1F1B10' },
    { key: 'docker', name: 'Docker', layer: 'tooling', years: 1, brand: '#2496ED' },
    { key: 'vercel', name: 'Vercel', layer: 'tooling', years: 2, brand: '#1F1B10' },
    { key: 'postman', name: 'Postman', layer: 'tooling', years: 3, brand: '#FF6C37' },
    { key: 'figma', name: 'Figma', layer: 'tooling', years: 2, brand: '#F24E1E' },
  ],
  stack: { heading: 'What I ship with,', headingBold: 'by layer.', note: 'Real logos, years in production, grouped by where each tool lives. Hover a pill.' },
  band: { headline: 'Build. Ship. Repeat.', sub: 'Every project on this page is deployed and public. Code first, slides never.', alt: 'Viraj coding at night with a laptop and two monitors' },
  contact: {
    heading: 'Tell me what', headingBold: "you're building.",
    lead: 'A role, a project, a question — a few lines is enough. I reply within a day, usually with questions of my own.',
    intents: [{ value: 'role', label: 'Hiring for a role' }, { value: 'project', label: 'A freelance project' }, { value: 'hi', label: 'Just saying hi' }],
    practical: ['Mumbai, India · IST (UTC+5:30)', 'Open to full-time, freelance, remote', 'Replies within 24h'],
    sentTitle: 'Sent.', sentBody: "Thanks — I'll get back to you within a day. Meanwhile, the repos are on GitHub.",
  },
  footer: { tech: 'Next.js · Tailwind · TypeScript' },
}

export const LAYERS: { key: Layer; label: string }[] = [
  { key: 'client', label: 'Client' }, { key: 'server', label: 'Server' }, { key: 'data', label: 'Data' }, { key: 'tooling', label: 'Tooling' },
]
export const LAYER_COLOR: Record<Layer, string> = { client: '#1C3BFF', server: '#1F5A2E', data: '#B8471E', tooling: '#6B6248' }
