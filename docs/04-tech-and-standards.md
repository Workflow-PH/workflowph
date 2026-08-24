# 04 — Tech & Standards

## 1. Stack

Versions verified on npm, Aug 24 2026. Pin exactly. Do not upgrade mid-sprint.

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | **Astro** | `7.2.4` | Content-driven, zero JS by default, built-in content collections with Zod validation, built-in image optimisation. The right tool for a photo-heavy static showcase. |
| Language | TypeScript | `7.0.2` | strict mode on |
| Styling | Tailwind CSS + `@tailwindcss/vite` | `4.3.3` | CSS-first config, no JS config file, fastest path for a small team |
| Content | Astro content collections + MDX | `@astrojs/mdx` `7.0.7` | Recaps as MDX, structured data as JSON, all Zod-validated |
| Images | Astro `<Image>` / `<Picture>` + sharp | `sharp 0.35.3` | AVIF/WebP, responsive srcset, automatic width/height |
| Motion | `motion` | `13.1.1` | Only in interactive islands. Most animation should be CSS. |
| Interactive islands | Preact via `@astrojs/preact`, or vanilla | — | Lightbox and filters only. **Do not add React unless a specific ticket needs it.** |
| Fonts | self-hosted `.woff2`, `astro:assets` fonts | — | No Google Fonts CDN request |
| Hosting | **Vercel** | — | Preview deploys per PR, which is how a distributed volunteer team reviews work |
| Analytics | Vercel Analytics or Plausible | — | No cookie banner needed |
| Package manager | pnpm | ≥ 10 | Fast, strict. Lockfile committed. |

### Why Astro over Next.js

This is a mostly-static, content-heavy, image-heavy site with two interactive pieces (a filter and a lightbox). Astro ships zero JavaScript for the rest of it, which is how we hit the performance budget on Philippine mobile networks without doing performance work. Next.js would also work, and if the team is materially faster in Next, **use Next 16 with the App Router and static export instead** — the content model, backlog, and asset specs in these docs are framework-agnostic. Decide at kickoff, in ten minutes, and don't relitigate.

Local precedent: `awsccpup.cloud` is built on Astro, so there is knowledge in the PH community to borrow.

### Conservative fallback

Astro 7 shipped ~June 2026 on Vite 8 / Rolldown. If any dev hits tooling friction in the first two hours of Day 1, drop to `astro@6.2.x` and move on. Losing an afternoon to bundler bugs in a one-week sprint is not survivable; being one minor version behind costs nothing.

## 2. Repo layout

```
workflowph-website/
├─ public/
│  ├─ images/                 ← optimised, approved, committed
│  │  ├─ events/
│  │  ├─ people/
│  │  ├─ partners/
│  │  └─ brand/
│  ├─ press-kit/              ← downloadable zips
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ primitives/          ← Button, Badge, Container, Section, Prose
│  │  ├─ showcase/            ← ShowcaseCard, ShowcaseGrid, FilterBar, PosterCard
│  │  ├─ media/              ← Gallery, Lightbox (island), CreditLine
│  │  ├─ blocks/              ← Hero, ImpactBar, PartnerWall, BuildsStrip, CTA
│  │  └─ layout/              ← Header, Footer, Nav, SkipLink
│  ├─ content/
│  │  ├─ showcase/*.mdx
│  │  ├─ builds.json
│  │  ├─ people.json
│  │  ├─ partners.json
│  │  └─ stats.json
│  ├─ content.config.ts       ← Zod schemas from doc 02
│  ├─ layouts/
│  │  ├─ Base.astro           ← html shell, SEO, OG, skip link
│  │  └─ Showcase.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ showcase/index.astro
│  │  ├─ showcase/[slug].astro
│  │  ├─ builds/index.astro
│  │  ├─ people.astro
│  │  ├─ about.astro
│  │  ├─ partners.astro
│  │  ├─ join.astro
│  │  ├─ press-kit.astro
│  │  ├─ og/[...route].ts     ← dynamic OG images
│  │  └─ 404.astro
│  ├─ styles/
│  │  └─ global.css           ← Tailwind v4 @theme tokens live here
│  └─ lib/
│     ├─ seo.ts
│     ├─ format.ts
│     └─ gradient.ts          ← deterministic slug → gradient for PosterCard
├─ scripts/
│  ├─ sync-content.ts         ← Google Sheet → src/content/*.json
│  └─ optimise-images.ts      ← Drive export → public/images
├─ docs/                      ← these documents
├─ .github/
│  ├─ workflows/ci.yml
│  └─ pull_request_template.md
├─ astro.config.mjs
├─ tsconfig.json
├─ .env.example
└─ package.json
```

## 3. Design tokens

Single source of truth. Tailwind v4 is CSS-first, so tokens live in `src/styles/global.css`. Designer owns the values, filled in at kickoff. No hex codes anywhere else in the codebase.

```css
@import "tailwindcss";

@theme {
  /* Canvas — dark-first per the design direction in doc 01 */
  --color-ink-950: #08090a;
  --color-ink-900: #0e1012;
  --color-ink-800: #17191d;
  --color-ink-700: #24272c;
  --color-ink-400: #8b9099;
  --color-ink-200: #d6d9de;
  --color-ink-50:  #f7f8f9;

  /* Accent — pull from the WorkFlow PH logo at kickoff */
  --color-accent: #00e0a4;
  --color-accent-muted: #0b3d31;

  /* Type */
  --font-display: "TBD Display", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "TBD Sans", ui-sans-serif, system-ui, sans-serif;

  /* Fluid type scale */
  --text-hero: clamp(2.75rem, 7vw, 6.5rem);
  --text-h1: clamp(2rem, 4.5vw, 3.5rem);
  --text-h2: clamp(1.5rem, 2.6vw, 2.25rem);
  --text-kicker: 0.75rem;   /* uppercase, wide tracking, the CI-style metadata line */

  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;
  --dur-base: 320ms;
  --dur-slow: 640ms;

  --radius-card: 0.5rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 4. Coding conventions

- `.astro` components by default. Reach for an island only when the component needs client state.
- Component files `PascalCase.astro`. Utilities `camelCase.ts`. Content slugs `kebab-case`.
- Props typed with an exported `Props` interface. No `any`.
- Every component that renders content takes data as props. **No component fetches or imports content collections directly except page files.** Keeps components previewable and reviewable in isolation.
- Tailwind utilities inline. Extract to a component when a pattern appears a third time, not the second.
- No `!important`. No arbitrary values for anything that should be a token.
- All interactive elements are real `<button>` or `<a>`. No clickable `<div>`.
- Alt text comes from data, never hardcoded, never empty on a content image. Decorative images get `alt=""` plus `aria-hidden="true"`.

## 5. Accessibility bar

Checked in the Sep 14 QA pass. Not optional — this is a tech org's public face and it will be inspected.

- [ ] Semantic landmarks: one `<h1>` per page, correct heading order, `<main>`, `<nav>`, `<footer>`
- [ ] Skip-to-content link, first focusable element
- [ ] Visible focus ring on every interactive element, ≥ 3:1 contrast against its background
- [ ] Body text contrast ≥ 4.5:1, large text ≥ 3:1. Verify against actual photo backgrounds, not the flat token — text over images needs a scrim.
- [ ] Lightbox: focus trap, `Esc` closes, arrow keys navigate, focus returns to the trigger, `role="dialog"` + `aria-modal="true"` + labelled
- [ ] Filter chips: real buttons, `aria-pressed`, result count announced via `aria-live="polite"`
- [ ] `prefers-reduced-motion` honoured globally
- [ ] Keyboard-only walkthrough of every page
- [ ] Zoom to 200% without horizontal scroll or clipping
- [ ] `lang="en"`, descriptive `<title>` per page
- [ ] axe DevTools: zero critical or serious violations

Note for the record: automated checks and this list get us to a strong baseline, but full WCAG conformance claims would require manual testing with real assistive technology and an expert review. We're aiming for genuinely accessible, not for a compliance badge.

## 6. Git & PR rules

- `main` is protected. No direct pushes.
- Branch naming: `feat/wf-12-showcase-grid`, `fix/wf-31-lightbox-focus`, `chore/...`
- Small PRs. One ticket, one PR. If a PR exceeds ~400 changed lines, it should have been two tickets.
- Every PR needs: the Vercel preview link, a mobile screenshot, and the ticket ID in the title.
- One approval to merge. Squash merge. Delete the branch.
- CI must pass. Nobody merges red.
- Conventional commits: `feat(showcase): add year filter`

### PR template

```markdown
## WF-XX — <title>
**Preview:** <vercel url>

### What changed

### Acceptance criteria
- [ ] AC1 from the ticket
- [ ] AC2

### Checks
- [ ] Mobile 390px verified (screenshot attached)
- [ ] Keyboard navigable
- [ ] Images have alt text from content data
- [ ] No console errors or warnings
- [ ] No hardcoded copy that belongs in content
```

## 7. CI

`.github/workflows/ci.yml` runs on every PR — ticket **WF-03**.

1. `pnpm install --frozen-lockfile`
2. `pnpm astro check` — types + content schema validation
3. `pnpm lint` — ESLint + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y`
4. `pnpm build`
5. Lighthouse CI on `/`, `/showcase`, and one detail page. **Fails the PR** if mobile performance < 90 or accessibility < 95.

Step 5 is what stops the site getting slowly heavier all week. Wire it on Day 1, not Day 6.

## 8. Environment

`.env.example`, committed. Real `.env` is gitignored and never committed.

```
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=      # base64; used only by scripts/sync-content.ts, never at runtime
PUBLIC_SITE_URL=https://workflowph.org
PUBLIC_CONTACT_EMAIL=
```

Content sync is a **local/CI script run by a maintainer**, not a runtime dependency. The service account has read-only access to the one Sheet. If the credential leaks the blast radius is one public-content spreadsheet, which is the point.

## 9. Bootstrap

Ticket **WF-01**. One person runs this and pushes; everyone else clones.

```powershell
pnpm create astro@7.2.4 workflowph-website -- --template minimal --typescript strict --no-install --no-git
pnpm add -D tailwindcss@4.3.3 @tailwindcss/vite@4.3.3 typescript@7.0.2
pnpm add @astrojs/mdx@7.0.7 sharp@0.35.3 motion@13.1.1
pnpm astro add vercel
```

Scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .astro,.ts,.tsx",
    "sync:content": "tsx scripts/sync-content.ts",
    "optimise:images": "tsx scripts/optimise-images.ts"
  }
}
```

Run `pnpm dev` yourself in your own terminal — it's a long-running watcher.
