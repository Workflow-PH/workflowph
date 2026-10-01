/**
 * Helpers for a seamless, infinitely looping horizontal strip made of
 * repeated copies of one set of items. `unit` is the width of one set.
 */

/** Wraps `pos` into [0, unit). Returns `pos` unchanged when unit <= 0. */
export function wrapLoop(pos: number, unit: number): number {
  if (!(unit > 0)) return pos
  const r = pos % unit
  const w = r < 0 ? r + unit : r
  // Guard against floating-point results that round up to `unit`.
  return w >= unit ? 0 : w
}

/** Number of copies needed so the viewport never sees an edge (at least 3). */
export function copiesFor(viewport: number, unit: number): number {
  if (!(unit > 0)) return 3
  return Math.max(3, Math.ceil(viewport / unit) + 2)
}

/**
 * Track scrollLeft for a drift position inside the home copy (copy index 1).
 * `pos` adds to scrollLeft, so the increasing `pos` from `driftStep` moves
 * content right-to-left. The strip component writes scrollLeft only via this.
 */
export function scrollLeftFor(unit: number, pos: number): number {
  return unit + pos
}

/** Ease-out cubic on t in [0, 1]. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Position at progress `t` (clamped 0..1) of a step of `delta` px starting at
 * unwrapped `from`, wrapped into [0, unit). Animating the step this way keeps
 * scrollLeftFor(unit, ...) inside the home copy on every frame, so a step that
 * crosses a copy edge never needs a separate wrap.
 */
export function stepPos(from: number, delta: number, t: number, unit: number): number {
  const k = Math.min(Math.max(t, 0), 1)
  return wrapLoop(from + delta * easeOutCubic(k), unit)
}

/**
 * Advances `pos` by one frame of drift. Positive speed increases the
 * position, i.e. content moves right-to-left. `boost` adds speed by
 * magnitude only, so it never flips the direction.
 */
export function driftStep(
  pos: number,
  dtMs: number,
  speedPxPerSec: number,
  boost: number,
  unit: number,
): number {
  return wrapLoop(pos + speedPxPerSec * (dtMs / 1000) * (1 + Math.abs(boost)), unit)
}
