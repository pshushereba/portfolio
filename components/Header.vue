<template>
  <div>
    <header class="relative z-50 flex flex-col">
      <div class="order-last" />
      <Container class="top-0 order-last -mb-3 pt-3">
        <div class="w-full">
          <!-- <div class="relative">
            <AvatarContainer class="absolute left-0 top-3 origin-left transition-opacity" />
            <Avatar large class="block h-16 w-16 origin-left" />
          </div> -->
        </div>
      </Container>

      <div class="top-0 z-10 h-16 pt-6">
        <Container class="w-full">
          <div class="relative flex gap-4">
            <div class="flex flex-1">
              <!-- <AvatarContainer>
                <Avatar />
              </AvatarContainer> -->
            </div>
            <div class="flex flex-1 justify-end md:justify-center">
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
                <NuxtLink
                  to="/books"
                  class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                  >Books</NuxtLink
                >
              </nav>
            </div>
            <div class="flex justify-end md:flex-1">
              <!-- <div class="pointer-events-auto">
                <ModeToggle />
              </div> -->
            </div>
          </div>
        </Container>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
