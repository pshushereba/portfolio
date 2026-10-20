<template>
  <div :class="['ds-art ds-topic-block', topicClass(topic), { 'ds-art--card': size !== 'lead', 'ds-art--compact': size === 'compact' }]" aria-hidden="true">
    <span class="ds-halftone" />
    <div class="ds-art-top">
      <span>{{ label ?? `No. ${formatNumber(issue)}` }}</span>
      <span v-if="size === 'lead'">{{ topic }}</span>
    </div>
    <div class="ds-art-icon">
      <span class="ds-wiggle">
        <TopicIcon :topic="topic" :size="iconSize" />
      </span>
    </div>
    <span class="ds-art-foot" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ArticleTopic } from '~/types/portfolio';
import { formatNumber, topicClass } from '~/utils/articles';

/**
 * The topic colour block: fill, halftone, `No. NN` and the icon. Decorative (the title next to it
 * carries the meaning). The default slot is for ArticleCard's hover strip.
 */
const props = withDefaults(
  defineProps<{
    topic: ArticleTopic;
    /** The issue number, shown as `No. NN` unless `label` overrides it. */
    issue: number;
    /** Top-left text override, e.g. 'Previous · No. 01'. */
    label?: string;
    /** lead = 148px icon, min 300px tall · card = 260px tall, 120px icon · compact = 240px, 104px */
    size?: 'lead' | 'card' | 'compact';
  }>(),
  { size: 'card' },
);

const iconSize = computed(() => ({ lead: 148, card: 120, compact: 104 })[props.size]);
</script>
