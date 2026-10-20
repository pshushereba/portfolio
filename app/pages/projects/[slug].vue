<template>
  <div>
    <main v-if="project">
      <Container class="mt-12">
        <NuxtLink
          to="/projects"
          class="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-citrus no-underline hover:text-citrus-hover"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 fill-none stroke-current stroke-[1.5]" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" />
          </svg>
          All projects
        </NuxtLink>

        <ProjectHero class="mt-6" :project="project" />
        <ProjectFacts class="mt-8" :project="project" />

        <!-- What it is + What I'm proud of -->
        <div v-if="hasBody || highlights.length" class="mt-16 flex flex-wrap gap-x-16 gap-y-12">
          <section v-if="hasBody" class="min-w-0 max-w-[42rem] flex-[999_1_440px]">
            <h2 class="text-xl leading-7 font-semibold text-ink-strong">What it is</h2>
            <ArticleBody class="mt-4">
              <ContentRenderer :value="project" />
            </ArticleBody>
          </section>

          <aside v-if="highlights.length" class="min-w-0 flex-[1_1_260px]">
            <div class="ds-panel ds-panel--citrus">
              <h2 class="ds-panel-title">What I'm proud of</h2>
              <ul class="mt-3 flex flex-col gap-2.5 text-sm text-ink">
                <li v-for="highlight in highlights" :key="highlight" class="flex gap-2.5">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    class="mt-0.5 h-5 w-5 flex-none fill-none stroke-citrus stroke-[1.75]"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m5 10.5 3 3 7-7" />
                  </svg>
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <BuildLog class="mt-20" :articles="about" />
        <ProjectPager class="mt-20" :prev="adjacent.prev" :next="adjacent.next" />
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { adjacentProjects, articlesAboutProject } from '~/utils/projects';

const route = useRoute();
const slug = String(route.params.slug);

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').path(`/projects/${slug}`).first(),
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true });
}

const { data: projectList } = await useAsyncData('projects', () => queryCollection('projects').all());
const { data: articleList } = await useAsyncData('project-articles', () => queryCollection('blog').all());

const projects = computed(() => projectList.value ?? []);
const articles = computed(() => articleList.value ?? []);

const about = computed(() => articlesAboutProject(articles.value, slug));
const adjacent = computed(() => (project.value ? adjacentProjects(projects.value, project.value) : {}));
const highlights = computed(() => project.value?.highlights ?? []);

/** The markdown body is "What it is"; an empty file has nothing to render. */
const hasBody = computed(() => (project.value?.body?.value?.length ?? 0) > 0);

useSeoMeta({
  title: `${project.value.title} — Projects — Patrick Shushereba`,
  description: project.value.tagline ?? project.value.description,
});
</script>
