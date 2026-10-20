<template>
  <div class="ds-progress" aria-hidden="true">
    <span class="ds-progress-bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<script setup lang="ts">
/** Sticky 4px bar whose width is the document's scroll progress. */
const progress = ref(0);

function update() {
  const el = document.scrollingElement ?? document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  progress.value = max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0;
}

onMounted(() => {
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update);
  window.removeEventListener('resize', update);
});
</script>
