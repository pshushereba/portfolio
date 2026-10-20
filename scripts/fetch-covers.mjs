#!/usr/bin/env node
/**
 * Downloads cover photos from Open Library for every book in content/books/ that has an
 * `isbn` and no `cover`, saves them to public/images/books/<slug>.jpg, and writes the
 * `cover:` line into the book's frontmatter. Run it by hand, check the images, commit.
 *
 *   node scripts/fetch-covers.mjs
 *
 * Covers are stored locally on purpose: the site never hotlinks Open Library at runtime.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const booksDir = path.join(root, 'content', 'books');
const outDir = path.join(root, 'public', 'images', 'books');

await mkdir(outDir, { recursive: true });

const files = (await readdir(booksDir)).filter((f) => f.endsWith('.md'));
let fetched = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const filePath = path.join(booksDir, file);
  const source = await readFile(filePath, 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';

  const isbn = frontmatter.match(/^isbn:\s*['"]?([\dXx-]+)['"]?\s*$/m)?.[1]?.replace(/-/g, '');
  const hasCover = /^cover:/m.test(frontmatter);
  if (!isbn || hasCover) continue;

  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`✗ ${slug}: no cover on Open Library for ISBN ${isbn} (${response.status})`);
    continue;
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outDir, `${slug}.jpg`), bytes);

  const coverLine = `cover: '/images/books/${slug}.jpg'`;
  const updated = source.replace(/^(isbn:.*)$/m, `$1\n${coverLine}`);
  await writeFile(filePath, updated);

  fetched++;
  console.log(`✓ ${slug}: saved ${(bytes.length / 1024).toFixed(0)} KB and added \`${coverLine}\``);
}

console.log(fetched ? `Done: ${fetched} cover${fetched === 1 ? '' : 's'} fetched.` : 'Nothing to fetch.');
