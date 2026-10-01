/** Fired on `window` once the intro overlay has finished. */
export const INTRO_DONE_EVENT = 'wf:intro-done'

type DatasetRoot = { dataset: DOMStringMap | Record<string, string | undefined> }

/**
 * Runs `cb` once the intro is done: immediately (synchronously) if the
 * `data-intro="done"` flag is already set, otherwise on the first
 * INTRO_DONE_EVENT. Returns an unsubscribe function.
 *
 * Client-only: call from effects, since the defaults touch `document`/`window`.
 */
export function whenIntroDone(
  cb: () => void,
  root: DatasetRoot = document.documentElement,
  target: EventTarget = window,
): () => void {
  if (root.dataset.intro === 'done') {
    cb()
    return () => {}
  }
  let called = false
  const handler = () => {
    if (called) return
    called = true
    target.removeEventListener(INTRO_DONE_EVENT, handler)
    cb()
  }
  target.addEventListener(INTRO_DONE_EVENT, handler, { once: true })
  return () => target.removeEventListener(INTRO_DONE_EVENT, handler)
}
