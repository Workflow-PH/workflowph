'use client'

import { motion, useScroll, useTransform } from 'motion/react'

const corner = 'absolute size-5 border-paper/70 md:size-7'

export function Hud() {
  const { scrollYProgress } = useScroll()
  const pct = useTransform(scrollYProgress, (v) => String(Math.round(v * 100)).padStart(3, '0'))

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-3 z-40 text-paper mix-blend-difference md:inset-4"
    >
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} right-0 bottom-0 border-r border-b`} />
      <span className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[11px] tracking-widest md:bottom-4 md:left-6">
        <span>+</span>
        <motion.span>{pct}</motion.span>
      </span>
    </div>
  )
}
