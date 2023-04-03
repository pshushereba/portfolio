<template>
  <div>
    <header class="relative z-50 flex flex-col">
      <div class="order-last" />
      <Container class="top-0 order-last -mb-3 pt-3">
        <div class="w-full">
          <div v-if="isHome" class="relative">
            <!-- <AvatarContainer class="absolute left-0 top-3 origin-left transition-opacity" /> -->
            <!--Set up a prop for Avatar in order to conditionally set the height and width-->
            <Avatar class="block h-16 w-16 origin-left" />
          </div>
        </div>
      </Container>

      <div class="top-0 z-10 h-16 pt-6">
        <Container class="w-full">
          <div class="relative flex gap-4">
            <div class="flex flex-1">
              <template v-if="!isHome">
                <AvatarContainer>
                  <Avatar />
                </AvatarContainer>
              </template>
            </div>
            <div class="flex flex-1 justify-end md:justify-center">
              <MobileNavigation class="pointer-events-auto md:hidden" />
              <DesktopNavigation class="pointer-events-auto hidden md:flex" />
            </div>
            <div class="flex justify-end md:flex-1">
              <div class="pointer-events-auto">
                <ToggleSwitch />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  </div>
</template>

<script setup>
const route = useRoute();

const isHome = computed(() => route.path === '/');
</script>

<style lang="scss" scoped></style>
