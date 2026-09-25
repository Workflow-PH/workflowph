export type OutputStatus = 'in-progress' | 'planned'

export type Output = {
  slug: string
  name: string
  does: string
  forWho: string
  stack: string[]
  status: OutputStatus
  origin: string
  originEvent?: string
  people: string[]
}

export const outputs: Output[] = [
  {
    slug: 'template-library',
    name: 'Template Library',
    does: 'Automations a builder can fork and run the same day.',
    forWho: 'Builders who want a working starting point, not a tutorial.',
    stack: ['n8n', 'Make', 'Google Workspace'],
    status: 'in-progress',
    origin: 'Distilled from Build Nights and Mini Labs.',
    // Credits pending verification — add person slugs from lib/data/people.ts once confirmed.
    people: [],
  },
  {
    slug: 'community-ops-playbook',
    name: 'Community Ops Playbook',
    does: 'How to run events with volunteers: intake, roles, day-of, recap.',
    forWho: 'Organizers starting their own chapter or tech community.',
    stack: ['Notion', 'Google Forms', 'Discord'],
    status: 'in-progress',
    origin: 'Written from running 20+ events with a volunteer crew.',
    // Credits pending verification — add person slugs from lib/data/people.ts once confirmed.
    people: [],
  },
  {
    slug: 'bedrock-agent-walkthrough',
    name: 'Bedrock Agent Walkthrough',
    does: 'Step-by-step build of an autonomous agent with tools it can call.',
    forWho: 'Engineers moving from single prompts to agents that act.',
    stack: ['Amazon Bedrock', 'AWS Lambda', 'Python'],
    status: 'planned',
    origin: 'From the talk by Karen Pearl V. Pabilando.',
    originEvent: 'autonomous-bedrock-agents-aws-community-day-ph',
    people: ['karen-pearl-pabilando'],
  },
]

export const statusLabel: Record<OutputStatus, string> = {
  'in-progress': 'In progress',
  planned: 'Planned',
}

export function outputBySlug(slug: string) {
  return outputs.find((o) => o.slug === slug)
}
