<template>
  <div>
    <NuxtLink to="/">
      <img
        :src="avatarImg"
        class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
      />
    </NuxtLink>
  </div>
</template>

<script>
import avatarImg from '~/assets/images/patrick.jpg';
export default {
  setup() {
    return {
      avatarImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
