<template>
  <dl
    v-if="facts.length"
    class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-px overflow-hidden rounded-2xl bg-line-strong ring-1 ring-line-strong"
  >
    <div v-for="fact in facts" :key="fact.label" class="bg-surface px-6 py-5">
      <dt class="text-xs text-muted">{{ fact.label }}</dt>
      <dd v-if="fact.tags" class="mt-1 flex flex-wrap gap-1.5">
        <TopicTag v-for="tag in fact.tags" :key="tag" tone="teal">{{ tag }}</TopicTag>
      </dd>
      <dd v-else class="text-base font-semibold text-ink">{{ fact.value }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio';

/** Role · Started · Status · Built with. A cell with no data is skipped; no cells, no strip. */
const props = defineProps<{ project: Project }>();

interface Fact {
  label: string;
  value?: string;
  tags?: string[];
}

const facts = computed<Fact[]>(() => {
  const p = props.project;
  const rows: Fact[] = [];
  if (p.role) rows.push({ label: 'Role', value: p.role });
  if (p.started) rows.push({ label: 'Started', value: p.started });
  if (p.status) rows.push({ label: 'Status', value: p.status });
  if (p.stack?.length) rows.push({ label: 'Built with', tags: p.stack });
  return rows;
});
</script>
