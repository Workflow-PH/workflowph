/**
 * Generates the static default Open Graph card (WF-04).
 *
 * Every page's <head> points at /og/default.png; without this file every
 * social share renders a broken card. Run `node scripts/generate-og.mjs`
 * and commit the output whenever the brand palette or tagline changes.
 *
 * Colours mirror the tokens in src/styles/global.css (ink-950, flow, ember,
 * beam). Text uses a system sans stack because the webfonts aren't available
 * to sharp's SVG rasteriser — acceptable for a share card; the per-event OG
 * pipeline (WF-03) can do better later.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1ebda5"/>
      <stop offset="100%" stop-color="#e26a00"/>
    </linearGradient>
    <radialGradient id="glow-flow" cx="15%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#1ebda5" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#1ebda5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-ember" cx="90%" cy="85%" r="70%">
      <stop offset="0%" stop-color="#e26a00" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#e26a00" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#08090b"/>
  <rect width="${W}" height="${H}" fill="url(#glow-flow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow-ember)"/>

  <!-- Wordmark glyph (same path as Wordmark.astro, scaled) -->
  <g transform="translate(96 120) scale(4.5)">
    <path d="M3 6h4l3 12h4l3-12h4" stroke="url(#brand)" stroke-width="2.25"
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="20.5" cy="6" r="2" fill="#ffe046"/>
  </g>

  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="96" y="388" font-size="88" font-weight="700" letter-spacing="-2" fill="#f8fafc">WorkFlow <tspan fill="#1ebda5">PH</tspan></text>
    <text x="96" y="452" font-size="34" fill="#b0bac8">Building the automation landscape of the Philippines.</text>
    <text x="96" y="545" font-size="22" letter-spacing="3" fill="#8591a3">VOLUNTEER-RUN · WORKFLOWPH.ORG</text>
  </g>

  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#brand)"/>
</svg>`;

const outDir = fileURLToPath(new URL('../public/og/', import.meta.url));
await mkdir(outDir, { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(`${outDir}default.png`);

console.log('wrote public/og/default.png');
