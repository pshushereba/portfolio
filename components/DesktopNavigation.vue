<template>
  <nav
    class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
  >
    <NuxtLink
      to="/about"
      class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
      >About</NuxtLink
    >
    <NuxtLink
      to="/articles"
      class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
      >Articles</NuxtLink
    >
    <NuxtLink
      to="/projects"
      class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
      >Projects</NuxtLink
    >
    <!-- <NuxtLink
      to="/books"
      class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
      >Books</NuxtLink
    > -->
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
