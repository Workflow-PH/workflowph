# 02 — Information Architecture & Content Model

## 1. Sitemap

```
/                        Home
/showcase                Showcase index — the work grid (filter: year, type, partner)
/showcase/[slug]         Event / case detail
/builds                  Outputs: workflows, templates, repos, playbooks, talks
/builds/[slug]           Build detail  (cut to modal-only if behind schedule)
/people                  Core team, volunteers, past speakers
/about                   Mission, story, timeline, impact numbers
/partners                Partner wall + "partner with us" pitch and contact
/join                    Volunteer + member call, links to existing forms
/press-kit               Logos, colours, typography, boilerplate, photo pack
/404
```

Global: header nav (Showcase · Builds · People · About · Partners · **Join** as accent button), footer with socials, contact email, press kit link, dev-team credit.

**Naming note:** `/showcase` over `/work` or `/events`. "Work" implies a commercial agency; "events" undersells because it also holds non-event outputs. `/showcase` covers both. Add a `/events` → `/showcase` redirect since peers use that path and people will guess it.

## 2. Page anatomy

### `/` Home
1. **Hero** — one line of positioning ("Building the Volunteer-Driven Automation Landscape of the Philippines"), one sub-line, two CTAs (`See our work`, `Partner with us`). Background: a single strong candid event photo or a slow 3-photo cross-fade. No video.
2. **Impact bar** — 4 numbers: events run, people reached, partner orgs, volunteers. Static values from `stats.json`, each with an `asOf` date.
3. **Featured showcase** — 6 items, asymmetric grid, hover reveal. Link to full index.
4. **Builds strip** — 3–4 automation outputs. This is the "not just visual" moment. Do not cut this section.
5. **Partner logo wall** — greyscale, colour on hover.
6. **Upcoming** — next 1–3 events, or a "no upcoming events, follow us" state that still looks designed.
7. **Join / contact CTA** with a real email address.

### `/showcase` index
Filter chips: All · Year · Type · Partner. Client-side filtering only, URL-synced via query params so filtered views are shareable. Cards show the Creative Impact metadata triplet: **SERIES / Title / Year ● Venue / Type**. Default sort: newest first. Skeleton states not needed (static data); empty filter state is.

### `/showcase/[slug]` detail
1. Full-bleed hero photo + title block + metadata row (date, venue, mode, type, partners)
2. Stat row — 3 numbers max
3. Recap body — 60–150 words, MDX so a pull-quote or embedded link can be dropped in
4. Speaker cards (headshot, name, role, one-line credential)
5. Photo gallery — 6–12 images, click for lightbox
6. Artifacts — slides, recording, workflow template, blog recap, original FB post
7. Partners for this event
8. Prev / next event navigation

### `/builds`
Card grid modeled on the n8n template library. Card = title, kind badge (Workflow / Template / Repo / Playbook / Talk), stack tags, contributor, one-line outcome, link out. Filter by kind and stack tag.

### `/press-kit`
Logo downloads (SVG + PNG, light/dark), colour swatches with hex values and copy-to-clipboard, typography, 50-word and 100-word boilerplate with copy buttons, approved photo pack as a zip or Drive link, usage do/don't.

## 3. Content source of truth

**One Google Sheet, one tab per entity.** Non-devs fill the sheet. A script pulls it to JSON in `src/content/`. Committed JSON is what builds, so the site never depends on the Sheet being reachable at build time.

```
Google Sheet  ──`npm run sync:content`──►  src/content/*.json  ──git commit──►  build
```

Rules:
- Photos live in Google Drive, not in the Sheet. The Sheet holds folder names; a second script pulls, renames, and optimises. See [03](03-asset-playbook.md).
- Long-form recaps live as MDX files in `src/content/showcase/[slug].mdx` with frontmatter matching the schema. The Sheet holds everything except the recap body.
- Devs never hand-edit generated JSON. If a value is wrong, fix the Sheet and re-sync.
- Every schema is validated with Zod at build time. **A bad row fails the build with a readable error.** This is the guardrail that lets non-devs edit content safely.

## 4. Schemas

Astro content collections with Zod. Copy this into `src/content.config.ts` as the starting point — ticket **WF-04** owns it.

```ts
import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const image = z.object({
  src: z.string(),                 // /images/... path, post-optimisation
  alt: z.string().min(10),         // required, meaningful, not the filename
  credit: z.string().optional(),   // photographer name
  width: z.number(),
  height: z.number(),
  focal: z.enum(['center','top','bottom','left','right']).default('center'),
});

const link = z.object({
  label: z.string(),
  url: z.string().url(),
  kind: z.enum(['register','meetup','facebook','album','slides','recording','repo','template','article','other']),
});

const showcase = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/showcase' }),
  schema: z.object({
    title: z.string(),
    series: z.string().optional(),          // e.g. "WorkFlow PH x Jia Talent Vault"
    hook: z.string().max(90),               // one-line teaser for cards and OG
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    venue: z.string(),                      // "SMX Convention Center" or "Online"
    city: z.string().optional(),
    mode: z.enum(['onsite','online','hybrid']),
    type: z.enum(['workshop','community-day','summit','hackathon','general-assembly','ama','meetup','campaign']),
    featured: z.boolean().default(false),
    tier: z.enum(['full','archive']).default('full'),  // 'archive' = list row only, no detail page
    hero: image,
    card: image.optional(),                 // falls back to hero
    gallery: z.array(image).default([]),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).max(3).default([]),
    speakers: z.array(reference('people')).default([]),
    partners: z.array(reference('partners')).default([]),
    builds: z.array(reference('builds')).default([]),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

const builds = defineCollection({
  loader: file('./src/content/builds.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    kind: z.enum(['workflow','template','repo','playbook','talk','dataset']),
    outcome: z.string().max(140),           // what it actually does for someone
    stack: z.array(z.string()).default([]), // ['n8n','Make','Google Sheets','AWS Lambda']
    contributors: z.array(reference('people')).default([]),
    url: z.string().url(),
    thumb: image.optional(),
    metric: z.string().optional(),          // "used by 40+ builders"
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const people = defineCollection({
  loader: file('./src/content/people.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),                       // "Core Team — Community Lead" / "Speaker"
    credential: z.string().max(120).optional(), // "Magna Cum Laude, ... / AWS Community Builder"
    org: z.string().optional(),
    photo: image.optional(),
    socials: z.array(link).default([]),
    group: z.enum(['core','volunteer','speaker','alumni']),
    order: z.number().default(99),
  }),
});

const partners = defineCollection({
  loader: file('./src/content/partners.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    logoLight: z.string(),                  // SVG path, for dark backgrounds
    logoDark: z.string().optional(),
    url: z.string().url().optional(),
    tier: z.enum(['strategic','partner','community','venue','media']),
    order: z.number().default(99),
  }),
});

const stats = defineCollection({
  loader: file('./src/content/stats.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),                      // "Builders reached"
    value: z.string(),                      // "1,500+"
    asOf: z.coerce.date(),
    order: z.number().default(99),
  }),
});

export const collections = { showcase, builds, people, partners, stats };
```

### The `tier` field earns its keep

`tier: 'full'` gets a detail page. `tier: 'archive'` renders as a row in a compact list at the bottom of `/showcase`. This lets you publish the *complete* event history — which is what makes the org look established — without needing 30 complete asset kits. Aim for 12 `full` and everything else `archive`.

## 5. Seed content from the Facebook page

Known items to work from, pulled from the page as of Aug 2026. The content lead verifies and expands each into a Sheet row.

| Candidate item | Series / partner | Likely tier |
|---|---|---|
| WorkFlow PH × Jia Talent Vault (Aug 20, 2026) | Jia Talent Vault | full |
| Echelon Philippines 2026 | Echelon PH | full |
| AWS Community Day Philippines — Bedrock Agents session (Karen Pearl V. Pabilando) | AWS User Group PH, Tutorials Dojo | full |
| Remaining workshops, GAs, and AMAs from the page history | — | archive → promote to full if assets exist |

Named partners already visible on the page: **Jia Talent Vault, Echelon Philippines, Tutorials Dojo, AWS User Group Philippines, AWS Community Day Philippines.** Request SVG logos from each — see [03](03-asset-playbook.md) §6.

## 6. Copy that needs writing before Sep 7

Owner: content lead. Each is small; the total is the bottleneck.

- [ ] Positioning line, 12 words max, and a 25-word sub-line
- [ ] 50-word and 100-word org boilerplate (reused on `/about`, `/press-kit`, and in partner emails)
- [ ] `/about` story, 200–300 words. Founding, why automation, why volunteer-driven.
- [ ] Org timeline, 5–8 dated milestones
- [ ] 4 impact numbers with `asOf` dates and a note on how each was counted
- [ ] Partner pitch for `/partners`, 150 words: what a partner gets, with three concrete deliverables
- [ ] `/join` copy: who we want, what volunteers actually do, time commitment, how to apply
- [ ] Per `full` event: one 90-char hook, a 60–150 word recap, 3 bullet takeaways, up to 3 stats
- [ ] 404 copy with personality
