const FILLS = ['bg-teal', 'bg-orange', 'bg-sun']

export type BigRow = {
  key: string
  title: string
  left?: string
  right?: string
  note?: string
  /** LinkedIn profile URL. Renders an icon link when present. */
  linkedin?: string
}

function LinkedInIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block shrink-0"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function BigRows({ rows, label }: { rows: BigRow[]; label?: string }) {
  return (
    <section aria-label={label} className="flex flex-col">
      {label && (
        <h2 className="px-7 pb-5 font-mono text-[11px] tracking-widest uppercase opacity-70 md:px-10">
          {label}
        </h2>
      )}
      <ul className="border-b border-paper/15">
        {rows.map((r, i) => (
          <li key={r.key} className="group relative overflow-hidden border-t border-paper/15">
            <span
              aria-hidden="true"
              className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 ${FILLS[i % FILLS.length]}`}
            />
            <div className="relative flex flex-col gap-3 px-7 py-7 transition-colors duration-300 group-hover:text-ink md:flex-row md:items-end md:gap-10 md:px-10 md:py-9">
              {r.left !== undefined && (
                <span className="shrink-0 font-mono text-[11px] tracking-widest uppercase opacity-70 md:w-44 md:pb-2">
                  {r.left}
                </span>
              )}
              <div className="flex flex-1 flex-col gap-3">
                <span className="display text-[clamp(2.6rem,6.4vw,7.5rem)] text-balance transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                  {r.title}
                  {r.linkedin && (
                    <a
                      href={r.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${r.title} on LinkedIn`}
                      className="ml-4 inline-flex align-middle opacity-60 transition-opacity hover:opacity-100"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </span>
                {r.note && (
                  <span className="max-w-xl text-base leading-relaxed text-pretty opacity-75">
                    {r.note}
                  </span>
                )}
              </div>
              {r.right && (
                <span className="font-mono text-[11px] tracking-widest uppercase opacity-70 md:pb-2 md:text-right">
                  {r.right}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
