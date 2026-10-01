import Image from 'next/image'
import Link from 'next/link'
import { Marquee } from '@/components/wf/marquee'

export type PosterItem = {
  slug: string
  title: string
  src: string
  alt: string
  width: number
  height: number
}

/** Scrolling poster cards in the current theme. Posters come from event records. */
export function PosterStrip({ items }: { items: PosterItem[] }) {
  if (items.length === 0) return null
  return (
    <section aria-label="Event posters" className="overflow-hidden border-t border-paper/15 py-10">
      <p className="px-7 pb-6 font-mono text-[11px] tracking-widest uppercase opacity-70 md:px-10">
        On the walls
      </p>
      <Marquee speed={-2}>
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/showcase/${p.slug}`}
            className="mx-3 flex w-52 shrink-0 flex-col gap-3"
          >
            <span className="block overflow-hidden rounded-sm border border-paper/15">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="208px"
                className="h-64 w-52 object-cover transition-transform duration-500 hover:scale-105"
              />
            </span>
            <span className="font-mono text-[10px] leading-snug tracking-widest whitespace-normal uppercase opacity-70">
              {p.title}
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  )
}
