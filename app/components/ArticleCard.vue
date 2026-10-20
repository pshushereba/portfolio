<template>
  <article :class="['ds-card-item', { 'ds-card--compact': compact }]">
    <NuxtLink :to="article.path" class="ds-card">
      <TopicArt :topic="topic" :issue="issue" :label="label" :size="compact ? 'compact' : 'card'">
        <span class="ds-strip">
          Read article
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </span>
      </TopicArt>
      <span :class="['ds-kicker ds-card-kicker ds-topic-text', topicClass(topic)]">{{ topic }}</span>
      <span class="ds-card-title"><span class="ds-sweep">{{ article.title }}</span></span>
    </NuxtLink>
    <p v-if="article.description && !compact" class="ds-card-desc">{{ article.description }}</p>
    <p class="ds-card-date">
      <time :datetime="article.dates.published">{{ formatDate(article.dates.published) }}</time>
    </p>
  </article>
</template>

<script setup lang="ts">
import type { Article, ArticleTopic } from '~/types/portfolio';
import { topicClass } from '~/utils/articles';
import { formatDate } from '~/utils/formatDate';

/**
 * Grid card: the art, kicker and title are one link; the description and date sit below it.
 * `compact` is the "Keep reading" variant (shorter art, smaller title, no description).
 */
const props = defineProps<{
  article: Article;
  issue: number;
  /** Art label override, e.g. 'Previous · No. 01'. */
  label?: string;
  compact?: boolean;
}>();

const topic = computed<ArticleTopic>(() => props.article.topic ?? 'Software design');
</script>
