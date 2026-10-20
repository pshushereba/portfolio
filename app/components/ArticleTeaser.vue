<template>
  <article class="ds-article">
    <h2 :class="['ds-article-title', { 'ds-article-title--lg': size === 'lg' }]">
      <NuxtLink :to="to" class="ds-card-link">{{ title }}</NuxtLink>
    </h2>
    <div class="ds-article-meta">
      <TopicTag v-if="topic" tone="teal">{{ topic }}</TopicTag>
      <time class="ds-article-date" :datetime="date">{{ formatDate(date) }}</time>
    </div>
    <p v-if="description" class="ds-article-desc">{{ description }}</p>
    <span class="ds-cta" aria-hidden="true">
      Read article
      <svg viewBox="0 0 16 16"><path d="M6.75 5.75 9.25 8l-2.5 2.25" /></svg>
    </span>
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate';

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    to: string;
    /** Optional topic shown as a teal tag beside the date. */
    topic?: string;
    /** md = 16px title (article index) · lg = 18px title (home page) */
    size?: 'md' | 'lg';
  }>(),
  { size: 'md' },
);
</script>
