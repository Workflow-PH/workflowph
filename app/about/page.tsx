import { BigRows } from '@/components/wf/big-rows'
import { Finale } from '@/components/wf/finale'
import { Diamond, Marquee } from '@/components/wf/marquee'
import { NodeGraph } from '@/components/wf/node-graph'
import { PageTitle } from '@/components/wf/page-title'
import { Reveal } from '@/components/wf/reveal'
import { activities, beliefs, history, longTerm, tracks, vision } from '@/lib/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'WorkFlow PH started in early 2026 to fix scattered automation education in the Philippines.',
  path: '/about',
  kicker: 'The story so far',
})

export default function AboutPage() {
  return (
    <>
      <PageTitle word="About" kicker="Since early 2026" />

      <Reveal className="px-7 pb-28 md:px-10 md:pb-40">
        <p className="max-w-5xl text-3xl leading-tight font-semibold text-balance md:text-6xl">
          Automation education in the Philippines was scattered. So volunteers started{' '}
          <span className="text-flow">teaching it together</span>, in public.
        </p>
      </Reveal>

      <Reveal className="px-7 pb-28 md:px-10 md:pb-40">
        <div className="rounded-xl border border-border bg-muted/30 px-6 py-10 md:px-12 md:py-14">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            One connected community
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl leading-tight font-semibold text-balance md:text-4xl">
            Everything we do loops back to the same place — a{' '}
            <span className="text-flow">community</span> where builders, partners and
            events are wired together.
          </h2>
          <div className="mx-auto mt-8 max-w-4xl md:mt-10">
            <NodeGraph />
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-2 overflow-hidden pb-28 md:pb-40">
        <Marquee speed={-2.5} className="display text-[14vw] md:text-[8vw]">
          {activities.map((a) => (
            <span key={a.name} className="flex items-center gap-[0.3em] pr-[0.3em]">
              {a.name}
              <Diamond />
            </span>
          ))}
        </Marquee>
        <Marquee speed={2} className="display text-[14vw] opacity-70 md:text-[8vw]">
          {beliefs.map((b) => (
            <span key={b.name} className="flex items-center gap-[0.3em] pr-[0.3em] text-stroke">
              {b.name}
              <Diamond />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="flex flex-col gap-24 md:gap-32">
        <BigRows
          label="Vision"
          rows={vision.map((v) => ({
            key: v.name,
            title: v.name,
            note: v.body,
          }))}
        />
        <BigRows
          label="Two tracks, one community"
          rows={tracks.map((t) => ({
            key: t.name,
            left: t.tool,
            title: t.name,
            note: t.body,
          }))}
        />
        <BigRows
          label="So far — the record"
          rows={history.map((h) => ({
            key: h.title,
            left: h.when,
            title: h.title,
            note: h.body,
            right: h.branch,
          }))}
        />
        <BigRows
          label="Where this goes — the roadmap"
          rows={longTerm.map((l, i) => ({
            key: l.name,
            left: `0${i + 1} / Next`,
            title: l.name,
            note: l.body,
          }))}
        />
      </div>
      <div className="h-32 md:h-48" />
      <Finale />
    </>
  )
}
