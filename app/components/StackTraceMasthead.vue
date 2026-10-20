<template>
  <div class="ds-masthead">
    <p class="ds-wordmark">Stack Trace<span class="ds-cursor" aria-hidden="true" /></p>
    <p class="ds-masthead-sub">Where the bugs led · {{ count }} {{ count === 1 ? 'article' : 'articles' }} · Redlands, CA</p>
  </div>
</template>

<script setup lang="ts">
/** The "Stack Trace" wordmark rule above the section tabs. */
defineProps<{ count: number }>();
</script>
