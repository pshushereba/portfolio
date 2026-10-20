import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        dates: z.object({
          published: z.string(),
        }),
        /** Optional topic shown as a tag on article teasers, e.g. "Debugging". */
        topic: z.string().optional(),
        /**
         * Slugs of books this article is ABOUT. Drives "I wrote about this book" on the book page,
         * the "Wrote about it" badge on the shelf and the "Written in the margins" strip.
         */
        books: z.array(z.string()).optional(),
        /** Slugs of books the article only MENTIONS → "Also mentioned in" on the book page. */
        mentions: z.array(z.string()).optional(),
        /** Slugs of projects this article is about → "From the build log" on /projects/[slug]. */
        projects: z.array(z.string()).optional(),
        /** Kind of build-log entry; drives the tag and its tone on the project page. */
        logType: z.enum(['Architecture decision', 'Bug hunt', 'Proud of']).optional(),
      }),
    }),

    projects: defineCollection({
      type: 'page', // body = the long-form "What it is" on /projects/[slug]
      source: 'projects/**/*.md',
      schema: z.object({
        /** One sentence, shown on the grid tile. */
        description: z.string(),
        /** Detail hero sub-line; falls back to `description`. */
        tagline: z.string().optional(),
        /** Grid order, ascending. */
        order: z.number(),
        /** wide = 4 of 6 columns, narrow = 2 of 6. */
        size: z.enum(['wide', 'narrow']),
        /** Tile / hero colour. Theme-invariant, see `.ds-block--*` in components.css. */
        tone: z.enum(['citrus', 'teal', 'sun', 'neutral']),
        /** Decorative illustration that animates on hover (ProjectMotif). */
        motif: z.enum(['sun', 'rows', 'skyline', 'code']),
        /** Status label, e.g. "Building", "Always tinkering", "Sketching". */
        status: z.string(),
        /** Local path under /public, e.g. '/images/projects/supadata.png'. */
        logo: z.string().optional(),
        /** External site + its label, e.g. 'supadata.app'. */
        url: z.string().url().optional(),
        urlLabel: z.string().optional(),
        /** Repo link + its label, e.g. 'View the code'. */
        codeUrl: z.string().url().optional(),
        codeLabel: z.string().optional(),
        /** false → "Not public yet" instead of a link. */
        isPublic: z.boolean().default(true),
        role: z.string().optional(),
        /** 'YYYY'. */
        started: z.string().optional(),
        stack: z.array(z.string()).default([]),
        /** "What I'm proud of" sidebar on the project page. */
        highlights: z.array(z.string()).default([]),
      }),
    }),

    books: defineCollection({
      type: 'page', // body = the long-form "My take" on /books/[slug]
      source: 'books/**/*.md',
      schema: z.object({
        author: z.string(),
        topic: z.enum(['Software', 'Running', 'Business', 'Craft', 'Fiction']),
        status: z.enum(['read', 'reading']).default('read'),
        /** 'YYYY-MM' or 'YYYY'. Used for ordering and "Finished …". Omit while reading. */
        finished: z.string().optional(),
        /** Local path under /public, e.g. '/images/books/the-mom-test.jpg'. Omit → drawn cover. */
        cover: z.string().optional(),
        /** Drawn-cover colour. Omit → derived from the slug. */
        palette: z.enum(['neutral', 'teal', 'sun', 'glow', 'citrus']).optional(),
        /** Short spine label when the title is long, e.g. 'What I Talk About…'. */
        spine: z.string().optional(),
        /** "Paperback", "Kindle", "Audio". */
        format: z.string().optional(),
        reread: z.enum(['Yes', 'Probably', 'No']).optional(),
        /** One-line take, shown in the shelf's side panel. */
        take: z.string().optional(),
        /** "The idea I keep coming back to": highlighted callout on the book page. */
        idea: z.string().optional(),
        /** "Why I picked it up" paragraph on the book page. */
        why: z.string().optional(),
        getItUrl: z.string().url().optional(),
        isbn: z.string().optional(),
      }),
    }),
  },
});
