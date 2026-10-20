<template>
  <section :class="['ds-tile', `ds-tile--${tone}`]">
    <span class="ds-tile-well" aria-hidden="true">
      <slot name="icon" />
    </span>
    <div class="min-w-0">
      <h3 class="ds-tile-title">{{ title }}</h3>
      <p class="ds-tile-body"><slot /></p>
      <NuxtLink v-if="to && cta" :to="to" class="ds-tile-cta">{{ cta }} <span aria-hidden="true">→</span></NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * "Off the clock" tile: tinted card with a 48px icon well.
 * Slots: default = body copy · `icon` = 24px, 1.5-stroke outline icon (24×24 viewBox).
 * The CTA renders only when both `to` and `cta` are given.
 */
withDefaults(
  defineProps<{
    title: string;
    /** sun = neutral tile with a yellow well · teal / citrus = tinted tile with a matching well */
    tone?: 'sun' | 'teal' | 'citrus';
    to?: string;
    cta?: string;
  }>(),
  { tone: 'citrus' },
);

defineSlots<{
  default(): unknown;
  icon(): unknown;
}>();
</script>
