<template>
  <div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
    <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        class="h-6 w-6 flex-none"
      >
        <path
          d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
          class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        />
        <path
          d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
          class="stroke-zinc-400 dark:stroke-zinc-500"
        />
      </svg>
      <span class="ml-3">Stay up to date</span>
    </h2>
    <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form
          action="https://dev.us7.list-manage.com/subscribe/post?u=f1c87cb6990c1181dc1ddb6cc&amp;id=d4af0b1253&amp;v_id=4208&amp;f_id=005385e3f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_self"
          novalidate=""
        >
          <div id="mc_embed_signup_scroll" class="flex items-center mt-6">
            <div class="mc-field-group flex-auto">
              <input
                type="email"
                name="EMAIL"
                class="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm required email"
                id="mce-EMAIL"
                required=""
                value=""
                placeholder="Email address"
                aria-label="Email address"
              />
            </div>

            <div hidden=""><input type="hidden" name="tags" value="7015796,7015800" /></div>
            <div id="mce-responses" class="clearfalse">
              <div class="response" id="mce-error-response" style="display: none"></div>
              <div class="response" id="mce-success-response" style="display: none"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px">
              <input
                type="text"
                name="b_f1c87cb6990c1181dc1ddb6cc_d4af0b1253"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="clear">
              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="ml-4 flex-none dark:text-white"
              >
                Join
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
