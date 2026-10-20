<template>
  <nav v-if="prev || next" aria-label="More projects" class="ds-block-nav">
    <NuxtLink v-if="prev" :to="prev.path" :class="`ds-block--${prev.tone}`" data-dir="prev">
      <span class="ds-block-nav-label">Previous project</span>
      <span class="ds-block-nav-name">{{ prev.title }}</span>
    </NuxtLink>
    <NuxtLink v-if="next" :to="next.path" :class="`ds-block--${next.tone}`" data-dir="next">
      <span class="ds-block-nav-label">Next project</span>
      <span class="ds-block-nav-name">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio';

/** Previous / next project cards, in each project's own tone. */
defineProps<{ prev?: Project; next?: Project }>();
</script>
