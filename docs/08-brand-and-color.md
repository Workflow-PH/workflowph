# 08 — Brand & Colour System

Source of truth for colour and theme tokens. Tokens live in `src/styles/global.css` under `@theme`. **No raw hex value belongs anywhere else in the codebase.**

---

## 1. The Core Brand Palette

The WorkFlow PH visual identity is anchored on a cinematic **Teal & Orange** complementary dynamic, energized by **Solar Yellow** highlights and grounded on a **Warm Obsidian** dark canvas.

| Name | Hex | CSS Token | Primary Role | Contrast (on Canvas `#08090B`) |
|---|---|---|---|---|
| **Blue Green** | `#1EBDA5` | `--color-flow` | **Primary Interaction** — Links, primary buttons, focus rings, active nav, community pulse | **8.5:1** (AAA) |
| **Orange** | `#E26A00` | `--color-ember` | **Energy & Classification** — Event categories, build tags, partner highlights, warm glows | **6.0:1** (AA) |
| **Yellow** | `#FFE046` | `--color-beam` | **High-Impact Highlight** — Sponsor-facing numbers, live/upcoming indicator dot | **15.3:1** (AAA) |
| **White** | `#FFFFFF` | `--color-brand-white` | **Display Headlines** — `h1`, hero titles, display typography | **19.6:1** (AAA) |
| **Warm Obsidian** | `#08090B` → `#F8FAFC` | `--color-ink-*` | **Canvas & Neutral Scale** — Charcoal-graphite canvas, body text, hairline borders | — |

---

## 2. Contrast & Accessibility Matrix

Measured against the warm obsidian canvas (`#08090B`). WCAG AA requires 4.5:1 for body text, 3:1 for large text and UI boundaries.

| Colour | Contrast on Canvas | WCAG Compliance | Notes |
|---|---|---|---|
| **Blue Green** `#1EBDA5` | **8.5:1** | AAA (All text sizes) | Safe for text at any size and interactive elements. |
| **Orange** `#E26A00` | **6.0:1** | AA (All text sizes) | Warm, highly legible category tags and secondary badges. |
| **Yellow** `#FFE046` | **15.3:1** | AAA (Maximum contrast) | Brighter than body copy; rationed strictly to key metrics. |
| **White** `#FFFFFF` | **19.6:1** | AAA | Display headlines only. Avoid large body paragraphs in pure white. |
| **Ink 200** `#D4DBE4` | **12.4:1** | AAA | Running body copy and descriptions. |
| **Ink 400** `#8591A3` | **4.6:1** | AA | Secondary metadata and helper text. Minimum text tone. |

### Hard Contrast Constraints
- **Yellow on White is 1.2:1 (Fails).** Yellow must NEVER sit on a light or white background. It is exclusively an obsidian-canvas accent.
- **Orange on White is 3.3:1 (Large text / icons only).** Never use orange for running body text on white.

---

## 3. Role Separation & Interaction Rules

Having four brand colours works because each colour has a distinct cognitive role:

> 💡 **Blue Green** means *“you can click this”*.  
> 💡 **Orange** means *“this is the category/partner”*.  
> 💡 **Yellow** means *“this number matters”*.

| Colour | Use For | Never Use For |
|---|---|---|
| **Blue Green (`flow`)** | Links, primary buttons, active navigation, focus rings, hover states, selection highlight, primary data nodes | Large flat flooded cards (too loud at 8.5:1) |
| **Orange (`ember`)** | Event category badges, build kinds, partner CTA wash, secondary accent buttons, ambient warm glow | Primary action links (would compete with Blue Green) |
| **Yellow (`beam`)** | Impact bar stat counters, showcase metrics, live/upcoming pulsing beacon | Paragraph text, background fills, icons, >1% of screen pixels |
| **White (`brand-white`)** | Main `h1` titles, display cards, crisp wordmark | Long running paragraphs (causes OLED halation) |

---

## 4. Complementary Enhancements & Semantic Additions

To elevate the visual depth and prevent monochromatic cool-drift, we use intentional complements:

### a. Warm Obsidian Canvas (`--color-ink-*`)
Instead of a cold icy-blue slate, the canvas uses a deep charcoal/graphite undertone (`#08090b`). This subtle warmth allows the brand orange (`#e26a00`) and solar yellow (`#ffe046`) to blend harmoniously with the blue-green (`#1ebda5`).

### b. The Signature Dual-Gradient (Teal ⇄ Orange)
The signature brand arc spans 174° (Blue Green) to 28° (Orange). Used for ambient background glows, section transitions, and decorative rules:

```css
/* Signature Brand Gradient */
background-image: linear-gradient(135deg, #1EBDA5 0%, #E26A00 100%);

/* Ambient Glow */
background: radial-gradient(ellipse at 15% 25%, rgba(30,189,165,0.14), transparent 70%),
            radial-gradient(ellipse at 85% 65%, rgba(226,106,0,0.11), transparent 70%);
```

### c. Multi-Tier Hero Mesh (`FlowMesh`)
In `FlowMesh.astro`, automated pipelines carry multi-color pulses:
- **Teal (`--color-flow`)**: Main automation streams.
- **Orange (`--color-ember`)**: Partner and data bridges.
- **Yellow (`--color-beam`)**: High-speed spark nodes.

### d. Semantic States
| Semantic Intent | Token / Hex | Rationale |
|---|---|---|
| **Destructive / Error** | `--color-ruby` (`#F43F5E`) | A vivid crimson rose that sits cleanly beside brand orange without clashing or ambiguity. |
| **Success / Live** | `--color-flow` (`#1EBDA5`) | Reuses the primary brand teal for verified positive status. |
| **Warning / Notice** | `--color-beam-300` / `--color-ember-300` | Warm golden amber. |
| **Info / Subdued** | `--color-ink-400` (`#8591A3`) | Slate neutral, keeps information clear without introducing extraneous hues. |

---

## 5. Color Shading Ramps

```
flow    100 #A8EFE2   300 #4FD6C1   ▸500 #1EBDA5 (Brand)◂   600 #159683   900 #09332D
ember   100 #FFD5A6   300 #FF9431   ▸500 #E26A00 (Brand)◂   600 #B15200   900 #3A1A00
beam    100 #FFF4B3   300 #FFEA70   ▸500 #FFE046 (Brand)◂   600 #C9A800   900 #383000
ruby    100 #FECDD3   300 #FDA4AF   ▸500 #F43F5E (Semantic)◂ 600 #E11D48   900 #4C0519
```

- **Hover States:** Brighten by one step (`-300`).
- **Active / Pressed States:** Darken by one step (`-600`).
- **Surface Tints / Badges:** Use `-900` background washes with `-100` or `-300` text.

---

## 6. How to Modify Theme Tokens

1. Modify the CSS token in `src/styles/global.css` under `@theme`.
2. Verify contrast against `--color-ink-950` (`#08090B`) to maintain WCAG AA compliance.
3. Update this document and the press kit swatches in `src/pages/press-kit.astro`.
4. Run `pnpm check && pnpm build:fast` to ensure all components compile cleanly.
