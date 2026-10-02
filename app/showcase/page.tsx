import { EventsIndex } from '@/components/wf/events-index'
import { Finale } from '@/components/wf/finale'
import { PageTitle } from '@/components/wf/page-title'
import { allCollaborators, events, eventsByDate, partnerRoleEvents } from '@/lib/data/events'
import { toIndexItems } from '@/lib/items'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Showcase',
  description: 'Every event WorkFlow PH ran, joined, or backed, on the record.',
  path: '/showcase',
  kicker: 'On record',
})

export default function ShowcasePage() {
  return (
    <>
      <PageTitle
        word="Showcase"
        kicker={`${eventsByDate.length} events on record`}
        line="Every room we ran, joined, or backed."
      />
      <EventsIndex items={toIndexItems(eventsByDate)} />

      <section aria-labelledby="event-partnerships" className="pt-24 md:pt-32">
        <div className="flex flex-col gap-4 px-7 pb-10 md:px-10 md:pb-12">
          <span className="font-mono text-[11px] tracking-widest uppercase opacity-70">
            Partner-role events
          </span>
          <h2 id="event-partnerships" className="display text-[12vw] text-balance md:text-[6.5vw]">
            Event <span className="text-flow">partnerships</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-paper/75">
            The rooms we backed as a community, strategic, or official partner — filtered from the
            full record above.
          </p>
        </div>
        <EventsIndex items={toIndexItems(partnerRoleEvents)} />
      </section>

      <section aria-label="Who we worked with" className="px-7 py-24 md:px-10 md:py-32">
        <h2 className="pb-5 font-mono text-[11px] tracking-widest uppercase opacity-70">
          Who we worked with
        </h2>
        <ul className="flex flex-wrap gap-3">
          {allCollaborators.map((c) => {
            const n = events.filter((e) => e.collaborators.includes(c)).length
            return (
              <li
                key={c}
                className="rounded-full border border-paper/25 px-5 py-3 font-mono text-[11px] tracking-widest uppercase"
              >
                {c} · {n}
              </li>
            )
          })}
        </ul>
      </section>
      <div className="h-32 md:h-48" />
      <Finale />
    </>
  )
}
