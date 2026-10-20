<template>
  <NuxtLink
    v-if="book"
    :to="book.path"
    class="my-7 flex items-center gap-[18px] rounded-2xl p-4 no-underline ring-1 ring-line-strong ring-inset transition hover:bg-sunken"
  >
    <BookCover :book="book" size="sm" labelled />
    <span class="min-w-0 flex-1">
      <span class="block text-xs leading-5 font-medium text-muted">From my bookshelf</span>
      <span class="block text-base leading-6 font-semibold tracking-[-0.025em] text-ink">{{ book.title }}</span>
      <span class="block text-sm leading-[22px] text-body">{{ book.author }}</span>
    </span>
    <span class="flex-none text-sm font-medium text-citrus">My notes <span aria-hidden="true">→</span></span>
  </NuxtLink>
</template>

<script setup lang="ts">
/**
 * Book embed for articles: `::book-card{slug="the-mom-test"}` in markdown, or `<BookCard slug />`.
 * Looks the book up itself and renders nothing if the slug is unknown.
 */
const props = defineProps<{ slug: string }>();

const { data: book } = await useAsyncData(`book-card-${props.slug}`, () =>
  queryCollection('books').path(`/books/${props.slug}`).first(),
);
</script>
