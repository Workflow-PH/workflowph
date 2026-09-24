import { BigRows } from '@/components/wf/big-rows'
import { Finale } from '@/components/wf/finale'
import { PageTitle } from '@/components/wf/page-title'
import { groupMeta, people, type PersonGroup } from '@/lib/data/people'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'People',
  description: 'The volunteers, speakers, and core team behind WorkFlow PH.',
  path: '/people',
  kicker: 'Who runs it',
})

const order: PersonGroup[] = ['core', 'speaker', 'volunteer', 'alumni']

export default function PeoplePage() {
  return (
    <>
      <PageTitle word="People" kicker="Volunteer-run" line="Every name here did the work." />
      <div className="flex flex-col gap-24 md:gap-32">
        {order.map((g) => {
          const list = people.filter((p) => p.group === g)
          if (list.length === 0) return null
          return (
            <BigRows
              key={g}
              label={groupMeta[g].title}
              rows={list.map((p) => ({
                key: p.slug,
                left: p.does,
                title: p.name,
                right: p.pending ? 'Unconfirmed' : p.org,
              }))}
            />
          )
        })}
      </div>
      <div className="h-32 md:h-48" />
      <Finale />
    </>
  )
}
