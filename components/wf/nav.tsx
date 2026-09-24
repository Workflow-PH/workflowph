'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { navItems } from '@/lib/nav'
import { org } from '@/lib/data/site'
import { getLenis } from './smooth-scroll'

const ease = [0.76, 0, 0.24, 1] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstLink.current?.focus(), 350)
    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-start justify-between px-7 pt-7 md:px-10 md:pt-9">
        <Link
          href="/"
          aria-label="WorkFlow PH home"
          className="pointer-events-auto transition-transform duration-500 hover:rotate-[-6deg]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/workflow-ph-mark.png"
            alt=""
            width={1126}
            height={591}
            priority
            className="h-auto w-12 md:w-14"
          />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-paper py-2.5 pr-3 pl-4 font-mono text-[11px] tracking-widest text-ink uppercase transition-colors hover:bg-sun"
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true" className="relative flex size-4 items-center justify-center">
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-1'}`}
            />
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-1'}`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Site"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at calc(100% - 4rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 4rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 4rem) 3rem)' }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-[65] flex flex-col justify-between overflow-y-auto bg-sun px-7 pt-28 pb-10 text-ink md:px-10"
          >
            <motion.div
              aria-hidden="true"
              initial={{ rotate: -40, scale: 0.5, opacity: 0 }}
              animate={{ rotate: -12, scale: 1, opacity: 1 }}
              exit={{ rotate: 30, scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.25 }}
              className="pointer-events-none absolute top-1/2 right-[-6vw] hidden w-[48vw] -translate-y-1/2 md:block"
            >
              <Image src="/brand/workflow-ph-mark.png" alt="" width={1126} height={591} className="h-auto w-full" />
            </motion.div>
            <ul className="relative flex flex-col">
              {navItems.map((item, i) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '105%' }}
                      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        ref={i === 0 ? firstLink : undefined}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-baseline gap-4 py-0.5 display text-[min(15vw,11vh)] leading-[0.86] md:text-[min(8.5vw,10.5vh)]"
                      >
                        <span
                          aria-hidden="true"
                          className="size-[0.35em] shrink-0 -translate-y-[0.1em] rotate-45 scale-0 bg-ink transition-transform duration-500 group-hover:scale-100 group-aria-[current=page]:scale-100"
                        />
                        <span className="-ml-[0.55em] transition-transform duration-500 group-hover:translate-x-[0.55em] group-aria-[current=page]:translate-x-[0.55em]">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                )
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs tracking-wider uppercase"
            >
              <a href={`mailto:${org.email}`} className="underline-offset-4 hover:underline">
                {org.email}
              </a>
              <div className="flex gap-5">
                {org.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {pathname !== '/join' && !open && (
        <Link
          href="/join"
          className="group fixed right-7 bottom-7 z-[60] flex items-center gap-3 rounded-full bg-paper py-3 pr-4 pl-5 font-mono text-[11px] tracking-widest text-ink uppercase shadow-[0_10px_40px_-10px_rgb(0_0_0/0.5)] transition-colors hover:bg-sun md:right-10 md:bottom-9"
        >
          Join the build
          <span
            aria-hidden="true"
            className="size-2.5 rotate-45 bg-flow transition-transform duration-500 group-hover:rotate-[225deg]"
          />
        </Link>
      )}
    </>
  )
}
