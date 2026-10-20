<template>
  <section aria-labelledby="every-book-heading">
    <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div>
        <h2 id="every-book-heading" class="text-xl leading-7 font-semibold text-ink-strong">Every book</h2>
        <p class="mt-1 text-sm text-body">Highlighted ones have an article attached.</p>
      </div>
      <div role="group" aria-label="Filter by topic" class="flex flex-wrap gap-2">
        <button
          v-for="chip in chips"
          :key="chip.topic"
          type="button"
          :aria-pressed="chip.topic === topic ? 'true' : 'false'"
          :class="[
            'min-h-9 rounded-full px-3.5 text-sm font-medium transition',
            chip.topic === topic ? 'bg-neutral-fill text-on-neutral' : 'bg-surface text-ink ring-1 ring-control ring-inset hover:bg-sunken',
          ]"
          @click="emit('update:topic', chip.topic)"
        >
          {{ chip.topic }} <span class="font-normal opacity-75">{{ chip.count }}</span>
        </button>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-7 gap-y-10">
      <button
        v-for="book in visible"
        :key="book.path"
        type="button"
        class="flex flex-col gap-3.5 rounded-lg text-left"
        :aria-label="`${book.title} by ${book.author}`"
        @click="emit('select', bookSlug(book))"
      >
        <span class="relative block w-full">
          <BookCover :book="book" size="grid" labelled />
          <span v-if="writtenAbout.has(bookSlug(book))" class="ds-cover-badge">Wrote about it</span>
        </span>
        <span>
          <span class="block text-sm leading-5 font-semibold tracking-[-0.015em] text-ink">{{ book.title }}</span>
          <span class="mt-0.5 block text-xs leading-5 text-muted">{{ book.author }}</span>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/portfolio';
import { BOOK_TOPICS, bookSlug, newestFirst } from '~/utils/books';

/**
 * "Every book": topic filter chips and the cover grid, newest first. Picking a cover selects
 * that book on the shelf (the page scrolls the shelf into view).
 */
const props = defineProps<{
  books: Book[];
  /** 'All' or one of the topics. */
  topic: string;
  writtenAbout: Set<string>;
}>();

const emit = defineEmits<{ select: [slug: string]; 'update:topic': [topic: string] }>();

const chips = computed(() => [
  { topic: 'All', count: props.books.length },
  ...BOOK_TOPICS.map((t) => ({ topic: t, count: props.books.filter((b) => b.topic === t).length })),
]);

const visible = computed(() =>
  newestFirst(props.books).filter((b) => props.topic === 'All' || b.topic === props.topic),
);
</script>
