<template>
  <section class="ds-shelf" aria-labelledby="shelf-heading">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 id="shelf-heading" class="text-sm font-semibold text-ink-strong">On the shelf</h2>
        <p class="text-xs text-body">Pick a spine to pull it out.</p>
      </div>
      <ActionButton v-if="books.length > 1" variant="ghost" class="bg-surface font-medium hover:bg-page" @click="surprise">
        <template #lead>
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-[18px] w-[18px] stroke-citrus">
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <circle cx="9" cy="9" r="1" class="fill-citrus" />
            <circle cx="15" cy="15" r="1" class="fill-citrus" />
            <circle cx="15" cy="9" r="1" class="fill-citrus" />
            <circle cx="9" cy="15" r="1" class="fill-citrus" />
          </svg>
        </template>
        Surprise me
      </ActionButton>
    </div>

    <div ref="row" class="ds-shelf-row" role="group" aria-label="Bookshelf" @keydown="onKeydown">
      <BookSpine
        v-for="book in ordered"
        :key="book.path"
        :book="book"
        :selected="bookSlug(book) === modelValue"
        :tabindex="bookSlug(book) === modelValue || !hasSelection ? 0 : -1"
        @select="(slug) => emit('update:modelValue', slug)"
      />
    </div>
    <div class="ds-shelf-board" aria-hidden="true" />

    <p class="mt-[22px] text-xs text-body">{{ summary }}</p>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/portfolio';
import { bookSlug, shelfOrder } from '~/utils/books';

/**
 * The sunken shelf panel. `v-model` is the selected book's slug. Spines are laid out oldest
 * first with the book being read last. Left/Right arrows move between spines (roving tabindex).
 */
const props = defineProps<{
  books: Book[];
  modelValue: string;
  /** Slugs that have at least one article about them, for the summary line. */
  writtenAbout: Set<string>;
}>();

const emit = defineEmits<{ 'update:modelValue': [slug: string] }>();

const ordered = computed(() => shelfOrder(props.books));
const hasSelection = computed(() => ordered.value.some((b) => bookSlug(b) === props.modelValue));

const summary = computed(() => {
  const written = props.books.filter((b) => props.writtenAbout.has(bookSlug(b))).length;
  const reading = props.books.find((b) => b.status === 'reading');
  const parts = [`${props.books.length} ${props.books.length === 1 ? 'book' : 'books'}`, `${written} written about`];
  if (reading) parts.push(`${reading.title} on the nightstand`);
  return parts.join(' · ');
});

function surprise() {
  const others = ordered.value.filter((b) => bookSlug(b) !== props.modelValue);
  const pick = others[Math.floor(Math.random() * others.length)];
  if (pick) emit('update:modelValue', bookSlug(pick));
}

const row = useTemplateRef<HTMLDivElement>('row');

/** Keep the selected spine in view: the shelf scrolls sideways when it is wider than its panel. */
function revealSelected(animate: boolean) {
  const el = row.value;
  const spine = el?.querySelector<HTMLButtonElement>('.ds-spine--selected');
  if (!el || !spine) return;
  const left = spine.offsetLeft - el.offsetLeft;
  const target = left - (el.clientWidth - spine.offsetWidth) / 2;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollTo({ left: target, behavior: animate && !reduced ? 'smooth' : 'auto' });
}

onMounted(() => revealSelected(false));
watch(
  () => props.modelValue,
  () => nextTick(() => revealSelected(true)),
);

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return;
  const spines = Array.from(row.value?.querySelectorAll<HTMLButtonElement>('.ds-spine') ?? []);
  const current = spines.indexOf(document.activeElement as HTMLButtonElement);
  if (current === -1) return;
  event.preventDefault();
  const next =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? spines.length - 1
        : (current + (event.key === 'ArrowRight' ? 1 : -1) + spines.length) % spines.length;
  const target = spines[next];
  const book = ordered.value[next];
  if (target && book) {
    target.focus();
    emit('update:modelValue', bookSlug(book));
  }
}
</script>
