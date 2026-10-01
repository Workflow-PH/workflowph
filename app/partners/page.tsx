import Image from 'next/image'
import { BigRows } from '@/components/wf/big-rows'
import { PageTitle } from '@/components/wf/page-title'
import { Reveal } from '@/components/wf/reveal'
import { partners, tierLabel } from '@/lib/data/partners'
import { org, partnerReasons } from '@/lib/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Partners',
  description: 'Partner with WorkFlow PH to reach 500+ Filipino builders who automate real work.',
  path: '/partners',
  kicker: 'Work with us',
})

const mail = `mailto:${org.email}?subject=${encodeURIComponent('Partnership with WorkFlow PH')}`

const ambassadors = partners.filter((p) => p.tier === 'ambassador' && p.logo)

export default function PartnersPage() {
  return (
    <>
      <PageTitle
        word="Partners"
        kicker="500+ builders reached"
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

      {ambassadors.length > 0 && (
        <section aria-label="Ambassadors" className="px-7 py-24 md:px-10 md:py-32">
          <h2 className="pb-8 font-mono text-[11px] tracking-widest uppercase opacity-70">
            Ambassadors
          </h2>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-8">
            {ambassadors.map((a) =>
              a.logo ? (
                <li key={a.slug}>
                  <Image
                    src={a.logo.src}
                    alt={`${a.name} logo`}
                    width={a.logo.width}
                    height={a.logo.height}
                    className="h-12 w-auto"
                  />
                </li>
              ) : null,
            )}
          </ul>
        </section>
      )}

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
