<template>
  <SimpleLayout
    title="Things I've made trying to put my dent in the universe."
    intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of."
  >
    <div class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      <ul role="list" v-for="project in projects">
        <ProjectCard :project="project" />
      </ul>
    </div>
  </SimpleLayout>
</template>

<script setup>
import appetizenLogo from '~/assets/images/appetizen_logo.png';
import supadataLogo from '~/assets/images/supadata_logo_transparent.png';
import projectIcon from '~/assets/images/project_icon.png';
let projects = ref([
  {
    name: 'Appetizen',
    description:
      'Enabling creators to monetize their audiences through a platform that provides a seamless experience for both creators and their fans.',
    link: { href: 'https://appetizen.com', label: 'appetizen.com' },
    logo: appetizenLogo,
  },
  {
    name: 'Supadata',
    description: 'A tool to map data from from various sources to your Supabase database.',
    link: { href: 'https://supadata.app', label: 'supadata.app' },
    logo: supadataLogo,
  },
]);
</script>

<style lang="scss" scoped></style>
