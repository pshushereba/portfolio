<template>
  <div class="group relative flex flex-col items-start">
    <h2
      class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 hover:text-zinc-800"
    >
      {{ article.title }}
      <div
        class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-50 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl dark:opacity-0 dark:group-hover:opacity-100"
      />
      <NuxtLink :to="article._path">
        <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
        <span class="relative z-10"></span>
      </NuxtLink>
    </h2>
    <p
      class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
    >
      {{ formatDate(article.dates.published) }}
    </p>
    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {{ article.description }}
    </p>
    <div class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
      Read Article
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
        <path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '~~/utils/formatDate';
defineProps({
  article: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped></style>
