<template>
  <Container class="mt-16 sm:mt-32">
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <img
            :src="aboutMain"
            alt=""
            sizes="(min-width: 1024px) 32rem, 20rem"
            class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
          />
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          I'm Patrick Shushereba. I live in Southern California, where I design the future.
        </h1>
        <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>
            Leverage agile frameworks to provide a robust synopsis for high level overviews.
            Iterative approaches to corporate strategy foster collaborative thinking to further the
            overall value proposition. Organically grow the holistic world view of disruptive
            innovation via workplace diversity and empowerment.
          </p>
          <p>
            Bring to the table win-win survival strategies to ensure proactive domination. At the
            end of the day, going forward, a new normal that has evolved from generation X is on the
            runway heading towards a streamlined cloud solution. User generated content in real-time
            will have multiple touchpoints for offshoring.
          </p>
          <p>
            Capitalize on low hanging fruit to identify a ballpark value added activity to beta
            test. Override the digital divide with additional clickthroughs from DevOps.
            Nanotechnology immersion along the information highway will close the loop on focusing
            solely on the bottom line.
          </p>
          <p>
            Podcasting operational change management inside of workflows to establish a framework.
            Taking seamless key performance indicators offline to maximise the long tail. Keeping
            your eye on the ball while performing a deep dive on the start-up mentality to derive
            convergence on cross-platform integration.
          </p>
        </div>
      </div>
      <div class="lg:pl-20">
        <ul role="list">
          <!-- <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={InstagramIcon} class="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href="#" icon={GitHubIcon} class="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="#" icon={LinkedInIcon} class="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:spencer@planetaria.tech"
                icon={MailIcon}
                class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                spencer@planetaria.tech
              </SocialLink> -->
        </ul>
      </div>
    </div>
  </Container>
</template>

<script>
import aboutMain from '@/assets/images/about_main.jpg';
export default {
  setup() {
    return {
      aboutMain,
    };
  },
};
</script>

<style lang="scss" scoped></style>
