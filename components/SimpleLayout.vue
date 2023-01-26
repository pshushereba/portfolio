<template>
  <Container className="mt-16 sm:mt-32">
    <header className="max-w-2xl">
      <h1
        className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
      >
        {{ title }}
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        {{ intro }}
      </p>
    </header>
    <div className="mt-16 sm:mt-20"></div>
  </Container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
