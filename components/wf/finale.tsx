'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { org } from '@/lib/data/site'
import { Mark } from './mark'

export function Finale({
  top = 'Join',
  bottom = 'the build',
}: {
  top?: string
  bottom?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x1 = useTransform(p, [0, 0.85], ['-60%', '0%'])
  const x2 = useTransform(p, [0, 0.85], ['60%', '0%'])
  const spread = useTransform(p, [0.2, 0.9], [1, 0])
  const lx = useTransform(spread, (s) => -520 * s)
  const rx = useTransform(spread, (s) => 520 * s)
  const lr = useTransform(spread, (s) => -60 * s)
  const rr = useTransform(spread, (s) => 60 * s)
  const cy = useTransform(spread, (s) => -380 * s)
  const cr = useTransform(spread, (s) => 225 * s)

  return (
    <section
      ref={ref}
      aria-labelledby="finale-title"
      className="relative flex min-h-dvh flex-col items-center justify-center gap-10 overflow-hidden bg-sun px-7 py-32 text-ink md:px-10"
    >
      <h2 id="finale-title" className="flex flex-col items-center display text-[22vw] leading-[0.8] md:text-[17vw]">
        <motion.span style={{ x: x1 }} className="block">
          {top}
        </motion.span>
        <span className="flex w-[min(40vw,340px)] items-center justify-center py-[3vw]">
          <Mark
            className="h-auto w-full"
            left={{ x: lx, rotate: lr }}
            right={{ x: rx, rotate: rr }}
            center={{ y: cy, rotate: cr }}
          />
        </span>
        <motion.span style={{ x: x2 }} className="block">
          {bottom}
        </motion.span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/join"
          className="rounded-full bg-ink px-7 py-4 font-mono text-xs tracking-widest text-paper uppercase transition-transform hover:-rotate-2"
        >
          Volunteer
        </Link>
        <Link
          href="/partners"
          className="rounded-full border border-ink px-7 py-4 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-ink hover:text-paper"
        >
          Partner with us
        </Link>
      </div>
      <a
        href={`mailto:${org.email}`}
        className="font-mono text-xs tracking-widest uppercase underline-offset-4 hover:underline"
      >
        {org.email}
      </a>
    </section>
  )
}
