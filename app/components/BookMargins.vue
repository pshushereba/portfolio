<template>
  <section
    v-if="teasers.length"
    aria-labelledby="margins-heading"
    class="relative overflow-hidden rounded-3xl bg-citrus-tint px-[clamp(20px,3vw,40px)] pt-9 pb-10"
  >
    <h2 id="margins-heading" class="text-sm font-semibold text-ink-strong">Written in the margins</h2>
    <p class="text-xs text-body">Articles that started with a book</p>

    <div class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
      <NuxtLink
        v-for="teaser in teasers"
        :key="teaser.article.path"
        :to="teaser.article.path"
        class="flex items-start gap-4 rounded-2xl bg-surface p-5 no-underline transition hover:shadow-lg"
      >
        <BookCover :book="teaser.book" size="xs" labelled />
        <span class="min-w-0">
          <span class="block text-xs leading-5 text-muted">
            On <span class="font-semibold text-ink">{{ teaser.book.title }}</span>
          </span>
          <span class="mt-1 block text-base leading-6 font-semibold tracking-[-0.025em] text-ink">
            {{ teaser.article.title }}
          </span>
          <span class="mt-2 block text-sm font-medium text-citrus">Read article <span aria-hidden="true">→</span></span>
        </span>
      </NuxtLink>
    </div>

    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2.5 bg-citrus-glow" />
  </section>
</template>

<script setup lang="ts">
import type { Book, BookArticle } from '~/types/portfolio';
import { bookSlug } from '~/utils/books';

/** "Written in the margins": the newest articles that are about a book. Hidden when there are none. */
const props = withDefaults(
  defineProps<{
    books: Book[];
    articles: BookArticle[];
    limit?: number;
  }>(),
  { limit: 3 },
);

const teasers = computed(() => {
  const bySlug = new Map(props.books.map((b) => [bookSlug(b), b]));
  return [...props.articles]
    .sort((a, b) => b.dates.published.localeCompare(a.dates.published))
    .flatMap((article) => {
      const book = article.books?.map((s) => bySlug.get(s)).find((b) => b);
      return book ? [{ article, book }] : [];
    })
    .slice(0, props.limit);
});
</script>
