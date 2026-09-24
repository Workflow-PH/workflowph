import { EventsIndex } from '@/components/wf/events-index'
import { Finale } from '@/components/wf/finale'
import { PageTitle } from '@/components/wf/page-title'
import { eventsByDate } from '@/lib/data/events'
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
      <div className="h-32 md:h-48" />
      <Finale />
    </>
  )
}
