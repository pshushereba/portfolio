<template>
  <button
    type="button"
    class="ds-pill ds-toggle"
    :aria-pressed="isDark ? 'true' : 'false'"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <svg class="ds-sun" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path fill="none" d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" />
    </svg>
    <svg class="ds-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark';

const isDark = ref(false);

function apply(theme: Theme) {
  const root = document.documentElement;
  // Switch instantly: no colour transitions mid-flip.
  root.classList.add('**:transition-none!');
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  isDark.value = theme === 'dark';
  window.setTimeout(() => root.classList.remove('**:transition-none!'), 0);
}

function toggle() {
  const next: Theme = isDark.value ? 'light' : 'dark';
  apply(next);
  const system: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    if (next === system) localStorage.removeItem('theme');
    else localStorage.setItem('theme', next);
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page view only.
  }
}

onMounted(() => {
  // The head script in nuxt.config.ts has already applied the theme; read it back.
  isDark.value = document.documentElement.classList.contains('dark');
});
</script>
