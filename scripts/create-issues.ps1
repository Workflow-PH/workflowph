# One-shot bootstrap of the Sprint 1 issue tracker.
# Idempotency: re-running creates duplicates. Run once, then manage in GitHub.

$repo = 'slvdrvncntjvr/workflowph'
$milestone = 'Sprint 1 - Launch'

$issues = @(

  # ---------------------------------------------------------------- ASSETS
  @{
    title  = 'WF-A1 - Harvest the Facebook archive into the content sheet'
    labels = 'epic: assets,role: assets,size: L,p0: blocker'
    body   = @'
## Why
Every event we have ever run lives in the Facebook feed and nowhere else. Until it is in a structured sheet, nobody can build against it.

## What
Open [facebook.com/workflowph](https://facebook.com/workflowph), scroll to the earliest post, and record one row per event.

Columns: `date | title | series/partner | type | venue | city | mode | fb_permalink | album_exists | photos_available | tier`

`type` must be one of: `workshop`, `community-day`, `summit`, `hackathon`, `general-assembly`, `ama`, `meetup`, `campaign`.

## Acceptance criteria
- [ ] Every event post on the page has a row
- [ ] Full-resolution poster creative downloaded for each event into the Drive folder
- [ ] `tier` set per row: `full` if a photo set exists, `archive` otherwise
- [ ] Registration or attendance numbers cross-checked against Meetup, Luma, or Google Forms where they exist
- [ ] Sheet link posted in this issue

## Notes
Real numbers beat rounded guesses and sponsors can tell the difference. If you cannot find a real figure, leave it blank rather than estimating.

See `docs/03-asset-playbook.md` section 9.
'@
  },

  @{
    title  = 'WF-A2 - Collect and select hero + gallery photos for the first 10 events'
    labels = 'epic: assets,role: assets,size: L,p0: blocker'
    body   = @'
## Why
This is the single highest-value task in the sprint. The site is built and every route renders; photos are what turn it from a shell into something people share.

## Do this first
Message every core member asking them to dump their **original camera-roll photos** into `00-INBOX/`. Facebook re-compresses uploads, so phone originals are typically 3-5x larger and are what we actually need for hero images. One group-chat message will likely produce better source material than everything else combined.

## Per event
- 1 hero: landscape, 2400px+ long edge, people visible, no heavy text overlay
- 6-12 gallery: mixed wide / detail / portrait, 1600px+
- Renamed to `YYYY-MM-DD_event-slug_role_seq_photographer.ext`
- One sentence of alt text each: who, doing what, where
- Photographer credit recorded

## Acceptance criteria
- [ ] 10 events have a complete photo set
- [ ] All files renamed to the convention
- [ ] Alt text written for every photo
- [ ] Credits recorded per photo
- [ ] Files in `05-approved-web/`, nothing unapproved

## If a photo does not exist
Do not force it. Set the event to `tier: archive` and it becomes a row in the index list. The `PosterCard` fallback is already built, so events without photos still look intentional.

Specs: `docs/03-asset-playbook.md` sections 3-5.
'@
  },

  @{
    title  = 'WF-A3 - Request, collect, and commit partner logos as SVG'
    labels = 'epic: assets,role: assets,size: M,p1'
    body   = @'
## Why
Longest lead time of any asset task because it depends on other people replying. Send the emails on day one.

## Partners to chase
Jia Talent Vault, Echelon Philippines, Tutorials Dojo, AWS User Group Philippines, AWS Community Day Philippines.

## Request template
Copy-paste version is in `docs/03-asset-playbook.md` section 6. Ask for SVG, a light-on-dark variant, usage restrictions, and the URL to link to. Give a deadline of Wednesday so they are in the launch version.

## Acceptance criteria
- [ ] Email sent to every partner, date logged
- [ ] Received logos added to `public/images/partners/` and referenced from `src/content/partners.json`
- [ ] Any partner who has not replied is noted here explicitly

## If a logo does not arrive
`PartnerWall` already falls back to a typographic wordmark in our own typeface. That is the correct outcome. **Never trace, screenshot, or AI-generate someone else logo** - it looks careless and it is a real trademark problem.
'@
  },

  @{
    title  = 'WF-A4 - Official WorkFlow PH logo as SVG, replace the placeholder wordmark'
    labels = 'epic: assets,role: design,size: S,p1'
    body   = @'
## Current state
`src/components/layout/Wordmark.astro` renders a typographic placeholder: a flow-glyph plus "WorkFlow PH" set in Bricolage Grotesque. It is deliberately decent so nothing looks broken, but it is not the real mark.

## What
- [ ] Official mark as SVG, light and dark variants, dropped into `src/icons/`
- [ ] Replace the placeholder in `Wordmark.astro`, keeping the same dimensions so nothing reflows
- [ ] Favicon regenerated at `public/favicon.svg`
- [ ] `public/og/default.png` at 1200x630 using the real mark
- [ ] Logo download block on `/press-kit` replaced with real files

## Check
Verify the mark is legible at 24px in the header on a 390px viewport. Most people will only ever see it at that size.
'@
  },

  @{
    title  = 'WF-A5 - Complete the consent register and verify every photo'
    labels = 'epic: assets,role: assets,size: M,p0: blocker'
    body   = @'
## Why
Launch blocker. Volunteer orgs get this wrong and it costs them trust permanently.

## Consent register
One sheet tab: `event_slug | photo_file | subjects | consent_basis | cleared_by | date`

`consent_basis` is one of `event-notice`, `individual`, `public-figure`, `no-faces`. No valid basis means the photo goes to `99-rejected/`.

## Hard blocks - do not publish
- Any identifiable minor without written guardian consent
- Legible attendee badges, IDs, QR codes, or name tags
- **Laptop screens, projected slides, or whiteboards showing emails, keys, tokens, credentials, or personal data.** Zoom to 100% and check every screen in every photo. This is the most common leak in tech-event photography.
- Anyone visibly distressed, asleep, or otherwise unflattering
- Photos from closed sessions where publication was not announced

## Acceptance criteria
- [ ] Every published photo has a row with a valid basis
- [ ] Every photo inspected at 100% zoom for screens and badges
- [ ] Rejected photos moved to `99-rejected/`, not deleted
- [ ] Sign-off comment posted here by the wrangler
'@
  },

  @{
    title  = 'WF-A6 - Optimise and commit public/images to spec'
    labels = 'epic: assets,role: assets,size: M,p0: blocker'
    body   = @'
## What
Convert approved assets to web spec and commit them.

## Specs
| Use | Aspect | Min px | Delivered budget |
|---|---|---|---|
| Hero | 16:9 | 2400x1350 | 200 KB |
| Card | 4:3 | 1600x1200 | 90 KB |
| Gallery landscape | 3:2 | 1800x1200 | 90 KB |
| Headshot | 1:1 | 800x800 | 40 KB |

sRGB, JPEG q90 at intake. Never upscale - a sharp 1200px photo beats a mushy 2400px one.

## Batch resize
```powershell
npx -y sharp-cli@5 -i "./raw/*.jpg" -o "./out" resize 2400 --withoutEnlargement -- jpeg --quality 90
```

## Acceptance criteria
- [ ] Files committed under `public/images/{events,people,partners,brand}/`
- [ ] Every file matches the naming convention
- [ ] Nothing over budget, measured in the Network tab
- [ ] Referenced correctly from content frontmatter with width and height set

## Depends on
WF-A2, WF-A5
'@
  },

  @{
    title  = 'WF-A7 - Core team and speaker headshots'
    labels = 'epic: assets,role: assets,size: M,p1'
    body   = @'
## What
Square headshots, 800px+, for the core team and every speaker featured on a showcase page.

## Acceptance criteria
- [ ] Core team headshots collected and named `people_core_<initial><surname>.jpg`
- [ ] Speaker headshots collected and named `people_speaker_<initial><surname>.jpg`
- [ ] Added to `src/content/people.json` with alt text
- [ ] Anyone who declines a photo is left without one

## Note
`PersonCard` already renders an initials avatar when there is no photo, so a missing headshot degrades cleanly. Never ship a grey silhouette - it makes the team look absent.
'@
  },

  # --------------------------------------------------------------- CONTENT
  @{
    title  = 'WF-C1 - Org copy: positioning, boilerplate, about story, timeline'
    labels = 'epic: content,role: content,size: M,p0: blocker'
    body   = @'
## Why
Several pages currently render visible `DRAFT` blocks. They are marked loudly on purpose so they cannot ship by accident, but they must be replaced.

## Deliverables
- [ ] Positioning line, 12 words max, plus a 25-word sub-line
- [ ] 35-word and 100-word boilerplate. Reused on `/about`, `/press-kit`, and in partner emails. Drafts already exist in `src/pages/press-kit.astro` - verify or rewrite.
- [ ] `/about` origin story, 200-300 words: how WorkFlow PH started, why automation, why volunteer-driven
- [ ] Timeline: replace the `TBC` entries in `src/content/milestones.json` with 5-8 real dated milestones
- [ ] `/join` time commitment section: real hours per week
- [ ] 404 copy - already written, confirm you are happy with it

## Where
`src/pages/about.astro`, `src/pages/join.astro`, `src/content/milestones.json`, `src/pages/press-kit.astro`

## How to write it
Plainly. The most convincing community pages read like a person wrote them, not a brand. Avoid any claim a sponsor cannot verify.
'@
  },

  @{
    title  = 'WF-C2 - Verified impact numbers with sources'
    labels = 'epic: content,role: content,size: S,p0: blocker'
    body   = @'
## Why
`src/content/stats.json` currently ships two placeholders and a dash. These four numbers sit in the first screen a sponsor sees.

## What
Replace each entry with a counted figure, an `asOf` date, and a `source` string describing how it was counted.

| Stat | Current | Needs |
|---|---|---|
| Events run | `20+` PLACEHOLDER | Real count from WF-A1 |
| Builders reached | `1,500+` | Currently Facebook followers. Replace with registration totals if we have them, or keep and label honestly. |
| Partner orgs | `5` | Verified - confirm nothing is missing |
| Volunteers | `-` PLACEHOLDER | Real headcount |

## Acceptance criteria
- [ ] No `PLACEHOLDER` string remains in `stats.json`
- [ ] Every value has a source someone else could reproduce
- [ ] `asOf` dates current

## Note
The site renders `as of <date>` under every number deliberately. Showing our work is the difference between a counted figure and a rounded guess, and sponsors notice.
'@
  },

  @{
    title  = 'WF-C3 - Per-event copy, then set draft to false'
    labels = 'epic: content,role: content,size: L,p0: blocker'
    body   = @'
## Why
All four seed events in `src/content/showcase/` carry `draft: true` and visible DRAFT callouts. Production builds exclude drafts, so **the showcase is currently empty in production.** This issue is what fills it.

## Per event
- [ ] `hook` - one line, 110 characters max
- [ ] Recap body - 60-150 words, past tense, plain language
- [ ] `takeaways` - up to 4 bullets, 12 words each
- [ ] `stats` - at least 1, up to 3
- [ ] `links` - at least the original Facebook post
- [ ] `hero` and `gallery` wired from WF-A6
- [ ] Remove the DRAFT callout block
- [ ] Set `draft: false`

## Preview drafts locally
```bash
SHOW_DRAFTS=1 pnpm build
```
Never set that variable in production.

## Target
10 events at `tier: full`. Everything else `tier: archive`, which needs only frontmatter and renders as a row in the index list.

## Copy the pattern
`src/content/showcase/_example-archive-row.mdx` is a working template for archive rows.
'@
  },

  @{
    title  = 'WF-C4 - Verify dates and venues on the three seed events'
    labels = 'epic: content,role: content,size: S,p0: blocker'
    body   = @'
## Why
Seed frontmatter was populated from Facebook post text and contains guesses. Publishing a wrong date for a partner event is embarrassing and easily avoided.

## Verify
| Event | Field | Current | Status |
|---|---|---|---|
| WorkFlow PH x Jia Talent Vault | `date` | `2026-08-20` | Taken from the post date, not confirmed as the event date |
| WorkFlow PH x Jia Talent Vault | `venue` | `Online` | Assumed |
| AWS Community Day PH | `date` | `2026-08-17` | From the announcement post, needs confirming |
| AWS Community Day PH | `venue` | `TBC` | Unknown |
| Echelon Philippines 2026 | `date` | `2026-02-01` | The post is recent but references February 1. Confirm whether this is past or upcoming. |
| Echelon Philippines 2026 | `venue` | `TBC` | Unknown |

## Acceptance criteria
- [ ] No `TBC` remains in any frontmatter that will publish
- [ ] Every date confirmed against a registration page, Meetup listing, or a person who was there
- [ ] Titles match the official event naming exactly
'@
  },

  @{
    title  = 'WF-C5 - Publish 4-8 real builds, replace the placeholders'
    labels = 'epic: content,role: content,size: M,p1'
    body   = @'
## Why
This is the highest-leverage content on the site and the direct answer to "not just visual."

An automation org that publishes eight working templates reads as more substantial than one with any number of event photos. Reference: [n8n.io/workflows](https://n8n.io/workflows/) - a browsable library with attribution and use-case tags.

## Current state
`src/content/builds.json` has three entries, all `status: planned` with placeholder IDs. The homepage builds strip and `/builds` render from this file.

## What
Identify 4-8 things the community has actually produced. Candidates: n8n or Make workflows, Google Apps Script utilities, event-ops automations, the Bedrock agent walkthrough from AWS Community Day, community playbooks, workshop repos.

Per build: `title`, `kind`, `outcome` (what it does *for someone*, max 160 chars), `stack`, `contributors`, `url`, `publishedAt`, `status: live`.

## Acceptance criteria
- [ ] No `placeholder-` IDs remain
- [ ] At least 4 entries with `status: live` and a working URL
- [ ] Contributors credited by ID from `people.json`
- [ ] Every `outcome` describes a benefit, not the thing itself

## Even one real workflow beats four planned ones
If we can only ship two, ship two and drop the rest. Do not pad this list.
'@
  },

  @{
    title  = 'WF-C6 - Partner pitch copy for /partners'
    labels = 'epic: content,role: content,size: S,p1'
    body   = @'
## Why
`/partners#partner-with-us` is the page a sponsor will actually read. The layout and three offer cards are built; the copy is a first draft written by a dev and needs a real pass.

## What
- [ ] Review the three offer cards in `src/pages/partners.astro` - "Direct reach to builders", "A stage for your engineers", "Automations built on your stack". Rewrite so each names a concrete deliverable.
- [ ] Confirm the reach claim (`1,500+`) matches WF-C2
- [ ] Confirm `hello@workflowph.org` in `src/lib/site.ts` is real and monitored

## Acceptance criteria
- [ ] Each card promises something specific and deliverable
- [ ] No claim we cannot back with a number or a past example
- [ ] Contact email verified as working, with a named person watching it
'@
  },

  # -------------------------------------------------------------- FEATURES
  @{
    title  = 'WF-01 - Migrate images to src/assets + image() for build-time optimisation'
    labels = 'epic: feature,role: dev,size: M,p1'
    body   = @'
## Current state
`src/content.config.ts` types image fields as plain public-directory path strings, with a comment explaining why. That tradeoff was taken deliberately: `image()` from `astro:content` fails the build when a file is missing, which would have blocked every dev while assets were still being gathered.

Consequence: images in `public/` bypass sharp entirely. No AVIF, no WebP, no responsive srcset. That is fine for zero assets and wrong for a photo-led site.

## What
Once WF-A6 lands:
- [ ] Move photos from `public/images/` to `src/assets/images/`
- [ ] Change the `media` schema in `src/content.config.ts` to use the `image()` helper
- [ ] Swap the `<img>` in `src/components/media/Frame.astro` for Astro `<Picture>` with `formats={['avif','webp']}`
- [ ] Configure `widths: [400, 800, 1200, 1600, 2400]` and per-component `sizes`
- [ ] Keep the `PosterCard` fallback path intact for events with no photo
- [ ] Homepage hero stays `eager` + `fetchpriority="high"`, everything else lazy

## Acceptance criteria
- [ ] AVIF served to supporting browsers, verified in the Network tab
- [ ] Delivered hero under 200 KB, card under 90 KB
- [ ] No CLS - explicit width and height on every image
- [ ] Build still green with events that have no photo

## Depends on
WF-A6
'@
  },

  @{
    title  = 'WF-02 - Showcase filter chips: year, type, partner'
    labels = 'epic: feature,role: dev,size: M,p2'
    body   = @'
## Current state
`/showcase` groups by year with sticky year headers and a separate archive list. That is genuinely fine and ships today.

## What
Add filter chips above the grid.

- [ ] Real `<button>` elements with `aria-pressed`, never clickable divs
- [ ] Filters: year, event type, partner
- [ ] URL query-param sync so filtered views are shareable and browser back/forward works
- [ ] Result count in an `aria-live="polite"` region
- [ ] Designed empty state when a combination returns nothing
- [ ] Ships as a small island; content routes must stay under 100 KB JS

## Budget
The site currently ships **zero** JavaScript on content routes. If this component costs more than about 8 KB gzip, reconsider.

## First on the descope ladder
This is item 1 in `docs/05-sprint-plan.md` section 6. If the week gets tight, close this and keep year grouping.
'@
  },

  @{
    title  = 'WF-03 - Per-event OG images generated at build'
    labels = 'epic: feature,role: dev,size: M,p2'
    body   = @'
## Why
Most traffic will arrive from a Facebook or LinkedIn share. The OG card is the actual first impression, more than the homepage.

## What
- [ ] Generate a 1200x630 image per showcase entry at build time
- [ ] Composition: event title, series kicker, date, hero photo as background with a scrim, WorkFlow PH mark
- [ ] Wire into the `ogImage` prop on `src/pages/showcase/[...slug].astro`
- [ ] Falls back to `/og/default.png` when an event has no hero photo

## Approach
Satori plus resvg, or `astro-og-canvas`. Static output, so this must run at build time - no runtime endpoint.

## Verify before merging
Facebook Sharing Debugger and LinkedIn Post Inspector. **Facebook caches OG data aggressively, so a bad first scrape sticks around.** Scrape and fix before the launch post goes out.

## Descopable
Item 2 on the ladder. Fallback is one well-designed static image, which WF-A4 delivers anyway.
'@
  },

  @{
    title  = 'WF-04 - Static default OG image at /og/default.png'
    labels = 'epic: feature,role: design,size: S,p0: blocker'
    body   = @'
## Why
`src/layouts/Base.astro` already points every page at `/og/default.png`. **That file does not exist yet**, so every share currently renders a blank card. Launch blocker, and a fifteen-minute fix.

## What
- [ ] 1200x630 PNG at `public/og/default.png`
- [ ] WorkFlow PH mark, the positioning line, dark canvas with the flow accent
- [ ] Readable at thumbnail size - test it small before calling it done
- [ ] Under 300 KB

## Verify
Facebook Sharing Debugger and LinkedIn Post Inspector on the homepage URL.
'@
  },

  @{
    title  = 'WF-05 - CI: astro check, build, and Lighthouse budgets'
    labels = 'epic: feature,role: dev,size: M,p1'
    body   = @'
## Why
Wire this early, not on the last day. It is what stops the site quietly getting heavier as photos land.

## What
`.github/workflows/ci.yml`, on every PR:
1. `pnpm install --frozen-lockfile`
2. `pnpm check` - types plus content schema validation
3. `pnpm build`
4. Lighthouse CI on `/`, `/showcase`, and one detail page

## Budgets - fail the PR below these
| Metric | Threshold |
|---|---|
| Performance (mobile) | 90 |
| Accessibility | 95 |
| Best practices | 95 |
| SEO | 95 |

## Branch protection
- [ ] `main` protected, no direct pushes
- [ ] 1 approval required
- [ ] CI required to pass
- [ ] Squash merge, auto-delete branch

## Also add
- [ ] `.github/pull_request_template.md` - template is in `docs/04-tech-and-standards.md` section 6
'@
  },

  @{
    title  = 'WF-06 - Connect Vercel with preview deploys per PR'
    labels = 'epic: feature,role: dev,size: S,p0: blocker'
    body   = @'
## Why
Preview deploys are how a distributed volunteer team reviews work. Without them, review means "clone it and run it locally", which nobody will do.

## What
- [ ] Import `slvdrvncntjvr/workflowph` into Vercel
- [ ] Framework preset Astro, build `pnpm build`, output `dist`
- [ ] Set `PUBLIC_SITE_URL` to the production domain
- [ ] Confirm a preview URL is posted on a test PR
- [ ] Production deploys from `main` only

## Note
Output is static with no adapter, so this also works unchanged on Netlify, Cloudflare Pages, or GitHub Pages if you would rather. Do not add an adapter unless something actually needs SSR.

## Then
- [ ] Post the preview URL in this issue so non-devs can watch progress all week
'@
  },

  @{
    title  = 'WF-07 - Analytics'
    labels = 'epic: feature,role: dev,size: S,p1'
    body   = @'
## What
Install one privacy-friendly analytics script. Vercel Analytics or Plausible.

## Acceptance criteria
- [ ] Firing and visible in the dashboard
- [ ] No cookie banner required - if the tool needs one, pick a different tool
- [ ] Does not push the JS budget on content routes over 100 KB
- [ ] Exactly one third-party script on the site

## Why it matters post-launch
Knowing which showcase pages get traffic tells the content team which events to invest in next.
'@
  },

  @{
    title  = 'WF-08 - /styleguide route rendering every token and primitive'
    labels = 'epic: feature,role: dev,size: S,p2'
    body   = @'
## What
A single page rendering the design system so anyone can see it without hunting through components.

- [ ] Colour swatches with token names
- [ ] Full type scale
- [ ] Button variants and sizes, all states including focus
- [ ] Badge tones
- [ ] ShowcaseCard at all three sizes
- [ ] PosterCard across several slugs to show the gradient variation
- [ ] Prose block with every element
- [ ] PersonCard with and without a photo

## Acceptance criteria
- [ ] `noindex` set, and already excluded from the sitemap in `astro.config.mjs`
- [ ] Useful enough that a new contributor can find what they need without asking

## Why
Mostly for future contributors. Volunteer teams turn over, and a styleguide is the cheapest onboarding doc there is.
'@
  },

  # --------------------------------------------------------------- QUALITY
  @{
    title  = 'WF-Q1 - Performance pass against the budgets'
    labels = 'epic: quality,role: dev,size: M,p0: blocker'
    body   = @'
## Why
Most of the audience is on Philippine mobile data. The site currently ships zero JS on content routes and about 51 KB of uncompressed CSS, which is a strong starting point. Photos are what will threaten it.

## Budgets
| Thing | Budget |
|---|---|
| Hero image, delivered | 200 KB |
| Card image, delivered | 90 KB |
| Total page weight, mobile, above fold | 1.2 MB |
| JS on content routes | 100 KB gzip |
| Fonts | 2 files, 120 KB total |
| LCP on simulated 4G | 2.5 s |
| CLS | under 0.1 |

## What
- [ ] Measure every budget and **record the actual numbers in this issue**
- [ ] Subset the three variable fonts to Latin, verify preload
- [ ] Confirm no render-blocking resources
- [ ] Audit third-party scripts - there should be exactly one
- [ ] Test on a real phone on real mobile data, not throttled wifi

## Not "make it faster"
This is a measurement task with pass or fail numbers. If a budget is missed, either fix it or get an explicit decision to accept it, recorded here.
'@
  },

  @{
    title  = 'WF-Q2 - Accessibility audit'
    labels = 'epic: quality,role: dev,size: M,p0: blocker'
    body   = @'
## Why
This is a tech org public face. It will be inspected.

Built in already: skip link, focus-visible rings on the accent colour, mobile drawer focus trap, lightbox via native `<dialog>` with Esc and arrow keys and focus restoration, global `prefers-reduced-motion` kill switch, semantic landmarks, `aria-current` on nav. This issue is verification, plus whatever real content breaks.

## Checklist
- [ ] axe DevTools: zero critical or serious violations on every page
- [ ] Keyboard-only walkthrough of every page, **by two different people**
- [ ] Body text contrast 4.5:1 and large text 3:1, **checked against real photo backgrounds, not the flat token** - this is the one most likely to fail once photos land
- [ ] Focus ring visible on every interactive element, 3:1 against its background
- [ ] Lightbox: focus trapped, Esc closes, arrows navigate, focus returns to the triggering thumbnail
- [ ] Reduced motion tested with the OS setting actually on
- [ ] 200% zoom, no horizontal scroll or clipping
- [ ] Screen reader spot-check on the homepage and one detail page (NVDA or VoiceOver)
- [ ] Every content image has alt text sourced from data, never a filename

## For the record
This gets us to a strong baseline. A full WCAG conformance claim would need broader manual testing with assistive technology and an expert review - we are aiming for genuinely accessible, not for a badge.
'@
  },

  @{
    title  = 'WF-Q3 - Cross-browser and real-device check'
    labels = 'epic: quality,role: dev,size: S,p0: blocker'
    body   = @'
## Matrix
- [ ] Chrome, Safari, Firefox, Edge on desktop
- [ ] iOS Safari on real hardware
- [ ] Android Chrome on real hardware
- [ ] Widths 360 / 390 / 768 / 1280 / 1920

## Watch specifically
- Scroll-reveal uses `animation-timeline: view()` behind `@supports`. Confirm content is fully visible in browsers without support - it should be, but verify rather than assume.
- Native `<dialog>` behaviour in the lightbox on iOS Safari
- Sticky header condense on iOS momentum scrolling
- `oklch()` colours in the poster gradients on older Safari
- Grain overlay uses `mix-blend-mode: overlay` - check it does not wash out on any browser

## Acceptance criteria
- [ ] No layout breakage at any tested width
- [ ] No console errors on any browser
- [ ] Tested on real mobile data at least once
'@
  },

  @{
    title  = 'WF-Q4 - Content proofread, read out loud'
    labels = 'epic: quality,role: content,size: S,p0: blocker'
    body   = @'
## Method
Every string, read out loud, by someone who did not write it. Reading aloud catches things silent reading does not.

## Checklist
- [ ] Zero `DRAFT`, `PLACEHOLDER`, `TBC`, or lorem ipsum anywhere
- [ ] Speaker names, titles, and credentials spelled correctly - especially Karen Pearl V. Pabilando
- [ ] Partner names exactly as those organisations write them
- [ ] Every date checked
- [ ] Every external link clicked and landing where intended
- [ ] Contact email correct, and someone is actually watching that inbox
- [ ] Consistent voice - the seed copy leans plain and direct; keep it there

## Highest-risk items
Anything with someone else name on it. Getting a partner or speaker name wrong is the one error people remember.
'@
  },

  @{
    title  = 'WF-Q5 - Domain, DNS, HTTPS, and OG scrape'
    labels = 'epic: quality,role: lead,size: S,p0: blocker'
    body   = @'
## Do the domain part early
DNS propagation can take 48 hours. Find out about a problem on Monday, not on launch morning.

## Checklist
- [ ] Domain purchased and confirmed
- [ ] DNS configured, apex and `www` both resolving with one canonically redirecting to the other
- [ ] Valid HTTPS certificate
- [ ] `PUBLIC_SITE_URL` set to the production domain in Vercel - canonicals, OG tags, and the sitemap all depend on it
- [ ] `sitemap-index.xml` and `robots.txt` reachable
- [ ] `/events` redirects to `/showcase` on the real host
- [ ] 404 page works on the real host, not just locally
- [ ] JSON-LD validates in Google Rich Results Test

## OG scrape - before any launch post
- [ ] Facebook Sharing Debugger on `/`, `/showcase`, and two detail pages
- [ ] LinkedIn Post Inspector on the same URLs

**Facebook caches OG data aggressively.** Scrape and fix before the announcement goes out, or the bad card follows you around.
'@
  },

  @{
    title  = 'WF-Q6 - Speaker and partner preview emails before launch'
    labels = 'epic: quality,role: content,size: S,p1'
    body   = @'
## Why
Costs an hour and produces the best launch-day reach available, because these are exactly the people with an incentive to reshare.

## What
- [ ] Every featured speaker sent a preview link to their page. One line, one link.
- [ ] Every partner sent a preview link to `/partners` and their event pages
- [ ] Every photographer told where their work appears, and credited
- [ ] Every volunteer who contributed listed in the footer or on `/people`

## Template
> Hi [Name] - WorkFlow PH is launching our site on Monday and you are on it. Here is your page: [link]. Let us know if you would like anything changed before we go live.

## Then
Ask each of them to share it on launch day. That is the whole algorithm game, and asking directly works far better than hoping.
'@
  }
)

$created = 0
foreach ($i in $issues) {
  $tmp = New-TemporaryFile
  Set-Content -Path $tmp -Value $i.body -Encoding utf8
  gh issue create --repo $repo --title $i.title --body-file $tmp --label $i.labels --milestone $milestone | Out-Null
  Remove-Item $tmp -Force
  $created++
  Write-Host "  [$created/$($issues.Count)] $($i.title)"
}

Write-Host "`nCreated $created issues."
