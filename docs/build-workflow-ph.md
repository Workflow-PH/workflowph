---
spine_type: BUILD
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

# Build Guide: WorkFlow PH

**IDEA:** [idea-workflow-ph.md](idea-workflow-ph.md)
**PRD:** [prd-workflow-ph.md](prd-workflow-ph.md)
**SDD:** [sdd-workflow-ph.md](sdd-workflow-ph.md)

---

## 1. How to build from these docs

Read in this order before writing code:

1. `docs/index.md`
2. `IDEA` — scope, and especially §4 Out of Scope
3. `PRD` — the feature you are implementing, by ID
4. `SDD` — how it fits the system
5. The `RFC` for that feature, if one exists
6. This guide
7. `QAD` — before calling anything done

**Only build against `Locked` docs.** If the doc you need is `Draft`, ask before
proceeding.

### To build X, read Y

| To implement… | Read | Verify against |
|---------------|------|----------------|
| A feature `PRD-F#` | PRD → SDD → RFC if one exists | Manual check against PRD §3.1 acceptance criteria (no QAD in tier 2) |
| A schema change | SDD data model | Content rules in §5 still hold (photos exist, TBC discipline, verification flags) |
| An API endpoint | SDD API surface | Redirects, headers, sitemap, and OG output still behave |
| A UI surface | PRD + design notes | README design rule: polish and content only, no restyles without approval |

---

## 2. Pinned stack

Read from `package.json` on 2026-10-01. Caret ranges below are the manifest as written.

| Layer | Technology | Version | Verified | Source |
|-------|-----------|---------|----------|--------|
| Language | TypeScript | 5.7.3 | 2026-10-01 | https://www.typescriptlang.org/docs/ |
| Framework | Next.js | 16.3.3 | 2026-10-01 | https://nextjs.org/docs |
| UI runtime | React / React DOM | ^19 | 2026-10-01 | https://react.dev/ |
| CSS | Tailwind CSS / @tailwindcss/postcss | ^4.3.3 | 2026-10-01 | https://tailwindcss.com/docs |
| Motion | motion | ^13.4.1 | 2026-10-01 | https://motion.dev/ |
| Smooth scroll | lenis | ^1.3.26 | 2026-10-01 | https://lenis.darkroom.engineering/ |
| Images | sharp | ^0.35.4 | 2026-10-01 | https://sharp.pixelplumbing.com/ |
| Primitives | @base-ui/react | ^1.5.0 | 2026-10-01 | https://base-ui.com/ |
| Icons | lucide-react | ^1.16.0 | 2026-10-01 | https://lucide.dev/ |
| Analytics | @vercel/analytics | 1.6.1 | 2026-10-01 | https://vercel.com/docs/analytics |
| Package manager | pnpm | 10.33.0 | 2026-10-01 | https://pnpm.io/ |
| Node runtime | Node.js (Vercel-managed) | unverified | unverified | https://vercel.com/docs/functions/runtimes — no .nvmrc or engines pin in repo; Vercel deploy confirmed 2026-10-01 |

### Known deprecations

APIs in this stack that look correct but are not, with the current replacement.

| Deprecated | Use instead | Since | Notes |
|-----------|-------------|-------|-------|
| None recorded | — | — | TBD(owner): confirm during reconcile whether any deprecated API is in use |

---

## 3. Commands

Copied from `package.json` scripts.

| Task | Command |
|------|---------|
| Install | `pnpm install` |
| Dev | `pnpm dev` |
| Build | `pnpm build` |
| Start | `pnpm start` |
| Test | None in repo (confirmed 2026-10-01: no config, no script) — TBD(owner) whether to add |
| Lint | None in repo (confirmed 2026-10-01: no config, no script) — TBD(owner) whether to add |
| Typecheck | No script; `tsconfig.json` is strict with noEmit — TBD(owner) whether to add a script |

Long-running commands (dev servers, watchers) must be run by the owner in their
own terminal, not by an agent in a blocking shell call.

---

## 4. Repo conventions

| Area | Convention |
|------|-----------|
| Branch policy | `main` = production (owner-confirmed 2026-10-01); `dev` = staging, checked via Vercel preview links; feature branches merge via PR (e.g. #30–#32) |
| Commit format | Mixed in history: mostly conventional (`feat`, `chore`) plus plain messages. TBD(owner): confirm whether conventional commits are required |
| Directory layout | `app/` routes (about, builds, join, partners, people, press-kit, showcase, og, showcase/[slug]); `components/home`, `components/ui`, `components/wf`; `lib/data` (events, outputs, partners, people, site) plus `lib/format.ts`, `lib/items.ts`, `lib/nav.ts`, `lib/seo.ts`, `lib/utils.ts`; `public/brand`, `public/collage`, `public/images/events`, `public/images/partners`, `public/og` |
| Naming | Data slugs are lowercase hyphenated (`lib/data/*.ts`); routes match `lib/nav.ts`; components under `components/wf` use the `wf-` prefix conceptually |
| Error handling | Unknown numbers render as `TBC`, never estimates (`lib/data/events.ts:22`); unknown volunteer counts stay `null` with a note (`lib/data/site.ts:25`); unknown event pages call `notFound()` (`app/showcase/[slug]/page.tsx:34`) |
| Test location | None established (no test script; TBD(owner)) |

---

## 5. Guardrails

Repo-specific prohibitions. These are enforced like engine §8 Hard Rules.

- Never commit secrets. Secrets live in `.env` (gitignored, see `.env.example`); `.env` is never committed.
- Event records: every `photos[].src` must exist under `public/`. `value: null` renders as `TBC`; never estimate numbers.
- People: keep `pending: true` until the roster is verified; do not publish stand-in profiles as real.
- Partners: `logo` stays undefined until an artwork file is supplied; never trace a pubmat.
- Design in `app/`, `components/`, and `app/globals.css` is final. Polish and content only — no restyles, no new motion, no layout changes without owner approval.
- Redirects `/events` → `/showcase` (and `/events/:slug` → `/showcase/:slug`) must keep working; do not break public links.
- Canonical URLs, OG tags, and sitemap derive from `SITE_URL` (`lib/data/site.ts:1`), now `https://workflowph.vercel.app/` (switched 2026-10-01; no custom domain yet — flip back when it lands). Do not change the URL again without owner approval. Note: `PUBLIC_SITE_URL` in `.env.example` is currently unread by the app.

---

## 6. Definition of done

- [ ] Implements a `Locked` requirement, by ID
- [ ] Build passes: `pnpm build`
- [ ] Tests pass: TBD(owner) — no test command exists yet
- [ ] Lint and typecheck clean
- [ ] Acceptance criteria for the feature ID pass (PRD §3.1; no QAD in tier 2)
- [ ] Docs updated if behavior changed; `INDEX` row bumped
