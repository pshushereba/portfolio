<template>
  <div>
    <main>
      <!-- Hero -->
      <Container class="mt-9">
        <div class="max-w-[48rem]">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-citrus-tint px-3 py-0.5 text-xs font-medium text-ink">
            <span class="h-2 w-2 rounded-full bg-citrus-glow" aria-hidden="true" />
            Projects
          </p>
          <h1 class="ds-hero-title">
            Things I've made trying to put my <mark class="ds-hl-mark">dent</mark> in the
            <span class="ds-hl-underline">universe</span>.
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-body">{{ intro }}</p>
        </div>
      </Container>

      <!-- Colour-block grid -->
      <Container class="mt-16">
        <ProjectGrid :projects="projects" />
      </Container>

      <!-- GitHub strip -->
      <Container class="mt-12">
        <section class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-citrus-tint px-7 py-6">
          <p class="text-base text-ink">The smaller experiments live on GitHub.</p>
          <ActionButton variant="primary" href="https://github.com/pshushereba" target="_blank" rel="noopener">
            See them on GitHub
            <template #icon>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
            </template>
          </ActionButton>
        </section>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
const intro =
  "I've worked on tons of little projects over the years, but these are the ones I'm most proud of. Two are products I'm building now, one is the site you're reading, and one is still a sketch.";

useSeoMeta({
  title: 'Projects — Patrick Shushereba',
  description: intro,
});

const { data: projectList } = await useAsyncData('projects', () => queryCollection('projects').all());

const projects = computed(() => projectList.value ?? []);
</script>
