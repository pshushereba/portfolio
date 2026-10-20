<template>
  <svg
    class="ds-topic-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :stroke-width="size <= 32 ? 1.5 : 1.25"
    :data-lit="lit || undefined"
    aria-hidden="true"
  >
    <template v-if="icon === 'bug'">
      <path d="M8 10a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0Z" />
      <path d="M12 10v8M9.5 6.5 8 5M14.5 6.5 16 5M8 11H4.5M8 15H5M16 11h3.5M16 15h3M10 6.3a2 2 0 0 1 4 0" />
    </template>
    <template v-else-if="icon === 'briefcase'">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18M10.5 12.5v1.5h3v-1.5" />
    </template>
    <template v-else-if="icon === 'boxes'">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 10v2h11v-2M12 12v2" />
    </template>
    <template v-else-if="icon === 'led'">
      <path class="ds-icon-dome" d="M8.5 14V10a3.5 3.5 0 0 1 7 0v4Z" />
      <path d="M7 14h10M10.5 14v7M13.5 14v5" />
      <path class="ds-icon-lit" d="M12 2.5v1.5M6.2 4.8l1 1M17.8 4.8l-1 1M4.5 10H6M18 10h1.5" />
    </template>
    <template v-else-if="icon === 'knight'">
      <path d="M6.5 20.5h11M8 17.5h8.5" />
      <path d="M9 17.5c.3-2.2 1.3-3.6 2.6-4.6L8.8 14l-2.1-1.9 3.4-5.1L11 4.5l1.3 1.6c3.2.6 5.2 3.7 4.7 8.1l-.5 3.3" />
      <circle cx="11.2" cy="8.6" r="0.4" fill="currentColor" />
    </template>
    <template v-else>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z" />
      <path d="M12 6.5v13" />
      <path class="ds-icon-lit" d="M16 5.1v3.4l1.2-.9 1.2.9V5" />
    </template>
  </svg>
</template>

<script setup lang="ts">
import type { ArticleTopic } from '~/types/portfolio';
import { TOPICS } from '~/utils/articles';

/**
 * The six topic icons: 24×24 outlines in currentColor. `lit` turns on the LED (dome fills with
 * sun, rays appear) and the book's ribbon, for the banner easter eggs.
 */
const props = withDefaults(
  defineProps<{
    topic: ArticleTopic;
    /** Rendered size in px. Small sizes get a heavier 1.5 stroke. */
    size?: number;
    lit?: boolean;
  }>(),
  { size: 24, lit: false },
);

const icon = computed(() => TOPICS[props.topic].icon);
</script>
