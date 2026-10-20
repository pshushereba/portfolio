<template>
  <PopoverPanel label="Navigation">
    <template #trigger="{ toggle, triggerAttrs }">
      <button type="button" class="ds-pill ds-popover-trigger" v-bind="triggerAttrs" @click="toggle">
        Menu
        <svg viewBox="0 0 8 6" aria-hidden="true"><path d="M1.75 1.75 4 4.25l2.25-2.5" /></svg>
      </button>
    </template>

    <div class="ds-popover-head">
      <h2 class="ds-popover-title">Navigation</h2>
      <button type="button" class="ds-icon-btn" data-popover-close aria-label="Close menu">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" /></svg>
      </button>
    </div>
    <nav aria-label="Main">
      <ul class="ds-menu-list">
        <li v-for="item in items" :key="item.to">
          <NuxtLink :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </PopoverPanel>
</template>

<script setup lang="ts">
import type { NavItem } from '~/utils/navigation';

defineProps<{ items: NavItem[] }>();

const route = useRoute();
</script>
