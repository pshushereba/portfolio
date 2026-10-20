<template>
  <li :class="['ds-block', `ds-block--${project.tone}`, `ds-block--${project.size}`, `ds-block--m-${project.motif}`]">
    <ProjectMotif v-if="project.motif === 'sun'" motif="sun" size="tile" />

    <div class="ds-block-text">
      <div class="ds-block-top">
        <span v-if="project.logo" class="ds-block-well" aria-hidden="true">
          <img :src="project.logo" alt="" width="40" height="40" />
        </span>
        <span class="ds-block-pill">{{ project.status }}</span>
      </div>

      <ProjectMotif v-if="project.motif === 'rows'" motif="rows" size="tile" />

      <h2 class="ds-block-title">
        <NuxtLink :to="project.path" class="ds-block-link">{{ project.title }}</NuxtLink>
      </h2>
      <p class="ds-block-desc">{{ project.description }}</p>
      <p v-if="external" class="ds-block-ext">
        <a :href="external.href" target="_blank" rel="noopener">{{ external.label }}</a>
      </p>

      <ProjectMotif v-if="project.motif === 'skyline'" motif="skyline" size="tile" />
    </div>

    <ProjectMotif v-if="project.motif === 'code'" motif="code" size="tile" />

    <span class="ds-block-go" aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M3.5 8h9M8.5 4l4 4-4 4" /></svg>
    </span>
  </li>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio';
import { externalLink } from '~/utils/projects';

/**
 * One tile of the /projects grid. The title is the tile's one real link and its ::after covers
 * the whole tile; the external link is a second, separately focusable link above it. The Go
 * button and the motif are decorative. The tile never moves: hover and focus-within drive the
 * motif and the Go button through CSS (see "Project blocks" in components.css).
 */
const props = defineProps<{ project: Project }>();

const external = computed(() => externalLink(props.project));
</script>
