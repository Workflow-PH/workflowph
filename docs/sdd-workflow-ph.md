---
spine_type: SDD
spine_version: 0.2.0
project: WorkFlow PH
slug: workflow-ph
doc_version: 0.1
status: Draft
owner: slvdrvncntjvr
created: 2026-10-01
updated: 2026-10-01
reconciled: 2026-10-01
---

# System Design: WorkFlow PH

**PRD:** [prd-workflow-ph.md](prd-workflow-ph.md)

---

## 1. Architecture

A static-first public record site. Content lives in typed data modules under `lib/data/`; App Router pages under `app/` render those modules with shared presentation components under `components/wf/`. There is no database, no user session, and no member backend. Dynamic behavior is limited to one OG image route and build-time SEO artifacts (sitemap, robots, metadata).

Deployment target: Vercel, org repo `Workflow-PH/workflowph`. Production branch is `main`, live at `https://workflowph.vercel.app/`; `dev` is the staging branch, checked via Vercel preview links (owner-confirmed 2026-10-01). No custom domain is connected yet. Canonical `SITE_URL` now points at `https://workflowph.vercel.app/` (`lib/data/site.ts:1`, switched 2026-10-01 until a custom domain lands) and feeds metadata, sitemap, and robots.

```
lib/data/*.ts (content source of truth)
        |
        v
app/*/page.tsx (routes) + lib/seo.ts, lib/items.ts, lib/format.ts
        |
        v
components/wf/* (nav, footer, events-index, big-rows, page-title, marquee, ...)
        |
        v
static pages + /og image route + /sitemap.xml + /robots.txt
```

## 2. Components

| Component | Responsibility | Serves | Location |
|-----------|---------------|--------|----------|
| Home stage + record index | Presents tagline, verified stats, latest events, partner marquee | PRD-F1, PRD-F4, PRD-F5 | `app/page.tsx:1` |
| Showcase list | Full event record index, newest-first | PRD-F1 | `app/showcase/page.tsx:1` |
| Event detail | One page per event slug; metadata, numbers, recap, outcomes, people, outputs, links, photos; unknown slug → not-found | PRD-F1 | `app/showcase/[slug]/page.tsx:1` |
| Builds list | Open outputs with status, stack, origin, credits | PRD-F2 | `app/builds/page.tsx:1` |
| People roster | Core/volunteer groups only; partner speakers excluded | PRD-F3 | `app/people/page.tsx:1` |
| About story | Activities, beliefs, tracks, vision, history, long-term goals | PRD-F4 | `app/about/page.tsx:1` |
| Partners | Partner tiers, reasons to partner, email contact section | PRD-F5 | `app/partners/page.tsx:1` |
| Join | Contribution lanes, volunteer terms, email contact section | PRD-F6 | `app/join/page.tsx:1` |
| Press kit | Downloadable logos, colors, typefaces, rules, boilerplate | PRD-F7 | `app/press-kit/page.tsx:1` |
| Shell (layout, nav, footer, intro, HUD) | Fonts, metadata base, nav, footer, intro overlay, smooth scroll, prod-only analytics | PRD-F8 | `app/layout.tsx:1` |
| OG image route | Per-page share image from `title` + `kicker` query params | PRD-F8 | `app/og/route.tsx:1` |
| Sitemap / robots | Canonical route list plus one URL per event; allow-all robots | PRD-F8 | `app/sitemap.ts:1`, `app/robots.ts:1` |
| SEO helper | Canonical + OpenGraph + Twitter metadata builder | PRD-F8 | `lib/seo.ts:1` |
| Event helpers | Date sorting, slug lookup, per-person lookup, evidence score | PRD-F1 | `lib/data/events.ts:250` |
| Shared presentation | Events index, big rows, page titles, marquees, reveal, nav, footer | PRD-F1–PRD-F7 | `components/wf/events-index.tsx:1`, `components/wf/big-rows.tsx:1`, `components/wf/nav.tsx:1`, `components/wf/footer.tsx:1` |
| Redirects + headers | Legacy `/events` → `/showcase` mapping; security headers | PRD-F8 | `next.config.mjs:6` |
| Poster strip | Scrolling poster cards on home, current theme | PRD-F1 | `components/wf/poster-strip.tsx:1` |
| Showcase partnerships | Chips of every collaborating org with event counts | PRD-F1 | `app/showcase/page.tsx:1` |
| Ambassadors display | Logo strip plus roster rows for ambassador tier | PRD-F5 | `app/partners/page.tsx:1` |
| LinkedIn icons | Profile links on roster rows, rendered only when a URL exists | PRD-F3 | `components/wf/big-rows.tsx:1` |
| Date honesty | Non-date `start` renders `Date TBC` (`lib/format.ts`); dateless records sort last | PRD-F1 | `lib/data/events.ts` |

## 3. Data model

Source of truth: `lib/data/events.ts`, `lib/data/outputs.ts`, `lib/data/people.ts`, `lib/data/partners.ts`, `lib/data/site.ts`

| Entity | Key fields | Relationships | Notes |
|--------|-----------|---------------|-------|
| EventRecord | `slug`, `title`, `series`, `start`/`end`, `mode`, `kind`, `role`, `numbers[]`, `people[]`, `outputs[]`, `links[]`, `photos[]` | `people[]` → Person.slug; `outputs[]` → Output.slug | `null` number renders as TBC, never estimated (`lib/data/events.ts:22`); links without `href` are expected-but-unpublished (`lib/data/events.ts:13`) |
| Output | `slug`, `name`, `does`, `forWho`, `stack[]`, `status`, `origin`, `originEvent?`, `people[]` | `originEvent?` → EventRecord.slug; `people[]` → Person.slug | Statuses: `in-progress`, `planned` (`lib/data/outputs.ts:1`) |
| Person | `slug`, `name`, `group`, `does`, `credential`, `photo?`, `pending?`, `linkedin?` | Referenced by EventRecord.people and Output.people | Groups: `core`, `speaker`, `volunteer`, `alumni`; only `core`/`volunteer` listed on /people (`app/people/page.tsx:14`); LinkedIn renders only when a URL is set |
| Partner | `slug`, `name`, `tier`, `what`, `since`, `logo?`, `href?` | Referenced by name in EventRecord.collaborators | Tiers: `strategic`, `community`, `ambassador`; `logo` stays undefined until artwork is supplied (`lib/data/partners.ts:9`); `TBC` / `Details to follow.` marks lorem-first entries awaiting the Community Lead |
| Site content | `org`, `stats[]`, `activities[]`, `beliefs[]`, `tracks[]`, `vision[]`, `history[]`, `contributions[]`, `volunteerTerms`, `partnerReasons`, `press` | Stats feed home page; press feeds press kit | `null` stat means unknown and must say so (`lib/data/site.ts:25`); volunteer terms are 2–4 hrs/week async-first |

### 3.1 Migration policy

No database and no migrations. Content changes are typed edits to `lib/data/*.ts` reviewed against the BUILD guardrails (photos exist, TBC discipline, verification flags, no traced logos). Breaking content-shape changes must update every page and helper that consumes the shape in the same change.

## 4. API surface

There is no JSON API and no authenticated endpoint. The network surface is pages plus three generated artifacts and redirects.

| Method | Path | Auth | Serves | Notes |
|--------|------|------|--------|-------|
| GET | `/` | none (public) | PRD-F1, PRD-F4, PRD-F5 | Home stage + record index |
| GET | `/showcase` | none (public) | PRD-F1 | Full event index |
| GET | `/showcase/:slug` | none (public) | PRD-F1 | Static params per event (`app/showcase/[slug]/page.tsx:15`); unknown slug → not-found (`app/showcase/[slug]/page.tsx:34`) |
| GET | `/builds` | none (public) | PRD-F2 | Outputs list |
| GET | `/people` | none (public) | PRD-F3 | Roster (core + volunteer) |
| GET | `/about` | none (public) | PRD-F4 | Story and programs |
| GET | `/partners` | none (public) | PRD-F5 | Partners + contact |
| GET | `/join` | none (public) | PRD-F6 | Lanes + contact |
| GET | `/press-kit` | none (public) | PRD-F7 | Logos, colors, copy |
| GET | `/og?title=&kicker=` | none (public) | PRD-F8 | Generated share image (`app/og/route.tsx:21`); inputs truncated server-side |
| GET | `/sitemap.xml` | none (public) | PRD-F8 | Routes + one URL per event (`app/sitemap.ts:8`) |
| GET | `/robots.txt` | none (public) | PRD-F8 | Allow-all with sitemap pointer (`app/robots.ts:5`) |
| GET | `/events`, `/events/:slug` | none (public) | PRD-F8 | Permanent redirects to `/showcase` equivalents (`next.config.mjs:6`) |

## 5. Cross-cutting concerns

| Concern | Approach | Serves |
|---------|----------|--------|
| Authentication | None. The entire site is public; there are no accounts and no sessions. This is deliberate and safe because nothing on the site is per-user. | PRD-F1–PRD-F8 |
| Authorization | None required (no privileged actions in the site). Content edits happen in git, not in the app. | PRD-F1–PRD-F8 |
| Validation | Content-level: photo paths must exist under `public/`; `null` numbers render TBC; roster `pending` blocks publication; partner `logo` stays undefined without artwork (BUILD §5). No user input is accepted except query strings on `/og`, which are truncated server-side. | PRD-F1, PRD-F3, PRD-F5 |
| Error handling | Unknown event slugs render the not-found page (`app/showcase/[slug]/page.tsx:34`, `app/not-found.tsx:1`); missing numbers render TBC rather than failing. | PRD-F1 |
| Secrets | None in the app. Only site URL configuration via env (see `.env.example:1`); `.env` is gitignored and never committed. | PRD-F8 |
| Rate limiting | None. Static content with no mutations; TBD(owner) whether the host adds edge limits at tier 3. | PRD-F8 |

Any network-exposed surface without authentication must be called out here
explicitly, with the reason it is safe to leave open.

All routes in §4 are unauthenticated. This is safe to leave open because the site publishes only public community records and accepts no writes, payments, or personal data.

## 6. Feature-to-design map

Every Must-Have `PRD-F#` appears here. `no` in the Designed column is a gap.

| PRD-F# | Designed | Components | RFC |
|--------|----------|------------|-----|
| PRD-F1 | yes | Showcase list, event detail, event helpers, SEO helper | N/A |
| PRD-F2 | yes | Builds list, Output model | N/A |
| PRD-F3 | yes | People roster, Person model | N/A |
| PRD-F4 | yes | About story, home stage, Site content model | N/A |
| PRD-F5 | yes | Partners page, Partner model | N/A |
| PRD-F6 | yes | Join page, volunteer terms content | N/A |

## 7. Rejected alternatives

| Considered | Rejected because |
|-----------|------------------|
| CMS-backed content (headless CMS for events/people) | Rejected for this release: typed data modules keep the record reviewable in git with zero CMS cost; revisit if non-technical editors need a UI |
| Member accounts and dashboards | Rejected: contradicts IDEA §4; the site is a public record, not an app |
| Estimated stats to fill gaps | Rejected: presenting estimates as fact destroys the record's trust; TBC discipline stands |
| Client-side event search/filters | Rejected for this release: record is small enough to browse; revisit as a PRD candidate when it grows |

## 8. Open questions

- `TBD(owner)` Is per-output detail routing wanted, or does the builds list suffice for this release?
- `TBD(owner)` Sitemap `lastModified` is a fixed date (`app/sitemap.ts:6`). Keep fixed, generate at build time, or drop it?
- Code note: `evidenceFor` scoring (`lib/data/events.ts:374`), `outputBySlug`, and `partnerByName` are currently unused by pages; `PUBLIC_SITE_URL` in `.env.example` is unread (the URL is hardcoded). Decided 2026-10-01: photo credits are not displayed, and speakers are not listed on /people (names stay on event pages). Pending (LOG Q15): LinkedIn icons will need a new optional field on Person plus icon rendering — no URLs supplied yet.
