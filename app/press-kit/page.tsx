import Image from 'next/image'
import { PageTitle } from '@/components/wf/page-title'
import { CopyButton, Reveal } from '@/components/wf/reveal'
import { press } from '@/lib/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Press kit',
  description: 'WorkFlow PH logos, colors, and boilerplate copy.',
  path: '/press-kit',
  kicker: 'Logo + copy',
})

const logos = [
  { src: '/brand/workflow-ph-logo.png', label: 'Logo', w: 2000, h: 2000 },
  { src: '/brand/workflow-ph-lockup.png', label: 'Lockup', w: 1126, h: 796 },
  { src: '/brand/workflow-ph-mark.png', label: 'Mark', w: 1126, h: 591 },
  { src: '/brand/workflow-ph-wordmark.png', label: 'Wordmark', w: 1000, h: 119 },
]

const swatchText: Record<string, string> = {
  '#13201E': 'text-paper',
}

export default function PressKitPage() {
  return (
    <>
      <PageTitle word="Press kit" kicker="Use as-is" size="text-[22vw] md:text-[17vw]" />

      <section aria-label="Logos" className="grid grid-cols-1 gap-px bg-paper/15 md:grid-cols-2">
        {logos.map((l) => (
          <a
            key={l.src}
            href={l.src}
            download
            className="group flex aspect-[4/3] flex-col justify-between bg-paper p-7 text-ink md:p-10"
          >
            <span className="flex justify-between font-mono text-[11px] tracking-widest uppercase">
              {l.label}
              <span className="opacity-0 transition-opacity group-hover:opacity-100">Download PNG</span>
            </span>
            <span className="flex flex-1 items-center justify-center">
              <Image
                src={l.src}
                alt={`WorkFlow PH ${l.label.toLowerCase()}`}
                width={l.w}
                height={l.h}
                sizes="(min-width: 768px) 40vw, 80vw"
                className="h-auto max-h-[60%] w-auto max-w-[70%] transition-transform duration-500 group-hover:scale-105"
              />
            </span>
          </a>
        ))}
      </section>

      <section aria-label="Colors" className="flex flex-col md:flex-row">
        {press.colors.map((c) => (
          <div
            key={c.hex}
            style={{ backgroundColor: c.hex }}
            className={`flex min-h-40 flex-1 flex-col justify-between gap-6 p-7 transition-[flex-grow] duration-500 md:min-h-[60dvh] md:hover:flex-[2] ${swatchText[c.hex] ?? 'text-ink'}`}
          >
            <span className="display text-4xl md:text-5xl">{c.name}</span>
            <span className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest uppercase">
              {c.hex}
              <CopyButton value={c.hex} label="Hex" />
            </span>
          </div>
        ))}
      </section>

      <section aria-label="Boilerplate" className="flex flex-col gap-20 px-7 py-28 md:px-10 md:py-40">
        {[
          { label: 'Short', text: press.short },
          { label: 'Long', text: press.long },
        ].map((b) => (
          <Reveal key={b.label} className="flex max-w-4xl flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="display text-6xl md:text-8xl">{b.label}</h2>
              <CopyButton value={b.text} />
            </div>
            <p className="text-lg leading-relaxed text-pretty text-paper/80">{b.text}</p>
          </Reveal>
        ))}
      </section>
    </>
  )
}
