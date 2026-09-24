import Link from 'next/link'
import { Stage } from '@/components/home/stage'
import { EventsIndex } from '@/components/wf/events-index'
import { Finale } from '@/components/wf/finale'
import { Diamond, Marquee } from '@/components/wf/marquee'
import { eventsByDate } from '@/lib/data/events'
import { partners } from '@/lib/data/partners'
import { stats } from '@/lib/data/site'
import { toIndexItems } from '@/lib/items'

const statLabels: Record<string, string> = {
  events_run: 'Events run',
  builders_reached: 'Builders reached',
  partner_orgs: 'Partner orgs',
}

export default function HomePage() {
  const statList = stats
    .filter((s) => s.value && statLabels[s.key])
    .map((s) => ({ value: s.value as string, label: statLabels[s.key] }))

  return (
    <>
      <Stage stats={statList} />

      <section aria-labelledby="record-title" className="bg-ink pt-28 md:pt-40">
        <div className="flex items-end justify-between gap-6 px-7 pb-10 md:px-10 md:pb-14">
          <h2 id="record-title" className="display text-[19vw] md:text-[12vw]">
            On record
          </h2>
          <Link
            href="/showcase"
            className="mb-3 shrink-0 rounded-full border border-paper/40 px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase transition-colors hover:border-sun hover:bg-sun hover:text-ink"
          >
            All {eventsByDate.length}
          </Link>
        </div>
        <EventsIndex items={toIndexItems(eventsByDate.slice(0, 6))} />
      </section>

      <section aria-label="Partners" className="flex flex-col gap-2 overflow-hidden bg-ink py-28 md:py-40">
        <Marquee speed={-3} className="display text-[17vw] md:text-[11vw]">
          <span className="flex items-center gap-[0.25em] pr-[0.25em]">
            Para sa bawat builder <Diamond />
          </span>
        </Marquee>
        <Marquee speed={2} className="display text-[10vw] opacity-70 md:text-[5.5vw]">
          {partners.map((p) => (
            <span key={p.slug} className="flex items-center gap-[0.4em] pr-[0.4em] text-stroke">
              {p.name}
              <Diamond />
            </span>
          ))}
        </Marquee>
      </section>

      <Finale />
    </>
  )
}
