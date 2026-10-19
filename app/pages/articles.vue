<template>
  <SimpleLayout
    title="Writing on software design, electronics, chess and books."
    intro="All of my long-form thoughts on programming, leadership, software design, and more, collected."
  >
    <div class="flex flex-col gap-16">
      <Card v-for="article in articleList" :key="article.path" :article="article" />
    </div>
  </SimpleLayout>
</template>

<script setup lang="ts">
const { data: articleList } = await useAsyncData('articleList', () => {
  return queryCollection('blog').all();
});
</script>
