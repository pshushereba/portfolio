<template>
  <header class="relative z-50 flex flex-col">
    <div class="order-last" />
    <Container class="top-0 order-last -mb-3 pt-3">
      <div v-if="isHome" class="relative">
        <ProfileAvatar :src="avatarImg" size="lg" accent class="inline-block origin-left" />
      </div>
    </Container>

    <div class="top-0 z-10 h-16 pt-6">
      <Container class="w-full">
        <div class="relative flex gap-4">
          <div class="flex flex-1">
            <ProfileAvatar v-if="!isHome" :src="avatarImg" ring />
          </div>
          <div class="flex flex-1 justify-end md:justify-center">
            <SiteMenu :items="siteNavigation" class="pointer-events-auto md:hidden" />
            <SiteNav :items="siteNavigation" class="pointer-events-auto hidden md:flex" />
          </div>
          <div class="flex justify-end md:flex-1">
            <div class="pointer-events-auto">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </Container>
    </div>
  </header>
</template>

<script setup lang="ts">
import avatarImg from '~/assets/images/patrick.png';
import { siteNavigation } from '~/utils/navigation';

const route = useRoute();
const isHome = computed(() => route.path === '/');
</script>
