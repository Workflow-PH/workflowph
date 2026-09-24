'use client'

import { motion, type MotionValue } from 'motion/react'
import { useId } from 'react'

type MV = MotionValue<number> | number
export type PieceMotion = {
  x?: MV
  y?: MV
  rotate?: MV
  scale?: MV
  opacity?: MV
}

const W = 1126
const H = 591

/** Clip regions that separate the logo artwork into its three pieces. */
const CLIPS = {
  left: 'M-80 -80H563V-8L397 158L563 324V671H-80Z',
  right: 'M1206 -80H563V-8L729 158L563 324V671H1206Z',
  center: 'M563 -8L729 158L563 324L397 158Z',
} as const

/** Rotation pivots for each piece, as fractions of the artwork box. */
const ORIGINS = {
  left: { originX: 270 / W, originY: 330 / H },
  right: { originX: 856 / W, originY: 330 / H },
  center: { originX: 0.5, originY: 158 / H },
} as const

export function Mark({
  left,
  right,
  center,
  className,
  label = 'WorkFlow PH',
}: {
  left?: PieceMotion
  right?: PieceMotion
  center?: PieceMotion
  className?: string
  label?: string
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const pieces = { left, right, center }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label}
      overflow="visible"
    >
      <defs>
        {Object.entries(CLIPS).map(([k, d]) => (
          <clipPath id={`${id}-${k}`} key={k}>
            <path d={d} />
          </clipPath>
        ))}
      </defs>
      {(Object.keys(CLIPS) as (keyof typeof CLIPS)[]).map((k) => (
        <motion.g key={k} style={{ ...ORIGINS[k], ...pieces[k] }}>
          <g clipPath={`url(#${id}-${k})`}>
            <image href="/brand/workflow-ph-mark.png" width={W} height={H} />
          </g>
        </motion.g>
      ))}
    </svg>
  )
}

const mirror = (pts: string) =>
  pts
    .split(' ')
    .map((p) => {
      const [x, y] = p.split(',').map(Number)
      return `${W - x},${y}`
    })
    .join(' ')

const LEFT = [
  '158,55 400,297 332,365 90,123',
  '0,212 89,123 126,159 37,248',
  '66,280 156,190 192,226 103,315',
  '378,277 535,433 378,590 220,433',
]

export const OUTLINE_SHAPES = [...LEFT, ...LEFT.map(mirror), '563,0 720,158 563,315 405,158']

export function MarkOutline({
  className,
  draw,
}: {
  className?: string
  /** 0 → 1 stroke draw progress; omit for a fully drawn outline. */
  draw?: MV
}) {
  return (
    <svg
      viewBox={`-4 -4 ${W + 8} ${H + 8}`}
      className={className}
      aria-hidden="true"
      fill="none"
      overflow="visible"
    >
      {OUTLINE_SHAPES.map((pts) => (
        <motion.polygon
          key={pts}
          points={pts}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={draw === undefined ? undefined : { pathLength: draw }}
        />
      ))}
    </svg>
  )
}
