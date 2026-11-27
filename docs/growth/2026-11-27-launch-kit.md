# 100 unique visitors in 7 days: launch kit

Goal: 100 unique visitors (Vercel Web Analytics → Visitors) between 27 Nov and 3 Dec 2026, with no paid traffic.
Main link: https://virajdomadia.com/tools/website-checkup

Add `?utm_source=<channel>` to each link you post (linkedin, whatsapp, reddit, hn, ih) so Vercel Analytics shows which channel worked.

## Rough targets by channel

| Channel | When | Expected visitors |
|---|---|---|
| WhatsApp: personal messages + groups | Day 1–2 | 30–50 |
| LinkedIn post + comments | Day 1, follow-up Day 4 | 20–40 |
| Reddit (r/webdev Showoff Saturday, r/SideProject, Indian business subs) | Sat 29 Nov onwards | 20–60 |
| Show HN / Indie Hackers | Day 3–4 | 0–100 (spiky) |
| Personal reports to 20 local businesses | Day 2–6 | 10–20 |
| Google / Bing | Day 4+ | 0–10 (grows later) |

---

## 1. WhatsApp: send personally, not as a broadcast

To friends who own or work at a business:

> Hey! I built a free tool that checks a business website in 20 seconds: whether Google can find it, if it works on phones, if customers can call/WhatsApp in one tap. Could you try it on your site (or any business you know) and tell me if anything is confusing? 🙏
> https://virajdomadia.com/tools/website-checkup?utm_source=whatsapp

To friends in general (ask them to forward):

> Small favour: I made a free website checker for small businesses (shop, clinic, restaurant, salon…). If you know someone with a business website, could you forward this to them? It tells them the top 3 things losing them customers.
> https://virajdomadia.com/tools/website-checkup?utm_source=whatsapp

## 2. LinkedIn

> Most small-business websites I look at have the same quiet problem: they look fine, but they lose customers.
>
> No tap-to-call number. No WhatsApp button. Google shows “Home” as the headline. Share the link on WhatsApp and it shows up as a bare grey URL.
>
> The owners rarely know, because nobody tells them.
>
> So I built a free checker. Paste a website and in 30+ seconds it tells you, in plain language:
> → Can Google find you?
> → Does it work on a phone?
> → Can customers reach you in one tap?
> → Does it look trustworthy?
> …and the 3 fixes that matter most.
>
> No sign-up. Try it on your own site, or on a business you love:
> https://virajdomadia.com/tools/website-checkup?utm_source=linkedin
>
> Built with Next.js; every check is written for owners, not developers. Feedback very welcome, especially what it gets wrong.
>
> #smallbusiness #webdevelopment #India

Then comment on your own post within the first hour (“Drop your site below and I’ll tell you the #1 fix”) and **reply to every comment**. That is what keeps LinkedIn showing it to people.

Day 4 follow-up post: “I checked N small-business websites this week. Here’s what most of them were missing” (use the real numbers from the analytics and the reports people sent you).

## 3. Reddit

Read each subreddit’s rules first. Lead with value, and don’t post the same text everywhere.

**r/webdev: Showoff Saturday only (Sat 29 Nov)**
Title: `[Showoff Saturday] A free website checker written for small-business owners, not developers`
> Most SEO/audit tools speak developer (“LCP 4.2s, missing hreflang”). I wanted one a bakery owner could read: “customers can’t call you in one tap”, “your link shows up bare on WhatsApp”. It fetches the page (with SSRF guards, since it takes arbitrary URLs), runs around 30 weighted checks, merges Google’s PageSpeed mobile score, and ranks the top 3 fixes. Next.js 15, no AI in the loop. Would love feedback on the checks it gets wrong: https://virajdomadia.com/tools/website-checkup?utm_source=reddit

**r/SideProject** (self-promo allowed): same idea, shorter, add “what I learned building it”.

**Indian business subs** (r/smallbusinessindia, r/IndianEntrepreneur, r/indianstartups): check whether tools are allowed. If not, write a helpful text post instead, such as “7 reasons your business isn’t on Google” (based on the guide), and mention the checker only if someone asks.

## 4. Show HN (Tue–Wed morning US time ≈ 7–9 pm IST)

Title: `Show HN: A website checker for small businesses that speaks plain language`
> I build websites for small businesses in India. The common failures aren't exotic: no tap-to-call link, no WhatsApp button (a big deal here), "Home" as the page title, no Open Graph image so WhatsApp shares look dead. Existing audit tools report these in jargon owners can't act on, so I wrote one that doesn't.
>
> It fetches the page server-side (DNS-pinned IP checks against private ranges, redirects re-validated), runs around 30 weighted checks, adds Google's PageSpeed mobile score asynchronously, and ranks the top 3 fixes. No sign-up, nothing stored beyond a 10-minute cache.
>
> Happy to hear which checks are wrong or missing.

Stay online for 2 hours after posting and answer every comment.

## 5. Personal reports to 20 local businesses (the real agency test)

1. On Google Maps, find 20 businesses near you that have a website (restaurants, clinics, salons, coaching classes, travel agents).
2. Run each through the checker. Pick the ones scoring under 70.
3. Send a short personal message through the contact they list (WhatsApp Business number, email or Instagram DM):

> Hi! I’m Viraj, a developer in Bengaluru. I was looking at {business} and ran your site through a free checker I built. The top thing costing you enquiries: {top fix, in one line}. Full report here (free, no catch): https://virajdomadia.com/tools/website-checkup?url={domain}&utm_source=outreach
> Happy to explain any of it.

One message per business, no follow-up spam. This also tests whether owners reply, which is the agency question.

## 6. Already done by Claude

- Sitemap includes the tool and guides; pages submitted to Bing/IndexNow after deploy.
- Vercel Web Analytics enabled.

## 7. Needs you (10 minutes)

- **Google Search Console**: add the domain property `virajdomadia.com`, verify with the DNS TXT record, submit `https://virajdomadia.com/sitemap.xml`, and request indexing for `/tools/website-checkup`.
- **PageSpeed API key** (free): Google Cloud console → APIs & Services → enable “PageSpeed Insights API” → Credentials → Create API key (restrict it to that API). Then: `vercel env add PSI_API_KEY production` and redeploy. Without it the speed part of the report is skipped.
