import { BigRows } from '@/components/wf/big-rows'
import { Finale } from '@/components/wf/finale'
import { PageTitle } from '@/components/wf/page-title'
import { outputs, statusLabel } from '@/lib/data/outputs'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Builds',
  description: 'Open templates and playbooks WorkFlow PH builds in public.',
  path: '/builds',
  kicker: 'Open outputs',
})

export default function BuildsPage() {
  return (
    <>
      <PageTitle word="Builds" kicker="Built in the open" line="Fork it. Run it. Credit it." />
      <BigRows
        rows={outputs.map((o) => ({
          key: o.slug,
          left: statusLabel[o.status],
          title: o.name,
          note: o.does,
          right: o.stack.join(' · '),
        }))}
      />
      <div className="h-32 md:h-48" />
      <Finale top="Ship" bottom="with us" />
    </>
  )
}
