<template>
  <div>
    <main>
      <!-- Hero -->
      <Container class="mt-9">
        <div class="max-w-[48rem]">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-citrus-tint px-3 py-0.5 text-xs font-medium text-ink">
            <span class="h-2 w-2 rounded-full bg-citrus-glow" aria-hidden="true" />
            Bookshelf
          </p>
          <h1 class="ds-hero-title">
            Books that <mark class="ds-hl-mark">changed how I work</mark>, and a few that were just
            <span class="ds-hl-underline">fun</span>.
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-body">{{ intro }}</p>
        </div>
      </Container>

      <!-- Shelf + selected book -->
      <Container class="mt-16">
        <div ref="shelfSection" class="flex flex-wrap items-stretch gap-8">
          <BookShelf :model-value="selected" :books="books" :written-about="writtenAbout" @update:model-value="select" />
          <BookPanel v-if="current" :book="current" :articles="articlesAbout(articles, selected)" />
        </div>
      </Container>

      <!-- Every book -->
      <Container class="mt-24">
        <BookGrid :books="books" :topic="topic" :written-about="writtenAbout" @select="selectFromGrid" @update:topic="setTopic" />
      </Container>

      <!-- Written in the margins (hidden when no article links a book) -->
      <Container class="mt-24">
        <BookMargins :books="books" :articles="articles" />
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BOOK_TOPICS, articlesAbout, bookSlug, defaultBook, writtenAboutSlugs } from '~/utils/books';

const intro =
  "Mostly software, running and building a business, with the occasional novel. Pull a book off the shelf to see what I thought of it and anything I've written about it.";

useSeoMeta({
  title: 'Books — Patrick Shushereba',
  description: intro,
});

const { data: bookList } = await useAsyncData('books', () => queryCollection('books').all());
const { data: articleList } = await useAsyncData('book-articles', () => queryCollection('blog').all());

const books = computed(() => bookList.value ?? []);
const articles = computed(() => articleList.value ?? []);
const writtenAbout = computed(() => writtenAboutSlugs(articles.value));
const slugs = computed(() => new Set(books.value.map(bookSlug)));

/* ---- State: `?book=` and `?topic=` in the URL, so a pick is shareable ----
   The first render uses the defaults on both server and client (the prerendered HTML has no
   query), then the query is applied once mounted and whenever it changes. */
const route = useRoute();
const router = useRouter();

const fallbackSlug = computed(() => {
  const book = defaultBook(books.value);
  return book ? bookSlug(book) : '';
});

const selected = ref(fallbackSlug.value);
const topic = ref('All');

const current = computed(() => books.value.find((b) => bookSlug(b) === selected.value));

function queryString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function syncFromQuery() {
  const book = queryString(route.query.book);
  selected.value = book && slugs.value.has(book) ? book : fallbackSlug.value;
  const t = queryString(route.query.topic);
  topic.value = t && (BOOK_TOPICS as readonly string[]).includes(t) ? t : 'All';
}

onMounted(syncFromQuery);
watch(() => [route.query.book, route.query.topic], syncFromQuery);

function select(slug: string) {
  if (!slugs.value.has(slug)) return;
  selected.value = slug;
  router.replace({ query: { ...route.query, book: slug } });
}

function setTopic(next: string) {
  topic.value = next;
  router.replace({ query: { ...route.query, topic: next === 'All' ? undefined : next } });
}

const shelfSection = useTemplateRef<HTMLDivElement>('shelfSection');

function selectFromGrid(slug: string) {
  select(slug);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  shelfSection.value?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
}
</script>
