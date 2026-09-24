import { BigRows } from '@/components/wf/big-rows'
import { PageTitle } from '@/components/wf/page-title'
import { Reveal } from '@/components/wf/reveal'
import { partners, tierLabel } from '@/lib/data/partners'
import { org, partnerReasons } from '@/lib/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Partners',
  description: 'Partner with WorkFlow PH to reach 1,500+ Filipino builders who automate real work.',
  path: '/partners',
  kicker: 'Work with us',
})

const mail = `mailto:${org.email}?subject=${encodeURIComponent('Partnership with WorkFlow PH')}`

export default function PartnersPage() {
  return (
    <>
      <PageTitle
        word="Partners"
        kicker="1,500+ builders reached"
        line="Your engineers teach. Our builders ship. The work stays open, with your name on it."
      />
      <BigRows
        rows={partners.map((p) => ({
          key: p.slug,
          left: `Since ${p.since}`,
          title: p.name,
          right: tierLabel[p.tier],
        }))}
      />

      <div className="flex flex-col gap-6 px-7 py-28 md:px-10 md:py-40">
        {partnerReasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <p className="display text-[11vw] md:text-[6.5vw]">
              <span className={i === 1 ? 'text-flow' : undefined}>{r.title}</span>
            </p>
          </Reveal>
        ))}
      </div>

      <section className="flex min-h-[70dvh] flex-col items-center justify-center gap-10 bg-sun px-7 py-28 text-center text-ink md:px-10">
        <h2 className="display text-[20vw] md:text-[14vw]">{"Let's build"}</h2>
        <a
          href={mail}
          className="rounded-full bg-ink px-8 py-4 font-mono text-xs tracking-widest text-paper uppercase transition-transform hover:-rotate-2"
        >
          {org.email}
        </a>
      </section>
    </>
  )
}
