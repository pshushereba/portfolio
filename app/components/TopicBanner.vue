<template>
  <div :class="['ds-banner ds-topic-block', topicClass(topic)]">
    <span class="ds-halftone" aria-hidden="true" />
    <div class="ds-banner-no" aria-hidden="true">
      <span class="ds-banner-no-label">{{ topic }} · No.</span>
      <span class="ds-banner-no-value">{{ formatNumber(issue) }}</span>
    </div>
    <button type="button" class="ds-egg" :aria-pressed="on" @click="on = !on">
      <span class="ds-egg-icon" aria-hidden="true">
        <TopicIcon :topic="topic" :size="156" :lit="on" />
      </span>
      <span class="ds-egg-label" aria-live="polite">{{ on ? egg.done : egg.rest }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ArticleTopic } from '~/types/portfolio';
import { formatNumber, topicClass } from '~/utils/articles';

/**
 * Article-page hero banner. The icon is a toggle button with a per-topic easter egg; the pill label
 * is its accessible name and announces the change. Transforms and colours are in components.css.
 */
const props = defineProps<{
  topic: ArticleTopic;
  issue: number;
}>();

const EGGS: Record<ArticleTopic, { rest: string; done: string }> = {
  Debugging: { rest: 'Click to squash', done: 'Fixed in prod' },
  Career: { rest: 'Click to apply', done: 'Offer accepted' },
  'Software design': { rest: 'Click to refactor', done: 'Refactored. Tests pass.' },
  Electronics: { rest: 'Click to power on', done: 'It lights up' },
  Chess: { rest: 'Your move', done: 'Check.' },
  Books: { rest: 'Turn the page', done: 'Dog-eared' },
};

const on = ref(false);
const egg = computed(() => EGGS[props.topic]);
</script>
