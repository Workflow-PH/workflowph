'use client'

import Image from 'next/image'
import { motion, transform, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Mark, MarkOutline } from '@/components/wf/mark'

const INK = '#0e1614'
const PAPER = '#f3f4f1'
const TEAL = '#1cbfa7'
const ORANGE = '#e2681f'
const SUN = '#fce043'

type Range = [number, number]

export function Stage({ stats }: { stats: { value: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const bg = useTransform(
    p,
    [0, 0.17, 0.27, 0.47, 0.56, 0.73, 0.81, 0.93, 1],
    [INK, INK, TEAL, TEAL, ORANGE, ORANGE, SUN, SUN, INK],
  )
  const fg = useTransform(p, [0, 0.17, 0.27, 0.93, 1], [PAPER, PAPER, INK, INK, PAPER])

  const steps = [0, 0.17, 0.3, 0.47, 0.6, 0.73, 0.84, 1]
  const lx = useTransform(p, steps, [0, 0, -330, -330, -150, -150, 0, 0])
  const ly = useTransform(p, steps, [0, 0, 80, 80, 230, 230, 0, 0])
  const lr = useTransform(p, steps, [0, 0, -16, -16, -45, -45, 0, 0])
  const rx = useTransform(p, steps, [0, 0, 330, 330, 150, 150, 0, 0])
  const rr = useTransform(p, steps, [0, 0, 16, 16, 45, 45, 0, 0])
  const cy = useTransform(p, steps, [0, 0, -230, -230, -60, -60, 0, 0])
  const cr = useTransform(p, steps, [0, 0, 45, 45, 180, 180, 360, 360])
  const cs = useTransform(p, steps, [1, 1, 1, 1, 1.45, 1.45, 1, 1])

  const markY = useTransform(p, [0.8, 0.88], ['0vh', '-17vh'])
  const markScale = useTransform(p, [0.8, 0.88], [1, 0.62])

  const o1 = useTransform(p, [0, 1], [0, 28])
  const o2 = useTransform(p, [0, 1], [0, -20])
  const o3 = useTransform(p, [0, 1], [0, 12])
  const outlineScale = useTransform(p, [0, 0.5, 1], [1, 1.12, 0.92])

  return (
    <section ref={ref} aria-labelledby="stage-title" className="relative h-[520vh]">
      <h1 id="stage-title" className="sr-only">
        WorkFlow PH: building the volunteer-driven automation landscape of the Philippines.
      </h1>
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          style={{ scale: outlineScale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
        >
          <motion.div style={{ rotate: o1 }} className="absolute w-[min(150vw,1500px)]">
            <MarkOutline className="h-auto w-full" />
          </motion.div>
          <motion.div style={{ rotate: o2 }} className="absolute w-[min(240vw,2400px)]">
            <MarkOutline className="h-auto w-full" />
          </motion.div>
          <motion.div style={{ rotate: o3 }} className="absolute w-[min(360vw,3600px)]">
            <MarkOutline className="h-auto w-full" />
          </motion.div>
        </motion.div>

        <div aria-hidden="true" className="absolute inset-0">
          <ChapterWord p={p} word="Automate" exit={[0.12, 0.2]} color={PAPER} />
          <ChapterWord p={p} word="Together" enter={[0.22, 0.31]} exit={[0.44, 0.51]} color={INK} />
          <ChapterWord p={p} word="Pilipinas" enter={[0.52, 0.61]} exit={[0.71, 0.78]} color={INK} />
        </div>

        <div aria-hidden="true" className="absolute inset-0">
          <Cutout p={p} src="/collage/builder.webp" w={492} h={900} enter={[0.2, 0.3]} exit={[0.44, 0.52]} rot={-6} className="bottom-0 left-[4%] h-[62vh] md:left-[8%] md:h-[74vh]" />
          <Cutout p={p} src="/collage/laptop.webp" w={900} h={651} enter={[0.23, 0.33]} exit={[0.43, 0.5]} rot={8} className="top-[20%] right-[3%] w-[44vw] md:top-[14%] md:right-[7%] md:w-[26vw]" />
          <Cutout p={p} src="/collage/arm.webp" w={234} h={900} enter={[0.26, 0.35]} exit={[0.42, 0.49]} rot={-4} className="right-[18%] bottom-0 h-[42vh] md:right-[24%] md:h-[58vh]" />
          <Cutout p={p} src="/collage/jeepney.webp" w={900} h={465} enter={[0.5, 0.6]} exit={[0.72, 0.8]} rot={-3} className="bottom-[4%] left-[-6%] w-[70vw] md:left-[2%] md:w-[40vw]" />
          <Cutout p={p} src="/collage/palm.webp" w={536} h={900} enter={[0.52, 0.62]} exit={[0.71, 0.78]} rot={5} className="right-[-22%] bottom-0 h-[52vh] md:right-[4%] md:h-[94vh]" />
          <Cutout p={p} src="/collage/chair.webp" w={579} h={811} enter={[0.55, 0.64]} exit={[0.7, 0.77]} rot={-10} className="right-[4%] bottom-[30%] h-[16vh] md:right-[28%] md:bottom-[3%] md:h-[32vh]" />
        </div>

        <motion.div style={{ y: markY, scale: markScale }} className="relative z-10 w-[min(66vw,560px)]">
          <Mark
            className="h-auto w-full"
            left={{ x: lx, y: ly, rotate: lr }}
            right={{ x: rx, y: ly, rotate: rr }}
            center={{ y: cy, rotate: cr, scale: cs }}
          />
        </motion.div>

        <div className="absolute inset-x-0 top-[58%] z-10 flex justify-center gap-6 px-6 md:gap-16">
          {stats.map((s, i) => (
            <StatReveal key={s.label} p={p} index={i} value={s.value} label={s.label} />
          ))}
        </div>

        <Caption p={p} range={[0, 0, 0.1, 0.16]}>
          Volunteer-driven automation · Philippines
        </Caption>
        <Caption p={p} range={[0.28, 0.33, 0.44, 0.49]}>
          Build nights · clinics · mini labs · hackathons
        </Caption>
        <Caption p={p} range={[0.58, 0.63, 0.71, 0.76]}>
          Online first. On-site from Taguig to Pasay.
        </Caption>

        <ScrollHint p={p} />
      </motion.div>
    </section>
  )
}

function ChapterWord({
  p,
  word,
  enter,
  exit,
  color,
}: {
  p: MotionValue<number>
  word: string
  /** Omit when the word is on screen from the first frame. */
  enter?: Range
  exit: Range
  color: string
}) {
  const letters = word.toUpperCase().split('')
  return (
    <div
      className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center display text-[21vw] leading-[0.8] md:text-[23vw]"
      style={{ color }}
    >
      {letters.map((l, i) => (
        <Letter key={`${l}${i}`} p={p} i={i} n={letters.length} enter={enter} exit={exit}>
          {l}
        </Letter>
      ))}
    </div>
  )
}

function Letter({
  p,
  i,
  n,
  enter,
  exit,
  children,
}: {
  p: MotionValue<number>
  i: number
  n: number
  enter?: Range
  exit: Range
  children: string
}) {
  const outSpan = exit[1] - exit[0]
  const c = exit[0] + outSpan * 0.6 * (i / n)
  const d = c + outSpan * 0.4
  let input = [c, d]
  let output = ['0%', '-110%']
  if (enter) {
    const inSpan = enter[1] - enter[0]
    const a = enter[0] + inSpan * 0.6 * (i / n)
    input = [a, a + inSpan * 0.4, c, d]
    output = ['110%', '0%', '0%', '-110%']
  }
  const y = useTransform(p, input, output)
  return (
    <span className="inline-block overflow-hidden py-[0.04em]">
      <motion.span style={{ y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  )
}

function Cutout({
  p,
  src,
  w,
  h,
  enter,
  exit,
  rot,
  className,
}: {
  p: MotionValue<number>
  src: string
  w: number
  h: number
  enter: Range
  exit: Range
  rot: number
  className: string
}) {
  const range = [enter[0], enter[1], exit[0], exit[1]]
  // Symmetric in/out (was 115vh on exit) so reversing direction has no 5vh pop.
  const y = useTransform(p, range, ['110vh', '0vh', '0vh', '110vh'])
  const rotate = useTransform(p, range, [rot * 4, rot, rot, rot * -3])
  return (
    <motion.div style={{ y, rotate }} className={`absolute z-[5] ${className}`}>
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        sizes="(min-width: 768px) 40vw, 70vw"
        className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgb(14_22_20/0.35)]"
      />
    </motion.div>
  )
}

function StatReveal({
  p,
  index,
  value,
  label,
}: {
  p: MotionValue<number>
  index: number
  value: string
  label: string
}) {
  const a = 0.82 + index * 0.02
  const y = useTransform(p, [a, a + 0.05, 0.94, 0.98], ['110%', '0%', '0%', '-110%'])
  const opacity = useTransform(p, transform([a, a + 0.04, 0.94, 0.98], [0, 1, 1, 0]))
  return (
    <div className="flex flex-col items-center gap-2 text-ink">
      <span className="overflow-hidden">
        <motion.span style={{ y }} className="block display text-[17vw] md:text-[11vw]">
          {value}
        </motion.span>
      </span>
      <motion.span
        style={{ opacity }}
        className="text-center font-mono text-[10px] tracking-widest uppercase md:text-xs"
      >
        {label}
      </motion.span>
    </div>
  )
}

function Caption({
  p,
  range,
  children,
}: {
  p: MotionValue<number>
  range: [number, number, number, number]
  children: string
}) {
  const startsVisible = range[0] === range[1]
  const input = startsVisible ? [range[2], range[3]] : range
  const opacity = useTransform(p, transform(input, startsVisible ? [1, 0] : [0, 1, 1, 0]))
  const y = useTransform(p, input, startsVisible ? [0, -16] : [16, 0, 0, -16])
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute top-[13vh] left-1/2 z-20 w-max max-w-[84vw] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-center font-mono text-[10px] tracking-widest text-paper uppercase md:top-auto md:bottom-16 md:text-xs"
    >
      {children}
    </motion.p>
  )
}

function ScrollHint({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, transform([0, 0.05], [1, 0]))
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase md:flex"
    >
      Scroll
      <span className="relative h-8 w-px overflow-hidden bg-current/25">
        <span className="absolute inset-x-0 top-0 h-3 animate-[drip_1.6s_ease-in-out_infinite] bg-current" />
      </span>
    </motion.div>
  )
}
