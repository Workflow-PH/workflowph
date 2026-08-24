# 06 — Backlog

Live issues: [github.com/slvdrvncntjvr/workflowph/issues](https://github.com/slvdrvncntjvr/workflowph/issues)

This file is the reference copy. The issue tracker is the source of truth once the sprint starts.

## Already shipped in the initial commit

Do not re-open these. Marked here so nobody duplicates work.

| Area | State |
|---|---|
| Project scaffold, Astro 7 + Tailwind 4, strict TS | ✅ builds green, `astro check` clean |
| Design tokens, type scale, motion rules, grain overlay | ✅ `src/styles/global.css` |
| Flow-mesh signature motif | ✅ `components/media/FlowMesh.astro` |
| Content model, six Zod-validated collections | ✅ `src/content.config.ts` |
| Base layout, SEO, OG tags, JSON-LD, sitemap | ✅ |
| Header with condense-on-scroll + mobile drawer with focus trap | ✅ |
| Footer, skip link, 404 | ✅ |
| Primitives: Container, Section, Button, Badge, Prose | ✅ |
| ShowcaseCard with metadata triplet + hover reveal | ✅ |
| Asymmetric ShowcaseGrid, ArchiveList, PosterCard fallback | ✅ |
| Showcase detail template: hero, meta, stats, recap, speakers, gallery, artifacts, partners, prev/next | ✅ |
| Accessible Gallery + Lightbox (focus trap, Esc, arrows, credits) | ✅ |
| Homepage: hero, impact bar, featured, builds strip, upcoming empty state, partner wall, CTA | ✅ |
| Pages: builds, people, about, partners, join, press-kit | ✅ |
| Zero JS bundle on content routes | ✅ measured |

## Remaining work

Sized as: `S` under an hour · `M` half a day · `L` a full day.

### Assets — critical path, blocks everything

| ID | Task | Size | Role |
|---|---|---|---|
| WF-A1 | Harvest the Facebook archive into the content sheet, one row per event | L | assets |
| WF-A2 | Collect and select hero + gallery photos for the first 10 events | L | assets |
| WF-A3 | Request, collect, and commit partner logos as SVG | M | assets |
| WF-A4 | Official WorkFlow PH logo as SVG, light and dark, replace the placeholder wordmark | S | design |
| WF-A5 | Complete the consent register; verify every photo at 100% zoom | M | assets |
| WF-A6 | Optimise and commit `public/images/` to spec | M | assets |
| WF-A7 | Core team and speaker headshots | M | assets |

### Content

| ID | Task | Size | Role |
|---|---|---|---|
| WF-C1 | Org copy: positioning line, 35/100-word boilerplate, about story, timeline, join time commitment | M | content |
| WF-C2 | Verified impact numbers with `asOf` dates and sources; replace all placeholders in `stats.json` | S | content |
| WF-C3 | Per-event copy: hook, 60–150 word recap, takeaways, stats, links. Then `draft: false`. | L | content |
| WF-C4 | Verify every seed event's date and venue — three are marked TBC | S | content |
| WF-C5 | Identify and publish 4–8 real builds in `builds.json`; replace the three placeholders | M | content |
| WF-C6 | Partner pitch copy for `/partners` | S | content |

### Features

| ID | Task | Size | Role |
|---|---|---|---|
| WF-01 | Migrate images to `src/assets` + `image()` for build-time optimisation once real photos land | M | dev |
| WF-02 | Showcase filter chips: year, type, partner. URL-synced, `aria-pressed`, live result count. | M | dev |
| WF-03 | Per-event OG images, 1200×630, generated at build | M | dev |
| WF-04 | Static default OG image at `/og/default.png` | S | design |
| WF-05 | GitHub Actions CI: `astro check` + build + Lighthouse budgets | M | dev |
| WF-06 | Vercel project connected with preview deploys per PR | S | dev |
| WF-07 | Analytics (Vercel Analytics or Plausible) | S | dev |
| WF-08 | `/styleguide` route rendering every token and primitive | S | dev |

### Quality — launch blockers

| ID | Task | Size | Role |
|---|---|---|---|
| WF-Q1 | Performance pass: verify every budget in [doc 03 §4](03-asset-playbook.md), record numbers | M | dev |
| WF-Q2 | Accessibility audit: axe clean, full keyboard walkthrough by two people | M | dev |
| WF-Q3 | Cross-browser and real-device check on mobile data | S | dev |
| WF-Q4 | Content proofread, read out loud by someone who didn't write it | S | content |
| WF-Q5 | Domain, DNS, HTTPS, OG scrape in the Facebook and LinkedIn debuggers | S | lead |
| WF-Q6 | Speaker and partner preview emails sent before launch | S | content |

## Definition of Done

AC met · `pnpm build` green · verified on mobile at 390 px · one approval · squash merged · issue closed.
