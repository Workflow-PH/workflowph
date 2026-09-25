export const SITE_URL = 'https://workflowph.org'

export const org = {
  name: 'WorkFlow PH',
  handle: '@workflowph',
  tagline: 'Building the Volunteer-Driven Automation Landscape of the Philippines.',
  summary:
    'A volunteer-run community teaching automation and AI literacy through workshops, community days, and open templates.',
  email: 'hello.workflowph@gmail.com',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/WorkFlowPH/' },
    { label: 'Instagram', href: 'https://www.instagram.com/workflowph/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/workflowph/home/' },
  ],

} as const

export type Stat = {
  key: string
  label: string
  value: string | null
  note?: string
}

/** value: null means we do not know yet and must say so. */
export const stats: Stat[] = [
  { key: 'events_run', label: 'Events run', value: '20+' },
  { key: 'builders_reached', label: 'Filipino builders reached', value: '1,500+' },
  { key: 'partner_orgs', label: 'Partner organizations', value: '5' },
  {
    key: 'volunteers',
    label: 'Active volunteers',
    value: null,
    note: 'Count pending. We publish it once the roster is verified.',
  },
]

export const activities = [
  {
    name: 'Build Nights',
    tool: 'evening sessions',
    body: 'Show up with a repetitive task, leave with it automated. Builders pair up and ship before the night ends.',
  },
  {
    name: 'Automation Clinics',
    tool: 'office hours',
    body: 'Bring a broken flow. Volunteers debug it with you, live, and explain what went wrong.',
  },
  {
    name: 'Case Study Walkthroughs',
    tool: 'teardown',
    body: 'Real automations from real teams, taken apart step by step so you can reuse the pattern.',
  },
  {
    name: 'Mini Labs',
    tool: 'n8n · Make · Zapier · Python · AI',
    body: 'Short, hands-on labs on one tool at a time. You finish with a working flow, not a slide deck.',
  },
  {
    name: 'Open Volunteer Projects',
    tool: 'open tooling',
    body: 'Community-owned builds anyone can pick up: templates, playbooks, and the tools we run on.',
  },
  {
    name: 'Mentorship',
    tool: '1:1 and small groups',
    body: 'Newer builders paired with people who already ship automation for a living.',
  },
  {
    name: 'Hackathons',
    tool: 'sprints',
    body: 'We rally Filipino builders into hackathons, and help teams get from idea to demo.',
  },
  {
    name: 'Ecosystem Partnerships',
    tool: 'schools · companies',
    body: 'Working with schools and companies so automation literacy reaches classrooms and teams.',
  },
] as const

export const beliefs = [
  {
    name: 'Collaboration',
    body: 'Nobody learns automation alone. Every flow we teach was built by more than one pair of hands.',
  },
  {
    name: 'Empowerment',
    body: 'The goal is not a certificate. It is a builder who can automate their own work tomorrow.',
  },
  {
    name: 'Innovation',
    body: 'We test new tools early, in public, and share what broke so others do not repeat it.',
  },
  {
    name: 'Inclusivity',
    body: 'Students, career shifters, and senior engineers sit at the same table. Online first so distance is not a barrier.',
  },
] as const

export const vision = [
  {
    name: 'Real workflows, real problems',
    body: 'Build real, cloud-powered workflows that solve real problems.',
  },
  {
    name: 'A national model',
    body: 'Create a national model and pioneer automation literacy in the Philippines.',
  },
] as const

export const tracks = [
  {
    name: 'Income-driven automation',
    tool: 'VA · BPO · marketing · e-commerce · freelancing',
    body: 'For VAs, BPO teams, marketers, sellers, freelancers, and founders. Automate the work you already sell so you deliver faster and earn more.',
  },
  {
    name: 'Technical automation',
    tool: 'cloud · security · data · GIS · IoT · dev · QA',
    body: 'For cloud, DevOps, security, data engineering and analytics, GIS, IoT, software dev, and QA. Ship production-grade workflows on modern stacks.',
  },
] as const

export const longTerm = [
  {
    name: 'Regional automation labs',
    body: 'Hands-on learning spaces where communities build solutions for local problems.',
  },
  {
    name: 'Open workflow libraries',
    body: 'Open-source templates SMEs and other industries can fork and customize.',
  },
  {
    name: 'Industry-backed challenges',
    body: 'Automation challenges built on real business problems, with partners in the room.',
  },
  {
    name: 'Talent pipeline',
    body: 'A path from first workflow to automation-powered roles, as demand keeps growing.',
  },
] as const

export type HistoryEntry = {
  when: string
  title: string
  body: string
  kind: 'commit' | 'merge' | 'release'
  branch?: string
}

export const history: HistoryEntry[] = [
  {
    when: 'Early 2026',
    kind: 'commit',
    title: 'Founded',
    body: 'Started to fix fragmented automation education in the Philippines: scattered tutorials, no shared practice, no place to ask.',
  },
  {
    when: 'Q1 2026',
    kind: 'commit',
    title: 'First Build Nights and Automation Clinics',
    body: 'The first recurring formats go live. Builders bring real tasks; volunteers help them ship.',
  },
  {
    when: 'May 2026',
    kind: 'merge',
    branch: 'Tutorials Dojo + AWS User Group Philippines',
    title: 'First ecosystem ties',
    body: 'Partnerships with Tutorials Dojo and AWS User Group Philippines connect the community to cloud learning paths.',
  },
  {
    when: 'Aug 2026',
    kind: 'merge',
    branch: 'Jia Talent Vault',
    title: 'Strategic tie with Jia Talent Vault',
    body: 'A strategic partnership that links what builders learn with where they can be hired.',
  },
  {
    when: 'Aug 2026',
    kind: 'commit',
    title: 'Present at Echelon Philippines',
    body: 'WorkFlow PH shows up at one of the region’s largest startup events, as a strategic partner.',
  },
  {
    when: 'Sep 2026',
    kind: 'release',
    title: 'This record goes public',
    body: 'The site you are reading: every event, output, and person, published so the work can be verified.',
  },
]

export const contributions = [
  {
    name: 'Build automations',
    body: 'Turn a workshop idea into a template others can fork. n8n, Make, Google Workspace, Python.',
    skills: ['n8n', 'Make', 'Apps Script', 'Python'],
  },
  {
    name: 'Organize events',
    body: 'Run logistics for Build Nights, clinics, and community days. Mostly async, some on-site days.',
    skills: ['Ops', 'Coordination'],
  },
  {
    name: 'Photograph and film',
    body: 'Document what happened so it can be proven later. Every photo carries your credit.',
    skills: ['Photo', 'Video'],
  },
  {
    name: 'Design and write',
    body: 'Posters, recaps, walkthroughs, and the copy that explains automation to first-timers.',
    skills: ['Design', 'Writing'],
  },
  {
    name: 'Code on open tooling',
    body: 'Improve the tools the community runs on, including this site and the template library.',
    skills: ['TypeScript', 'Python'],
  },
  {
    name: 'Grow partnerships',
    body: 'Open doors with schools and companies, and help shape what partners teach.',
    skills: ['Outreach', 'Relationships'],
  },
] as const

export const volunteerTerms = {
  hours: '2–4 hrs/week',
  mode: 'Async-first',
  points: [
    'Most work happens in shared docs and chat threads, on your own schedule.',
    'On-site days are optional and announced weeks ahead.',
    'You pick the lane; you can switch lanes any time.',
    'Your name goes on the record for every event and output you touch.',
  ],
} as const

export const partnerReasons = [
  {
    title: 'Reach builders who ship',
    body: '1,500+ Filipino builders reached so far: students, career shifters, and working engineers who automate real work, not spectators.',
  },
  {
    title: 'Your engineers teach, not pitch',
    body: 'Partners run real workshops and clinics. Builders leave with something working, and remember who helped them build it.',
  },
  {
    title: 'Co-created work stays open, with credit',
    body: 'Templates and playbooks we build together are published openly, with your name on them, long after the event ends.',
  },
] as const

export const press = {
  short:
    'WorkFlow PH is a volunteer-run community building automation and AI literacy across the Philippines. Through workshops, community days, and open templates, it has run 20+ events and reached 1,500+ Filipino builders with five partner organizations.',
  long:
    'WorkFlow PH is a volunteer-driven community building the automation landscape of the Philippines. Founded in early 2026 to fix fragmented automation education, it runs Build Nights, Automation Clinics, mini labs on n8n, Make, Zapier, Python and AI, hackathons, and mentorship, all led by async-first volunteers. WorkFlow PH has run 20+ events, reached 1,500+ Filipino builders, and works with five partner organizations including Jia Talent Vault, Echelon Philippines, Tutorials Dojo, AWS User Group Philippines, and AWS Community Day Philippines. Its template library and playbooks are being built in the open so any builder can fork, run, and credit them. Media: hello.workflowph@gmail.com.',
  colors: [
    { name: 'Flow Teal', hex: '#1CBFA7', role: 'Start of the brand gradient' },
    { name: 'Ember Orange', hex: '#E2681F', role: 'Middle of the brand gradient' },
    { name: 'Sun Yellow', hex: '#FCE043', role: 'End of the brand gradient, highlights' },
    { name: 'Ink', hex: '#0E1614', role: 'Text and dark surfaces' },
    { name: 'Paper', hex: '#F3F4F1', role: 'Page background' },
  ],
  typefaces: [
    {
      name: 'Logo wordmark',
      body: 'Bold grotesk, supplied as artwork in the logo file. Never retype the wordmark; always use the file.',
    },
    {
      name: 'Archivo',
      body: 'Headlines (expanded width) and body text. Free on Google Fonts.',
    },
    {
      name: 'JetBrains Mono',
      body: 'Data, dates, labels, and anything that reads like a log. Free on Google Fonts.',
    },
  ],
  do: [
    'Use the supplied files as-is, on white or Paper backgrounds.',
    'Keep clear space around the logo equal to the height of its top diamond.',
    'Use the mark alone (no wordmark) at small sizes, down to 24px tall.',
    'Write the name as “WorkFlow PH”: capital W, capital F, space, PH.',
  ],
  dont: [
    'Recolor, flatten, or reverse the gradient.',
    'Stretch, rotate, outline, or add shadows to the logo.',
    'Place the logo on busy photos or low-contrast colors.',
    'Write it as “Workflow PH”, “WorkflowPH”, or “WFPH” in public copy.',
  ],
} as const
