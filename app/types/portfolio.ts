export interface Project {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: string;
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
