import Link from 'next/link'
import { org } from '@/lib/data/site'

export function Footer() {
  return (
    <footer className="bg-ink px-7 pt-10 pb-20 text-paper md:px-10 md:pb-24">
      <div className="flex flex-col gap-6 font-mono text-[11px] tracking-widest uppercase md:flex-row md:items-center md:justify-between">
        <span className="opacity-60">© 2026 {org.name}</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {org.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-sun hover:underline"
            >
              {s.label}
            </a>
          ))}
          <Link href="/press-kit" className="underline-offset-4 hover:text-sun hover:underline">
            Press kit
          </Link>
          <a
            href={`mailto:${org.email}`}
            className="underline-offset-4 hover:text-sun hover:underline"
          >
            {org.email}
          </a>
        </nav>
      </div>
    </footer>
  )
}
