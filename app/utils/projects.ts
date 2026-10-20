import type { Project, ProjectArticle, ProjectLogType } from '~/types/portfolio';

/** '/projects/supadata' → 'supadata'. */
export function projectSlug(project: Pick<Project, 'path'>): string {
  return project.path.replace(/^\/projects\//, '');
}

/** Grid order: `order` ascending, ties broken on title. */
export function byOrder<T extends Pick<Project, 'order' | 'title'>>(projects: T[]): T[] {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/**
 * The previous and next project by `order`, wrapping around at both ends. With a single project
 * both are `undefined`; with two, previous and next are the same project.
 */
export function adjacentProjects<T extends Pick<Project, 'order' | 'title' | 'path'>>(
  projects: T[],
  current: Pick<Project, 'path'>,
): { prev?: T; next?: T } {
  const ordered = byOrder(projects);
  const index = ordered.findIndex((p) => p.path === current.path);
  if (index === -1 || ordered.length < 2) return {};
  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];
  return { prev, next };
}

/** Articles whose `projects` list contains the slug, newest first. */
export function articlesAboutProject<T extends ProjectArticle>(articles: T[], slug: string): T[] {
  return articles
    .filter((a) => a.projects?.includes(slug))
    .sort((a, b) => b.dates.published.localeCompare(a.dates.published));
}

/** Tag tone for a build-log entry. Articles without a `logType` use their topic, in teal. */
export function logTone(logType: ProjectLogType | undefined): 'citrus' | 'teal' | 'sun' {
  switch (logType) {
    case 'Architecture decision':
      return 'citrus';
    case 'Proud of':
      return 'sun';
    default:
      return 'teal';
  }
}

/** The tag label for a build-log entry: the `logType`, else the article's topic. */
export function logLabel(article: Pick<ProjectArticle, 'logType' | 'topic'>): string | undefined {
  return article.logType ?? article.topic;
}

export interface ProjectLink {
  href: string;
  label: string;
}

/** The project's site link, labelled with `urlLabel` or the host. */
export function siteLink(project: Pick<Project, 'url' | 'urlLabel'>): ProjectLink | undefined {
  if (!project.url) return undefined;
  return { href: project.url, label: project.urlLabel ?? new URL(project.url).host };
}

/** The project's repo link. */
export function codeLink(project: Pick<Project, 'codeUrl' | 'codeLabel'>): ProjectLink | undefined {
  if (!project.codeUrl) return undefined;
  return { href: project.codeUrl, label: project.codeLabel ?? 'View the code' };
}

/** The one external link a grid tile shows: the site, else the code. */
export function externalLink(
  project: Pick<Project, 'url' | 'urlLabel' | 'codeUrl' | 'codeLabel'>,
): ProjectLink | undefined {
  return siteLink(project) ?? codeLink(project);
}
