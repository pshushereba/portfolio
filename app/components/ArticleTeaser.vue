<template>
  <article class="ds-article">
    <h2 class="ds-article-title">
      <NuxtLink :to="to" class="ds-card-link">{{ title }}</NuxtLink>
    </h2>
    <time class="ds-article-date" :datetime="date">{{ formatDate(date) }}</time>
    <p v-if="description" class="ds-article-desc">{{ description }}</p>
    <span class="ds-cta" aria-hidden="true">
      Read article
      <svg viewBox="0 0 16 16"><path d="M6.75 5.75 9.25 8l-2.5 2.25" /></svg>
    </span>
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate';

defineProps<{
  title: string;
  description?: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  to: string;
}>();
</script>
