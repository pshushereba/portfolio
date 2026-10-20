<template>
  <span :class="['ds-tag', `ds-tag--${tone}`]"><slot /></span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'citrus' | 'teal' | 'sun' }>(), { tone: 'teal' });
</script>
