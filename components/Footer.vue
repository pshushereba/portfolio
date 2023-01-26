<template>
  <footer class="mt-32">
    <div class="sm:px-8">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">
              <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div class="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NuxtLink to="/about">About</NuxtLink>
                  <NuxtLink to="/articles">Articles</NuxtLink>
                  <NuxtLink to="/projects">Projects</NuxtLink>
                  <NuxtLink to="/books">Books</NuxtLink>
                </div>
                <p class="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {{ new Date().getFullYear() }} Patrick Shushereba. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
