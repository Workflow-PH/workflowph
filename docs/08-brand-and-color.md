# 08 — Brand & Colour

Source of truth for colour. Tokens live in `src/styles/global.css` under `@theme`. **No hex value belongs anywhere else in the codebase.**

## 1. The palette

| Name | Hex | Token | Job |
|---|---|---|---|
| **Blue Green** | `#1EBDA5` | `--color-flow` | Primary accent — everything interactive |
| **Orange** | `#E26A00` | `--color-ember` | Secondary accent — classification |
| **Yellow** | `#FFE046` | `--color-beam` | Highlight — key numbers, rationed |
| **White** | `#FFFFFF` | `--color-brand-white` | Display type only |
| Ink | `#07080A` → `#F5F7F9` | `--color-ink-*` | Canvas and text scale |

## 2. Contrast, measured

Against the canvas `#07080A`. WCAG AA needs 4.5:1 for body text, 3:1 for large text and UI boundaries.

| Colour | On canvas | Verdict |
|---|---|---|
| Blue Green `#1EBDA5` | **8.5:1** | Passes AAA. Safe for text at any size. |
| Orange `#E26A00` | **6.0:1** | Passes AA at any size. |
| Yellow `#FFE046` | **15.3:1** | Passes everything — and that's the problem. See §4. |
| White `#FFFFFF` | 19.6:1 | Maximum. Use sparingly. |
| Ink 200 `#CFD5DE` | 12.4:1 | Body copy. |
| Ink 400 `#7C8593` | 4.6:1 | Secondary text. Body-size minimum — don't go dimmer. |

Two hard limits that follow from this:

- **Yellow on white is 1.2:1.** Unusable for anything. Yellow is a dark-canvas colour, full stop. If a light-background variant of the site is ever needed, yellow needs a darker substitute (`--color-beam-600`, `#C9A800`, gets to 3.0:1 on white — still large-text only).
- **Orange on white is 3.3:1.** Large text and icons only, never body copy.

## 3. Role separation — the actual system

Having four brand colours is not a licence to use four brand colours. The value is in the separation:

> **Blue green means you can click it. Orange means it's a category. Yellow means it's a number that matters.**

Once that holds, a user learns the interface in about four seconds without being told. Break it once and the whole thing reverts to decoration.

| Colour | Use for | Never use for |
|---|---|---|
| **Blue Green** | Links, primary buttons, focus rings, active nav, hover states, section rules, the flow-mesh motif, `::selection` | Large filled areas — at 8.5:1 it's loud when flooded |
| **Orange** | Event-type labels, build-kind badges, timeline dates, category metadata, the partner half of the CTA | **Links.** Competes with blue green and kills the rule above. Also not for errors — orange reads as "warning", which is a different thing. |
| **Yellow** | Impact-bar stat values, showcase stat values, the "upcoming" live pulse | Anything on white. Body text. Icons. More than roughly 1% of the pixels on screen. |
| **White** | `h1` and display headlines | Body paragraphs — pure white on near-black halates on OLED, which is most phones. Body copy uses `ink-200`. |

### Where each one actually lands right now

| Element | Colour |
|---|---|
| Nav active state, links, buttons, focus rings | flow |
| Page kicker rules (`— Showcase`, `— About`) | flow |
| Card hover title, hover rule, arrow icons | flow |
| Flow-mesh hero motif | flow |
| Event type on showcase cards | ember |
| Build kind badges | ember |
| Timeline dates on `/about` | ember |
| Partner-side CTA rule + background wash | ember |
| Impact bar stat values | beam |
| Showcase detail stat values | beam |
| "Upcoming" badge and pulse dot | beam |
| `h1` / display headlines | white |
| Body copy | ink-200 |
| Metadata rows | ink-400 |

## 4. Why yellow is rationed

`#FFE046` measures **15.3:1** on the canvas. Our body text measures 12.4:1. The yellow is *brighter than the text*.

That means any yellow element will out-compete everything around it for attention, whether you intended it to or not. Used across headings, icons, borders and highlights, it flattens the page — everything shouts, so nothing does.

So it gets exactly one job, and it's the most valuable one: **the numbers a sponsor scans in the first three seconds.** Events run, builders reached, partner orgs. That's the highest-leverage placement available for the brightest colour we own.

The rule of thumb: if you can see yellow in more than two places on one screen, one of them is wrong.

## 5. Derived ramps

Flat brand colours don't survive contact with a real interface — you need hover, pressed, and tinted-surface steps. Each brand colour is extended, not replaced. The brand hex is always the middle step.

```
flow    100 #A8EFE2   300 #4FD6C1   ▸500 #1EBDA5◂   600 #159683   900 #0A312B
ember   100 #FFD5A6   300 #FF9633   ▸500 #E26A00◂   600 #B15200   900 #331A00
beam    100 #FFF4B3                 ▸500 #FFE046◂   600 #C9A800   900 #332C00
```

On a dark canvas, **hover goes brighter** (`-300`) and **pressed goes darker** (`-600`) — the inverse of the light-mode habit. The `-900` steps are for tinted surfaces and badge backgrounds, not text.

`ember-300` (`#FF9633`) rather than `ember` is used for small metadata text — at 9pt the pure brand orange gets slightly muddy against near-black, and the lighter step keeps it crisp while staying recognisably the same colour.

## 6. Suggested complements

You asked for these. The brand four cover identity but leave three real gaps.

### a. Semantic states — genuinely missing

Blue green already reads as success, and orange already reads as warning, so those are covered. What isn't:

| Need | Suggestion | Why this one |
|---|---|---|
| **Error / destructive** | `#EF4B52` | Must be unmistakably not-orange. This red sits warm enough to live beside `#E26A00` without clashing, and hits 5.4:1 on the canvas. Needed the moment a form exists. |
| **Info / neutral notice** | reuse `ink-300` | Don't introduce a blue. A cool blue next to blue-green looks like a mistake rather than a decision. |

Not added to the codebase yet — there are no forms. Add with the first form, not before.

### b. Tinted surfaces instead of flat greys

Currently cards use `ink-900` at low opacity. A blue-green-tinted dark surface makes the palette feel authored rather than "brand colours on top of Bootstrap grey":

```
--color-surface: oklch(16% 0.012 180)   /* ≈ #12181A — barely teal */
```

Low effort, noticeably more expensive-looking. Worth trying on `BuildCard` and `PersonCard` first.

### c. The signature gradient

Blue green → orange, the full brand arc, is the most distinctive thing available and nobody in the local scene is using it. Already wired into `src/lib/gradient.ts` as the sixth poster-card hue pair, and into the `/builds` CTA wash.

```css
background: linear-gradient(135deg, #1EBDA5, #E26A00);
```

Use for: OG image backgrounds, poster cards, one hero moment. **Never behind text** without a scrim — the midpoint of that gradient sits around 4:1 and will fail against white type in the middle band.

### What to avoid adding

- **A second blue.** Blue-green plus blue reads as an accident.
- **Purple or magenta.** Fashionable, and it would make the palette look like a different brand.
- **Pure black `#000000`.** Crushes shadow detail in photography and makes the grain overlay invisible. The near-black canvas is doing real work.
- **A fifth brand colour of any kind.** Four with clear roles beats six with vague ones.

## 7. Colour and photography

The palette was chosen to survive mixed-quality source photos, which is the actual constraint on this project.

- **Photos are the only saturated thing on the page.** Brand colours are accents at the edges. When a photo lands, it should be the most colourful object on screen.
- **Near-black canvas plus the grain overlay** (`body::after`, 3.5% opacity, `mix-blend-mode: overlay`) unifies photography shot on a dozen different phones. This is the single highest-leverage choice in the design.
- **Every photo carries a scrim** where text sits over it. Never trust a photo to provide contrast — `.scrim` in `global.css` handles it.
- **Poster cards use only brand-arc hues** so a wall of photo-less events reads as one family rather than a swatch book.

## 8. Accessibility checks that must run

Part of WF-Q2. Colour-specific:

- [ ] Every text/background pair measured, including text over real photographs
- [ ] Focus rings ≥ 3:1 against every background they appear on — blue green on `ink-950` is 8.5:1, but check it over photos too
- [ ] Nothing communicated by colour alone. The "upcoming" badge pairs yellow with the word *Upcoming*; category colour always pairs with a text label. Keep that.
- [ ] Tested in greyscale — the layout must still be readable and the hierarchy must still hold
- [ ] Checked with a deuteranopia simulator. Blue green and orange separate well for the most common colour-vision deficiency, which is part of why the pairing works; yellow against white is the risk case, and yellow never touches white here.

## 9. Changing a colour

1. Edit the token in `src/styles/global.css` only.
2. Re-measure contrast against `ink-950` and against `brand-white`.
3. Update the table in §2 of this doc and the `brand` array in `src/pages/press-kit.astro`.
4. Check `src/lib/gradient.ts` if a hue moved.
5. Run `pnpm build` and look at `/showcase`, a detail page, and `/press-kit` on a 390px viewport.

If a change means breaking a role in §3, that's a brand decision, not a code change. Discuss it before shipping it.
