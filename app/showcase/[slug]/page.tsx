import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageTitle } from '@/components/wf/page-title'
import { Reveal } from '@/components/wf/reveal'
import { Diamond } from '@/components/wf/marquee'
import { eventBySlug, events, eventsByDate, modeLabel } from '@/lib/data/events'
import { personBySlug } from '@/lib/data/people'
import { formatDateRange } from '@/lib/format'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const e = eventBySlug(slug)
  if (!e) return {}
  return pageMetadata({
    title: e.title,
    description: e.hook,
    path: `/showcase/${e.slug}`,
    kicker: formatDateRange(e.start, e.end, e.monthOnly),
  })
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const e = eventBySlug(slug)
  if (!e) notFound()

  const i = eventsByDate.findIndex((x) => x.slug === e.slug)
  const next = eventsByDate[(i + 1) % eventsByDate.length]
  const meta = [
    formatDateRange(e.start, e.end, e.monthOnly),
    e.venue ?? e.city,
    modeLabel[e.mode],
    e.role,
  ].filter(Boolean) as string[]
  const speakers = e.people.map(personBySlug).filter((p) => p !== undefined)

  return (
    <article>
      <PageTitle word={e.title} kicker={e.series} line={e.hook} size="text-[14vw] md:text-[9.5vw]" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-paper/15 px-7 py-5 font-mono text-[11px] tracking-widest uppercase md:px-10">
        {meta.map((m, k) => (
          <span key={m} className="flex items-center gap-5">
            {k > 0 && <Diamond className="text-[1.6rem]" />}
            {m}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-24 px-7 py-24 md:gap-32 md:px-10 md:py-32">
        <Reveal className="flex flex-wrap gap-x-16 gap-y-10">
          {e.numbers.map((n) => (
            <div key={n.label} className="flex flex-col gap-3">
              <span
                className={`display text-[22vw] md:text-[11vw] ${n.value ? 'text-flow' : 'text-stroke opacity-50'}`}
              >
                {n.value ?? 'TBC'}
              </span>
              <span className="font-mono text-[11px] tracking-widest uppercase opacity-70">
                {n.label}
              </span>
            </div>
          ))}
        </Reveal>

        {(e.recap || e.outcomes.length > 0) && (
          <Reveal className="flex max-w-4xl flex-col gap-10">
            {e.recap && (
              <p className="text-2xl leading-snug font-medium text-pretty md:text-4xl">{e.recap}</p>
            )}
            {e.outcomes.length > 0 && (
              <ul className="flex flex-col gap-4">
                {e.outcomes.map((o) => (
                  <li key={o} className="flex gap-4 text-lg leading-relaxed text-paper/80">
                    <Diamond className="mt-[0.45em] text-[1.8rem]" />
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        )}

        {e.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {e.photos.map((ph, k) => (
              <Reveal key={ph.src} delay={(k % 3) * 0.08}>
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full rounded-sm"
                />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="flex flex-col gap-4">
          <span className="font-mono text-[11px] tracking-widest uppercase opacity-70">With</span>
          <p className="display text-[11vw] md:text-[6vw]">{e.collaborators.join(' · ')}</p>
          {speakers.length > 0 && (
            <p className="font-mono text-xs tracking-widest uppercase">
              On stage:{' '}
              {speakers.map((s) => (
                <Link key={s.slug} href="/people" className="text-sun underline-offset-4 hover:underline">
                  {s.name}
                </Link>
              ))}
            </p>
          )}
        </Reveal>

        {e.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {e.links.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-paper px-5 py-3 font-mono text-[11px] tracking-widest text-ink uppercase transition-colors hover:bg-sun"
                >
                  {l.label}
                </a>
              ) : (
                <span
                  key={l.label}
                  className="rounded-full border border-dashed border-paper/35 px-5 py-3 font-mono text-[11px] tracking-widest text-paper/50 uppercase"
                >
                  {l.label} · soon
                </span>
              ),
            )}
          </div>
        )}
      </div>

      <Link
        href={`/showcase/${next.slug}`}
        className="group relative block overflow-hidden border-t border-paper/15 px-7 py-16 md:px-10 md:py-24"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-sun transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
        />
        <span className="relative flex flex-col gap-4 transition-colors group-hover:text-ink">
          <span className="font-mono text-[11px] tracking-widest uppercase">Next on record</span>
          <span className="display text-[12vw] text-balance md:text-[7vw]">{next.title}</span>
        </span>
      </Link>
    </article>
  )
}
