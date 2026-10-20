<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <h1
        class="text-4xl font-bold tracking-tight text-ink sm:text-5xl"
      >
        {{ title }}
      </h1>
      <p class="mt-6 text-base text-body">
        {{ intro }}
      </p>
    </header>
    <div class="mt-16 sm:mt-20">
      <slot />
    </div>
  </Container>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  intro: string;
}>();
</script>
