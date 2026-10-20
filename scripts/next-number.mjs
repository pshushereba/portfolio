#!/usr/bin/env node
/**
 * Prints the next issue number and the next number in every series, computed the same way the
 * site does (position by `dates.published`, oldest first; `part` overrides a series number).
 * Exits non-zero if `part` overrides collide or leave a gap.
 *
 *   npm run next
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const blogDir = path.join(root, 'content', 'blog');

const files = (await readdir(blogDir)).filter((f) => f.endsWith('.md')).sort();
const articles = [];

for (const file of files) {
  const source = await readFile(path.join(blogDir, file), 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const published = frontmatter.match(/^\s+published:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m)?.[1];
  const series = frontmatter.match(/^series:\s*['"]?(.+?)['"]?\s*$/m)?.[1];
  const part = frontmatter.match(/^part:\s*(\d+)\s*$/m)?.[1];
  if (!published) {
    console.warn(`✗ ${file}: no dates.published, skipped`);
    continue;
  }
  articles.push({ path: `/blog/${file.replace(/\.md$/, '')}`, published, series, part: part ? Number(part) : undefined });
}

articles.sort((a, b) => a.published.localeCompare(b.published) || a.path.localeCompare(b.path));

console.log(`Next issue is No. ${String(articles.length + 1).padStart(2, '0')} (${articles.length} published).`);

let ok = true;
const seriesNames = [...new Set(articles.map((a) => a.series).filter(Boolean))].sort();

for (const name of seriesNames) {
  const entries = articles.filter((a) => a.series === name);
  const numbers = entries.map((a, i) => a.part ?? i + 1);
  const seen = new Map();
  for (const [i, n] of numbers.entries()) {
    if (seen.has(n)) {
      ok = false;
      console.error(`✗ ${name}: #${n} is used by both ${seen.get(n)} and ${entries[i].path}`);
    }
    seen.set(n, entries[i].path);
  }
  const max = Math.max(...numbers);
  const missing = Array.from({ length: max }, (_, i) => i + 1).filter((n) => !seen.has(n));
  if (missing.length) {
    ok = false;
    console.error(`✗ ${name}: gap at #${missing.join(', #')}`);
  }
  console.log(`${name} → next is #${max + 1} (${entries.length} ${entries.length === 1 ? 'entry' : 'entries'})`);
}

if (!seriesNames.length) console.log('No series yet.');
if (!ok) process.exit(1);
