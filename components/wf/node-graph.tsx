'use client'

import { motion, useReducedMotion } from 'motion/react'

export type GraphNode = {
  id: string
  /** 0-100 horizontal position in the viewBox. */
  x: number
  /** 0-60 vertical position in the viewBox. */
  y: number
  label: string
  accent?: 'teal' | 'orange' | 'sun'
}

export type GraphEdge = [from: string, to: string]

// Static node/edge arrays live at module scope so no heavy work runs per render.
// Labels are real community concepts; swap/extend freely as the story grows.
// TODO(portfolio): tune labels/positions once the final About narrative lands.
const DEFAULT_NODES: GraphNode[] = [
  { id: 'community', x: 50, y: 30, label: 'Community', accent: 'sun' },
  { id: 'builders', x: 16, y: 13, label: 'Builders', accent: 'teal' },
  { id: 'partners', x: 84, y: 13, label: 'Partners', accent: 'orange' },
  { id: 'events', x: 12, y: 44, label: 'Events', accent: 'orange' },
  { id: 'hackathons', x: 88, y: 44, label: 'Hackathons', accent: 'teal' },
  { id: 'automation', x: 34, y: 52, label: 'Automation', accent: 'sun' },
  { id: 'mentorship', x: 66, y: 52, label: 'Mentorship', accent: 'teal' },
  { id: 'templates', x: 50, y: 7, label: 'Open Templates', accent: 'orange' },
]

const DEFAULT_EDGES: GraphEdge[] = [
  ['community', 'builders'],
  ['community', 'partners'],
  ['community', 'events'],
  ['community', 'hackathons'],
  ['community', 'automation'],
  ['community', 'mentorship'],
  ['community', 'templates'],
  ['builders', 'automation'],
  ['builders', 'events'],
  ['partners', 'hackathons'],
  ['partners', 'mentorship'],
  ['events', 'hackathons'],
  ['automation', 'templates'],
  ['mentorship', 'templates'],
]

const ACCENT: Record<NonNullable<GraphNode['accent']>, string> = {
  teal: 'var(--teal)',
  orange: 'var(--orange)',
  sun: 'var(--sun)',
}

const nodeColor = (n: GraphNode) => ACCENT[n.accent ?? 'teal']

export function NodeGraph({
  nodes = DEFAULT_NODES,
  edges = DEFAULT_EDGES,
  className,
}: {
  nodes?: GraphNode[]
  edges?: GraphEdge[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const byId = new Map(nodes.map((n) => [n.id, n]))

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A connected graph of the WorkFlow PH community: builders, partners, events, hackathons, automation, mentorship and open templates all linked to the community at its center."
      className={`block h-auto w-full ${className ?? ''}`}
    >
      <defs>
        {/* Matches the --flow brand gradient: teal 0%, orange 55%, sun 100%. */}
        <linearGradient id="wf-flow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="55%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--sun)" />
        </linearGradient>
      </defs>

      {/* Edges draw in via pathLength on reveal; staggered for a flow feel. */}
      <g fill="none" stroke="url(#wf-flow)" strokeWidth={0.35} strokeLinecap="round">
        {edges.map(([fromId, toId], i) => {
          const a = byId.get(fromId)
          const b = byId.get(toId)
          if (!a || !b) return null
          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.55 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              strokeOpacity={reduce ? 0.55 : undefined}
            />
          )
        })}
      </g>

      {/* Nodes: dot + label scale/fade in, then a subtle idle drift (motion only). */}
      {nodes.map((n, i) => {
        const color = nodeColor(n)
        const delay = 0.5 + i * 0.08
        const isHub = n.id === 'community'
        const r = isHub ? 2.4 : 1.5
        return (
          <motion.g
            key={n.id}
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: 'fill-box' }}
          >
            <motion.g
              animate={
                reduce
                  ? undefined
                  : { y: [0, i % 2 === 0 ? -0.8 : 0.8, 0] }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 5 + (i % 4),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }
              }
            >
              {/* Soft halo */}
              <circle cx={n.x} cy={n.y} r={r + 1.6} fill={color} opacity={isHub ? 0.18 : 0.12} />
              {isHub ? (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill="url(#wf-flow)"
                  stroke="var(--paper)"
                  strokeWidth={0.25}
                  animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                  style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: 'fill-box' }}
                />
              ) : (
                <circle cx={n.x} cy={n.y} r={r} fill={color} />
              )}
              <text
                x={n.x}
                y={n.y - r - 1.6}
                textAnchor="middle"
                className="hidden fill-paper font-sans sm:block"
                style={{ fontSize: isHub ? 3 : 2.4, fontWeight: isHub ? 700 : 600 }}
              >
                {n.label}
              </text>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}
