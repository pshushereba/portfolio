<template>
  <section :class="['ds-panel', { 'ds-panel--citrus': tone === 'citrus' }]">
    <h2 class="ds-panel-title">
      <slot name="icon" />
      <span>{{ title }}</span>
    </h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    /** default = bordered surface · citrus = tinted, borderless (newsletter only) */
    tone?: 'default' | 'citrus';
  }>(),
  { tone: 'default' },
);
</script>
