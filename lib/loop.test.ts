import { describe, expect, it } from 'vitest'
import { copiesFor, driftStep, scrollLeftFor, stepPos, wrapLoop } from './loop'

describe('wrapLoop', () => {
  it('wraps negatives into range', () => {
    expect(wrapLoop(-10, 100)).toBe(90)
    expect(wrapLoop(-250, 100)).toBe(50)
  })
  it('maps exactly one unit to 0', () => {
    expect(wrapLoop(100, 100)).toBe(0)
  })
  it('wraps several units past', () => {
    expect(wrapLoop(375, 100)).toBe(75)
  })
  it('keeps values already in range', () => {
    expect(wrapLoop(42.5, 100)).toBe(42.5)
  })
  it('returns pos unchanged when unit <= 0', () => {
    expect(wrapLoop(375, 0)).toBe(375)
    expect(wrapLoop(-5, -10)).toBe(-5)
  })
})

describe('copiesFor', () => {
  it('uses at least 3 copies on a phone', () => {
    expect(copiesFor(375, 1392)).toBe(3)
  })
  it('adds copies on very wide screens', () => {
    expect(copiesFor(2560, 1392)).toBe(4)
  })
  it('covers the viewport for a small unit', () => {
    expect(copiesFor(1920, 300)).toBe(9)
  })
  it('falls back to 3 for an unmeasured unit', () => {
    expect(copiesFor(1920, 0)).toBe(3)
  })
})

describe('driftStep', () => {
  it('moves right-to-left: position increases each frame', () => {
    expect(driftStep(0, 16, 30, 0, 1392)).toBeCloseTo(0.48)
    let pos = 100
    for (let i = 0; i < 60; i++) {
      const next = driftStep(pos, 16, 30, 0, 1392)
      expect(next).toBeGreaterThan(pos)
      pos = next
    }
  })
  it('doubles speed at |boost| = 1', () => {
    expect(driftStep(0, 16, 30, 1, 1392)).toBeCloseTo(0.96)
  })
  it('treats negative boost by magnitude, never reversing', () => {
    expect(driftStep(0, 16, 30, -1, 1392)).toBeCloseTo(0.96)
  })
  it('wraps past the unit', () => {
    expect(driftStep(1391.8, 16, 30, 0, 1392)).toBeCloseTo(0.28)
  })
})

describe('stepPos', () => {
  const unit = 1392
  const card = 232
  it('starts at from and ends one card away', () => {
    expect(stepPos(500, card, 0, unit)).toBe(500)
    expect(stepPos(500, card, 1, unit)).toBe(732)
    expect(stepPos(500, -card, 1, unit)).toBe(268)
  })
  it('keeps scrollLeft inside the home copy when stepping across either edge', () => {
    // ArrowLeft near the start of the home copy, ArrowRight near its end:
    // the bands where a pre-jump used to land outside [unit, 2*unit).
    const cases: Array<[number, number]> = [
      [100, -card],
      [0, -card],
      [unit - 100, card],
      [unit - 1, card],
    ]
    for (const [from, delta] of cases) {
      for (let i = 0; i <= 20; i++) {
        const s = scrollLeftFor(unit, stepPos(from, delta, i / 20, unit))
        expect(s).toBeGreaterThanOrEqual(unit)
        expect(s).toBeLessThan(2 * unit)
      }
    }
    expect(stepPos(100, -card, 1, unit)).toBe(unit - 132)
    expect(stepPos(unit - 100, card, 1, unit)).toBe(132)
  })
  it('clamps progress', () => {
    expect(stepPos(500, card, 2, unit)).toBe(732)
    expect(stepPos(500, card, -1, unit)).toBe(500)
  })
})

describe('scrollLeftFor', () => {
  it('rests on the home copy at pos 0', () => {
    expect(scrollLeftFor(1392, 0)).toBe(1392)
  })
  it('strip drifts right-to-left: scrollLeft increases as drift advances', () => {
    const unit = 1392
    let pos = 0
    let prev = scrollLeftFor(unit, pos)
    for (let i = 0; i < 60; i++) {
      pos = driftStep(pos, 16, 30, 0, unit)
      const next = scrollLeftFor(unit, pos)
      expect(next).toBeGreaterThan(prev)
      prev = next
    }
  })
})
