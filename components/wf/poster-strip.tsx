'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { whenIntroDone } from '@/lib/intro'
import { copiesFor, driftStep, easeOutCubic, scrollLeftFor, stepPos, wrapLoop } from '@/lib/loop'

export type PosterItem = {
  slug: string
  title: string
  src: string
  alt: string
  width: number
  height: number
}

/** Base drift speed in px/s. Positive = content moves right-to-left. */
const SPEED = 30
/** Speed easing time constant (ms); ~95% of the way there after 300ms. */
const EASE_TAU = 100
/** One card step: w-52 (208px) + gap-6 (24px). */
const CARD_STEP = 232
/** Resume drift this long after a touch ends. */
const TOUCH_RESUME_MS = 2000
/** Duration of one arrow-key card step (ms). */
const STEP_MS = 350
/**
 * The copy the strip rests on. Scroll is kept within this copy so the loop can
 * run both ways, and it is the only copy exposed to keyboard and screen
 * readers, so focused links never get wrapped out of view.
 */
const HOME = 1

/** True when focus came from the keyboard (falls back to true without :focus-visible). */
function isKeyboardFocus(target: EventTarget): boolean {
  if (!(target instanceof Element)) return false
  try {
    return target.matches(':focus-visible')
  } catch {
    return true
  }
}

/**
 * Poster cards in the current theme, looping infinitely and drifting slowly
 * right-to-left. Drift pauses on hover, drag, touch, focus, when off screen,
 * while the tab is hidden and until the intro is done; it is off entirely
 * under reduced motion. Browse by mouse drag, touch swipe, trackpad,
 * shift + wheel, or arrow keys (the region is focusable).
 */
export function PosterStrip({ items }: { items: PosterItem[] }) {
  const track = useRef<HTMLDivElement>(null)
  const homeSet = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false, id: -1 })
  // Three copies on the server and first client render so markup matches.
  const [copies, setCopies] = useState(3)
  /** Width of one set, including its trailing gap. 0 until measured. */
  const unit = useRef(0)
  /** Fractional offset into the home copy: scrollLeft = unit + pos. */
  const pos = useRef(0)
  /** scrollLeft as read back after our own write, to tell drift from user scrolls. */
  const lastWrite = useRef(-1)
  const speed = useRef(0)
  /**
   * In-flight arrow-key step, animated in the rAF loop through pos/wrapLoop
   * rather than native smooth scroll, so loop wraps never abort it.
   */
  const stepAnim = useRef<{ from: number; delta: number; cur: number; t0: number | null } | null>(
    null,
  )
  const pause = useRef({
    hover: false,
    focus: false,
    touch: false,
    inView: false,
    introDone: false,
  })

  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  // Clamped so a hard page fling tops out at 6x base speed.
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: true })

  const place = () => {
    const el = track.current
    const u = unit.current
    if (!el || u <= 0) return
    // Direction contract: scrollLeftFor adds pos, and driftStep only increases
    // pos, so drift moves content right-to-left (covered in lib/loop.test.ts).
    el.scrollLeft = scrollLeftFor(u, pos.current)
    lastWrite.current = el.scrollLeft
  }

  // Measure one set and size the number of copies to the viewport.
  useEffect(() => {
    const el = track.current
    const set = homeSet.current
    if (!el || !set) return
    const measure = () => {
      const u = set.offsetWidth
      if (u <= 0) return
      const changed = u !== unit.current
      unit.current = u
      setCopies(copiesFor(el.clientWidth, u))
      if (changed) {
        pos.current = wrapLoop(pos.current, u)
        place()
      }
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(set)
    measure()
    return () => ro.disconnect()
  }, [items.length])

  // Re-apply the position once extra copies exist (scrollLeft may have clamped).
  useLayoutEffect(place, [copies])

  // Shift + vertical wheel scrolls the strip. Plain vertical wheel stays page
  // scroll (Lenis); horizontal trackpad deltas scroll natively because the
  // track carries data-lenis-prevent-horizontal.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey || e.deltaY === 0 || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return
      const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1
      el.scrollLeft += e.deltaY * k
      e.preventDefault()
      ;(e as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [items.length])

  // Pause while off screen.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      pause.current.inView = entry.isIntersecting
    })
    io.observe(el)
    return () => io.disconnect()
  }, [items.length])

  // Hold drift until the intro has finished.
  useEffect(() => whenIntroDone(() => (pause.current.introDone = true)), [])

  // Touch resume timer.
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(touchTimer.current), [])

  useAnimationFrame((time, delta) => {
    const el = track.current
    const u = unit.current
    if (!el || u <= 0) return
    const s = pause.current
    // Drag and touch stop dead so writes never fight the user's gesture.
    if (drag.current.down || s.touch) {
      speed.current = 0
      stepAnim.current = null
      return
    }
    const a = stepAnim.current
    if (a) {
      // Arrow-key step: animate pos and write through place(), which keeps
      // scrollLeft inside the home copy every frame, so no wrap can abort it.
      if (a.t0 === null) a.t0 = time
      const t = Math.min((time - a.t0) / STEP_MS, 1)
      a.cur = a.from + a.delta * easeOutCubic(t)
      pos.current = stepPos(a.from, a.delta, t, u)
      place()
      if (t >= 1) stepAnim.current = null
      return
    }
    if (reduce) return
    const paused = s.hover || s.focus || !s.inView || !s.introDone || document.hidden
    const target = paused ? 0 : SPEED
    const dt = Math.min(delta, 100)
    speed.current += (target - speed.current) * (1 - Math.exp(-dt / EASE_TAU))
    if (target === 0 && speed.current < 0.05) speed.current = 0
    if (speed.current === 0) return
    pos.current = driftStep(pos.current, dt, speed.current, boost.get(), u)
    place()
  })

  if (items.length === 0) return null

  /** Keep scrollLeft inside the home copy; sync drift position from user scrolls. */
  const onScroll = () => {
    const el = track.current
    const u = unit.current
    if (!el || u <= 0) return
    const s = el.scrollLeft
    if (s === lastWrite.current) return
    // A user scroll takes over from any in-flight arrow-key step.
    stepAnim.current = null
    const wrapped = u + wrapLoop(s - u, u)
    if (wrapped !== s) {
      el.scrollLeft = wrapped
      drag.current.startScroll += wrapped - s
    }
    lastWrite.current = el.scrollLeft
    pos.current = el.scrollLeft - u
  }

  const begin = (clientX: number, id: number) => {
    const el = track.current
    if (!el) return
    drag.current = { down: true, startX: clientX, startScroll: el.scrollLeft, moved: false, id }
  }

  const move = (clientX: number) => {
    const el = track.current
    const d = drag.current
    if (!d.down || !el) return
    const dx = clientX - d.startX
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      // Capture only once it is a real drag, so plain clicks still reach links.
      try {
        el.setPointerCapture(d.id)
      } catch {}
    }
    el.scrollLeft = d.startScroll - dx
  }

  const end = () => {
    const el = track.current
    const d = drag.current
    d.down = false
    if (el && d.id >= 0 && el.hasPointerCapture(d.id)) el.releasePointerCapture(d.id)
  }

  /**
   * Mouse release: end the press, then re-read hover from the release point.
   * While captured, the browser holds back pointerleave, so a drag released
   * outside the strip must not leave the hover pause stuck on.
   */
  const release = (e: ReactPointerEvent<HTMLDivElement>) => {
    end()
    if (e.pointerType !== 'mouse') return
    const under = document.elementFromPoint(e.clientX, e.clientY)
    pause.current.hover = !!under && e.currentTarget.contains(under)
  }

  const step = (dir: 1 | -1) => {
    const el = track.current
    const u = unit.current
    if (!el) return
    if (u <= 0) {
      el.scrollBy({ left: dir * CARD_STEP, behavior: reduce ? 'auto' : 'smooth' })
      return
    }
    if (reduce) {
      // Instant step, wrapped into the home copy.
      stepAnim.current = null
      pos.current = wrapLoop(pos.current + dir * CARD_STEP, u)
      place()
      return
    }
    // Smooth step, animated in the rAF loop. Repeated presses extend the
    // current step's target instead of restarting from a mid-way position.
    const a = stepAnim.current
    const from = a ? a.cur : pos.current
    const delta = (a ? a.from + a.delta - a.cur : 0) + dir * CARD_STEP
    stepAnim.current = { from, delta, cur: from, t0: null }
  }

  return (
    <section aria-label="Event posters" className="border-t border-paper/15 py-10">
      <div className="flex items-baseline justify-between gap-6 px-7 pb-6 md:px-10">
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-70">On the walls</p>
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-40">
          Drag or swipe
        </p>
      </div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Event posters, scrollable"
        data-lenis-prevent-horizontal=""
        className="flex cursor-grab overflow-x-auto px-7 pb-2 outline-none select-none focus-visible:ring-1 focus-visible:ring-sun active:cursor-grabbing md:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        onScroll={onScroll}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') pause.current.hover = true
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'mouse') return
          pause.current.hover = false
          // Leaving before the drag threshold (no capture yet) ends the press.
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) end()
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return
          begin(e.clientX, e.pointerId)
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          move(e.clientX)
        }}
        onPointerUp={release}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onTouchStart={() => {
          clearTimeout(touchTimer.current)
          pause.current.touch = true
        }}
        onTouchEnd={() => {
          clearTimeout(touchTimer.current)
          touchTimer.current = setTimeout(() => (pause.current.touch = false), TOUCH_RESUME_MS)
        }}
        onTouchCancel={() => {
          clearTimeout(touchTimer.current)
          touchTimer.current = setTimeout(() => (pause.current.touch = false), TOUCH_RESUME_MS)
        }}
        onFocus={(e) => {
          // Pause for keyboard focus only. Mouse presses also focus the region
          // or a card, and pausing on those would freeze the drift after a drag.
          pause.current.focus = isKeyboardFocus(e.target)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) pause.current.focus = false
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            // Arrow keys are a keyboard signal: hold the drift until focus leaves,
            // even if focus first arrived by mouse.
            pause.current.focus = true
            step(e.key === 'ArrowRight' ? 1 : -1)
          }
        }}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
      >
        {Array.from({ length: copies }, (_, k) => {
          const home = k === HOME
          return (
            <div
              key={k}
              ref={home ? homeSet : undefined}
              aria-hidden={home ? undefined : true}
              className="flex shrink-0 gap-6 pr-6"
            >
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/showcase/${p.slug}`}
                  draggable={false}
                  tabIndex={home ? undefined : -1}
                  className="flex w-52 shrink-0 flex-col gap-3"
                >
                  <span className="block overflow-hidden rounded-sm border border-paper/15">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="208px"
                      draggable={false}
                      className="pointer-events-none h-64 w-52 object-cover"
                    />
                  </span>
                  <span className="font-mono text-[10px] leading-snug tracking-widest uppercase opacity-70">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
