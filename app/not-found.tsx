import Link from 'next/link'
import { PageTitle } from '@/components/wf/page-title'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <PageTitle word="404" kicker="Not on record" line="This page slipped through the flow." size="text-[48vw] md:text-[36vw]" />
      <div className="px-7 pb-32 md:px-10">
        <Link
          href="/"
          className="inline-flex rounded-full bg-paper px-6 py-3 font-mono text-[11px] tracking-widest text-ink uppercase transition-colors hover:bg-sun"
        >
          Back home
        </Link>
      </div>
    </div>
  )
}
