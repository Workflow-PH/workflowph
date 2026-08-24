/**
 * Deterministic, on-brand gradient derived from a slug.
 *
 * Every event without a photo still gets a distinct, intentional-looking card.
 * An archive built mostly from typography reads as a deliberate design choice;
 * an archive built from grey placeholder boxes reads as unfinished. Same
 * content, entirely different impression.
 */

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * OKLCH hue pairs drawn only from the brand arc: blue-green (~175°) through
 * yellow (~105°) to orange (~52°). Nothing outside that arc, so a wall of
 * poster cards reads as one family rather than a random swatch book.
 *
 * The last pair spans the full arc — teal into orange — which is the
 * signature brand gradient and the most distinctive of the six.
 */
const HUES = [
  [175, 188], // blue-green → deep teal
  [150, 175], // green → blue-green
  [95, 118], // yellow → citron
  [66, 95], // amber → yellow
  [45, 68], // orange → amber
  [175, 55], // blue-green → orange (signature)
] as const;

export type PosterGradient = {
  from: string;
  to: string;
  angle: number;
  /** Seeded 0–1, used to vary the node-mesh overlay so cards don't repeat. */
  seed: number;
};

export function posterGradient(slug: string): PosterGradient {
  const h = hash(slug);
  const [h1, h2] = HUES[h % HUES.length]!;
  const angle = 120 + (h % 7) * 15;
  // Low lightness keeps text contrast comfortably above 4.5:1.
  const l1 = 16 + (h % 5);
  const l2 = 9 + ((h >> 3) % 4);
  return {
    from: `oklch(${l1}% 0.09 ${h1})`,
    to: `oklch(${l2}% 0.06 ${h2})`,
    angle,
    seed: (h % 1000) / 1000,
  };
}

export function posterStyle(slug: string): string {
  const g = posterGradient(slug);
  return `--poster-from:${g.from};--poster-to:${g.to};--poster-angle:${g.angle}deg;`;
}
