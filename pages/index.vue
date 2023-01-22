<template>
  <div>
    <title>Patrick Shushereba - Software Developer, founder, and amateur astronaut</title>
    <meta
      name="description"
      content="I'm Spencer, a software designer and entrepreneur based in New York City. I'm the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
    />
    <main>
      <Container class="mt-9">
        <div class="max-w-2xl">
          <h1
            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          >
            Software Developer, bookworm, and distance runner.
          </h1>
          <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm Patrick, a software developer based in Southern California. I'm the creator of
            Appetizen, where we provide a platform which enables creators to monetize their
            audiences. Also the author of the Lard Have Mercy blog.
          </p>
          <div class="mt-6 flex gap-6">
            <!-- <SocialLink
                href="https://twitter.com"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://instagram.com"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://linkedin.com"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              /> -->
          </div>
        </div>
      </Container>
      <Container>
        <Skyline />
      </Container>
      <Container class="mt-24 md:mt-28">
        <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div class="flex flex-col gap-16">
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
          <div class="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </main>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
