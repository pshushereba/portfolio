<template>
  <SimpleLayout
    title="Writing on software design, electronics, chess and books."
    intro="All of my long-form thoughts on programming, leadership, software design, and more, collected."
  >
    <div v-for="article in articleList">
      <NuxtLink :to="article._path">
        <Card :article="article" :key="article._path" />
      </NuxtLink>
    </div>
  </SimpleLayout>
</template>

<script setup>
const { data: articleList } = await useAsyncData('articleList', () => {
  return queryContent('/blog').find();
});
</script>

<style lang="scss" scoped></style>
