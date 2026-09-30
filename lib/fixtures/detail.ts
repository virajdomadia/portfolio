import type { Detail } from '../content'

// Test-only detail block. Attached to Tripsmith when PORTFOLIO_FIXTURE_DETAIL=1 (unit tests, e2e build). Never set on Vercel.
export const fixtureDetail: Detail = {
  pitch: 'Fixture pitch — a travel agency on its own site, used only by tests.',
  facts: { role: 'Solo — design, frontend, backend', year: '2026', version: 'v2' },
  media: [
    { kind: 'image', src: '/projects/_fixture/one.webp', alt: 'Fixture screenshot of the home page', caption: 'Home' },
    { kind: 'clip', webm: '/projects/_fixture/flow.webm', mp4: '/projects/_fixture/flow.mp4', poster: '/projects/_fixture/flow.jpg', seconds: 3, alt: 'Fixture clip of the booking flow', caption: 'Booking flow' },
    { kind: 'image', src: '/projects/_fixture/two.webp', alt: 'Fixture screenshot of the account page', caption: 'Account' },
  ],
  walkthrough: 'M7lc1UVf-VE',
  sections: {
    problem: 'Fixture problem: small agencies sell trips over WhatsApp and lose track of seats and payments.',
    built: 'Fixture build: a booking site with live seats, payments, vouchers and an owner desk.',
    decisions: [
      { title: 'Fixture decision one', body: 'Seats are held in the database with a row lock, not in memory.' },
      { title: 'Fixture decision two', body: 'Payments are verified by webhook signature before a booking is confirmed.' },
      { title: 'Fixture decision three', body: 'The owner desk reuses the public API with a role check instead of a second backend.' },
    ],
    outcome: 'Fixture outcome: v2 is live with bookings and payments in test mode.',
  },
  versions: [
    { name: 'v1', summary: 'Site + owner admin', state: 'shipped' },
    { name: 'v2', summary: 'Bookings + payments', state: 'shipped' },
    { name: 'v3', summary: 'AI concierge', state: 'next' },
  ],
  updated: '2026-09-30',
}
