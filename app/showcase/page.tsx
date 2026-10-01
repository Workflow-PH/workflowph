import { EventsIndex } from '@/components/wf/events-index'
import { Finale } from '@/components/wf/finale'
import { PageTitle } from '@/components/wf/page-title'
import { allCollaborators, events, eventsByDate } from '@/lib/data/events'
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
      <section aria-label="Event partnerships" className="px-7 py-24 md:px-10 md:py-32">
        <h2 className="pb-5 font-mono text-[11px] tracking-widest uppercase opacity-70">
          Event partnerships
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
