<template>
  <div>
    <main v-if="book">
      <Container class="mt-14">
        <NuxtLink
          :to="{ path: '/books', query: { book: slug } }"
          class="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-citrus no-underline hover:text-citrus-hover"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 fill-none stroke-current stroke-[1.5]" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" />
          </svg>
          Back to the shelf
        </NuxtLink>

        <!-- Hero row -->
        <div class="mt-6 flex flex-wrap items-start gap-x-16 gap-y-12">
          <div class="mx-auto flex w-full max-w-[220px] min-w-0 flex-col sm:mx-0 sm:max-w-none sm:flex-[0_1_280px]">
            <BookCover :book="book" size="xl" />

            <dl v-if="facts.length" class="mt-9 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-sm">
              <template v-for="fact in facts" :key="fact.label">
                <dt class="text-muted">{{ fact.label }}</dt>
                <dd v-if="fact.tag" class="m-0"><TopicTag tone="teal" class="px-2.5 text-xs">{{ fact.value }}</TopicTag></dd>
                <dd v-else class="m-0 text-ink">{{ fact.value }}</dd>
              </template>
            </dl>

            <div v-if="book.getItUrl" class="mt-6">
              <ActionButton variant="ghost" :href="book.getItUrl" target="_blank" rel="noopener" class="font-medium">
                Where to get it
              </ActionButton>
            </div>
          </div>

          <article class="min-w-0 max-w-2xl flex-[999_1_480px]">
            <p class="mb-4 inline-flex items-center gap-2 rounded-full bg-citrus-tint px-3 py-0.5 text-xs font-medium text-ink">
              <span class="h-2 w-2 rounded-full bg-citrus-glow" aria-hidden="true" />
              On the shelf · No.{{ shelfNumber(books, book) }}
            </p>
            <h1 class="text-[clamp(36px,5vw,56px)] leading-[1.1] font-bold tracking-[-0.025em] text-ink-strong">{{ book.title }}</h1>
            <p class="mt-2 text-lg leading-7 text-body">{{ book.author }}</p>

            <template v-if="book.why">
              <h2 class="mt-12 text-xl leading-7 font-semibold text-ink-strong">Why I picked it up</h2>
              <p class="mt-4 text-base text-body">{{ book.why }}</p>
            </template>

            <template v-if="hasBody">
              <h2 class="mt-10 text-xl leading-7 font-semibold text-ink-strong">My take</h2>
              <ArticleBody class="mt-4">
                <ContentRenderer :value="book" />
              </ArticleBody>
            </template>

            <figure v-if="book.idea" class="mt-10 rounded-2xl bg-sunken px-7 py-6">
              <figcaption class="text-xs font-semibold text-body">The idea I keep coming back to</figcaption>
              <p class="mt-2 text-xl leading-8 font-semibold tracking-[-0.015em] text-ink">
                <mark class="ds-hl-mark rounded px-1.5">{{ book.idea }}</mark>
              </p>
            </figure>
          </article>
        </div>
      </Container>

      <!-- Articles -->
      <Container v-if="about.length || mentions.length" class="mt-24">
        <section aria-labelledby="wrote-heading" class="flex flex-wrap items-start gap-x-16 gap-y-8">
          <div v-if="about.length" class="min-w-0 flex-[1_1_520px]">
            <h2 id="wrote-heading" class="text-xl leading-7 font-semibold text-ink-strong">I wrote about this book</h2>
            <NuxtLink
              v-for="article in about"
              :key="article.path"
              :to="article.path"
              class="mt-6 flex flex-wrap gap-6 rounded-2xl bg-sunken p-6 no-underline transition hover:shadow-lg"
            >
              <time
                :datetime="article.dates.published"
                class="flex-[0_0_130px] pl-3.5 text-xs text-muted shadow-[inset_2px_0_0_var(--border-strong)]"
              >
                {{ formatDate(article.dates.published) }}
              </time>
              <span class="min-w-0 flex-[1_1_280px]">
                <span class="block text-base leading-7 font-semibold tracking-[-0.025em] text-ink">{{ article.title }}</span>
                <span v-if="article.description" class="mt-2 block text-sm text-body">{{ article.description }}</span>
                <span class="mt-4 block text-sm font-medium text-citrus">Read article <span aria-hidden="true">→</span></span>
              </span>
            </NuxtLink>
          </div>

          <div v-if="mentions.length" class="min-w-0 flex-[1_1_300px]">
            <h2 class="text-sm font-semibold text-ink-strong">Also mentioned in</h2>
            <ul class="mt-4 border-b border-line-strong">
              <li v-for="article in mentions" :key="article.path" class="border-t border-line-strong">
                <NuxtLink
                  :to="article.path"
                  class="flex min-h-[52px] items-center justify-between gap-3 text-sm font-medium text-citrus no-underline hover:text-citrus-hover"
                >
                  {{ article.title }} <span aria-hidden="true">→</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </section>
      </Container>

      <!-- Shelved nearby -->
      <Container v-if="nearby.length" class="mt-24">
        <section aria-labelledby="nearby-heading">
          <div class="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="nearby-heading" class="text-xl leading-7 font-semibold text-ink-strong">Shelved nearby</h2>
            <NuxtLink to="/books" class="text-sm font-medium text-citrus no-underline hover:text-citrus-hover">
              See every book <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
          <div class="mt-7 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-7 gap-y-8">
            <NuxtLink
              v-for="near in nearby"
              :key="near.path"
              :to="near.path"
              class="flex flex-col gap-3.5 rounded-lg no-underline"
            >
              <BookCover :book="near" size="grid" labelled />
              <span>
                <span class="block text-sm leading-5 font-semibold tracking-[-0.015em] text-ink">{{ near.title }}</span>
                <span class="mt-0.5 block text-xs leading-5 text-muted">{{ near.author }}</span>
              </span>
            </NuxtLink>
          </div>
        </section>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { articlesAbout, articlesMentioning, formatFinished, shelfNumber, shelvedNearby } from '~/utils/books';
import { formatDate } from '~/utils/formatDate';

const route = useRoute();
const slug = String(route.params.slug);

const { data: book } = await useAsyncData(`book-${slug}`, () =>
  queryCollection('books').path(`/books/${slug}`).first(),
);

if (!book.value) {
  throw createError({ statusCode: 404, statusMessage: 'Book not found', fatal: true });
}

const { data: bookList } = await useAsyncData('books', () => queryCollection('books').all());
const { data: articleList } = await useAsyncData('book-articles', () => queryCollection('blog').all());

const books = computed(() => bookList.value ?? []);
const articles = computed(() => articleList.value ?? []);

const about = computed(() => articlesAbout(articles.value, slug));
const mentions = computed(() => articlesMentioning(articles.value, slug));
const nearby = computed(() => (book.value ? shelvedNearby(books.value, book.value) : []));

/** The markdown body is "My take"; an empty file has nothing to render. */
const hasBody = computed(() => (book.value?.body?.value?.length ?? 0) > 0);

const facts = computed(() => {
  const b = book.value;
  if (!b) return [];
  const rows: { label: string; value: string; tag?: boolean }[] = [];
  if (b.finished) rows.push({ label: 'Finished', value: formatFinished(b.finished) });
  rows.push({ label: 'Topic', value: b.topic, tag: true });
  if (b.format) rows.push({ label: 'Read it as', value: b.format });
  if (b.reread) rows.push({ label: 'Would I reread', value: b.reread });
  return rows;
});

useSeoMeta({
  title: `${book.value.title} by ${book.value.author} — Books`,
  description: book.value.take || `My notes on ${book.value.title} by ${book.value.author}.`,
});
</script>
