<template>
  <nav class="ds-pill ds-nav" aria-label="Main">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :aria-current="isActive(item.to) ? 'page' : undefined"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '~/utils/navigation';

defineProps<{ items: NavItem[] }>();

const route = useRoute();
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`);
</script>
