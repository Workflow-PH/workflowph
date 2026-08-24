import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Drafts are visible in `dev`, and in a build when SHOW_DRAFTS=1.
 *
 * The flag exists so devs can verify templates against seed content without
 * having to publish copy that hasn't been fact-checked. Production builds must
 * run without it.
 */
const showDrafts = import.meta.env.DEV || import.meta.env.SHOW_DRAFTS === '1';

const isPublished = ({ data }: { data: { draft?: boolean } }) => showDrafts || !data.draft;

const byDateDesc = (a: CollectionEntry<'showcase'>, b: CollectionEntry<'showcase'>) =>
  b.data.date.getTime() - a.data.date.getTime();

export async function getShowcase() {
  const all = (await getCollection('showcase', isPublished)).sort(byDateDesc);
  return {
    all,
    full: all.filter((e) => e.data.tier === 'full'),
    archive: all.filter((e) => e.data.tier === 'archive'),
    featured: all.filter((e) => e.data.featured && e.data.tier === 'full'),
    upcoming: all
      .filter((e) => e.data.date.getTime() >= Date.now())
      .sort((a, b) => a.data.date.getTime() - b.data.date.getTime()),
  };
}

export async function getStats() {
  return (await getCollection('stats')).sort((a, b) => a.data.order - b.data.order);
}

export async function getPartners() {
  return (await getCollection('partners')).sort((a, b) => a.data.order - b.data.order);
}

export async function getPeople() {
  return (await getCollection('people')).sort((a, b) => a.data.order - b.data.order);
}

export async function getBuilds() {
  return (await getCollection('builds')).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export async function getMilestones() {
  return await getCollection('milestones');
}

/** Group any collection by a key, preserving input order within each group. */
export function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const bucket = map.get(k);
    if (bucket) bucket.push(item);
    else map.set(k, [item]);
  }
  return map;
}
