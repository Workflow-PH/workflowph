const FILLS = ['bg-teal', 'bg-orange', 'bg-sun']

export type BigRow = {
  key: string
  title: string
  left?: string
  right?: string
  note?: string
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
