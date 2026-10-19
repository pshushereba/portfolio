<template>
  <Container class="mt-16 lg:mt-32">
    <div class="xl:relative">
      <div class="mx-auto max-w-2xl">
        <button
          type="button"
          aria-label="Go back to articles"
          @click="$router.back()"
          class="ds-pill group mb-8 h-10 w-10 justify-center lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            class="h-4 w-4 stroke-muted transition group-hover:stroke-citrus"
          >
            <path
              d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <article v-if="article">
          <header class="flex flex-col">
            <h1
              class="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            >
              {{ article.title }}
            </h1>
            <time
              :datetime="article.dates.published"
              class="order-first flex items-center text-base text-muted"
            >
              <span class="h-4 w-0.5 rounded-full bg-citrus-glow" />
              <span class="ml-3">{{ formatDate(article.dates.published) }}</span>
            </time>
          </header>
          <ArticleBody class="mt-8">
            <ContentRenderer :value="article" />
          </ArticleBody>
        </article>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
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
</script>
