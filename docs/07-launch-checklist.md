# 07 — Launch Checklist

Run this on **Sep 14**. Nothing here should be a surprise on Sep 15.

## Content

- [ ] Every `full` event has a hero image, recap, at least one stat, and at least one link
- [ ] Every image has alt text sourced from content data, not hardcoded
- [ ] Every photo has a photographer credit
- [ ] Consent register complete; every published photo has a valid basis
- [ ] **Every photo zoomed to 100% and checked for legible badges, screens, or personal data**
- [ ] Partner names, logos, and links correct and approved
- [ ] Speaker names, titles, and credentials spelled correctly
- [ ] Impact numbers accurate, with `asOf` dates and a known source for each
- [ ] Zero lorem ipsum, zero `TODO`, zero placeholder images
- [ ] Contact email correct and someone is actually monitoring it
- [ ] Every external link clicked and landing where intended

## Technical

- [ ] `pnpm build` clean, zero warnings
- [ ] `astro check` clean
- [ ] Lighthouse mobile: performance ≥ 90, accessibility ≥ 95, best practices ≥ 95, SEO ≥ 95 on `/`, `/showcase`, and a detail page
- [ ] LCP ≤ 2.5 s and CLS < 0.1 on simulated 4G
- [ ] JS on content routes ≤ 100 KB gzip
- [ ] No console errors or warnings on any page
- [ ] 404 page works on the real host, not just locally
- [ ] `/events` → `/showcase` redirect live
- [ ] `sitemap.xml` and `robots.txt` reachable and correct
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] Favicon renders in the browser tab and as a bookmark
- [ ] No `.env`, credentials, or service-account JSON in git history

## Accessibility

- [ ] axe DevTools: zero critical or serious violations on every page
- [ ] Keyboard-only walkthrough of every page, completed by two different people
- [ ] Lightbox: focus trap, `Esc`, arrow keys, focus restored to trigger
- [ ] Visible focus ring on every interactive element
- [ ] Contrast checked against real photo backgrounds, not just flat colours
- [ ] `prefers-reduced-motion` respected — test it with the OS setting on
- [ ] 200% zoom with no horizontal scroll or clipped content
- [ ] Screen reader spot-check on the homepage and one detail page (NVDA or VoiceOver)

## Cross-device

- [ ] Chrome, Safari, Firefox, Edge on desktop
- [ ] iOS Safari on real hardware
- [ ] Android Chrome on real hardware
- [ ] 360 / 390 / 768 / 1280 / 1920 widths
- [ ] Tested on real mobile data, not office wifi. Most of your audience is on mobile data.

## Domain & hosting

- [ ] Domain purchased and DNS configured
- [ ] HTTPS with a valid certificate
- [ ] `www` and apex both resolve, one canonically redirecting to the other
- [ ] Vercel production deploy matches the `main` branch
- [ ] Analytics firing and visible in the dashboard
- [ ] `PUBLIC_SITE_URL` set to the real production domain (OG tags and canonicals depend on it)

## Social preview — do this before you post anything

- [ ] Facebook Sharing Debugger: scrape `/`, `/showcase`, and two detail pages. **Facebook caches aggressively, so a bad first scrape sticks around. Scrape and fix before the launch post goes up.**
- [ ] LinkedIn Post Inspector on the same URLs
- [ ] OG image is 1200 × 630 and readable at thumbnail size
- [ ] Titles and descriptions read well as a shared card, not just as page metadata

## Courtesy — send Sep 14, before launch

- [ ] Each featured speaker sent a preview link to their page
- [ ] Each partner sent a preview link to `/partners` and their event pages
- [ ] Every photographer credited and told where their work appears
- [ ] Every volunteer who contributed listed in the footer or on `/people`

This step costs an hour and produces the best launch-day reach you'll get, because these are exactly the people with an incentive to reshare.

## Launch sequence — Sep 15

1. Final smoke test on a real phone on mobile data
2. Point the domain, confirm HTTPS
3. Re-scrape OG on the production domain
4. Post the launch announcement on Facebook, tagging partners and speakers
5. Cross-post to LinkedIn and Instagram
6. Update the link in bio on every profile
7. Ask every core member and volunteer to share it from their personal accounts within the first hour — this is the whole algorithm game
8. Add the URL to the email signature and the sponsorship deck template

## Day-after

- [ ] Check analytics: which pages, which referrers, what device split
- [ ] Log every bug reported into a `post-launch` column
- [ ] Log every feature request into the `v2` column from doc 05 §8
- [ ] Short retro in the Discord thread: what worked, what to change next sprint
- [ ] Thank the team publicly and by name
