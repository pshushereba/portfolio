<template>
  <span
    v-if="showPhoto"
    :class="['ds-cover', 'ds-cover--photo', `ds-cover--${size}`]"
    :role="labelled ? undefined : 'img'"
    :aria-label="labelled ? undefined : `Cover of ${book.title}`"
    :aria-hidden="labelled ? 'true' : undefined"
  >
    <img
      ref="img"
      :src="book.cover"
      :alt="labelled ? '' : `Cover of ${book.title}`"
      loading="lazy"
      decoding="async"
      @error="failed = true"
    />
  </span>
  <span
    v-else
    :class="['ds-cover', 'ds-cover--drawn', `ds-cover--${size}`, `ds-pal--${palette}`]"
    :role="labelled ? undefined : 'img'"
    :aria-label="labelled ? undefined : `Cover of ${book.title}`"
    :aria-hidden="labelled ? 'true' : undefined"
  >
    <span class="ds-cover-ring" aria-hidden="true" />
    <span v-if="size !== 'xs'" class="ds-cover-rule" aria-hidden="true" />
    <span v-if="size !== 'xs'" class="ds-cover-title">{{ book.title }}</span>
    <span v-if="size !== 'xs' && size !== 'sm'" class="ds-cover-author">{{ book.author }}</span>
  </span>
</template>

<script setup lang="ts">
import type { Book } from '~/types/portfolio';
import { bookPalette } from '~/utils/books';

/**
 * The one place the cover rule lives: show the photo (`book.cover`) when there is one and it
 * loads; otherwise draw the cover from the book's palette.
 *
 * Sizes: xs = 44×66 (margins strip) · sm = 56×84, title only (article embed) · md = 124×186
 * (shelf panel) · grid = fills its column · xl = up to 280px, tilted (book page hero).
 *
 * `labelled`: the title is printed next to the cover, so the cover is decorative (aria-hidden).
 * Otherwise the wrapper is an image with "Cover of {title}" as its label.
 */
const props = withDefaults(
  defineProps<{
    book: Pick<Book, 'path' | 'title' | 'author' | 'cover' | 'palette'>;
    size?: 'xs' | 'sm' | 'md' | 'grid' | 'xl';
    labelled?: boolean;
  }>(),
  { size: 'md', labelled: false },
);

const failed = ref(false);
const img = useTemplateRef<HTMLImageElement>('img');

const showPhoto = computed(() => !!props.book.cover && !failed.value);
const palette = computed(() => bookPalette(props.book));

// A photo that already failed before hydration never fires `error` again: check it once.
onMounted(() => {
  const el = img.value;
  if (el && el.complete && el.naturalWidth === 0) failed.value = true;
});

watch(
  () => props.book.cover,
  () => {
    failed.value = false;
  },
);
</script>
