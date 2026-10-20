<template>
  <footer class="mt-32">
    <div class="sm:px-8">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="border-t border-line pt-10 pb-16">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-6xl">
              <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <nav aria-label="Footer" class="flex gap-6 text-sm font-medium text-ink">
                  <NuxtLink
                    v-for="item in siteNavigation"
                    :key="item.to"
                    :to="item.to"
                    class="transition hover:text-citrus"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </nav>
                <p class="text-sm text-muted">
                  &copy; {{ new Date().getFullYear() }} Patrick Shushereba. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteNavigation } from '~/utils/navigation';
</script>
