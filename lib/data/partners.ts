export type PartnerTier = 'strategic' | 'community' | 'ambassador'

export type Partner = {
  slug: string
  name: string
  tier: PartnerTier
  what: string
  since: string
  /** Path under /public. Leave undefined until the logo file is supplied. */
  logo?: { src: string; width: number; height: number }
  href?: string
}

export const partners: Partner[] = [
  {
    slug: 'jia-talent-vault',
    name: 'Jia Talent Vault',
    tier: 'strategic',
    what: 'Connects what builders learn with where they get hired.',
    since: 'Aug 2026',
  },
  {
    slug: 'echelon-philippines',
    name: 'Echelon Philippines',
    tier: 'strategic',
    what: 'Put volunteer-built automation in front of the regional startup scene.',
    since: 'Aug 2026',
  },
  {
    slug: 'tutorials-dojo',
    name: 'Tutorials Dojo',
    tier: 'community',
    what: 'Cloud learning paths for builders moving from automation to AWS.',
    since: 'May 2026',
  },
  {
    slug: 'aws-user-group-philippines',
    name: 'AWS User Group Philippines',
    tier: 'community',
    what: 'The country’s AWS builder community; shared speakers and venues.',
    since: 'May 2026',
  },
  {
    slug: 'aws-community-day-philippines',
    name: 'AWS Community Day Philippines',
    tier: 'community',
    what: 'Where our Bedrock agents talk was first delivered.',
    since: 'Aug 2026',
  },
  {
    slug: 'dash2career',
    name: 'Dash2Career',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'innobyte-technology-solutions',
    name: 'InnoByte Technology Solutions',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'pointwest',
    name: 'Pointwest',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'homeroom-dapitan',
    name: 'Homeroom Dapitan',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'prosple',
    name: 'Prosple',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'upskwela',
    name: 'Upskwela',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'agora',
    name: 'Agora',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'aws-student-user-group-philippines',
    name: 'AWS Student User Group Philippines',
    tier: 'community',
    what: 'Partnership details to follow.',
    since: 'TBC',
  },
  {
    slug: 'uipath-student-developer-champions',
    name: 'UiPath Student Developer Champions',
    tier: 'ambassador',
    what: 'Partnership details to follow.',
    since: 'TBC',
    logo: {
      src: '/images/ambassador/uipath-student-developer-champion.png',
      width: 488,
      height: 390,
    },
  },
  {
    slug: 'n8n-philippines-user-group',
    name: 'n8n Philippines User Group',
    tier: 'ambassador',
    what: 'Partnership details to follow.',
    since: 'TBC',
    logo: { src: '/images/ambassador/n8n-pug.png', width: 4096, height: 4096 },
  },
  {
    slug: 'stellar-foundation',
    name: 'Stellar Foundation',
    tier: 'ambassador',
    what: 'Partnership details to follow.',
    since: 'TBC',
    logo: { src: '/images/ambassador/stellar.svg', width: 106, height: 26 },
  },
]

export const tierLabel: Record<PartnerTier, string> = {
  strategic: 'Strategic partner',
  community: 'Community partner',
  ambassador: 'Ambassador',
}

export function partnerByName(name: string) {
  return partners.find((p) => p.name === name)
}
