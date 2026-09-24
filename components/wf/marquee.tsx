'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

export function Marquee({
  children,
  speed = 3,
  className,
}: {
  children: ReactNode
  /** Percent of one copy per second; negative runs right-to-left. */
  speed?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    let move = dir.current * speed * (delta / 1000)
    move += move * Math.abs(b)
    base.set(base.get() + move * 0.25)
  })

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <motion.div style={{ x }} className="flex shrink-0 flex-nowrap">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} aria-hidden={k > 0} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Diamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-[0.32em] shrink-0 rotate-45 bg-flow ${className ?? ''}`}
    />
  )
}
