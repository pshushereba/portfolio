<template>
  <HeadlessPopover v-slot="{ open }">
    <HeadlessPopoverButton
      class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
    >
      Menu
      <svg
        viewBox="0 0 8 6"
        aria-hidden="true"
        class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
      >
        <path
          d="M1.75 1.75 4 4.25l2.25-2.5"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </HeadlessPopoverButton>
    <HeadlessTransitionRoot>
      <HeadlessTransitionChild
        enter="duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <HeadlessPopoverOverlay
          class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"
        />
      </HeadlessTransitionChild>
      <HeadlessTransitionChild
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <HeadlessPopoverPanel
          focus
          class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div class="flex flex-row-reverse items-center justify-between">
            <HeadlessPopoverButton aria-label="Close menu" class="-m-1 p-1">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
              >
                <path
                  d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HeadlessPopoverButton>
            <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
          </div>
          <nav class="mt-6">
            <ul
              class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
            >
              <li>
                <HeadlessPopoverButton class="block py-2">
                  <NuxtLink to="/about">About</NuxtLink>
                </HeadlessPopoverButton>
              </li>
              <li>
                <HeadlessPopoverButton class="block py-2">
                  <NuxtLink to="/articles">Articles</NuxtLink>
                </HeadlessPopoverButton>
              </li>
              <li>
                <HeadlessPopoverButton class="block py-2">
                  <NuxtLink to="/projects">Projects</NuxtLink>
                </HeadlessPopoverButton>
              </li>
              <!-- <li>
                <HeadlessPopoverButton class="block py-2">
                  <NuxtLink to="/books">Books</NuxtLink>
                </HeadlessPopoverButton>
              </li> -->
            </ul>
          </nav>
        </HeadlessPopoverPanel>
      </HeadlessTransitionChild>
    </HeadlessTransitionRoot>
  </HeadlessPopover>
</template>

<script setup></script>

<style lang="scss" scoped></style>
