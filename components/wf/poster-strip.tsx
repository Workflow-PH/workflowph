'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export type PosterItem = {
  slug: string
  title: string
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Poster cards in the current theme, scrolled manually.
 * Drag with mouse / touch, scroll wheel, or keyboard (region is focusable).
 */
export function PosterStrip({ items }: { items: PosterItem[] }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  if (items.length === 0) return null

  const begin = (clientX: number) => {
    const el = track.current
    if (!el) return
    drag.current = { down: true, startX: clientX, startScroll: el.scrollLeft, moved: false }
  }

  const move = (clientX: number) => {
    const el = track.current
    const d = drag.current
    if (!d.down || !el) return
    const dx = clientX - d.startX
    if (Math.abs(dx) > 6) d.moved = true
    el.scrollLeft = d.startScroll - dx
  }

  const end = () => {
    drag.current.down = false
  }

  return (
    <section aria-label="Event posters" className="border-t border-paper/15 py-10">
      <div className="flex items-baseline justify-between gap-6 px-7 pb-6 md:px-10">
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-70">On the walls</p>
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-40">
          Drag or scroll
        </p>
      </div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Event posters, scrollable"
        className="flex cursor-grab snap-x gap-6 overflow-x-auto px-7 pb-2 outline-none select-none focus-visible:ring-1 focus-visible:ring-sun active:cursor-grabbing md:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return
          begin(e.clientX)
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          move(e.clientX)
        }}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
      >
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/showcase/${p.slug}`}
            draggable={false}
            className="flex w-52 shrink-0 snap-start flex-col gap-3"
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
    </section>
  )
}
