'use client'

import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { Mark, MarkOutline } from './mark'
import { getLenis } from './smooth-scroll'

const ease = [0.76, 0, 0.24, 1] as const

export function Intro() {
  const draw = useMotionValue(0)
  const count = useMotionValue(0)
  const fill = useMotionValue(0)
  const spread = useMotionValue(1)
  const curtain = useMotionValue(0)

  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const lx = useTransform(spread, (s) => -420 * s)
  const rx = useTransform(spread, (s) => 420 * s)
  const cy = useTransform(spread, (s) => -260 * s)
  const lr = useTransform(spread, (s) => -40 * s)
  const rr = useTransform(spread, (s) => 40 * s)
  const cr = useTransform(spread, (s) => 135 * s)
  const clip = useTransform(curtain, (v) => `inset(0 0 ${v}% 0)`)
  const outlineOpacity = useTransform(fill, [0, 1], [0.5, 0])

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.intro === 'done') return
    getLenis()?.stop()
    window.scrollTo(0, 0)

    const finish = () => {
      root.dataset.intro = 'done'
      try {
        sessionStorage.setItem('wf-intro', '1')
      } catch {}
      getLenis()?.start()
    }

    const runs = [
      animate(draw, 1, { duration: 1.1, ease: 'easeInOut' }),
      animate(count, 100, { duration: 1.8, ease: [0.4, 0, 0.2, 1] }),
      animate(fill, 1, { duration: 0.5, delay: 0.9 }),
      animate(spread, 0, { duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }),
      animate(curtain, 100, { duration: 0.9, delay: 2, ease, onComplete: finish }),
    ]
    return () => runs.forEach((r) => r.stop())
  }, [draw, count, fill, spread, curtain])

  return (
    <motion.div
      aria-hidden="true"
      style={{ clipPath: clip }}
      className="wf-intro fixed inset-0 z-[90] flex items-center justify-center bg-ink text-paper"
    >
      <div className="relative w-[min(60vw,420px)]">
        <motion.div style={{ opacity: outlineOpacity }} className="absolute inset-0">
          <MarkOutline draw={draw} className="h-auto w-full" />
        </motion.div>
        <motion.div style={{ opacity: fill }}>
          <Mark
            className="h-auto w-full"
            left={{ x: lx, rotate: lr }}
            right={{ x: rx, rotate: rr }}
            center={{ y: cy, rotate: cr }}
          />
        </motion.div>
      </div>
      <span className="absolute bottom-7 left-7 font-mono text-[11px] tracking-widest md:bottom-9 md:left-10">
        + <motion.span>{label}</motion.span>
      </span>
      <span className="absolute right-7 bottom-7 font-mono text-[11px] tracking-widest uppercase md:right-10 md:bottom-9">
        Manila, PH
      </span>
    </motion.div>
  )
}
