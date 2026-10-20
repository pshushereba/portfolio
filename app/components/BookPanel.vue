<template>
  <aside
    class="flex min-w-0 flex-[1_1_320px] flex-col rounded-3xl p-7 ring-1 ring-line-strong"
    aria-label="Selected book"
  >
    <div class="flex items-end gap-5">
      <BookCover :book="book" size="md" labelled />
      <div class="flex flex-col items-start gap-2">
        <TopicTag tone="teal" class="px-2.5 text-xs leading-6">{{ book.topic }}</TopicTag>
        <span class="text-xs text-muted">{{ bookStatusLine(book) }}</span>
      </div>
    </div>

    <h3 class="mt-6 text-xl leading-7 font-semibold tracking-[-0.015em] text-ink-strong">{{ book.title }}</h3>
    <p class="mt-0.5 text-sm text-body">{{ book.author }}</p>

    <template v-if="book.take">
      <h4 class="mt-6 text-sm font-semibold text-ink-strong">My take</h4>
      <p class="mt-1 text-sm text-body">{{ book.take }}</p>
    </template>

    <h4 class="mt-6 text-sm font-semibold text-ink-strong">Written about it</h4>
    <ul v-if="articles.length" class="mt-2 flex flex-col gap-1">
      <li v-for="article in articles" :key="article.path">
        <NuxtLink
          :to="article.path"
          class="-mx-3 flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition hover:bg-sunken"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="mt-0.5 h-5 w-5 flex-none fill-none stroke-citrus stroke-[1.5]"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 3.75h7l4 4V20.25H7z" />
            <path d="M14 3.75v4h4M9.75 12h5.5M9.75 15.5h5.5" />
          </svg>
          <span>
            <span class="block text-sm leading-[22px] font-semibold text-citrus">{{ article.title }}</span>
            <time :datetime="article.dates.published" class="block text-xs leading-[22px] text-muted">
              {{ formatDate(article.dates.published) }}
            </time>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="mt-1 text-sm text-muted">Nothing yet. This one's still rattling around.</p>

    <NuxtLink
      :to="book.path"
      class="mt-auto inline-block pt-6 text-sm font-medium text-citrus no-underline hover:text-citrus-hover"
    >
      Full notes <span aria-hidden="true">→</span>
    </NuxtLink>
  </aside>
</template>

<script setup lang="ts">
import type { Book, BookArticle } from '~/types/portfolio';
import { bookStatusLine } from '~/utils/books';
import { formatDate } from '~/utils/formatDate';

/** The aside beside the shelf: the selected book and the articles written about it. */
defineProps<{
  book: Book;
  articles: BookArticle[];
}>();
</script>
