<template>
  <article class="ds-card-item ds-card--compact">
    <NuxtLink to="/articles" class="ds-card">
      <span class="ds-art ds-art--card ds-art--compact ds-archive-art" aria-hidden="true">
        <span class="ds-art-top"><span>The whole archive</span></span>
        <span class="ds-wordmark ds-archive-rule" style="color: inherit">Stack Trace<span class="ds-cursor ds-cursor--md" /></span>
        <span class="ds-swatches">
          <span style="background: #ff922b" />
          <span style="background: #2dd4bf" />
          <span style="background: #fcc419" />
        </span>
        <span class="ds-strip ds-strip--sun">
          See every article
          <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </span>
      </span>
      <span class="ds-kicker ds-card-kicker" style="color: var(--text-muted)">All sections</span>
      <span class="ds-card-title"><span class="ds-sweep">Back to all articles</span></span>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
/** The "Keep reading" card that points back at /articles. */
</script>
