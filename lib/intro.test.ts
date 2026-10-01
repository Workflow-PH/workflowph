import { describe, expect, it, vi } from 'vitest'
import { INTRO_DONE_EVENT, whenIntroDone } from './intro'

const fire = (t: EventTarget) => t.dispatchEvent(new Event(INTRO_DONE_EVENT))

describe('whenIntroDone', () => {
  it('calls back immediately when the intro is already done', () => {
    const cb = vi.fn()
    const target = new EventTarget()
    whenIntroDone(cb, { dataset: { intro: 'done' } }, target)
    expect(cb).toHaveBeenCalledTimes(1)
    fire(target)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('waits for the intro-done event', () => {
    const cb = vi.fn()
    const target = new EventTarget()
    whenIntroDone(cb, { dataset: {} }, target)
    expect(cb).not.toHaveBeenCalled()
    fire(target)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('never calls back twice', () => {
    const cb = vi.fn()
    const target = new EventTarget()
    whenIntroDone(cb, { dataset: {} }, target)
    fire(target)
    fire(target)
    fire(target)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('does not call back after unsubscribing', () => {
    const cb = vi.fn()
    const target = new EventTarget()
    const off = whenIntroDone(cb, { dataset: {} }, target)
    off()
    fire(target)
    expect(cb).not.toHaveBeenCalled()
  })
})
