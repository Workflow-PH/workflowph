---
spine_type: LOG
spine_version: 0.2.0
project: WorkFlow PH
slug: workflow-ph
doc_version: 0.1
status: Draft
owner: slvdrvncntjvr
created: 2026-10-01
updated: 2026-10-02
reconciled: 2026-10-01
---

# Session Log: WorkFlow PH

---

## 1. Decisions

| Date | Decision | Rationale | Docs touched |
|------|----------|-----------|--------------|
| 2026-10-01 | Bootstrap SPINE docs at tier 2 (INDEX, IDEA, BUILD, LOG, PRD, SDD) | Owner request; site has users, state (event record), and a deploy target, which matches tier 2 | index, idea, build, prd, sdd, log |
| 2026-10-01 | Slug `workflow-ph`, project `WorkFlow PH`, owner `slvdrvncntjvr` | Slug matches package.json name; project matches org name; owner confirmed 2026-10-01 | index and all frontmatter |
| 2026-10-01 | Content guardrails carried from README into BUILD §5 and PRD exclusions | Photos-must-exist, TBC discipline, pending-until-verified, no traced logos, design-final are the repo's trust model | build, prd, sdd |
| 2026-10-01 | QAD and OPS marked N/A (tier 2; deferred to tier 3); no RFCs | Scale tiers: tier 2 adds PRD+SDD only; QAD/OPS/RFC-per-feature arrive at tier 3 | index, prd §6 |
| 2026-10-01 | All docs start as Draft with TBD(owner) gaps | Nothing is Locked; TBDs fail strict validation by design until the owner answers | all docs |
| 2026-10-01 | Owner confirmed as slvdrvncntjvr; deployment is Vercel on org repo Workflow-PH/workflowph at https://workflowph.vercel.app/ | Resolves LOG Q1; updates IDEA, BUILD, SDD | idea, build, sdd, log |
| 2026-10-01 | Code search resolved repo facts: main+dev branches with PR merges, no test/lint configs, SITE_URL hardcoded, sitemap date fixed, credit field unrendered, speaker-link mismatch | Recorded as code facts; owner decisions requested where behavior is affected | build, sdd, prd, log |
| 2026-10-01 | SITE_URL switched to `https://workflowph.vercel.app/` in code until a custom domain lands (owner-ordered) | Fixes sitemap/OG/canonical pointing at unconnected workflowph.org | sdd, build, log |
| 2026-10-01 | PR #33 (ambassador + event photos) merged into `dev` (was retargeted from `main` first) | Assets-only PR: 3 ambassador logos + 12 event/partner photos under `public/`; not yet wired into any page | prd, log |
| 2026-10-01 | Verification authority is the Community Lead, internal only — not displayed on the site | Owner answer; recorded in PRD-F3 | prd, idea, log |
| 2026-10-01 | Launch policy: everything currently live stays live; gaps are flagged and fixed iteratively, no pre-publication evidence gate | Owner answer; resolves launch-bar and evidence questions | prd, idea, log |
| 2026-10-01 | Photo credits will not be displayed; speakers will not be listed (names stay on event pages) | Owner answer; recorded in SDD code note | sdd, log |
| 2026-10-01 | Press kit existence questioned: keep-or-drop is now the open question, tied to verified numbers | Owner question; PRD §7 reframed | prd, log |
| 2026-10-01 | Lorem-first build executed on `dev` (owner-ordered, against Draft docs per engine §7.5): stats/boilerplate to 6·500+·10, join lanes per thoughts.md, Maury out + Joemar in, `linkedin?` field (no URLs yet), ambassador tier + 11 partner/ambassador entries with TBC details, 15 stub event records (dateless sort last, `Date TBC`), 6 pubmats wired to existing records, poster strip, showcase partnerships, ambassadors display, LinkedIn icons, supported-by line | Filler is always marked TBC / Details to follow.; no winner names or achievements invented; review corrects | site, people, partners, events, format, pages, components, prd, sdd, log |
| 2026-10-01 | Reports-to lines removed from all roster credentials; poster strip converted from auto-marquee to manual drag/scroll/snap (touch uses native swipe); fixed own touch-conflict in strip handlers | Owner-ordered review fixes on `dev` | people, components, log |
| 2026-10-01 | Pushed to `dev`: batch commit `e4edd5a` (lorem-first build) then `e37a93d` (manual strip + reports-to removal). Docs are git-tracked; Vercel previews build from `dev`. | Push record so any session can locate the state | log |
| 2026-10-01 | Batch status ledger: CONFIRMED — everything in prior rows plus reports-to removal and manual strip. TO FOLLOW — LinkedIn URLs (Jem compiling), partner details + namings, new-event details + winners scope, About concept, press-kit keep-or-drop, dev preview review, merge to main, docs lock. | Owner-ordered status freeze; anything not in CONFIRMED waits | all docs |
| 2026-10-01 | Homepage poster strip approved in principle: poster cards in the current theme, not a redesign | Owner + Community Lead direction from Astro reference (`jem/reference-pic/previous_reference.jpeg`); repo design-final rule respected | sdd, log |
| 2026-10-02 | Owner-approved motion changes on `dev` (uncommitted): poster strip now auto-drifts right-to-left as a seamless infinite loop (replacing the manual-only strip), keeps drag/swipe/Shift+wheel/arrow keys, and pauses on hover, keyboard focus, touch, off-screen, hidden tab, intro not done and reduced motion; the home mark lands as a background watermark after the intro so AUTOMATE stays readable, and is restored on scroll before the split; intro mark now hands off to the stage at a matching size. This OVERRIDES the README/BUILD §5 design-final rule ("no new motion") by explicit owner approval. Accepted gap: no persistent pause control, so WCAG 2.2.2 is knowingly not met for the strip (owner decision, hover-based pause only). Known risk, needs a device check: a touch fling that crosses a loop seam may stop or stutter on iOS/Android | Owner answers 1=b, 2=a, 3=a plus "strip should drift right to left" | sdd, log (`components/wf/poster-strip.tsx`, `components/home/stage.tsx`, `components/wf/mark.tsx`, `components/wf/intro.tsx`) |
| 2026-10-02 | Test tooling added: Vitest pinned exact (5.0.3), Node environment, pure-helper tests in `lib/*.test.ts` (`lib/loop`, `lib/intro`, `lib/stage-ghost`), `pnpm test` = `vitest run`; `pnpm typecheck` = `tsc --noEmit`. Partially answers Q8 (test + typecheck pinned; commit format and lint still open) | Owner asked for a test that the strip drifts right-to-left; pure helpers keep tests free of a browser | build, log (`package.json`, `vitest.config.ts`) |
| 2026-10-02 | Bugs fixed on `dev` (uncommitted): strip not scrollable on wide screens (too few posters to overflow; now enough loop copies to fill any width); mouse wheel never reached the strip (Shift+wheel now scrolls it, plain wheel still scrolls the page); scroll-snap fought drag; home mark covered AUTOMATE; intro-to-stage mark size jump at the curtain lift | Owner report ("the strips its not scrolling") plus codebase analysis | sdd, log |

## 2. Open questions

| ID | Raised | Question | Blocking | Status |
|----|--------|----------|----------|--------|
| Q1 | 2026-10-01 | Who locks these docs and advances `reconciled`? | Locking any doc | Resolved |
| Q2 | 2026-10-01 | Deploy target and canonical URL policy (host, previews, who ships)? | BUILD §2 Node row, SDD §8 | Resolved |
| Q3 | 2026-10-01 | Launch content bar: which events/outputs/people must be verified first? | PRD-F1, PRD-F3 | Resolved |
| Q4 | 2026-10-01 | Who signs off each published stat and where is the source recorded? (PR #33 assets now target `dev`.) | PRD §5 (M1–M4) | Open |
| Q5 | 2026-10-01 | Minimum evidence per event record before it goes public? | PRD-F1 acceptance | Resolved |
| Q6 | 2026-10-01 | Press kit: keep the page or drop it? If kept, numbers must match verified stats. | PRD-F7 | Open |
| Q7 | 2026-10-01 | PRD-F7/F8 priority for launch? | PRD scope | Resolved |
| Q8 | 2026-10-01 | Commit format, test, lint, and typecheck conventions to pin in BUILD? (Branch policy resolved: main/dev.) | BUILD §3–§4 | Open (2026-10-02: test = Vitest 5.0.3 and typecheck = `tsc --noEmit` pinned; commit format and lint still open) |
| Q9 | 2026-10-01 | Should sitemap `lastModified` stay fixed or generate at build time? | SDD §8 | Open |
| Q10 | 2026-10-01 | Photo consent/credit requirement before an event goes public? | SDD §8, PRD-F1 | Resolved |
| Q11 | 2026-10-01 | Canonical URL: is workflowph.org connected, or is the vercel.app URL canonical for now? Production branch? | BUILD §5, SDD §1 | Resolved |
| Q12 | 2026-10-01 | Photo `credit` is typed but never rendered — render credits or drop the field? | SDD §8 | Resolved |
| Q13 | 2026-10-01 | Speaker names link to /people but speakers aren't listed there — list them or re-link? | SDD §8, PRD-F3 | Resolved |
| Q15 | 2026-10-01 | LinkedIn URL for each of the 18 roster profiles (17 current minus Maury plus Joemar), or confirm a smaller subset? No links supplied yet. | PRD-F3 | Open |
| Q16 | 2026-10-01 | Joemar Lagat: confirm full-name spelling plus a one-line role description (no photo needed — roster pages render no photos). | PRD-F3 | Resolved |
| Q17 | 2026-10-01 | Per new partner: tier, since-when, logo file, one-line description. Clarify namings: Jia Talent Vault vs WhiteCloak, Dash2Career vs CloudSensei. | PRD-F5 | Open |
| Q18 | 2026-10-01 | Per new event record (ADPH 2026, Blockquest Fiesta, CyberPH, DevCon Push2Prod, ICPEP orientation, StackUp PUP, plus Jem's hackathon list): date, venue/city or online, WorkFlow PH role, 1–2 sentence recap. Also: winners scope and Event Partnerships content. | PRD-F1 | Open |

## 3. Resolved questions

| ID | Resolved | Question | Answer |
|----|----------|----------|--------|
| Q1 | 2026-10-01 | Who locks docs and advances `reconciled`? | slvdrvncntjvr (owner-confirmed) |
| Q2 | 2026-10-01 | Deploy target and URL/branch policy? | Vercel; `main` = production, `dev` = staging previews, vercel.app canonical until domain lands |
| Q11 | 2026-10-01 | Canonical URL and production branch? | vercel.app canonical until domain lands; `main` = production |
| Q3 | 2026-10-01 | Launch content bar? | Everything live stays live; flag and fix iteratively |
| Q5 | 2026-10-01 | Minimum evidence per event? | No gate; publish and fix as we go |
| Q7 | 2026-10-01 | F7/F8 priority? | F8 stays Should-Have; F7 keep-or-drop now tracked in Q6 |
| Q10 | 2026-10-01 | Photo credits? | Not displayed, per owner |
| Q12 | 2026-10-01 | Photo `credit` field? | Will not be rendered |
| Q13 | 2026-10-01 | List speakers? | No; names stay on event pages |
| Q14 | 2026-10-01 | SITE_URL switch? | Done in code 2026-10-01 |
| Q16 | 2026-10-01 | Joemar details? | Joemar Lagat, Creatives Manager. Leads the design and creative department. Applies in the batch. |
| Q15–Q18 | — | Jem batch details (above) | LinkedIn links being compiled by Jem; Joemar data in hand; partners/events/strip pending as listed; one consistent update when all land |

## 4. Dead ends

Approaches tried and abandoned. Saves the next agent from retracing them.

| Date | Approach | Why it failed |
|------|----------|---------------|
| — | | |
