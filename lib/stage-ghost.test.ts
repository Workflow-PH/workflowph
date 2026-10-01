import { describe, expect, it } from 'vitest'
import { ghost, markOpacity, markScale, ramp } from './stage-ghost'

describe('ramp', () => {
  it('is linear between the bounds', () => {
    expect(ramp(0.5, 0, 1)).toBe(0.5)
  })
  it('clamps below and above', () => {
    expect(ramp(-1, 0, 1)).toBe(0)
    expect(ramp(2, 0, 1)).toBe(1)
  })
})

describe('ghost', () => {
  it('is 0 before the mark has settled, at any scroll', () => {
    expect(ghost(0, 0)).toBe(0)
    expect(ghost(0, 0.16)).toBe(0)
    expect(ghost(0, 0.5)).toBe(0)
  })
  it('is full before AUTOMATE exits', () => {
    expect(ghost(1, 0)).toBe(1)
    expect(ghost(1, 0.1)).toBe(1)
  })
  it('is about half way through the exit', () => {
    expect(ghost(1, 0.16)).toBeCloseTo(0.5)
  })
  it('is 0 once AUTOMATE has gone', () => {
    expect(ghost(1, 0.25)).toBe(0)
    expect(ghost(1, 1)).toBe(0)
  })
})

describe('markOpacity / markScale', () => {
  it('maps ghost to opacity', () => {
    expect(markOpacity(0)).toBe(1)
    expect(markOpacity(1)).toBeCloseTo(0.15)
  })
  it('scales on top of the base scale', () => {
    expect(markScale(1, 1)).toBe(1.5)
    expect(markScale(0.62, 0)).toBe(0.62)
  })
})
