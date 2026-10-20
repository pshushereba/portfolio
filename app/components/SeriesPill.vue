<template>
  <component :is="to ? 'a' : 'span'" :href="to" :class="['ds-series-pill', { 'ds-series-pill--sm': size === 'sm' }]">
    {{ name }}<span class="ds-series-no">#{{ number }}</span>
  </component>
</template>

<script setup lang="ts">
/** Dark pill with the series name and a sun "#N" chip. With `to` it's a link (e.g. '#series'). */
withDefaults(
  defineProps<{
    name: string;
    number: number;
    size?: 'sm' | 'md';
    to?: string;
  }>(),
  { size: 'md' },
);
</script>
