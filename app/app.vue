<template>
  <div class="relative flex min-h-screen flex-col bg-page">
    <!-- The centred white frame. Absolute (not fixed) so it spans the whole page,
         including full-page screenshots, link previews and print. -->
    <div class="pointer-events-none absolute inset-0 flex justify-center sm:px-8">
      <div class="flex w-full max-w-7xl lg:px-8">
        <div class="w-full bg-surface ring-1 ring-line-strong" />
      </div>
    </div>
    <div class="relative">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
  </div>
</template>
