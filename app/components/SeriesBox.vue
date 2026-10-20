<template>
  <section id="series" class="ds-series-box" :aria-label="`${name} series`">
    <div class="ds-series-head">
      <p class="ds-series-name">{{ name }}</p>
      <p class="ds-series-count">A series · {{ entries.length }} {{ entries.length === 1 ? 'entry' : 'entries' }}</p>
    </div>
    <ol class="ds-series-list">
      <li v-for="entry in entries" :key="entry.path">
        <span v-if="entry.path === currentPath" class="ds-series-entry ds-series-entry--current" aria-current="page">
          <span class="ds-series-entry-no">#{{ entry.number }}</span>
          <span class="ds-series-entry-title">{{ entry.title }}</span>
          <TopicTag tone="sun">You're here</TopicTag>
        </span>
        <NuxtLink v-else :to="entry.path" class="ds-series-entry">
          <span class="ds-series-entry-no">#{{ entry.number }}</span>
          <span class="ds-series-entry-title">{{ entry.title }}</span>
        </NuxtLink>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
export interface SeriesEntry {
  path: string;
  title: string;
  number: number;
}

/** End-of-article list of a series' entries; the current one is marked, the others link. */
defineProps<{
  name: string;
  entries: SeriesEntry[];
  currentPath: string;
}>();
</script>
