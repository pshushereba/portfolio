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
      }),
    }),
  },
});
