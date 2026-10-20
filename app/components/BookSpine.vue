<template>
  <button
    type="button"
    :class="['ds-spine', `ds-pal--${palette}`, { 'ds-spine--selected': selected, 'ds-spine--reading': reading }]"
    :style="{ width: `${size.width}px`, height: `${size.height}px` }"
    :aria-pressed="selected ? 'true' : 'false'"
    :aria-label="`${book.title} by ${book.author}`"
    :tabindex="tabindex"
    @click="emit('select', slug)"
  >
    <span class="ds-spine-band" aria-hidden="true" />
    <span class="ds-spine-label" aria-hidden="true">{{ spineLabel(book) }}</span>
    <span class="ds-spine-band" aria-hidden="true" />
    <span v-if="reading" class="ds-spine-now">Now reading</span>
  </button>
</template>

<script setup lang="ts">
import type { Book } from '~/types/portfolio';
import { bookPalette, bookSlug, spineLabel, spineSize } from '~/utils/books';

/** One book on the shelf. Width and height come from the slug so the shelf is stable. */
const props = withDefaults(
  defineProps<{
    book: Book;
    selected?: boolean;
    /** Roving tabindex: the shelf makes only the selected spine tabbable. */
    tabindex?: 0 | -1;
  }>(),
  { selected: false, tabindex: 0 },
);

const emit = defineEmits<{ select: [slug: string] }>();

const slug = computed(() => bookSlug(props.book));
const palette = computed(() => bookPalette(props.book));
const size = computed(() => spineSize(slug.value));
const reading = computed(() => props.book.status === 'reading');
</script>
