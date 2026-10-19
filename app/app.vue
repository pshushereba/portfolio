<template>
  <div class="flex h-full flex-col bg-page">
    <div class="fixed inset-0 flex justify-center sm:px-8">
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
