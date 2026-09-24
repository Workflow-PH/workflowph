'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null
export const getLenis = () => instance

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    instance = lenis
    return () => {
      lenis.destroy()
      instance = null
    }
  }, [])
  return null
}
