export type PartnerTier = 'strategic' | 'community'

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
]

export const tierLabel: Record<PartnerTier, string> = {
  strategic: 'Strategic partner',
  community: 'Community partner',
}

export function partnerByName(name: string) {
  return partners.find((p) => p.name === name)
}
