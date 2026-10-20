<template>
  <section class="ds-route" aria-labelledby="route-heading">
    <div class="ds-route-head">
      <h2 id="route-heading" class="ds-route-title">The route so far</h2>
      <p class="ds-route-caption">~10 years, 4 stops, still running</p>
    </div>

    <!-- Decorative path: the cards below carry the same information. Hidden under 720px. -->
    <div class="ds-route-path" aria-hidden="true">
      <svg viewBox="0 0 1000 128" preserveAspectRatio="none">
        <path
          d="M0 104 C 50 104, 80 44, 125 44 S 280 100, 375 88 S 520 24, 625 32 S 790 104, 875 64 S 960 20, 1000 20"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <template v-for="stop in stops" :key="stop.place">
        <span
          v-if="stop.tone === 'sun'"
          class="ds-route-finish"
          :style="{ left: `${stop.marker.x}%`, top: `${stop.marker.top}px` }"
        >
          <svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>
        </span>
        <span
          v-else
          :class="['ds-route-stop', `ds-route-stop--${stop.tone}`]"
          :style="{ left: `${stop.marker.x}%`, top: `${stop.marker.top}px` }"
        />
      </template>
    </div>

    <ol class="ds-route-stops">
      <li v-for="stop in stops" :key="stop.place" :class="['ds-route-card', { 'ds-route-card--sun': stop.tone === 'sun' }]">
        <p :class="['ds-route-when', `ds-route-when--${stop.tone}`]">
          <template v-if="stop.start && stop.end">
            <time :datetime="stop.start">{{ stop.start }}</time>
            <span aria-hidden="true">—</span>
            <time :datetime="stop.end">{{ stop.end }}</time>
          </template>
          <template v-else>{{ stop.when }}</template>
        </p>
        <p class="ds-route-place">{{ stop.place }}</p>
        <p class="ds-route-role">{{ stop.role }}</p>
      </li>
    </ol>

    <span class="ds-skyline-ground" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
/**
 * Career stops for the About page. Deliberately separate from WorkHistory.vue's résumé data,
 * which doesn't include Esri yet. `sun` is the finish marker / current stop.
 */
interface Stop {
  /** Shown when there is no start/end pair (e.g. "Now"). */
  when: string;
  start?: string;
  end?: string;
  place: string;
  role: string;
  tone: 'ink' | 'teal' | 'citrus' | 'sun';
  /** Marker centre on the path: x as a percentage of the width, top in px. */
  marker: { x: number; top: number };
}

const stops: Stop[] = [
  {
    when: '2016 — 2019',
    start: '2016',
    end: '2019',
    place: 'San Bernardino County Superior Court',
    role: 'Legal processing assistant',
    tone: 'ink',
    marker: { x: 12.5, top: 34 },
  },
  {
    when: '2019 — 2020',
    start: '2019',
    end: '2020',
    place: 'Fragomen, Del Rey, Bernsen & Loewy',
    role: 'Assistant paralegal',
    tone: 'teal',
    marker: { x: 37.5, top: 78 },
  },
  {
    when: '2021 — 2023',
    start: '2021',
    end: '2023',
    place: 'Nexient',
    role: 'Developer II — my first job writing code',
    tone: 'citrus',
    marker: { x: 62.5, top: 22 },
  },
  {
    when: 'Now',
    place: 'Esri',
    role: 'Software developer — building Supadata and Appetizen on the side',
    tone: 'sun',
    marker: { x: 87.5, top: 42 },
  },
];
</script>
