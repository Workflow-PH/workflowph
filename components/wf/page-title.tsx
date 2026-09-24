'use client'

import { motion } from 'motion/react'
import { MarkOutline } from './mark'

const ease = [0.22, 1, 0.36, 1] as const

export function PageTitle({
  word,
  kicker,
  line,
  size = 'text-[24vw] md:text-[19vw]',
}: {
  word: string
  kicker?: string
  line?: string
  size?: string
}) {
  const words = word.toUpperCase().split(' ')
  const step = Math.min(0.045, 0.9 / word.length)
  let n = 0

  return (
    <section className="relative flex min-h-[78dvh] flex-col justify-end overflow-hidden px-7 pt-36 pb-12 md:px-10 md:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 w-[190vw] -translate-x-1/2 -translate-y-1/2 animate-[spin_160s_linear_infinite] text-paper opacity-[0.12] md:w-[130vw]"
      >
        <MarkOutline className="h-auto w-full" />
      </div>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-4 flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase"
        >
          <span aria-hidden="true" className="size-2 rotate-45 bg-flow" />
          {kicker}
        </motion.p>
      )}
      <h1 className={`relative flex flex-wrap gap-x-[0.18em] display leading-[0.8] ${size}`} aria-label={word}>
        {words.map((w, wi) => (
          <span key={`${w}-${wi}`} aria-hidden="true" className="flex">
            {w.split('').map((l) => {
              const i = n++
              return (
                <span key={`${l}${i}`} className="inline-block overflow-hidden py-[0.03em]">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, ease, delay: 0.15 + i * step }}
                    className="inline-block"
                  >
                    {l}
                  </motion.span>
                </span>
              )
            })}
          </span>
        ))}
      </h1>
      {line && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="relative mt-8 max-w-xl text-lg leading-relaxed text-pretty text-paper/75 md:text-xl"
        >
          {line}
        </motion.p>
      )}
    </section>
  )
}
