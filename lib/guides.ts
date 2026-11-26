// Plain-language guides for small-business owners. Each one ends at the free website check.
export type Block = { p: string } | { list: string[] } | { steps: string[] } | { code: string } | { tip: string }
export type Guide = { slug: string; title: string; description: string; updated: string; minutes: number; intro: string; sections: { h: string; body: Block[] }[] }

export const guides: Guide[] = [
  {
    slug: 'whatsapp-button-for-business-website',
    title: 'How to add a WhatsApp button to your business website',
    description: 'Step-by-step: create a click-to-chat WhatsApp link with a pre-filled message, put it where customers will tap it, and avoid the mistakes that cost enquiries. Works on WordPress, Wix, Shopify or any site.',
    updated: '2026-11-27', minutes: 6,
    intro: 'In India, a lot of customers would rather send a WhatsApp message than call or fill in a form. If your website doesn’t have a one-tap WhatsApp button, some of those people simply leave. The good news: adding one is free, takes about ten minutes, and needs no plugin or app.',
    sections: [
      { h: 'Step 1: Build your WhatsApp link', body: [
        { p: 'WhatsApp’s official click-to-chat link opens a chat with your number on any phone or computer. It looks like this:' },
        { code: 'https://wa.me/919876543210' },
        { list: ['Start with 91 (India’s country code), then your 10-digit number.', 'No +, no spaces, no dashes, no leading 0.', 'Use the number your business actually answers on, ideally a WhatsApp Business number.'] },
      ] },
      { h: 'Step 2: Add a pre-filled message', body: [
        { p: 'Add ?text= and a message, and the customer’s chat opens with it already typed. They only have to tap send. This one change gets noticeably more people to actually send the message, and it tells you where they came from.' },
        { code: 'https://wa.me/919876543210?text=Hi%2C%20I%20saw%20your%20website%20and%20want%20to%20book%20a%20table' },
        { p: 'Spaces become %20 and commas %2C. Easiest way: type your message into any “URL encode” tool online, or just test the link on your phone. If it opens with your text, it works.' },
        { tip: 'Use a different message per page: “I want to order the chocolate truffle cake” on the cake page, “I want a quote for a wedding” on the weddings page. You’ll know exactly what each customer wants before you reply.' },
      ] },
      { h: 'Step 3: Put the button where people will tap it', body: [
        { list: [
          'Top of the home page, next to your main “Book” or “Call” button, labelled with what happens: “Order on WhatsApp”, not just a logo.',
          'On every product, service or menu page, with that page’s pre-filled message.',
          'A small floating button in the bottom corner on phones. Keep it small so it doesn’t cover your content or the cookie banner.',
          'In the footer, next to your phone number and address.',
        ] },
        { p: 'On WordPress, Wix, Squarespace or Shopify, add a normal button or link and paste your wa.me link as its address. You don’t need a WhatsApp plugin for this; plugins often add heavy scripts that slow the site down.' },
      ] },
      { h: 'Step 4: Make sure someone replies', body: [
        { p: 'A WhatsApp button that nobody answers is worse than no button. Set up WhatsApp Business (free) with:' },
        { list: ['A greeting message that says when you’ll reply.', 'An away message outside working hours.', 'Quick replies for the 5 questions you get most (price list, location, timings).', 'Your catalogue, so people can browse without waiting for you.'] },
      ] },
      { h: 'Mistakes that cost enquiries', body: [
        { list: [
          'The number has +91 or spaces in it, so the link opens an error.',
          'Only an icon with no words. Many people don’t realise it’s tappable.',
          'The button only appears on the Contact page, which most visitors never reach.',
          'A chat plugin that loads 500 KB of scripts and makes the whole site slow on mobile data.',
          'Using a personal number that also gets family messages, so customer chats get buried.',
        ] },
      ] },
      { h: 'Check your site in 20 seconds', body: [
        { p: 'Not sure if your site has a working WhatsApp button, tap-to-call number and a proper preview when shared? The free website check looks for all of these and tells you the top 3 fixes.' },
      ] },
    ],
  },
  {
    slug: 'why-business-not-showing-on-google',
    title: 'Why your business isn’t showing up on Google (and how to fix it)',
    description: 'The 7 most common reasons a small business doesn’t appear in Google search or Maps, how to check each one yourself in minutes, and what to do about it. No jargon.',
    updated: '2026-11-27', minutes: 8,
    intro: 'You search for your own business, or for what you sell in your area, and you’re nowhere. It’s frustrating, and it’s usually not because Google “doesn’t like” you. Almost always it’s one of a handful of fixable reasons. Here they are, roughly in the order I’d check them.',
    sections: [
      { h: '1. Your site is telling Google not to list it', body: [
        { p: 'This is more common than you’d think, especially after a redesign. A single “noindex” setting, or a robots.txt file that blocks search engines, keeps you out of Google completely.' },
        { list: ['WordPress: Settings → Reading → make sure “Discourage search engines from indexing this site” is unticked.', 'Wix / Squarespace: check the SEO settings for the page; “Let search engines index this page” should be on.', 'Or run the free website check: it flags both problems.'] },
      ] },
      { h: '2. Google hasn’t found your site yet', body: [
        { p: 'New sites can take days to weeks to appear. You can speed it up for free with Google Search Console:' },
        { steps: ['Go to search.google.com/search-console and add your website.', 'Verify that you own it (your host or website builder will have a one-click option, or add a DNS record).', 'Submit your sitemap (usually yoursite.com/sitemap.xml).', 'Use “URL inspection” on your home page and click “Request indexing”.'] },
        { p: 'Search Console also tells you what people searched for when they saw you. That’s the most useful free data a small business can have.' },
      ] },
      { h: '3. You have no Google Business Profile (or it’s incomplete)', body: [
        { p: 'For “near me” searches and Google Maps, your Google Business Profile matters more than your website. If you haven’t claimed it, do it today at business.google.com.' },
        { list: ['Pick the most specific category (“Bakery”, not “Shop”).', 'Add your hours, phone, website, and at least 10 real photos.', 'Use exactly the same business name, address and phone everywhere: website, profile, Instagram, Justdial.', 'Post an update or offer every couple of weeks; it signals you’re active.'] },
      ] },
      { h: '4. Your page titles don’t say what you do', body: [
        { p: 'Google leans heavily on your page title, the blue headline in search results. “Home” or just your brand name tells it nothing. “Wedding cakes in Andheri, Mumbai | Sugar & Co” tells it exactly who should see you.' },
        { tip: 'Formula: what you do + where + your name, in about 50–60 characters. Do this for every important page, each one different.' },
      ] },
      { h: '5. Your site is slow or broken on phones', body: [
        { p: 'Google ranks the phone version of your site. If it’s slow on mobile data, needs pinching to read, or has buttons too small to tap, you’ll rank below competitors who got this right.' },
        { list: ['Compress photos (under 200 KB each; WebP format is best).', 'Remove plugins and chat widgets you don’t use.', 'Open your site on your own phone on 4G and be honest about how it feels.'] },
      ] },
      { h: '6. Too few reviews', body: [
        { p: 'In local results, businesses with more recent, genuine Google reviews generally show higher and get more clicks. Ask happy customers directly. Send them your review link on WhatsApp right after a good experience, and reply to every review, good or bad.' },
      ] },
      { h: '7. There’s simply not enough on your site', body: [
        { p: 'If your whole site is one page with a logo and a phone number, Google has nothing to match against searches. Give each main service or product its own page with a few honest paragraphs: what it is, who it’s for, prices or a price range, and photos.' },
      ] },
      { h: 'Find out which ones apply to you', body: [
        { p: 'The free website check tests your site for most of these in about 20 seconds: whether Google is allowed to list you, your title and description, phone-friendliness, speed, and business details. You get the 3 fixes that matter most.' },
      ] },
    ],
  },
]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
