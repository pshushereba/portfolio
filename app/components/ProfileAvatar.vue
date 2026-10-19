<template>
  <NuxtLink :to="to" :aria-label="label" :class="['ds-focusable', { 'ds-pill ds-avatar-ring': ring }]">
    <img v-if="src" :src="src" alt="" :class="classes" />
    <span v-else aria-hidden="true" :class="[...classes, 'ds-avatar-fallback']">{{ initials }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string;
    /** Accessible name of the link, e.g. "Home". */
    label?: string;
    size?: 'sm' | 'lg';
    /** Citrus ring — the home-page hero only. */
    accent?: boolean;
    /** Floating pill ring — the header on inner pages. */
    ring?: boolean;
    initials?: string;
    to?: string;
  }>(),
  { label: 'Home', size: 'sm', initials: 'PS', to: '/' },
);

const classes = computed(() =>
  ['ds-avatar', `ds-avatar--${props.size}`, props.accent ? 'ds-avatar--accent' : ''].filter(Boolean),
);
</script>
