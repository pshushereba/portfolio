<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <slot />
    <slot name="icon" />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="classes" :aria-disabled="disabled ? 'true' : undefined">
    <slot />
    <slot name="icon" />
  </a>
  <button v-else :type="type" :class="classes" :disabled="disabled">
    <slot />
    <slot name="icon" />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** primary = citrus (one per view) · secondary = neutral · ghost = outlined */
    variant?: 'primary' | 'secondary' | 'ghost';
    block?: boolean;
    to?: string;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }>(),
  { variant: 'primary', type: 'button' },
);

const classes = computed(() => ['ds-btn', `ds-btn--${props.variant}`, { 'ds-btn--block': props.block }]);
</script>
