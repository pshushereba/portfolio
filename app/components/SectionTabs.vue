<template>
  <div class="ds-tabs" role="group" aria-label="Sections">
    <button
      type="button"
      class="ds-tab"
      :aria-pressed="modelValue === 'all'"
      @click="emit('update:modelValue', 'all')"
    >
      <span class="ds-tab-dot" aria-hidden="true" />
      All sections
      <span class="ds-tab-count">{{ total }}</span>
    </button>
    <button
      v-for="topic in ARTICLE_TOPICS"
      :key="topic"
      type="button"
      :class="['ds-tab', topicClass(topic), { 'ds-tab--empty': !counts[topic] }]"
      :aria-pressed="modelValue === topic"
      @click="emit('update:modelValue', topic)"
    >
      <span class="ds-tab-dot" aria-hidden="true" />
      {{ topic }}
      <span class="ds-tab-count">{{ counts[topic] }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ArticleTopic } from '~/types/portfolio';
import { ARTICLE_TOPICS, topicClass } from '~/utils/articles';

/** Topic filter tabs with counts. Every topic is listed, including the empty ones. */
const props = defineProps<{
  modelValue: 'all' | ArticleTopic;
  counts: Record<ArticleTopic, number>;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: 'all' | ArticleTopic] }>();

const total = computed(() => Object.values(props.counts).reduce((sum, n) => sum + n, 0));
</script>
