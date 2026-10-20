<template>
  <article class="ds-story">
    <div class="ds-story-text">
      <p :class="['ds-kicker ds-story-kicker ds-topic-text', topicClass(topic)]">
        {{ topic }}
        <span v-if="latest" class="ds-latest">Latest</span>
        <SeriesPill v-if="article.series && seriesNo" :name="article.series" :number="seriesNo" size="sm" />
      </p>
      <h2 class="ds-story-title">
        <NuxtLink :to="article.path"><span class="ds-sweep">{{ article.title }}</span></NuxtLink>
      </h2>
      <p v-if="article.description" class="ds-story-desc">{{ article.description }}</p>
      <p class="ds-story-date">
        <time :datetime="article.dates.published">{{ formatDate(article.dates.published) }}</time>
      </p>
      <NuxtLink :to="article.path" class="ds-cta" aria-hidden="true" tabindex="-1">
        Read article
        <svg viewBox="0 0 16 16"><path d="M6.75 5.75 9.25 8l-2.5 2.25" /></svg>
      </NuxtLink>
    </div>
    <TopicArt class="ds-story-art" :topic="topic" :issue="issue" size="lead" />
  </article>
</template>

<script setup lang="ts">
import type { Article, ArticleTopic } from '~/types/portfolio';
import { topicClass } from '~/utils/articles';
import { formatDate } from '~/utils/formatDate';

/** The newest article (or newest in the current topic), large. Hovering anywhere sweeps the title. */
const props = defineProps<{
  article: Article;
  issue: number;
  /** Shown only on the newest article overall. */
  latest?: boolean;
  seriesNo?: number;
}>();

/** Articles without a topic fall back to Software design's sun block. */
const topic = computed<ArticleTopic>(() => props.article.topic ?? 'Software design');
</script>
