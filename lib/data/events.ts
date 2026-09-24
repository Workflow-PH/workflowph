export type EventMode = 'onsite' | 'online' | 'hybrid'
export type EventKind = 'hackathon' | 'meetup' | 'summit' | 'campaign' | 'community-day'
export type LinkKind = 'announcement' | 'photos' | 'slides' | 'recording' | 'repo'

export type EventLink = {
  kind: LinkKind
  label: string
  /** Missing href = the artifact exists or is expected but is not public yet. */
  href?: string
}

export type EventPhoto = {
  src: string
  alt: string
  width: number
  height: number
  credit?: string
}

export type EventNumber = {
  label: string
  /** null renders as TBC. Never estimate. */
  value: string | null
  source?: string
}

export type EventRecord = {
  slug: string
  title: string
  series: string
  hook: string
  start: string
  end?: string
  /** When only the month is known. */
  monthOnly?: boolean
  venue?: string
  city?: string
  mode: EventMode
  kind: EventKind
  role: string
  collaborators: string[]
  recap?: string
  outcomes: string[]
  numbers: EventNumber[]
  people: string[]
  outputs: string[]
  links: EventLink[]
  /**
   * Add files to /public/events/<slug>/ and list them here.
   * Alt text should say what is happening, not just "event photo".
   */
  photos: EventPhoto[]
  poster?: EventPhoto
}

export const events: EventRecord[] = [
  {
    slug: 'agora-hackathon-philippines-2026',
    title: 'Agora Hackathon Philippines 2026',
    series: 'Agora x WorkFlow PH',
    hook: 'A 12-hour sprint where 26 teams built AI sales agents, coaches, and meeting assistants.',
    start: '2026-05-27',
    city: 'Taguig',
    mode: 'onsite',
    kind: 'hackathon',
    role: 'Supporting community',
    collaborators: ['Agora', 'Agora Ambassadors'],
    recap:
      'A builder-first, in-person sprint organized by Hennessy Solis and the Agora Ambassadors. WorkFlow PH supported on the community side, bringing automation builders into the room.',
    outcomes: [
      'Team USTECH took the championship with an Adaptive AI Personality Engine.',
      'Team Vocal Commits placed 1st runner-up; Team A/B Group placed 2nd runner-up.',
      'Builds centered on AI sales agents, sales coaches, and meeting assistants.',
    ],
    numbers: [
      { label: 'Teams', value: '26', source: 'Organizer recap' },
      { label: 'Participants', value: '~400', source: 'Organizer recap' },
      { label: 'Sprint length', value: '12 hrs' },
    ],
    people: [],
    outputs: [],
    links: [
      { kind: 'announcement', label: 'Announcement' },
      { kind: 'photos', label: 'Photo set' },
    ],
    photos: [
      {
        src: '/images/events/2026_agora-hackathon_poster_01.jpg',
        alt: 'Agora Hackathon Philippines 2026 official poster with WorkFlow PH as community partner',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/events/2026_agora-hackathon_speaker_01.jpg',
        alt: 'Speaker highlight from the Agora x WorkFlow PH hackathon, frame one',
        width: 590,
        height: 332,
      },
      {
        src: '/images/events/2026_agora-hackathon_speaker_02.jpg',
        alt: 'Speaker highlight from the Agora x WorkFlow PH hackathon, frame two',
        width: 590,
        height: 332,
      },
      {
        src: '/images/events/2026_agora-hackathon_speaker_03.jpg',
        alt: 'Speaker highlight from the Agora x WorkFlow PH hackathon, frame three',
        width: 590,
        height: 332,
      },
    ],
    poster: {
      src: '/images/events/2026_agora-hackathon_poster_01.jpg',
      alt: 'Agora Hackathon Philippines 2026 official poster with WorkFlow PH as community partner',
      width: 1200,
      height: 1200,
    },
  },
  {
    slug: 'aws-ug-novators-onboarding-2026',
    title: 'AWS UG Novators Onboarding 2026',
    series: 'AWS UG Novators x WorkFlow PH',
    hook: 'Welcoming the 2026–2027 Novators cohort with a first look at automation-first work.',
    start: '2026-05-31',
    mode: 'online',
    kind: 'meetup',
    role: 'Community partner',
    collaborators: ['AWS User Group Philippines'],
    outcomes: [],
    numbers: [{ label: 'Attendees', value: null }],
    people: [],
    outputs: [],
    links: [{ kind: 'announcement', label: 'Announcement' }],
    photos: [
      {
        src: '/images/events/2026_aws-ug-novators-onboarding_poster_01.jpg',
        alt: 'AWS User Group Novators onboarding 2026 poster with WorkFlow PH involvement',
        width: 1200,
        height: 1500,
      },
    ],
    poster: {
      src: '/images/events/2026_aws-ug-novators-onboarding_poster_01.jpg',
      alt: 'AWS User Group Novators onboarding 2026 poster with WorkFlow PH involvement',
      width: 1200,
      height: 1500,
    },
  },
  {
    slug: 'cryptita-builders-showcase-wocee-2026',
    title: 'Cryptita Builders Showcase at WOCEE 2026',
    series: 'Cryptita x WorkFlow PH',
    hook: 'Filipino web3 builders demoed what they shipped, on the WOCEE floor at SMX Manila.',
    start: '2026-08-08',
    venue: 'SMX Convention Center Manila',
    city: 'Pasay',
    mode: 'onsite',
    kind: 'summit',
    role: 'Official community partner',
    collaborators: ['Cryptita', 'WOCEE'],
    outcomes: [],
    numbers: [
      { label: 'Builders showcased', value: null },
      { label: 'Visitors to the booth', value: null },
    ],
    people: [],
    outputs: [],
    links: [
      { kind: 'announcement', label: 'Announcement' },
      { kind: 'photos', label: 'Photo set' },
    ],
    photos: [
      {
        src: '/images/events/2026_cryptita-builders-showcase-wocee_poster_01.jpg',
        alt: 'Cryptita builders showcase at WOCEE 2026 poster with WorkFlow PH support',
        width: 1200,
        height: 675,
      },
    ],
    poster: {
      src: '/images/events/2026_cryptita-builders-showcase-wocee_poster_01.jpg',
      alt: 'Cryptita builders showcase at WOCEE 2026 poster with WorkFlow PH support',
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'frostbyte-hackathon-2026',
    title: 'Frostbyte Hackathon 2026',
    series: 'Frostbyte x WorkFlow PH',
    hook: 'A global online hackathon season; we brought Filipino builders in and helped them finish.',
    start: '2026-01-26',
    end: '2026-04-13',
    mode: 'online',
    kind: 'hackathon',
    role: 'Community partner',
    collaborators: ['Frostbyte'],
    recap:
      'Run in two phases: the main hackathon from January 26 to March 17, and a Grand Finale from April 3 to April 13, 2026.',
    outcomes: [],
    numbers: [
      { label: 'Filipino teams entered', value: null },
      { label: 'Teams that submitted', value: null },
    ],
    people: [],
    outputs: [],
    links: [{ kind: 'announcement', label: 'Announcement' }],
    photos: [
      {
        src: '/images/events/2026_frostbyte-hackathon_poster_01.jpg',
        alt: 'Frostbyte Hackathon 2026 official poster featuring WorkFlow PH as community partner',
        width: 1200,
        height: 1200,
      },
    ],
    poster: {
      src: '/images/events/2026_frostbyte-hackathon_poster_01.jpg',
      alt: 'Frostbyte Hackathon 2026 official poster featuring WorkFlow PH as community partner',
      width: 1200,
      height: 1200,
    },
  },
  {
    slug: 'philippine-blockchain-week-2026',
    title: 'Philippine Blockchain Week 2026',
    series: 'PBW x WorkFlow PH',
    hook: 'Three days at SMX Pasay connecting automation builders with the local blockchain scene.',
    start: '2026-06-19',
    end: '2026-06-21',
    venue: 'SMX Convention Center Manila',
    city: 'Pasay',
    mode: 'onsite',
    kind: 'summit',
    role: 'Community partner',
    collaborators: ['Philippine Blockchain Week'],
    outcomes: [],
    numbers: [{ label: 'Builders met', value: null }],
    people: [],
    outputs: [],
    links: [
      { kind: 'announcement', label: 'Announcement' },
      { kind: 'photos', label: 'Photo set' },
    ],
    photos: [
      {
        src: '/images/events/2026_philippine-blockchain-week_poster_01.jpg',
        alt: 'Philippine Blockchain Week 2026 official poster featuring WorkFlow PH participation',
        width: 1151,
        height: 1145,
      },
    ],
    poster: {
      src: '/images/events/2026_philippine-blockchain-week_poster_01.jpg',
      alt: 'Philippine Blockchain Week 2026 official poster featuring WorkFlow PH participation',
      width: 1151,
      height: 1145,
    },
  },
  {
    slug: 'echelon-philippines-2026',
    title: 'Echelon Philippines 2026',
    series: 'Echelon x WorkFlow PH',
    hook: 'Two days at SMX Aura showing the startup scene what volunteer-built automation looks like.',
    start: '2026-08-25',
    end: '2026-08-26',
    venue: 'SMX Convention Center Aura',
    city: 'Taguig',
    mode: 'onsite',
    kind: 'summit',
    role: 'Strategic partner',
    collaborators: ['Echelon Philippines'],
    outcomes: ['WorkFlow PH was present as a strategic partner of the event.'],
    numbers: [
      { label: 'Conversations at the booth', value: null },
      { label: 'New volunteers signed up', value: null },
    ],
    people: [],
    outputs: [],
    links: [
      { kind: 'announcement', label: 'Announcement' },
      { kind: 'photos', label: 'Photo set' },
    ],
    photos: [
      {
        src: '/images/events/2026-02-01_echelon-philippines_poster_01.jpg',
        alt: 'Echelon Philippines 2026 official poster featuring WorkFlow PH as a community participant',
        width: 1200,
        height: 1500,
      },
    ],
    poster: {
      src: '/images/events/2026-02-01_echelon-philippines_poster_01.jpg',
      alt: 'Echelon Philippines 2026 official poster featuring WorkFlow PH as a community participant',
      width: 1200,
      height: 1500,
    },
  },
  {
    slug: 'workflow-ph-x-jia-talent-vault',
    title: 'WorkFlow PH x Jia Talent Vault',
    series: 'Jia Talent Vault x WorkFlow PH',
    hook: 'An online campaign pairing WorkFlow PH builders with Jia Talent Vault’s hiring pipeline.',
    start: '2026-08-01',
    monthOnly: true,
    mode: 'online',
    kind: 'campaign',
    role: 'Strategic partner',
    collaborators: ['Jia Talent Vault'],
    outcomes: [],
    numbers: [{ label: 'Builders in the talent pool', value: null }],
    people: [],
    outputs: [],
    links: [{ kind: 'announcement', label: 'Announcement' }],
    photos: [],
  },
  {
    slug: 'autonomous-bedrock-agents-aws-community-day-ph',
    title: 'Autonomous Bedrock Agents',
    series: 'AWS Community Day PH x WorkFlow PH',
    hook: 'Karen Pearl V. Pabilando on autonomous Bedrock agents with ReAct loops and Lambda tools.',
    start: '2026-08-22',
    end: '2026-08-23',
    venue: 'Brittany Hotel BGC',
    city: 'Taguig',
    mode: 'hybrid',
    kind: 'community-day',
    role: 'Speaker slot',
    collaborators: ['AWS Community Day Philippines', 'AWS User Group Philippines'],
    recap:
      'A session at AWS Community Day Philippines on moving past single prompts to agents that plan, act, and check their own work on Amazon Bedrock.',
    outcomes: [
      'Walked through the ReAct loop: reason, choose a tool, observe the result, repeat.',
      'Showed Lambda Action Groups as the agent’s hands: each one scoped, testable, auditable.',
      'The talk is being turned into an open, step-by-step walkthrough.',
    ],
    numbers: [{ label: 'Attendees in the session', value: null }],
    people: ['karen-pearl-pabilando'],
    outputs: ['bedrock-agent-walkthrough'],
    links: [
      { kind: 'announcement', label: 'Announcement' },
      { kind: 'slides', label: 'Slides' },
      { kind: 'recording', label: 'Recording' },
      { kind: 'repo', label: 'Walkthrough repo' },
    ],
    photos: [],
  },
]

export const kindLabel: Record<EventKind, string> = {
  hackathon: 'Hackathon',
  meetup: 'Meetup',
  summit: 'Summit',
  campaign: 'Campaign',
  'community-day': 'Community day',
}

export const modeLabel: Record<EventMode, string> = {
  onsite: 'On-site',
  online: 'Online',
  hybrid: 'Hybrid',
}

export const eventsByDate = [...events].sort((a, b) => b.start.localeCompare(a.start))

export function eventBySlug(slug: string) {
  return events.find((e) => e.slug === slug)
}

export function eventsForPerson(slug: string) {
  return eventsByDate.filter((e) => e.people.includes(slug))
}

/** How much proof a record currently carries, 0–5. */
export function evidenceFor(e: EventRecord) {
  const has = {
    recap: Boolean(e.recap || e.outcomes.length),
    photos: e.photos.length > 0,
    people: e.people.length > 0,
    numbers: e.numbers.some((n) => n.value !== null),
    links: e.links.some((l) => Boolean(l.href)),
  }
  return { has, score: Object.values(has).filter(Boolean).length }
}

export const allCollaborators = Array.from(new Set(events.flatMap((e) => e.collaborators))).sort()
