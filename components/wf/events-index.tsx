'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'

export type IndexItem = {
  slug: string
  title: string
  date: string
  meta: string
}

const FILLS = ['bg-teal', 'bg-orange', 'bg-sun']
const CUTOUTS = [
  { src: '/collage/laptop.webp', w: 900, h: 651 },
  { src: '/collage/jeepney.webp', w: 900, h: 465 },
  { src: '/collage/builder.webp', w: 492, h: 900 },
  { src: '/collage/chair.webp', w: 579, h: 811 },
  { src: '/collage/arm.webp', w: 234, h: 900 },
  { src: '/collage/palm.webp', w: 536, h: 900 },
]

export function EventsIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 })

  const cutout = active === null ? null : CUTOUTS[active % CUTOUTS.length]

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-b border-paper/15">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/showcase/${item.slug}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              onFocus={() => setActive(null)}
              className="group relative block overflow-hidden border-t border-paper/15"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 ${FILLS[i % FILLS.length]}`}
              />
              <span className="relative flex flex-col gap-3 px-7 py-7 transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink md:flex-row md:items-end md:gap-10 md:px-10 md:py-9">
                <span className="shrink-0 font-mono text-[11px] tracking-widest uppercase opacity-70 md:w-44 md:pb-2">
                  {item.date}
                </span>
                <span className="flex-1 display text-[clamp(2.6rem,6.4vw,7.5rem)] text-balance transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                  {item.title}
                </span>
                <span className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase opacity-70 md:pb-2">
                  {item.meta}
                  <span
                    aria-hidden="true"
                    className="size-2.5 rotate-45 border border-current transition-all duration-500 group-hover:rotate-[225deg] group-hover:bg-ink"
                  />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
      >
        <AnimatePresence mode="popLayout">
          {cutout && (
            <motion.div
              key={cutout.src}
              initial={{ scale: 0.4, rotate: -18, opacity: 0 }}
              animate={{ scale: 1, rotate: -4, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 14, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="-translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src={cutout.src}
                alt=""
                width={cutout.w}
                height={cutout.h}
                sizes="260px"
                className="h-60 w-auto max-w-72 object-contain drop-shadow-[0_24px_30px_rgb(14_22_20/0.45)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
