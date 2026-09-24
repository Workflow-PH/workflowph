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
  {
    slug: 'andrea-dela-cruz',
    name: 'Andrea Dela Cruz',
    group: 'core',
    does: 'Community lead',
    credential: 'Sets the programming calendar and runs partner calls.',
    pending: true,
  },
  {
    slug: 'paolo-villanueva',
    name: 'Paolo Villanueva',
    group: 'core',
    does: 'Automation lead',
    credential: 'Maintains the template library; n8n and Make in production at work.',
    pending: true,
  },
  {
    slug: 'bea-mendoza',
    name: 'Bea Mendoza',
    group: 'core',
    does: 'Community operations',
    credential: 'Owns the Community Ops Playbook and the volunteer onboarding flow.',
    pending: true,
  },
  {
    slug: 'rafael-tan',
    name: 'Rafael Tan',
    group: 'core',
    does: 'Partnerships',
    credential: 'Brokers school and company ties; ex-developer relations.',
    pending: true,
  },
  {
    slug: 'karen-pearl-pabilando',
    name: 'Karen Pearl V. Pabilando',
    group: 'speaker',
    does: 'Builds autonomous AI agents on AWS',
    credential:
      'Magna Cum Laude. Builds autonomous Bedrock agents with ReAct loops and Lambda Action Groups.',
    verified: true,
  },
  {
    slug: 'janelle-ramos',
    name: 'Janelle Ramos',
    group: 'volunteer',
    does: 'Event photographer',
    credential: 'Credited on every photo set she shoots for the record.',
    pending: true,
  },
  {
    slug: 'kristoffer-aquino',
    name: 'Kristoffer Aquino',
    group: 'volunteer',
    does: 'Event ops and front-end',
    credential: 'Runs registration desks on-site; contributes to this site.',
    pending: true,
  },
  {
    slug: 'mika-soriano',
    name: 'Mika Soriano',
    group: 'volunteer',
    does: 'Design and writing',
    credential: 'Designs event posters and writes the post-event recaps.',
    pending: true,
  },
  {
    slug: 'jerome-bautista',
    name: 'Jerome Bautista',
    group: 'volunteer',
    does: 'Clinic mentor',
    credential: 'Python and Apps Script; debugs flows at Automation Clinics.',
    pending: true,
  },
  {
    slug: 'carla-navarro',
    name: 'Carla Navarro',
    group: 'alumni',
    does: 'Former Build Night volunteer',
    credential: 'Now automates finance operations full-time.',
    org: 'Fintech, Makati',
    pending: true,
  },
  {
    slug: 'lorenzo-garcia',
    name: 'Lorenzo Garcia',
    group: 'alumni',
    does: 'Former clinic mentor',
    credential: 'Moved on to lead an internal tools team.',
    org: 'BPO, Cebu',
    pending: true,
  },
]

export const groupMeta: Record<PersonGroup, { title: string; verb: string; body: string }> = {
  core: {
    title: 'Core team',
    verb: 'runs',
    body: 'Accountable for programming, partners, and the record itself.',
  },
  speaker: {
    title: 'Speakers',
    verb: 'taught',
    body: 'People we platformed. Listed only once their talk is verified against an event.',
  },
  volunteer: {
    title: 'Volunteers',
    verb: 'helps',
    body: 'People who make events and outputs happen, 2–4 hours a week, async-first.',
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
