<template>
  <div role="img" :aria-label="label" class="mt-5 flex flex-wrap items-center gap-3">
    <div class="flex flex-col gap-2">
      <span
        v-for="(source, i) in sources"
        :key="source"
        class="inline-flex items-center gap-2 rounded-xl bg-citrus-tint px-3 py-2 text-sm font-medium text-ink"
      >
        <span :class="['h-2 w-2 flex-none rounded-full', DOTS[i % DOTS.length]]" />
        {{ source }}
      </span>
    </div>
    <svg viewBox="0 0 40 16" class="h-4 w-10 flex-none fill-none stroke-muted stroke-[1.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 8h34M30 3l6 5-6 5" />
    </svg>
    <span class="rounded-xl bg-teal px-4 py-3 text-sm font-semibold text-on-teal">{{ step }}</span>
    <svg viewBox="0 0 40 16" class="h-4 w-10 flex-none fill-none stroke-muted stroke-[1.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 8h34M30 3l6 5-6 5" />
    </svg>
    <span class="rounded-xl border-2 border-ink px-3.5 py-2.5 text-sm font-semibold text-ink">{{ destination }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * "How it works" diagram for project pages: `::project-flow` in markdown (Supadata's values are
 * the defaults), or with props:
 *
 *   ::project-flow
 *   ---
 *   sources: [Webhook, CSV export]
 *   step: Clean up
 *   destination: Your warehouse
 *   ---
 *   ::
 */
const props = withDefaults(
  defineProps<{
    sources?: string[];
    step?: string;
    destination?: string;
  }>(),
  {
    sources: () => ['Browser extension', 'API connectors', 'Spreadsheet upload'],
    step: 'Map fields',
    destination: 'Your Supabase database',
  },
);

const DOTS = ['bg-citrus-glow', 'bg-sun', 'bg-teal'];

const label = computed(() => {
  const list =
    props.sources.length > 1
      ? `${props.sources.slice(0, -1).join(', ')} or ${props.sources[props.sources.length - 1]}`
      : props.sources.join('');
  return `${list}, then ${props.step}, then ${props.destination}.`;
});
</script>
