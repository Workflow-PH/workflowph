export type PersonGroup = 'core' | 'speaker' | 'volunteer' | 'alumni'

export type Person = {
  slug: string
  name: string
  group: PersonGroup
  does: string
  credential: string
  org?: string
  verified?: boolean
  /** LinkedIn profile URL. Only set when the owner supplies the link. */
  linkedin?: string
  /** Only set when the person has consented to a published photo. */
  photo?: { src: string; alt: string }
  /**
   * Profiles marked `pending` are stand-ins supplied for layout and must be
   * confirmed or replaced before launch.
   */
  pending?: boolean
}

export const people: Person[] = [
  // ── Leadership ──────────────────────────────────────────────
  {
    slug: 'clarisse-jem-salazar',
    name: 'Clarisse Jem Salazar',
    group: 'core',
    does: 'Community Lead',
    credential: 'Sets direction and final calls for WorkFlow PH.',
  },
  {
    slug: 'charisse-jen-salazar',
    name: 'Charisse Jen Salazar',
    group: 'core',
    does: 'Community Co-Lead',
    credential: 'Runs day-to-day with the Community Lead. Oversees VPs and managers.',
  },
  {
    slug: 'krystel-mae-austral',
    name: 'Krystel Mae Austral',
    group: 'core',
    does: 'Vice President for External',
    credential: 'Leads Relations and Finance.',
  },
  {
    slug: 'lea-erika-veridiano',
    name: 'Lea Erika Veridiano',
    group: 'core',
    does: 'Vice President for Internal',
    credential: 'Leads Operations and Programs.',
  },
  {
    slug: 'merille-janine-pepito',
    name: 'Merille Janine Pepito',
    group: 'core',
    does: 'Secretary',
    credential: 'Keeps records and internal comms.',
  },
  {
    slug: 'vincent-javier',
    name: 'Vincent Javier',
    group: 'core',
    does: 'Technology Director',
    credential: 'Maintains this site and internal tooling.',
  },
  // ── External branch ─────────────────────────────────────────
  {
    slug: 'mary-jean-navarro',
    name: 'Mary Jean Navarro',
    group: 'core',
    does: 'Relations Manager',
    credential: 'Owns partnerships and relations pipeline.',
  },
  {
    slug: 'john-eric-samillano',
    name: 'John Eric Samillano',
    group: 'core',
    does: 'Assistant Relations Manager',
    credential: 'Supports partner outreach and follow-through.',
  },
  // Finance Manager — vacant. Add here once confirmed, do not use a placeholder name.
  {
    slug: 'sheun-georrell-pre',
    name: 'Sheun Georrell Pre',
    group: 'core',
    does: 'Assistant Finance Manager',
    credential: 'Helps track budgets and receipts.',
  },
  // ── Internal branch ─────────────────────────────────────────
  {
    slug: 'fahad-a-hadji-esmael',
    name: 'Fahad A. Hadji Esmael',
    group: 'core',
    does: 'Operations Manager',
    credential: 'Runs logistics for events and programs.',
  },
  {
    slug: 'denisse-jane-karim',
    name: 'Denisse Jane Karim',
    group: 'core',
    does: 'Assistant Operations Manager',
    credential: 'Supports on-site and async ops.',
  },
  {
    slug: 'ariane-joy-delos-reyes',
    name: 'Ariane Joy Delos Reyes',
    group: 'core',
    does: 'Programs Manager',
    credential: 'Owns program design and curriculum flow.',
  },
  {
    slug: 'zey-pagulayan',
    name: 'Zey Pagulayan',
    group: 'core',
    does: 'Assistant Programs Manager',
    credential: 'Supports session design and delivery.',
  },
  // ── Secretary branch ────────────────────────────────────────
  {
    slug: 'vj-evangelista',
    name: 'VJ Evangelista',
    group: 'core',
    does: 'Assistant Secretary',
    credential: 'Helps with documentation and coordination.',
  },
  // ── Technology branch ───────────────────────────────────────
  {
    slug: 'dave-ailler-rivas',
    name: 'Dave Ailler Rivas',
    group: 'core',
    does: 'Assistant Technology Director',
    credential: 'Helps with systems and event-day tech support.',
  },
  // ── Creatives + Marketing ───────────────────────────────────
  {
    slug: 'joemar-lagat',
    name: 'Joemar Lagat',
    group: 'core',
    does: 'Creatives Manager',
    credential: 'Leads the design and creative department.',
  },
  {
    slug: 'rijay-cereno',
    name: 'Rijay Cereno',
    group: 'core',
    does: 'Assistant Creatives Manager',
    credential: 'Supports graphics and media production.',
  },
  // Marketing Manager — vacant. Add here once confirmed, do not use a placeholder name.
  {
    slug: 'cj-eustaquio',
    name: 'CJ Eustaquio',
    group: 'core',
    does: 'Assistant Marketing Manager',
    credential: 'Supports posting and campaigns.',
  },
  // Kept for event records only — not listed on /people.
  // Karen spoke at our events but is with another org (partner, not WorkFlow).
  {
    slug: 'karen-pearl-pabilando',
    name: 'Karen Pearl V. Pabilando',
    group: 'speaker',
    does: 'Builds autonomous AI agents on AWS',
    credential:
      'Magna Cum Laude. Builds autonomous Bedrock agents with ReAct loops and Lambda Action Groups.',
    verified: true,
  },
]

export const groupMeta: Record<PersonGroup, { title: string; verb: string; body: string }> = {
  core: {
    title: 'Executives',
    verb: 'runs',
    body: 'The executive board running WorkFlow PH.',
  },
  speaker: {
    title: 'Speakers',
    verb: 'taught',
    body: 'People we platformed. Listed only once their talk is verified against an event.',
  },
  volunteer: {
    title: 'Volunteers',
    verb: 'helps',
    body: 'Assistant managers and builders who make events and outputs happen, 2–4 hours a week, async-first.',
  },
  alumni: {
    title: 'Alumni',
    verb: 'helped',
    body: 'People who volunteered with us and moved on. The work they did stays credited.',
  },
}

export function personBySlug(slug: string) {
  return people.find((p) => p.slug === slug)
}

export function initials(name: string) {
  const parts = name.replace(/[^A-Za-z\s]/g, ' ').split(/\s+/).filter((p) => p.length > 1)
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return (first + last).toUpperCase()
}
