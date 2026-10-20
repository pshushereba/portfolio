export interface Project {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo?: string;
  /** Citrus logo well — for the one project you're actively building. */
  featured?: boolean;
  /** Optional status label shown as a TopicTag, e.g. "Building". */
  tag?: string;
}

/** A plain year (e.g. `'2021'`) or a labelled date such as "Present". */
export type ResumeDate = string | { label: string; dateTime: string };

export interface Job {
  company: string;
  title: string;
  logo: string | null;
  start: ResumeDate;
  end: ResumeDate;
}

/* ---------- Books ---------- */

export type BookTopic = 'Software' | 'Running' | 'Business' | 'Craft' | 'Fiction';
export type BookPalette = 'neutral' | 'teal' | 'sun' | 'glow' | 'citrus';
export type BookStatus = 'read' | 'reading';

/**
 * The fields the Book* components need. Items from the `books` content collection satisfy
 * this structurally, so pages can pass them straight through.
 */
export interface Book {
  /** Content path, e.g. '/books/the-mom-test'. The slug is the last segment. */
  path: string;
  title: string;
  author: string;
  topic: BookTopic;
  /** Defaults to 'read' in the schema; the generated collection type keeps it optional. */
  status?: BookStatus;
  /** 'YYYY-MM' or 'YYYY'. Absent while reading. */
  finished?: string;
  cover?: string;
  palette?: BookPalette;
  spine?: string;
  take?: string;
}

/** A blog post that links to books (the subset of the `blog` collection the book pages use). */
export interface BookArticle {
  path: string;
  title: string;
  description?: string;
  dates: { published: string };
  books?: string[];
  mentions?: string[];
}
