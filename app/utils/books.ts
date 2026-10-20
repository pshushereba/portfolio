import type { Book, BookArticle, BookPalette } from '~/types/portfolio';

export const BOOK_TOPICS = ['Software', 'Running', 'Business', 'Craft', 'Fiction'] as const;

const PALETTES: readonly BookPalette[] = ['neutral', 'teal', 'sun', 'glow', 'citrus'];

/** '/books/the-mom-test' → 'the-mom-test'. */
export function bookSlug(book: Pick<Book, 'path'>): string {
  return book.path.replace(/^\/books\//, '');
}

/** Small, stable string hash (djb2) so a book looks the same everywhere and on every build. */
function hash(input: string, seed = 5381): number {
  let h = seed;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return h;
}

/** The drawn-cover colour: the frontmatter `palette`, or one derived from the slug. */
export function bookPalette(book: Pick<Book, 'path' | 'palette'>): BookPalette {
  return book.palette ?? PALETTES[hash(bookSlug(book)) % PALETTES.length]!;
}

/** Spine box on the shelf, derived from the slug: width 34–60px, height 186–266px. */
export function spineSize(slug: string): { width: number; height: number } {
  return {
    width: 34 + (hash(slug) % 27),
    height: 186 + (hash(slug, 7919) % 81),
  };
}

/** The label printed down the spine. */
export function spineLabel(book: Pick<Book, 'title' | 'spine'>): string {
  return book.spine ?? book.title;
}

/** Months since year 0 for 'YYYY' / 'YYYY-MM'; the reading book counts as "now". */
function finishedMonths(book: Pick<Book, 'finished'>): number {
  if (!book.finished) {
    const now = new Date();
    return now.getUTCFullYear() * 12 + now.getUTCMonth();
  }
  const [year, month] = book.finished.split('-');
  return Number(year) * 12 + (month ? Number(month) - 1 : 6);
}

/** Shelf order: oldest finished on the left, the book being read last. Ties break on title. */
export function shelfOrder<T extends Book>(books: T[]): T[] {
  return [...books].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'reading' ? 1 : -1;
    return finishedMonths(a) - finishedMonths(b) || a.title.localeCompare(b.title);
  });
}

/** Grid order: newest first (the reading book counts as newest). */
export function newestFirst<T extends Book>(books: T[]): T[] {
  return shelfOrder(books).reverse();
}

/** "Reading now" / "Finished 2025" for the shelf panel. */
export function bookStatusLine(book: Pick<Book, 'status' | 'finished'>): string {
  if (book.status === 'reading' || !book.finished) return 'Reading now';
  return `Finished ${book.finished.slice(0, 4)}`;
}

/** 'YYYY-MM' → "March 2025", 'YYYY' → "2025". */
export function formatFinished(finished: string): string {
  const [year, month] = finished.split('-');
  if (!month) return year ?? finished;
  return new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Articles that are ABOUT the book (their `books` list contains its slug), newest first. */
export function articlesAbout<T extends BookArticle>(articles: T[], slug: string): T[] {
  return articles
    .filter((a) => a.books?.includes(slug))
    .sort((a, b) => b.dates.published.localeCompare(a.dates.published));
}

/** Articles that only MENTION the book, newest first. */
export function articlesMentioning<T extends BookArticle>(articles: T[], slug: string): T[] {
  return articles
    .filter((a) => a.mentions?.includes(slug) && !a.books?.includes(slug))
    .sort((a, b) => b.dates.published.localeCompare(a.dates.published));
}

/** The set of slugs that at least one article is about. */
export function writtenAboutSlugs(articles: BookArticle[]): Set<string> {
  const slugs = new Set<string>();
  for (const a of articles) a.books?.forEach((s) => slugs.add(s));
  return slugs;
}

/**
 * "Shelved nearby": up to `limit` other books, same topic first, then nearest by finished date.
 */
export function shelvedNearby<T extends Book>(books: T[], current: T, limit = 5): T[] {
  const months = finishedMonths(current);
  return books
    .filter((b) => b.path !== current.path)
    .map((b) => ({ b, sameTopic: b.topic === current.topic ? 0 : 1, dist: Math.abs(finishedMonths(b) - months) }))
    .sort((x, y) => x.sameTopic - y.sameTopic || x.dist - y.dist || x.b.title.localeCompare(y.b.title))
    .slice(0, limit)
    .map((x) => x.b);
}

/** The shelf's default pick: the book being read, otherwise the most recently finished. */
export function defaultBook<T extends Book>(books: T[]): T | undefined {
  const ordered = shelfOrder(books);
  return ordered[ordered.length - 1];
}

/** Position on the shelf, 1-based and zero-padded: "06". */
export function shelfNumber(books: Book[], book: Book): string {
  const index = shelfOrder(books).findIndex((b) => b.path === book.path);
  return String(index + 1).padStart(2, '0');
}
