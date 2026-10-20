/* ---------- Projects ---------- */

export type ProjectSize = 'wide' | 'narrow';
export type ProjectTone = 'citrus' | 'teal' | 'sun' | 'neutral';
export type ProjectMotif = 'sun' | 'rows' | 'skyline' | 'code';
export type ProjectLogType = 'Architecture decision' | 'Bug hunt' | 'Proud of';

/**
 * The fields the Project* components need. Items from the `projects` content collection satisfy
 * this structurally, so pages can pass them straight through.
 */
export interface Project {
  /** Content path, e.g. '/projects/supadata'. The slug is the last segment. */
  path: string;
  title: string;
  /** One sentence, shown on the grid tile. */
  description: string;
  /** Detail hero sub-line; falls back to `description`. */
  tagline?: string;
  /** Grid order, ascending. */
  order: number;
  size: ProjectSize;
  tone: ProjectTone;
  motif: ProjectMotif;
  /** Status label, e.g. "Building". */
  status: string;
  /** Local path under /public. */
  logo?: string;
  url?: string;
  urlLabel?: string;
  codeUrl?: string;
  codeLabel?: string;
  /** Defaults to true in the schema; the generated collection type keeps it optional. */
  isPublic?: boolean;
  role?: string;
  /** 'YYYY'. */
  started?: string;
  stack?: string[];
  highlights?: string[];
}

/** A blog post that links to projects (the subset of the `blog` collection the project page uses). */
export interface ProjectArticle {
  path: string;
  title: string;
  description?: string;
  dates: { published: string };
  topic?: string;
  projects?: string[];
  logType?: ProjectLogType;
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

/* ---------- Articles ---------- */

export type ArticleTopic = 'Debugging' | 'Career' | 'Software design' | 'Electronics' | 'Chess' | 'Books';

/**
 * The fields the Article* components need. Items from the `blog` content collection satisfy
 * this structurally, so pages can pass them straight through.
 */
export interface Article {
  /** Content path, e.g. '/blog/console-logs-1'. */
  path: string;
  title: string;
  description?: string;
  dates: { published: string };
  topic?: ArticleTopic;
  /** Series name, e.g. 'Console Logs'. The number is computed, see `seriesNumber`. */
  series?: string;
  /** Manual override for the series number. */
  part?: number;
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
