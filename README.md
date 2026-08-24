# WorkFlow PH — Org Showcase

Public showcase site for **WorkFlow PH** — *Building the Volunteer-Driven Automation Landscape of the Philippines.*

Not a "portfolio" in the visual-agency sense. This is a **proof surface**: events we ran, people we platformed, automations we shipped, partners who backed us.

| | |
|---|---|
| Sprint | **Mon Aug 24 – Sun Aug 30, 2026** |
| Freeze | Sun Aug 30, 11:59 PM PHT |
| Launch | **Mon Aug 31, 2026** (fallback: Sep 15) |
| Team | 4–6 volunteers, async-first |
| Issues | [github.com/Workflow-PH/workflowph/issues](https://github.com/Workflow-PH/workflowph/issues) |
| Facebook | [facebook.com/workflowph](https://facebook.com/workflowph) |

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # astro check + build
pnpm check        # types + content schema validation
```

Seed content is marked `draft: true`, so production builds exclude it. To preview
drafts in a build: `SHOW_DRAFTS=1 pnpm build`. Never set that in production.

## Stack

Astro 7.2.4 · TypeScript strict · Tailwind CSS 4.3.3 · MDX content collections
with Zod validation · sharp · static output. Zero JavaScript on content routes.

## Read in this order

| Doc | What it answers |
|---|---|
| [01 – Brief & References](docs/01-brief-and-references.md) | Why we're building this, what "good" looks like, what to steal |
| [02 – IA & Content Model](docs/02-ia-and-content-model.md) | Sitemap, page anatomy, data schemas |
| [03 – Asset Playbook](docs/03-asset-playbook.md) | **Start here if you're not a dev.** Specs, naming, consent, per-event kit |
| [04 – Tech & Standards](docs/04-tech-and-standards.md) | Stack, repo layout, git/PR rules, quality gates |
| [05 – Sprint Plan](docs/05-sprint-plan.md) | Day-by-day, ceremonies, roles, descope ladder |
| [06 – Backlog](docs/06-backlog.md) | Every ticket with acceptance criteria and estimate |
| [07 – Launch Checklist](docs/07-launch-checklist.md) | Pre-flight before we point the domain |
| [08 – Brand & Colour](docs/08-brand-and-color.md) | Palette, measured contrast, role rules, complements |
| [ANNOUNCEMENT.md](ANNOUNCEMENT.md) | Copy-paste post for the dev channel + role signup |

## The one thing that will kill this sprint

Not code. **Assets.** The site is built; every route renders and the build is
green. What's missing is photos, logos in SVG, real copy, and verified numbers.

Devs are deliberately light Mon–Thu. Adding more code this week widens the gap
instead of closing it. If you're a dev with spare time, go help harvest photos.

Read [03 – Asset Playbook](docs/03-asset-playbook.md).

## Non-negotiables

- Every event page ships with a real hero photo or a designed fallback card. Never a broken or stretched image.
- Every image has alt text. Every photo has a credit.
- No attendee faces, badges, screens, or whiteboards with visible personal data.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95.
- If it isn't done by Sep 13, it gets cut, not extended. See the descope ladder in [05](docs/05-sprint-plan.md).
