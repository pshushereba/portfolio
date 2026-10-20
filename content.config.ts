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
