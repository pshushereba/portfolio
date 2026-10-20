<template>
  <section v-if="articles.length" aria-labelledby="build-log-heading">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id="build-log-heading" class="text-xl leading-7 font-semibold text-ink-strong">From the build log</h2>
      <p class="text-xs text-muted">Decisions, bugs and things that went right</p>
    </div>

    <!-- Pulled out by the page gutter so the hover wash lines up with the text above. -->
    <ul role="list" class="-mx-4 mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-2 sm:-mx-6">
      <li
        v-for="article in articles"
        :key="article.path"
        class="group relative flex flex-col gap-2 rounded-2xl p-4 transition hover:bg-sunken focus-within:bg-sunken focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus motion-reduce:transition-none sm:p-6"
      >
        <p class="flex flex-wrap items-center gap-2.5">
          <TopicTag v-if="logLabel(article)" :tone="logTone(article.logType)">{{ logLabel(article) }}</TopicTag>
          <time :datetime="article.dates.published" class="text-xs text-muted">{{ formatDate(article.dates.published) }}</time>
        </p>
        <h3 class="text-base font-semibold tracking-[-0.025em] text-ink">
          <NuxtLink
            :to="article.path"
            class="text-inherit no-underline after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {{ article.title }}
          </NuxtLink>
        </h3>
        <p v-if="article.description" class="text-sm text-body">{{ article.description }}</p>
        <span class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-citrus" aria-hidden="true">
          Read article
          <svg
            viewBox="0 0 16 16"
            class="h-4 w-4 fill-none stroke-current stroke-[1.5] transition group-hover:translate-x-[3px] motion-reduce:transition-none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { ProjectArticle } from '~/types/portfolio';
import { formatDate } from '~/utils/formatDate';
import { logLabel, logTone } from '~/utils/projects';

/** "From the build log": articles that list this project in their `projects`. Hidden when there are none. */
defineProps<{ articles: ProjectArticle[] }>();
</script>
