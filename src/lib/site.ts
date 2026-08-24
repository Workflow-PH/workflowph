export const site = {
  name: 'WorkFlow PH',
  /** Keep under 12 words. This is the first thing a sponsor reads. */
  tagline: 'Building the Volunteer-Driven Automation Landscape of the Philippines',
  description:
    'WorkFlow PH is a volunteer-driven community building the automation landscape of the Philippines — workshops, community days, and open automation templates for Filipino builders.',
  email: 'hello@workflowph.org',
  socials: [
    { label: 'Facebook', url: 'https://facebook.com/workflowph', icon: 'lucide:facebook' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/workflowph', icon: 'lucide:linkedin' },
    { label: 'Instagram', url: 'https://instagram.com/workflowph', icon: 'lucide:instagram' },
  ],
} as const;

export const nav = [
  { label: 'Showcase', href: '/showcase' },
  { label: 'Builds', href: '/builds' },
  { label: 'People', href: '/people' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
] as const;

export const eventTypeLabels: Record<string, string> = {
  workshop: 'Workshop',
  'community-day': 'Community Day',
  summit: 'Summit',
  hackathon: 'Hackathon',
  'general-assembly': 'General Assembly',
  ama: 'AMA',
  meetup: 'Meetup',
  campaign: 'Campaign',
};

export const buildKindLabels: Record<string, string> = {
  workflow: 'Workflow',
  template: 'Template',
  repo: 'Repository',
  playbook: 'Playbook',
  talk: 'Talk',
  dataset: 'Dataset',
};

export const partnerTierLabels: Record<string, string> = {
  strategic: 'Strategic partners',
  partner: 'Partners',
  community: 'Community partners',
  venue: 'Venue partners',
  media: 'Media partners',
};

export const peopleGroupLabels: Record<string, string> = {
  core: 'Core team',
  volunteer: 'Volunteers',
  speaker: 'Speakers we platformed',
  alumni: 'Alumni',
};

export const linkKindIcons: Record<string, string> = {
  register: 'lucide:ticket',
  meetup: 'lucide:calendar',
  facebook: 'lucide:facebook',
  album: 'lucide:images',
  slides: 'lucide:presentation',
  recording: 'lucide:play',
  repo: 'lucide:github',
  template: 'lucide:workflow',
  article: 'lucide:file-text',
  site: 'lucide:link',
  linkedin: 'lucide:linkedin',
  other: 'lucide:arrow-up-right',
};
