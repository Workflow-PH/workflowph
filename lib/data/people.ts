export type PersonGroup = 'core' | 'speaker' | 'volunteer' | 'alumni'

export type Person = {
  slug: string
  name: string
  group: PersonGroup
  does: string
  credential: string
  org?: string
  verified?: boolean
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
    credential: 'Reports to Community Co-Lead. Leads Relations and Finance.',
  },
  {
    slug: 'lea-erika-veridiano',
    name: 'Lea Erika Veridiano',
    group: 'core',
    does: 'Vice President for Internal',
    credential: 'Reports to Community Co-Lead. Leads Operations and Programs.',
  },
  {
    slug: 'merille-janine-pepito',
    name: 'Merille Janine Pepito',
    group: 'core',
    does: 'Secretary',
    credential: 'Reports to Community Co-Lead. Keeps records and internal comms.',
  },
  {
    slug: 'vincent-javier',
    name: 'Vincent Javier',
    group: 'core',
    does: 'Technology Director',
    credential: 'Reports to Community Co-Lead. Maintains this site and internal tooling.',
  },
  // ── External branch ─────────────────────────────────────────
  {
    slug: 'mary-jean-navarro',
    name: 'Mary Jean Navarro',
    group: 'core',
    does: 'Relations Manager',
    credential: 'Reports to VP for External. Owns partnerships and relations pipeline.',
  },
  {
    slug: 'john-eric-samillano',
    name: 'John Eric Samillano',
    group: 'core',
    does: 'Assistant Relations Manager',
    credential: 'Reports to Relations Manager. Supports partner outreach and follow-through.',
  },
  // Finance Manager — vacant. Add here once confirmed, do not use a placeholder name.
  {
    slug: 'sheun-georrell-pre',
    name: 'Sheun Georrell Pre',
    group: 'core',
    does: 'Assistant Finance Manager',
    credential: 'Reports to Finance Manager. Helps track budgets and receipts.',
  },
  // ── Internal branch ─────────────────────────────────────────
  {
    slug: 'fahad-a-hadji-esmael',
    name: 'Fahad A. Hadji Esmael',
    group: 'core',
    does: 'Operations Manager',
    credential: 'Reports to VP for Internal. Runs logistics for events and programs.',
  },
  {
    slug: 'denisse-jane-karim',
    name: 'Denisse Jane Karim',
    group: 'core',
    does: 'Assistant Operations Manager',
    credential: 'Reports to Operations Manager. Supports on-site and async ops.',
  },
  {
    slug: 'ariane-joy-delos-reyes',
    name: 'Ariane Joy Delos Reyes',
    group: 'core',
    does: 'Programs Manager',
    credential: 'Reports to VP for Internal. Owns program design and curriculum flow.',
  },
  {
    slug: 'zey-pagulayan',
    name: 'Zey Pagulayan',
    group: 'core',
    does: 'Assistant Programs Manager',
    credential: 'Reports to Programs Manager. Supports session design and delivery.',
  },
  // ── Secretary branch ────────────────────────────────────────
  {
    slug: 'vj-evangelista',
    name: 'VJ Evangelista',
    group: 'core',
    does: 'Assistant Secretary',
    credential: 'Reports to Secretary. Helps with documentation and coordination.',
  },
  // ── Technology branch ───────────────────────────────────────
  {
    slug: 'dave-ailler-rivas',
    name: 'Dave Ailler Rivas',
    group: 'core',
    does: 'Assistant Technology Director',
    credential: 'Reports to Technology Director. Helps with systems and event-day tech support.',
  },
  // ── Creatives + Marketing ───────────────────────────────────
  // Creatives Manager — vacant. Add here once confirmed, do not use a placeholder name.
  {
    slug: 'rijay-cereno',
    name: 'Rijay Cereno',
    group: 'core',
    does: 'Assistant Creatives Manager',
    credential: 'Reports to Creatives Manager. Supports graphics and media production.',
  },
  {
    slug: 'maury-mae-villar',
    name: 'Maury Mae Villar',
    group: 'core',
    does: 'Marketing Manager',
    credential: 'Reports to Community Co-Lead. Owns content calendar and promotion.',
  },
  {
    slug: 'cj-eustaquio',
    name: 'CJ Eustaquio',
    group: 'core',
    does: 'Assistant Marketing Manager',
    credential: 'Reports to Marketing Manager. Supports posting and campaigns.',
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
