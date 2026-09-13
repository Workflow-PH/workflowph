# Asset promote plan — `origin/dev-asset` → `public/` (pilot: Echelon 2026)

Staging: `assets/` (26 keepers, 34 total). Excluded: 4 huge SVGs + 3x `haha.jpg` + `4.svg` pending review.
Run: `git checkout origin/dev-asset -- assets/` then `node scripts/promote-assets.mjs --go`.
`retro-style` branch untouched.

## 1. What the script does

`scripts/promote-assets.mjs` maps staging → playbook §5 names, resizes with sharp (no upscale, q82 mozjpeg):

- `logo/official-logo.png` → `public/brand/official-logo.png` (copy, 2000px)
- `event-partnership/*.jpg` → `public/images/events/2026_<slug>_poster_01.jpg` (1200w)
- `long-term-partners/*.jpg` → `public/images/partners/partner_<slug>_01.jpg` (1200w)
- `documentation-photos/*/*.jpg` → `public/images/events/2026_<event>_gallery_0N.jpg` (1920w)
- `event-speaker/.../agoraxworkfow_speakerN.jpg` → `public/images/events/2026_agora-hackathon_speaker_0N.jpg` (1200w, no upscale — source is 590px)
- `general-assets/{3,5.1,6.1}.svg` → `public/brand/general-*.svg` (copy, SVGOMG first)

## 2. Content patches — DO NOT APPLY until script --go + consent register done

### 2a. `partners.json` — NO logo change (correct)

The 3 long-term-partner files are pubmats, not vector logos. Per playbook §6 never trace/screenshot a logo.
Keep typographic fallback. Only add `url` once partner confirms link. No patch.

### 2b. Pilot: `src/content/showcase/echelon-philippines-2026.mdx`

Pubmat is 1200x1500 portrait — valid `card`/`poster`, NOT a §4 hero (needs ≥2400 landscape, no heavy text).
Use it as `card` so the grid stops being a gradient, keep `hero` empty so detail page keeps scrim+type (readable) until a real hero arrives.

```diff
 tier: full
 featured: true
+card:
+  src: /images/events/2026-02-01_echelon-philippines_poster_01.jpg
+  alt: Echelon Philippines 2026 official poster featuring WorkFlow PH as a community participant
 partners:
   - echelon-philippines
 stats:
   - label: Attendees
     value: TBC   # ← must resolve before draft:false
```

Still required before `draft: false`: real venue (not TBC), 1 verified stat, 60–150w recap, credit, consent row (§7). Poster has no camera credit — credit the designer/org.

### 2c. Archive rows (no detail page, needs only Sheet row per §1)

Create one file per pubmat, `tier: archive`, 1 FB link. Example:

```mdx
---
title: Agora Hackathon Philippines 2026
series: Agora x WorkFlow PH
hook: <≤90 chars, one line>
date: 2026-01-01  # ← verify from FB post permalink
venue: Online  # or real venue
mode: onsite  #|online|hybrid
type: hackathon
tier: archive
links:
  - label: Facebook announcement
    url: https://facebook.com/workflowph  # ← replace with post permalink
    kind: facebook
draft: false  # archive rows publish without photo set
---
```

Repeat for: frostbyte-hackathon, philippine-blockchain-week, cryptita-builders-showcase-wocee, aws-ug-novators-onboarding, stellar-hackathon (gallery exists, could become full later), egovibes (gallery exists, needs consent).

### 2d. `press-kit.astro` — replace WF-A4 placeholder

Once `public/brand/official-logo.png` lands:

```diff
-<strong>Pending (WF-A4).</strong> The official WorkFlow PH mark needs...
+<img src="/brand/official-logo.png" alt="WorkFlow PH official logo" width="2000" height="2000" />
+<a href="/brand/official-logo.png" download>Download PNG</a>
 ```
Still owed: light/dark SVG variants (§1). PNG unblocks launch.

## 3. Consent / credit gate (§7)

- `eGov_TeamPic*` + `stellar*` show faces → need `event-notice`/`individual`/`public-figure` row each. No row → `99-rejected/`, do not promote that file.
- Speaker thumbs (590px): `public-figure` (on stage) likely covers it, confirm with speaker + send preview link (§7 courtesy).
- Zoom every gallery image to 100%, check badges/QR/screens for PII. Most common leak.

## 4. Verify after --go

```bash
node scripts/promote-assets.mjs --go
ls public/images/events public/images/partners public/brand
pnpm build:fast  # Frame 404s fail silently (public paths) — manually open /showcase + 1 pilot page
```
