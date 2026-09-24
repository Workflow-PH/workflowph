import { BigRows } from '@/components/wf/big-rows'
import { PageTitle } from '@/components/wf/page-title'
import { contributions, org, volunteerTerms } from '@/lib/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Join',
  description: 'Volunteer with WorkFlow PH. 2–4 hours a week, async-first.',
  path: '/join',
  kicker: 'Volunteer',
})

const mail = `mailto:${org.email}?subject=${encodeURIComponent('I want to volunteer')}`

export default function JoinPage() {
  return (
    <>
      <PageTitle
        word="Join"
        size="text-[40vw] md:text-[30vw]"
        kicker={`${volunteerTerms.hours} · ${volunteerTerms.mode}`}
        line="Pick a lane. Switch any time. Your name goes on everything you touch."
      />
      <BigRows
        label="Lanes"
        rows={contributions.map((c) => ({
          key: c.name,
          title: c.name,
          right: c.skills.join(' · '),
        }))}
      />
      <section className="mt-32 flex min-h-[70dvh] flex-col items-center justify-center gap-10 bg-teal px-7 py-28 text-center text-ink md:mt-48 md:px-10">
        <h2 className="display text-[20vw] md:text-[14vw]">{"I'm in"}</h2>
        <a
          href={mail}
          className="rounded-full bg-ink px-8 py-4 font-mono text-xs tracking-widest text-paper uppercase transition-transform hover:-rotate-2"
        >
          Email {org.email}
        </a>
      </section>
    </>
  )
}
