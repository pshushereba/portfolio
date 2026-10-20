import type { Article, ArticleTopic } from '~/types/portfolio';

/** The six categories, in tab order. Mirrors the `topic` enum in content.config.ts. */
export const ARTICLE_TOPICS: readonly ArticleTopic[] = [
  'Debugging',
  'Career',
  'Software design',
  'Electronics',
  'Chess',
  'Books',
];

export type TopicIconName = 'bug' | 'briefcase' | 'boxes' | 'led' | 'knight' | 'book';

export interface TopicMeta {
  /** 'software-design'; the suffix of the `.ds-topic--*` colour class in components.css. */
  slug: string;
  /** TopicTag tone. `undefined` = neutral (Chess). */
  tone?: 'citrus' | 'teal' | 'sun';
  icon: TopicIconName;
}

/**
 * One map for every topic-aware component. The colours live next to it in components.css as
 * `.ds-topic--{slug}` (fill, ink, kicker text, ring), so JS only needs the slug.
 */
export const TOPICS: Record<ArticleTopic, TopicMeta> = {
  Debugging: { slug: 'debugging', tone: 'citrus', icon: 'bug' },
  Career: { slug: 'career', tone: 'teal', icon: 'briefcase' },
  'Software design': { slug: 'software-design', tone: 'sun', icon: 'boxes' },
  Electronics: { slug: 'electronics', tone: 'teal', icon: 'led' },
  Chess: { slug: 'chess', tone: undefined, icon: 'knight' },
  Books: { slug: 'books', tone: 'citrus', icon: 'book' },
};

/** 'Software design' → 'software-design'. */
export function topicSlug(topic: ArticleTopic): string {
  return TOPICS[topic].slug;
}

/** 'software-design' → 'Software design'; `undefined` for anything unknown. */
export function topicFromSlug(slug: string | undefined): ArticleTopic | undefined {
  return ARTICLE_TOPICS.find((t) => TOPICS[t].slug === slug);
}

/** The `.ds-topic--{slug}` class for a topic (no topic → none). */
export function topicClass(topic: ArticleTopic | undefined): string | undefined {
  return topic ? `ds-topic--${topicSlug(topic)}` : undefined;
}

type Dated = Pick<Article, 'path' | 'dates'>;

/** Sorted on `dates.published`, ties broken on `path`. Newest first by default. */
export function byPublished<T extends Dated>(articles: T[], dir: 'asc' | 'desc' = 'desc'): T[] {
  const sign = dir === 'asc' ? 1 : -1;
  return [...articles].sort(
    (a, b) => sign * (a.dates.published.localeCompare(b.dates.published) || a.path.localeCompare(b.path)),
  );
}

/** 1-based position among ALL articles, oldest first. 0 if the article isn't in the list. */
export function issueNumber(all: Dated[], article: Pick<Article, 'path'>): number {
  return byPublished(all, 'asc').findIndex((a) => a.path === article.path) + 1;
}

/** 2 → '02', 234 → '234'. Shown as `No. 02`. */
export function formatNumber(n: number): string {
  return String(n).padStart(2, '0');
}

/** The articles in a series, oldest first. */
export function seriesEntries<T extends Dated & Pick<Article, 'series'>>(all: T[], seriesName: string): T[] {
  return byPublished(all.filter((a) => a.series === seriesName), 'asc');
}

/** `article.part` if set, else the 1-based index in its series. `undefined` outside a series. */
export function seriesNumber(
  all: (Dated & Pick<Article, 'series'>)[],
  article: Pick<Article, 'path' | 'series' | 'part'>,
): number | undefined {
  if (!article.series) return undefined;
  if (article.part) return article.part;
  return seriesEntries(all, article.series).findIndex((a) => a.path === article.path) + 1;
}

/**
 * The chronologically previous (older) article, or the next (newer) one when this is the oldest.
 * `undefined` with a single article.
 */
export function neighbourArticle<T extends Dated>(
  all: T[],
  article: Pick<Article, 'path'>,
): { article: T; relation: 'Previous' | 'Next' } | undefined {
  const ordered = byPublished(all, 'asc');
  const index = ordered.findIndex((a) => a.path === article.path);
  if (index === -1 || ordered.length < 2) return undefined;
  const prev = ordered[index - 1];
  if (prev) return { article: prev, relation: 'Previous' };
  return { article: ordered[index + 1]!, relation: 'Next' };
}

/** Article count per topic, every topic present (empty ones at 0). */
export function topicCounts(all: Pick<Article, 'topic'>[]): Record<ArticleTopic, number> {
  const counts = Object.fromEntries(ARTICLE_TOPICS.map((t) => [t, 0])) as Record<ArticleTopic, number>;
  for (const a of all) if (a.topic) counts[a.topic]++;
  return counts;
}
