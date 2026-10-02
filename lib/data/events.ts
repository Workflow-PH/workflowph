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
  /** Optional, placeholder-friendly for this task: named winners/placers for hackathons. */
  winners?: string[]
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
      {
        src: '/images/partners/event/agorahackathon_officialpubmat.jpg',
        alt: 'Agora Hackathon Philippines 2026 official poster',
        width: 2048,
        height: 2048,
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
      {
        src: '/images/partners/event/aws-ug-novators-onboarding_official-pubmat.jpg',
        alt: 'AWS User Group Novators onboarding 2026 official poster',
        width: 1600,
        height: 2000,
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
      {
        src: '/images/partners/event/cryptita-builders-showcase-wocee2026_official-pubmat.jpg',
        alt: 'Cryptita builders showcase at WOCEE 2026 official poster',
        width: 1920,
        height: 1080,
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
    // TODO(portfolio): placeholder winners (lorem)
    winners: [
      'Lorem Ipsum — Champion',
      'Dolor Sit Amet — 1st runner-up',
      'Consectetur Adipiscing — 2nd runner-up',
    ],
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
      {
        src: '/images/partners/event/frostbyte-hackathon_official-pubmat.jpg',
        alt: 'Frostbyte Hackathon 2026 official poster',
        width: 1800,
        height: 1800,
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
      {
        src: '/images/partners/event/philippine-blockchain-week_official-pubmat.jpg',
        alt: 'Philippine Blockchain Week 2026 official poster',
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
      {
        src: '/images/partners/event/echelon-philippines-2026_official-pubmat.jpg',
        alt: 'Echelon Philippines 2026 official poster',
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
  // ── Lorem-first stubs (2026-10-01) ─────────────────────────────
  // Dates, venues, and recaps to follow from the Community Lead.
  // These sort last and render `Date TBC` until confirmed.
  {
    slug: 'rise-in-stellar-bootcamp',
    title: 'Rise In Stellar Philippines Blockchain Bootcamp',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'habi-4-design-thinking',
    title: 'Habi 4.0 Design Thinking Workshop',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'project-rise-qbo',
    title: 'Project RISE QBO',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'stellar-philippines-hackathon',
    title: 'Stellar Philippines Hackathon',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'hackathon',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    winners: ['Lorem Ipsum — Champion', 'Dolor Sit Amet — 1st runner-up'],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/events/2026_stellar-hackathon_gallery_01.jpg',
        alt: 'Photo from the Stellar Philippines Hackathon (frame one)',
        width: 1920,
        height: 1080,
      },
      {
        src: '/images/events/2026_stellar-hackathon_gallery_02.jpg',
        alt: 'Photo from the Stellar Philippines Hackathon (frame two)',
        width: 1920,
        height: 1440,
      },
      {
        src: '/images/events/2026_stellar-hackathon_gallery_03.jpg',
        alt: 'Photo from the Stellar Philippines Hackathon (frame three)',
        width: 1397,
        height: 785,
      },
      {
        src: '/images/events/2026_stellar-hackathon_gallery_04.jpg',
        alt: 'Photo from the Stellar Philippines Hackathon (frame four)',
        width: 1920,
        height: 1080,
      },
      {
        src: '/images/events/2026_stellar-hackathon_gallery_05.jpg',
        alt: 'Photo from the Stellar Philippines Hackathon (frame five)',
        width: 1536,
        height: 2048,
      },
    ],
  },
  {
    slug: 'egovph-hackathon',
    title: 'eGovPH Hackathon',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'hackathon',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    winners: ['Lorem Ipsum — Champion', 'Sed Do Eiusmod — 1st runner-up'],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/events/2026_egovibes_gallery_01.jpg',
        alt: 'Photo from the eGovPH Hackathon (frame one)',
        width: 960,
        height: 1280,
      },
      {
        src: '/images/events/2026_egovibes_gallery_02.jpg',
        alt: 'Photo from the eGovPH Hackathon (frame two)',
        width: 960,
        height: 1280,
      },
      {
        src: '/images/events/2026_egovibes_gallery_03.jpg',
        alt: 'Photo from the eGovPH Hackathon (frame three)',
        width: 960,
        height: 1280,
      },
      {
        src: '/images/events/2026_egovibes_gallery_04.jpg',
        alt: 'Photo from the eGovPH Hackathon (frame four)',
        width: 1280,
        height: 960,
      },
      {
        src: '/images/events/2026_egovibes_gallery_05.jpg',
        alt: 'Photo from the eGovPH Hackathon (frame five)',
        width: 1080,
        height: 596,
      },
    ],
  },
  {
    slug: 'stellar-apac-hackathon',
    title: 'Stellar APAC Hackathon',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'hackathon',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    winners: ['Lorem Ipsum — Champion'],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'rise-in-stellar-journey',
    title: 'Rise In Stellar Journey to Mastery',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'startup-qc-student-competition',
    title: 'Startup QC Student Competition',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'hackathon',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    winners: ['Lorem Ipsum — Champion', 'Tempor Incididunt — 1st runner-up'],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'appcon',
    title: 'AppCon',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'hackathon',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    winners: ['Lorem Ipsum — Champion'],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [],
  },
  {
    slug: 'adph-2026',
    title: 'ADPH 2026',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/adph-2026.jpg',
        alt: 'Photo from ADPH 2026 (caption to follow)',
        width: 1563,
        height: 1563,
      },
    ],
  },
  {
    slug: 'blockquest-fiesta',
    title: 'Blockquest Fiesta',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/blockquest-fiesta.jpg',
        alt: 'Photo from Blockquest Fiesta (caption to follow)',
        width: 1250,
        height: 1250,
      },
    ],
  },
  {
    slug: 'cyberph-packet-capture',
    title: 'CyberPH Packet Capture',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/cyberph-packet-capture.jpg',
        alt: 'Photo from CyberPH Packet Capture (caption to follow)',
        width: 2000,
        height: 2000,
      },
    ],
  },
  {
    slug: 'devcon-push2prod',
    title: 'DEVCON Push2Prod',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/devcon-push2prod.jpg',
        alt: 'Photo from DEVCON Push2Prod (caption to follow)',
        width: 1080,
        height: 1080,
      },
    ],
  },
  {
    slug: 'icpep-freshie-orientation',
    title: 'ICPEP Freshie Orientation',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/icpep-freshie-orientation.jpg',
        alt: 'Photo from ICPEP Freshie Orientation (caption to follow)',
        width: 1080,
        height: 1080,
      },
    ],
  },
  {
    slug: 'stackup-build-ai-pup',
    title: 'StackUp Build AI PUP',
    series: 'TBC',
    hook: 'Details to follow.',
    start: 'TBD',
    mode: 'online',
    kind: 'meetup',
    role: 'TBC',
    collaborators: ['TBC'],
    outcomes: [],
    numbers: [{ label: 'Details to follow', value: null }],
    people: [],
    outputs: [],
    links: [],
    photos: [
      {
        src: '/images/partners/event/stackup-build-ai-pup.jpg',
        alt: 'Photo from StackUp Build AI PUP (caption to follow)',
        width: 1080,
        height: 1350,
      },
    ],
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

export const eventsByDate = [...events].sort((a, b) => {
  // Records without a confirmed date sort last; their pages render `Date TBC`.
  const da = /^\d/.test(a.start) ? a.start : ''
  const db = /^\d/.test(b.start) ? b.start : ''
  return db.localeCompare(da)
})

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

export function winnersFor(e: EventRecord): string[] {
  return e.winners ?? []
}

export const partnerRoleEvents = eventsByDate.filter((e) => /partner|community/i.test(e.role))
