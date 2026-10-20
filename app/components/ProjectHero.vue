<template>
  <section :class="['ds-block-hero', `ds-block--${project.tone}`]" aria-labelledby="project-title">
    <div class="ds-block-hero-main">
      <div class="ds-block-top">
        <span v-if="project.logo" class="ds-block-well" aria-hidden="true">
          <img :src="project.logo" alt="" width="46" height="46" />
        </span>
        <span class="ds-block-pill">{{ project.status }}</span>
      </div>

      <h1 id="project-title" class="ds-block-hero-title">{{ project.title }}</h1>
      <p class="ds-block-hero-tagline">{{ project.tagline ?? project.description }}</p>

      <p v-if="site || code" class="ds-block-hero-actions">
        <a v-if="site" :href="site.href" target="_blank" rel="noopener" class="ds-block-btn">
          Visit {{ site.label }}
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
        </a>
        <a v-if="code" :href="code.href" target="_blank" rel="noopener" class="ds-block-btn">
          {{ code.label }}
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5.5 4.5-3.5 3.5 3.5 3.5M10.5 4.5l3.5 3.5-3.5 3.5" /></svg>
        </a>
      </p>
      <p v-else-if="project.isPublic === false" class="ds-block-hero-note">Not public yet</p>
    </div>

    <div :class="['ds-block-hero-art', `ds-block-hero-art--${project.motif}`]" aria-hidden="true">
      <ProjectMotif :motif="project.motif" state="after" size="hero" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio';
import { codeLink, siteLink } from '~/utils/projects';

/** The colour band at the top of /projects/[slug]: the same tone as the project's tile. */
const props = defineProps<{ project: Project }>();

const site = computed(() => siteLink(props.project));
const code = computed(() => codeLink(props.project));
</script>
