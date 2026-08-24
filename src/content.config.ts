import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

/**
 * Image references are public-directory paths for now (e.g. `/images/events/...`).
 *
 * Tradeoff, deliberately taken: `image()` from `astro:content` gives build-time
 * optimisation but fails the build when a file is missing. With assets still
 * being gathered, that would block every dev. Public paths let the whole site
 * render today and degrade to a designed PosterCard when a photo is absent.
 * Migration to `src/assets` + `image()` is tracked in WF-05.
 */
const media = z.object({
  src: z.string(),
  /** Required and meaningful. Who, doing what, where. Never a filename. */
  alt: z.string().min(10, 'alt text must describe the photo, not name the file'),
  credit: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  focal: z
    .enum(['center', 'top', 'bottom', 'left', 'right'])
    .default('center'),
});

const link = z.object({
  label: z.string(),
  url: z.url(),
  kind: z.enum([
    'register',
    'meetup',
    'facebook',
    'album',
    'slides',
    'recording',
    'repo',
    'template',
    'article',
    'site',
    'linkedin',
    'other',
  ]),
});

const stat = z.object({
  label: z.string(),
  value: z.string(),
});

const showcase = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/showcase' }),
  schema: z.object({
    title: z.string(),
    /** Event series or headline partner. Fills the CI-style kicker slot. */
    series: z.string().optional(),
    /** One line, card + OG copy. Hard cap so cards never wrap to four lines. */
    hook: z.string().max(110),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    venue: z.string(),
    city: z.string().optional(),
    mode: z.enum(['onsite', 'online', 'hybrid']),
    type: z.enum([
      'workshop',
      'community-day',
      'summit',
      'hackathon',
      'general-assembly',
      'ama',
      'meetup',
      'campaign',
    ]),
    /**
     * `full` gets a detail page. `archive` renders as a row in the index list.
     * This is what lets us publish the complete event history without needing
     * a complete asset kit for every single event.
     */
    tier: z.enum(['full', 'archive']).default('full'),
    featured: z.boolean().default(false),
    hero: media.optional(),
    card: media.optional(),
    gallery: z.array(media).default([]),
    stats: z.array(stat).max(3).default([]),
    takeaways: z.array(z.string()).max(4).default([]),
    speakers: z.array(reference('people')).default([]),
    partners: z.array(reference('partners')).default([]),
    builds: z.array(reference('builds')).default([]),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

const builds = defineCollection({
  loader: file('./src/content/builds.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    kind: z.enum(['workflow', 'template', 'repo', 'playbook', 'talk', 'dataset']),
    /** What it actually does for someone. Not a description of itself. */
    outcome: z.string().max(160),
    stack: z.array(z.string()).default([]),
    contributors: z.array(reference('people')).default([]),
    url: z.url().optional(),
    metric: z.string().optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    status: z.enum(['live', 'in-progress', 'planned']).default('live'),
  }),
});

const people = defineCollection({
  loader: file('./src/content/people.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    credential: z.string().max(140).optional(),
    org: z.string().optional(),
    photo: media.optional(),
    socials: z.array(link).default([]),
    group: z.enum(['core', 'volunteer', 'speaker', 'alumni']),
    order: z.number().default(99),
  }),
});

const partners = defineCollection({
  loader: file('./src/content/partners.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    /** Omit to render the typographic wordmark fallback. Never trace a logo. */
    logo: z.string().optional(),
    url: z.url().optional(),
    tier: z.enum(['strategic', 'partner', 'community', 'venue', 'media']),
    order: z.number().default(99),
  }),
});

const stats = defineCollection({
  loader: file('./src/content/stats.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
    /** Every public number carries a date and a known source. */
    asOf: z.coerce.date(),
    source: z.string().optional(),
    order: z.number().default(99),
  }),
});

const milestones = defineCollection({
  loader: file('./src/content/milestones.json'),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    title: z.string(),
    body: z.string(),
  }),
});

export const collections = { showcase, builds, people, partners, stats, milestones };
