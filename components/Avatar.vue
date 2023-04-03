<template>
  <div>
    <NuxtLink to="/">
      <img
        :src="avatarImg"
        class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
      />
    </NuxtLink>
  </div>
</template>

<script>
import avatarImg from '~/assets/images/patrick.png';
export default {
  setup() {
    return {
      avatarImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
