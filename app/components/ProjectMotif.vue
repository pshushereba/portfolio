<template>
  <!-- sun: a sun rises and grows, a ring rolls -->
  <div v-if="motif === 'sun'" :class="classes" aria-hidden="true">
    <span class="ds-motif-sun" />
    <span class="ds-motif-ring" />
  </div>

  <!-- rows: mapped rows fill in -->
  <div v-else-if="motif === 'rows'" :class="classes" aria-hidden="true">
    <span v-for="(row, i) in rows" :key="i" class="ds-motif-track">
      <span
        :class="['ds-motif-fill', `ds-motif-fill--${row.color}`]"
        :style="{ '--w': row.width, '--to': row.to, '--delay': `${row.delay}ms` }"
      />
    </span>
  </div>

  <!-- skyline: buildings grow from the bottom edge -->
  <div v-else-if="motif === 'skyline'" :class="classes" aria-hidden="true">
    <span
      v-for="(b, i) in buildings"
      :key="i"
      :class="['ds-motif-bld', `ds-motif-bld--${b.color}`]"
      :style="{ '--h': `${b.height}px`, '--to': b.to, '--grow': b.grow, '--delay': `${b.delay}ms` }"
    />
  </div>

  <!-- code: an editor; a hidden line types itself in before the cursor -->
  <div v-else :class="classes" aria-hidden="true">
    <span class="ds-motif-dots"><span /><span /><span /></span>
    <span class="ds-motif-line"><span class="ds-motif-kw">function</span> <span class="ds-motif-fn">twoSum</span>(nums, target) {</span>
    <span class="ds-motif-line ds-motif-line--1"><span class="ds-motif-kw">const</span> seen = <span class="ds-motif-kw">new</span> <span class="ds-motif-type">Map</span>();</span>
    <span class="ds-motif-line ds-motif-line--1"><span class="ds-motif-kw">for</span> (<span class="ds-motif-kw">let</span> i = 0; i &lt; nums.length; i++) {</span>
    <span class="ds-motif-line ds-motif-line--2"><span class="ds-motif-typed"><span class="ds-motif-kw">if</span> (seen.<span class="ds-motif-fn">has</span>(target - nums[i]))</span><span class="ds-motif-cursor" /></span>
    <span class="ds-motif-line ds-motif-line--1">}</span>
    <span class="ds-motif-line">}</span>
  </div>
</template>

<script setup lang="ts">
import type { ProjectMotif } from '~/types/portfolio';

/**
 * The decorative illustration on a project tile or hero. Purely CSS-driven: on a tile the
 * animation runs on the parent `.ds-block:hover` / `:focus-within`; `state="after"` freezes the
 * finished state for the hero, where `size="hero"` also draws it larger.
 */
const props = withDefaults(
  defineProps<{
    motif: ProjectMotif;
    state?: 'rest' | 'after';
    size?: 'tile' | 'hero';
  }>(),
  { state: 'rest', size: 'tile' },
);

const classes = computed(() => [
  'ds-motif',
  `ds-motif--${props.motif}`,
  `ds-motif--${props.size}`,
  { 'ds-motif--after': props.state === 'after' },
]);

type RowColor = 'sun' | 'glow' | 'white' | 'ink';
interface Row {
  color: RowColor;
  width: string;
  /** scaleX reached on hover (tile only). */
  to: number;
  delay: number;
}

/** Tile: three short fills that stretch on hover. Hero: four tracks already filled. */
const TILE_ROWS: Row[] = [
  { color: 'sun', width: '28%', to: 3.2, delay: 0 },
  { color: 'glow', width: '18%', to: 4.4, delay: 70 },
  { color: 'white', width: '40%', to: 2, delay: 140 },
];
const HERO_ROWS: Row[] = [
  { color: 'sun', width: '90%', to: 1, delay: 0 },
  { color: 'glow', width: '78%', to: 1, delay: 0 },
  { color: 'white', width: '82%', to: 1, delay: 0 },
  { color: 'ink', width: '40%', to: 1, delay: 0 },
];
const rows = computed(() => (props.size === 'hero' ? HERO_ROWS : TILE_ROWS));

/** Five bottom-aligned bars; `to` is the scaleY reached on hover, `grow` the flex share. */
const buildings = [
  { color: 'ink', height: 30, to: 1.5, grow: 1, delay: 0 },
  { color: 'ink', height: 50, to: 1.2, grow: 1, delay: 40 },
  { color: 'teal', height: 36, to: 1.6, grow: 1.4, delay: 80 },
  { color: 'ink', height: 62, to: 1.15, grow: 1, delay: 120 },
  { color: 'glow', height: 24, to: 2, grow: 0.8, delay: 160 },
] as const;
</script>
