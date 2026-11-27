// Plain-language guides for small-business owners. Each one ends at the free website check.
export type Block = { p: string } | { list: string[] } | { steps: string[] } | { code: string } | { tip: string }
export type Guide = { slug: string; title: string; description: string; updated: string; minutes: number; intro: string; sections: { h: string; body: Block[] }[] }

const firstGuides: Guide[] = [
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

// Second batch: narrow, practical questions small-business owners search for. Each answers fully, then points to the check.
const moreGuides: Guide[] = [
  {
    slug: 'make-phone-number-clickable-on-website',
    title: 'How to make your phone number clickable on your website (tap-to-call)',
    description: 'Turn the phone number on your website into a one-tap call button on mobile. The exact link format for Indian numbers, plus how to do it on WordPress, Wix, Shopify and plain HTML.',
    updated: '2026-11-27', minutes: 5,
    intro: 'If someone on a phone has to copy your number, switch to the dialler and paste it, a good share of them won’t bother. A tap-to-call link turns your number into a button: one tap and their phone starts calling you. It takes two minutes and costs nothing.',
    sections: [
      { h: 'The link format', body: [
        { p: 'A clickable phone number is a normal link whose address starts with tel: instead of https://. For an Indian number, use the full international format:' },
        { code: '<a href="tel:+919876543210">+91 98765 43210</a>' },
        { list: ['Inside the link: +91 followed by the 10-digit number, with no spaces, dashes or brackets.', 'The visible text can be formatted however you like, such as “+91 98765 43210” or “Call us”.', 'For a landline, include the area code without its leading 0: tel:+918012345678 for an 080 number.'] },
        { tip: 'Always include +91. Without it, a customer calling from abroad, or a phone with a foreign SIM, may dial the wrong number.' },
      ] },
      { h: 'WordPress', body: [
        { steps: ['Edit the page and select your phone number text (or add a Button block).', 'Click the link icon.', 'Type tel:+919876543210 as the link and press Enter.', 'Update the page, then test it on your phone.'] },
        { p: 'For a number in the header or footer, the same works in Appearance → Menus (add a Custom Link with tel:+91… as the URL) or in your theme’s header settings.' },
      ] },
      { h: 'Wix, Squarespace and Shopify', body: [
        { list: [
          'Wix: select the text or button → Link → Phone number → enter your number.',
          'Squarespace: select text → link → type tel:+919876543210 as the URL.',
          'Shopify: Online Store → Navigation → add a menu item with tel:+919876543210 as the link, or add the link in a rich-text section.',
        ] },
      ] },
      { h: 'Where to put it', body: [
        { list: ['At the top of every page, especially on phones. That’s where people look first.', 'Next to your main action button, as in “Book online” or “Call now”.', 'In the footer, with your address and WhatsApp link.', 'On your Contact page, larger than everything else.'] },
        { p: 'Label it with what happens. “Call now” or “Call for a quote” gets more taps than a bare number.' },
      ] },
      { h: 'Test it', body: [
        { p: 'Open your site on your phone and tap the number. It should open the dialler with your number already typed. On a computer, tapping it may offer to call through your phone or Skype; that’s normal.' },
        { p: 'Or run the free website check: it looks for a tap-to-call link along with 20 other things that affect enquiries.' },
      ] },
    ],
  },
  {
    slug: 'whatsapp-link-preview-not-showing-image',
    title: 'WhatsApp link preview not showing an image? Here’s how to fix it',
    description: 'Why your website shows as a plain link with no photo when shared on WhatsApp, and how to fix it with Open Graph tags, the right image size, and clearing WhatsApp’s preview cache.',
    updated: '2026-11-27', minutes: 6,
    intro: 'When someone shares your website on WhatsApp, it can either appear as a rich card with a photo, title and description, or as a bare grey link nobody taps. The difference is a few lines of hidden code called Open Graph tags. Here’s how to get the card every time.',
    sections: [
      { h: 'Why the preview is missing', body: [
        { p: 'WhatsApp builds the preview by reading special tags in your page’s code. If they’re missing, wrong, or point to an image it can’t download, you get a plain link. The usual causes:' },
        { list: ['No og:image tag at all.', 'The image address is relative (/images/shop.jpg) instead of a full https:// address.', 'The image is too large to download quickly. Keep it well under 300 KB.', 'The site is still on http:// instead of https://.', 'WhatsApp cached an old, broken preview from before you fixed it.'] },
      ] },
      { h: 'The tags you need', body: [
        { p: 'These go in the <head> of your page. Most website builders have fields for them under SEO or Social sharing settings, so you may not need to touch code.' },
        { code: '<meta property="og:title" content="Sugar & Co, Wedding cakes in Andheri">\n<meta property="og:description" content="Custom cakes baked fresh, delivered across Mumbai.">\n<meta property="og:image" content="https://sugarco.in/share.jpg">\n<meta property="og:url" content="https://sugarco.in/">' },
        { list: [
          'WordPress: Yoast SEO or Rank Math both have a “Social” tab per page where you upload the share image.',
          'Wix: page settings → SEO basics → Social share.',
          'Shopify: Online Store → Preferences → Social sharing image.',
        ] },
      ] },
      { h: 'The right image', body: [
        { list: ['1200 × 630 pixels (a wide rectangle). WhatsApp crops anything else unpredictably.', 'JPG, compressed to roughly 100–250 KB.', 'Something people recognise at a glance: your shop front, your best product or your logo on a clean background.', 'No small text. It becomes unreadable at preview size.'] },
      ] },
      { h: 'Still showing the old preview?', body: [
        { p: 'WhatsApp remembers previews for a while. After fixing the tags:' },
        { list: ['Test with a slightly different link, such as yoursite.in/?v=2. WhatsApp treats it as new and fetches a fresh preview.', 'Use Meta’s Sharing Debugger (developers.facebook.com/tools/debug) to see exactly which tags Meta’s crawler reads, and click “Scrape again”.', 'Give it a day; old cached previews do expire.'] },
      ] },
      { h: 'Check yours in 20 seconds', body: [
        { p: 'The free website check tells you whether your page has a share title and image, along with whether customers can call or WhatsApp you in one tap.' },
      ] },
    ],
  },
  {
    slug: 'website-not-secure-warning-fix',
    title: 'Why your website says “Not secure”, and how to fix it',
    description: 'What the “Not secure” warning in Chrome means, why it scares off customers, and how to fix it with a free SSL certificate on common Indian hosting, WordPress, and other website builders.',
    updated: '2026-11-27', minutes: 6,
    intro: 'If Chrome shows “Not secure” next to your web address, many visitors will leave before reading a word, especially if you ask for a phone number or payment. The fix is almost always free and takes under an hour.',
    sections: [
      { h: 'What “Not secure” actually means', body: [
        { p: 'Your site is loading over http:// instead of https://. Without the “s”, anything a visitor types (names, phone numbers, passwords) travels unencrypted. Browsers now warn about every http page, and Google ranks https sites ahead of http ones.' },
        { p: 'Turning on https needs an SSL certificate, a small file on your server that proves the site is yours and enables encryption. Good news: free certificates (from Let’s Encrypt) are as trusted as paid ones for a normal business site.' },
      ] },
      { h: 'Turn on free SSL', body: [
        { list: [
          'Shared hosting with cPanel (most Indian hosts): open “SSL/TLS Status” or “Let’s Encrypt” in cPanel and run AutoSSL for your domain. Many hosts do this automatically if you ask support.',
          'Wix, Squarespace, Shopify: SSL is included. Check that it’s switched on in the domain or security settings.',
          'Using Cloudflare in front of your site: set SSL/TLS mode to “Full” (not “Flexible”) after your host has a certificate.',
        ] },
        { tip: 'If your host wants to charge thousands of rupees a year for a basic SSL certificate, ask about free Let’s Encrypt first. If they refuse, that’s a sign to move hosts.' },
      ] },
      { h: 'Send everyone to the secure version', body: [
        { p: 'Having a certificate isn’t enough; old http:// links must redirect to https://.' },
        { list: ['WordPress: Settings → General → change both addresses to https://, then use a plugin like Really Simple SSL to fix the rest.', 'cPanel: Domains → “Force HTTPS Redirect”.', 'Website builders usually do this automatically once SSL is on.'] },
      ] },
      { h: 'Still showing a warning?', body: [
        { p: 'If the padlock is missing even on https://, your page is probably loading an image or script over http (called “mixed content”). Open the page, right-click → Inspect → Console, and look for “Mixed Content” messages; each one names the file to fix. Change those links to https://.' },
      ] },
      { h: 'Check your site', body: [
        { p: 'The free website check confirms whether your site loads securely, and checks 20 other things that affect whether visitors turn into enquiries.' },
      ] },
    ],
  },
  {
    slug: 'add-google-maps-to-website',
    title: 'How to add Google Maps and a “Get directions” button to your website',
    description: 'Two ways to show your location: embed a Google Map, and add a one-tap “Get directions” button that opens navigation on the customer’s phone. Step by step, free, no API key.',
    updated: '2026-11-27', minutes: 5,
    intro: 'For a shop, clinic, salon or restaurant, “how do I get there?” is the last question before someone visits. Answer it on your website in one tap. You don’t need an API key or a developer for either of the methods below.',
    sections: [
      { h: 'First: make sure your Google listing is right', body: [
        { p: 'Both methods point to your Google Maps listing, so check it first: search your business name on Google Maps and confirm the pin, address, hours and phone are correct. If you haven’t claimed it, do that at business.google.com.' },
      ] },
      { h: 'Option 1: a “Get directions” button (best on phones)', body: [
        { p: 'On a phone, a button that opens Google Maps navigation beats a small embedded map. Use Google’s official directions link:' },
        { code: 'https://www.google.com/maps/dir/?api=1&destination=Sugar+%26+Co+Andheri+West+Mumbai' },
        { p: 'Replace the destination with your business name and area exactly as it appears on Google Maps. Or open your listing in Google Maps, tap Share, copy the short link (maps.app.goo.gl/…) and use that as the button link.' },
        { tip: 'Label the button “Get directions” and put it next to your address, near your phone and WhatsApp buttons.' },
      ] },
      { h: 'Option 2: embed a map', body: [
        { steps: ['Open your business in Google Maps on a computer.', 'Click Share → Embed a map.', 'Pick a size and click “Copy HTML”.', 'Paste it into your page (WordPress: Custom HTML block; Wix: Embed → Embed a site/Custom code; Shopify: a Custom Liquid section).'] },
        { p: 'Add loading="lazy" inside the copied <iframe …> tag so the map doesn’t slow down the rest of your page.' },
      ] },
      { h: 'Help Google connect the dots', body: [
        { list: ['Write your address on the site as text (not just in an image), exactly as on your Google listing.', 'Use the same business name and phone number everywhere: website, Google, Instagram, Justdial.', 'Ask your developer to add LocalBusiness schema with your address and hours.'] },
      ] },
      { h: 'Check your site', body: [
        { p: 'The free website check looks for a Maps link or embedded map, tap-to-call, WhatsApp, and whether Google can read your business details.' },
      ] },
    ],
  },
  {
    slug: 'make-website-faster-on-mobile',
    title: 'How to make your business website load faster on mobile',
    description: 'A plain-language checklist to speed up a slow small-business website on phones: compressing photos, removing heavy plugins and widgets, caching and hosting. With the free tools to measure it.',
    updated: '2026-11-27', minutes: 7,
    intro: 'Most of your visitors are on a phone, often on patchy mobile data. If your site takes more than a few seconds to show anything, many of them leave, and Google ranks slow sites lower. The good news: on most small-business sites, a handful of fixes make the biggest difference.',
    sections: [
      { h: 'Measure first', body: [
        { p: 'Run your home page through Google’s PageSpeed Insights (pagespeed.web.dev) and look at the Mobile tab. Note the score and the “Largest Contentful Paint” time: how long until the main content appears. Under 2.5 seconds is good. Then fix, and measure again.' },
      ] },
      { h: '1. Photos (the biggest win on most sites)', body: [
        { p: 'Photos straight from a phone or camera are often 3–8 MB each. On a website they should be 100–300 KB.' },
        { list: ['Resize to the size actually shown: rarely wider than 1600 pixels, often 800.', 'Compress and convert to WebP with a free tool like Squoosh (squoosh.app) or TinyPNG.', 'WordPress: a plugin like ShortPixel or Imagify can do your existing library automatically.', 'Make sure images below the first screen load lazily (most modern themes do this).'] },
      ] },
      { h: '2. Remove what you don’t use', body: [
        { list: [
          'Sliders and carousels on the home page: they’re heavy, and most visitors never see slide 2. Use one strong photo.',
          'Chat widgets, popups and social feeds: each can add hundreds of KB of scripts. Keep only the one that brings enquiries (often a plain WhatsApp link is enough).',
          'WordPress plugins you installed once and forgot: deactivate and delete them.',
          'Autoplaying background videos on mobile.',
        ] },
      ] },
      { h: '3. Caching and hosting', body: [
        { list: [
          'Turn on caching (WordPress: WP Super Cache, W3 Total Cache, or your host’s built-in cache) so pages aren’t rebuilt on every visit.',
          'Use a CDN such as Cloudflare’s free plan, so files are served from near your visitors.',
          'Very cheap shared hosting is often the real bottleneck. If your server takes over a second just to start answering, better hosting fixes more than any plugin.',
        ] },
      ] },
      { h: '4. Fonts and scripts', body: [
        { p: 'Each extra font family and weight is another download. Two fonts is plenty. Remove tracking scripts you don’t look at; keep one analytics tool you actually use.' },
      ] },
      { h: 'See where you stand', body: [
        { p: 'The free website check includes Google’s mobile speed score alongside how quickly your server answers, so you can see whether speed is one of your top 3 fixes.' },
      ] },
    ],
  },
  {
    slug: 'get-more-google-reviews-for-business',
    title: 'How to get more Google reviews for your business (the right way)',
    description: 'A simple system to get more genuine Google reviews: your direct review link, when and how to ask on WhatsApp, a message template, replying to reviews, and what not to do so you don’t break Google’s rules.',
    updated: '2026-11-27', minutes: 6,
    intro: 'Google reviews are often the first thing a new customer reads, and businesses with more recent reviews tend to show up higher in local results and get more clicks. Most happy customers will leave a review; they just need to be asked at the right moment, with a link that takes one tap.',
    sections: [
      { h: 'Step 1: get your direct review link', body: [
        { steps: ['Sign in to your Google Business Profile (search your business name on Google while signed in, or go to business.google.com).', 'Find “Ask for reviews” (sometimes “Get more reviews”).', 'Copy the short link. It opens the review box for your business directly.'] },
        { tip: 'Save this link as a WhatsApp Business quick reply (for example /review) so you can send it in two taps.' },
      ] },
      { h: 'Step 2: ask at the right moment', body: [
        { p: 'The best time is right after a good experience: the meal is finished, the job is done, the customer said “thank you”. Ask in person, then send the link on WhatsApp so it’s one tap away.' },
        { code: 'Thank you for coming in today, {name}! If you were happy with {service}, a quick Google review would really help a small business like ours: {link}\nIt takes less than a minute 🙏' },
      ] },
      { h: 'Step 3: reply to every review', body: [
        { list: ['Thank people by name, and mention what they bought or did.', 'Reply calmly to negative reviews: apologise, offer to fix it, and take it offline (“please WhatsApp us on …”). Future customers judge you by the reply more than the complaint.', 'Reply within a few days.'] },
      ] },
      { h: 'What not to do', body: [
        { list: [
          'Don’t buy reviews or post fake ones. Google removes them and can restrict your listing.',
          'Don’t offer discounts or gifts in exchange for reviews; Google’s policy prohibits incentivised reviews.',
          'Don’t only ask the customers you think will be happy (“review gating”); ask everyone.',
          'Don’t have staff or family review the business.',
        ] },
      ] },
      { h: 'Show reviews on your website', body: [
        { p: 'Put 3–5 real reviews (with first names) on your home page, and link to your Google profile so visitors can read the rest. The free website check looks for reviews or testimonials as part of its trust checks.' },
      ] },
    ],
  },
  {
    slug: 'website-cost-small-business-india',
    title: 'How much does a website cost for a small business in India? (2026)',
    description: 'An honest breakdown of what a small-business website costs in India in 2026: DIY builders vs freelancers vs agencies, yearly running costs, hidden costs, and how to avoid overpaying.',
    updated: '2026-11-27', minutes: 8,
    intro: 'Quotes for “a website” range from a few thousand rupees to several lakhs, which makes it hard to know what’s fair. The price depends mostly on two things: who builds it, and what it has to do. Here’s how it breaks down, from someone who builds them. Figures are typical ranges, not fixed prices; always get a written quote.',
    sections: [
      { h: 'Running costs every year (whoever builds it)', body: [
        { list: [
          'Domain name (.in or .com): usually a few hundred to around ₹1,500 a year. Watch for cheap first-year offers with expensive renewals.',
          'Hosting: from roughly ₹2,000 a year for basic shared hosting to ₹10,000+ for faster managed hosting. Website builders bundle this into their plan.',
          'Business email: free options exist; paid Google Workspace or Microsoft 365 is billed per user per month.',
          'SSL certificate: should be free (Let’s Encrypt). Don’t pay for a basic one.',
        ] },
      ] },
      { h: 'Option 1: build it yourself', body: [
        { p: 'Website builders (Wix, Squarespace, Shopify for online stores) or WordPress with a ready-made theme. Cost: the builder or hosting subscription plus your time.' },
        { list: ['Good for: a simple 3–5 page site when you’re comfortable with tech and have time.', 'Watch out for: the hours it takes, sites that look like everyone else’s, and missing basics like tap-to-call, page titles and share images.'] },
      ] },
      { h: 'Option 2: a freelancer', body: [
        { p: 'For a 5–8 page business website, freelancer quotes in India commonly fall somewhere between ₹15,000 and ₹60,000, depending on experience and what’s included. Online stores, booking systems or custom features cost more.' },
        { list: ['Good for: most small businesses. You get a custom site and talk directly to the person building it.', 'Ask: who owns the domain and hosting accounts (it should be you), whether content and photos are included, and what support costs after launch.'] },
      ] },
      { h: 'Option 3: an agency', body: [
        { p: 'Agencies usually charge more, from around ₹50,000 to several lakhs, because you get a team: design, development, content, and often marketing. Worth it when the website is central to your sales, or you need ongoing SEO, ads and content.' },
      ] },
      { h: 'Hidden costs to ask about', body: [
        { list: [
          'Maintenance: updates, backups, fixes. Often charged monthly; ask what’s included.',
          'Content: writing pages and professional photos are often extra.',
          'Plugins or themes with yearly licences.',
          'Changes after launch: are small edits free for a period, or billed per hour?',
          'Leaving: if you move to someone else, do you get all the files and logins?',
        ] },
      ] },
      { h: 'How to avoid overpaying', body: [
        { list: [
          'Decide what the website must do: get calls, take bookings, sell online. Pay for that, not extras.',
          'Make sure the domain is registered in your name, not the developer’s.',
          'Ask for 2–3 examples of their sites, and check them on your phone.',
          'Insist on the basics: phone-friendly, fast, tap-to-call, WhatsApp, Google-ready. Run their past work through the free website check before you hire.',
        ] },
      ] },
    ],
  },
]

export const guides: Guide[] = [...firstGuides, ...moreGuides]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
