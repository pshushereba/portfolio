<template>
  <section class="ds-panel">
    <h2 class="ds-panel-title">
      <slot name="icon" />
      <span>{{ title }}</span>
    </h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
