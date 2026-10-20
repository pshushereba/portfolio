<template>
  <ul role="list" class="ds-blocks">
    <ProjectBlock v-for="project in ordered" :key="project.path" :project="project" />
  </ul>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio';
import { byOrder } from '~/utils/projects';

/** The colour-block grid on /projects: six columns, tiles ordered by `order`. */
const props = defineProps<{ projects: Project[] }>();

const ordered = computed(() => byOrder(props.projects));
</script>
