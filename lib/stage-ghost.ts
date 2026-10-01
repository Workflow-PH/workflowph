/**
 * Watermark ("ghost") state of the landing mark. After the intro the mark
 * settles behind AUTOMATE, faded and enlarged; as AUTOMATE scrolls out the
 * mark returns to full strength before it splits apart.
 */

/** Scroll progress where AUTOMATE starts / finishes exiting. */
export const GHOST_EXIT_START = 0.12
export const GHOST_EXIT_END = 0.2
/** Opacity removed at full ghost (1 - 0.85 = 15% opacity). */
export const GHOST_FADE = 0.85
/** Extra scale added at full ghost (1.5x). */
export const GHOST_GROW = 0.5

/** Linear 0..1 ramp of `v` between `a` and `b`, clamped. */
export function ramp(v: number, a: number, b: number): number {
  if (b === a) return v < a ? 0 : 1
  return Math.min(1, Math.max(0, (v - a) / (b - a)))
}

/** Ghost amount: 0 = full-strength mark, 1 = full watermark. */
export function ghost(settle: number, p: number): number {
  return settle * (1 - ramp(p, GHOST_EXIT_START, GHOST_EXIT_END))
}

export function markOpacity(g: number): number {
  return 1 - GHOST_FADE * g
}

export function markScale(base: number, g: number): number {
  return base * (1 + GHOST_GROW * g)
}
