<template>
  <div>
    <main>
      <!-- Hero -->
      <Container class="mt-9">
        <div class="max-w-[48rem]">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-citrus-tint px-3 py-0.5 text-xs font-medium text-ink">
            <span class="h-2 w-2 rounded-full bg-citrus-glow" aria-hidden="true" />
            Articles
          </p>
          <h1 class="ds-hero-title">
            Writing on software design, electronics, <mark class="ds-hl-mark">chess</mark> and
            <span class="ds-hl-underline">books</span>.
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-body">{{ intro }}</p>
        </div>
      </Container>

      <!-- Masthead, tabs, lead and grid -->
      <Container class="mt-16">
        <section aria-label="Articles">
          <StackTraceMasthead :count="articles.length" />
          <SectionTabs :model-value="topic" :counts="counts" @update:model-value="select" />

          <ArticleLead
            v-if="lead"
            class="mt-10"
            :article="lead"
            :issue="issueNumber(articles, lead)"
            :latest="lead.path === articles[0]?.path"
            :series-no="seriesNumber(articles, lead)"
          />

          <div v-else class="ds-empty">
            <p class="ds-kicker text-muted">404 · Not found</p>
            <p class="ds-empty-title">Nothing filed under {{ topic }} yet.</p>
            <p class="ds-empty-body">Check another section in the meantime.</p>
            <button type="button" class="ds-btn ds-btn--secondary" @click="select('all')">Back to all sections</button>
          </div>

          <template v-if="rest.length">
            <h2 class="ds-kicker ds-earlier">Earlier</h2>
            <div class="ds-cards">
              <ArticleCard
                v-for="article in rest"
                :key="article.path"
                :article="article"
                :issue="issueNumber(articles, article)"
              />
            </div>
          </template>
        </section>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { ArticleTopic } from '~/types/portfolio';
import { byPublished, issueNumber, seriesNumber, topicCounts, topicFromSlug, topicSlug } from '~/utils/articles';

const intro = 'All of my long-form thoughts on programming, leadership, software design, and more, collected.';

useSeoMeta({
  title: 'Articles — Patrick Shushereba',
  description: intro,
});

const { data: articleList } = await useAsyncData('articleList', () =>
  queryCollection('blog').select('path', 'title', 'description', 'dates', 'topic', 'series', 'part').all(),
);

/* Newest first, ties broken on path so numbering is stable. (The collection can only order on
   top-level columns, and `dates` is a JSON column, so the sort happens here.) */
const articles = computed(() => byPublished(articleList.value ?? []));
const counts = computed(() => topicCounts(articles.value));

/* Filter state. Mirrored to `?topic=software-design` so a filtered view can be shared; read on the
   client only, so the prerendered "All sections" markup hydrates cleanly. */
const route = useRoute();
const router = useRouter();
const topic = ref<'all' | ArticleTopic>('all');

function fromQuery() {
  const q = route.query.topic;
  topic.value = topicFromSlug(typeof q === 'string' ? q : undefined) ?? 'all';
}
onMounted(fromQuery);
watch(() => route.query.topic, fromQuery);

function select(next: 'all' | ArticleTopic) {
  topic.value = next;
  router.replace({ query: next === 'all' ? {} : { topic: topicSlug(next) } });
}

const visible = computed(() =>
  topic.value === 'all' ? articles.value : articles.value.filter((a) => a.topic === topic.value),
);
const lead = computed(() => visible.value[0]);
const rest = computed(() => visible.value.slice(1));
</script>
