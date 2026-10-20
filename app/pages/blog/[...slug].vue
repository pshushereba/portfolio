<template>
  <div>
    <ReadingProgress />
    <Container class="mt-16">
      <article v-if="article">
        <div class="mx-auto max-w-2xl">
          <NuxtLink to="/articles" class="ds-pill ds-back">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" /></svg>
            All articles
          </NuxtLink>

          <header class="ds-article-head">
            <p class="ds-kicker ds-article-kicker">
              <span class="ds-wordmark ds-wordmark--sm">Stack Trace<span class="ds-cursor ds-cursor--sm" aria-hidden="true" /></span>
              <span aria-hidden="true">·</span>
              <span>No. {{ formatNumber(issue) }}</span>
              <template v-if="article.topic">
                <span aria-hidden="true">·</span>
                <TopicTag :tone="tone">{{ article.topic }}</TopicTag>
              </template>
            </p>
            <SeriesPill v-if="article.series && seriesNo" :name="article.series" :number="seriesNo" to="#series" />
            <h1 class="ds-article-title">{{ article.title }}</h1>
            <p class="ds-byline">
              <span class="ds-byline-tick" aria-hidden="true" />
              <time :datetime="article.dates.published">{{ formatDate(article.dates.published) }}</time>
              <span aria-hidden="true">·</span>
              <span>By Patrick Shushereba</span>
            </p>
          </header>
        </div>

        <TopicBanner v-if="article.topic" class="mx-auto max-w-5xl" :topic="article.topic" :issue="issue" />

        <div class="mx-auto max-w-2xl">
          <ArticleBody class="mt-14">
            <p v-if="article.description" class="ds-lede">{{ article.description }}</p>
            <ContentRenderer v-if="hasBody" :value="article" />
            <!-- Books this article is about, unless the body already embeds them with ::book-card -->
            <BookCard v-for="slug in trailingBooks" :key="slug" :slug="slug" />
          </ArticleBody>

          <div class="ds-end">
            <span class="ds-end-stamp" aria-hidden="true">-30-</span>
            <p class="ds-end-note">End of story.</p>
          </div>

          <div class="ds-filed">
            <span v-if="article.topic" class="ds-filed-topic">
              Filed under <TopicTag :tone="tone">{{ article.topic }}</TopicTag>
            </span>
            <span>
              Published <time :datetime="article.dates.published">{{ formatDate(article.dates.published) }}</time>
            </span>
          </div>

          <SeriesBox v-if="article.series && series.length" :name="article.series" :entries="series" :current-path="article.path" />
        </div>
      </article>

      <section class="ds-keep mx-auto max-w-5xl" aria-label="Keep reading">
        <h2 class="ds-kicker ds-keep-title">Keep reading</h2>
        <div class="ds-cards">
          <ArticleCard
            v-if="neighbour"
            :article="neighbour.article"
            :issue="issueNumber(articles, neighbour.article)"
            :label="`${neighbour.relation} · No. ${formatNumber(issueNumber(articles, neighbour.article))}`"
            compact
          />
          <ArchiveCard />
        </div>
      </section>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { TOPICS, byPublished, formatNumber, issueNumber, neighbourArticle, seriesEntries, seriesNumber } from '~/utils/articles';
import { formatDate } from '~/utils/formatDate';

const route = useRoute();

const { data: article } = await useAsyncData(`content-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first();
});

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true });
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
});

/* Every article, for the issue and series numbers and the "Keep reading" neighbour. */
const { data: articleList } = await useAsyncData('articleList', () =>
  queryCollection('blog').select('path', 'title', 'description', 'dates', 'topic', 'series', 'part').all(),
);
const articles = computed(() => byPublished(articleList.value ?? []));

const issue = computed(() => (article.value ? issueNumber(articles.value, article.value) : 0));
const seriesNo = computed(() => (article.value ? seriesNumber(articles.value, article.value) : undefined));
const series = computed(() => {
  const name = article.value?.series;
  if (!name) return [];
  return seriesEntries(articles.value, name).map((entry) => ({
    path: entry.path,
    title: entry.title,
    number: seriesNumber(articles.value, entry) ?? 0,
  }));
});
const neighbour = computed(() => (article.value ? neighbourArticle(articles.value, article.value) : undefined));
const tone = computed(() => (article.value?.topic ? TOPICS[article.value.topic].tone ?? 'neutral' : 'neutral'));

/** An empty markdown body has nothing to render. */
const hasBody = computed(() => (article.value?.body?.value?.length ?? 0) > 0);

/** Slugs of every `::book-card{slug="…"}` embedded in the body (minimark: [tag, props, ...children]). */
function embeddedBookSlugs(nodes: unknown[], found = new Set<string>()): Set<string> {
  for (const node of nodes) {
    if (!Array.isArray(node)) continue;
    const [tag, props, ...children] = node as [unknown, unknown, ...unknown[]];
    const slug = props && typeof props === 'object' ? (props as Record<string, unknown>).slug : undefined;
    if ((tag === 'book-card' || tag === 'BookCard') && typeof slug === 'string') found.add(slug);
    embeddedBookSlugs(children, found);
  }
  return found;
}

const trailingBooks = computed(() => {
  const body = article.value?.body?.value ?? [];
  const embedded = embeddedBookSlugs(body);
  return (article.value?.books ?? []).filter((slug) => !embedded.has(slug));
});
</script>
