<template>
  <SidebarPanel title="Stay up to date">
    <template #icon>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path class="ds-ico-fill" d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" />
        <path class="ds-ico-line" d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" />
      </svg>
    </template>
    <p class="ds-panel-body">Get notified when I publish something new, and unsubscribe at any time.</p>

    <!-- Mailchimp embedded form: field names and hidden inputs must stay as Mailchimp expects. -->
    <form
      action="https://dev.us7.list-manage.com/subscribe/post?u=f1c87cb6990c1181dc1ddb6cc&amp;id=d4af0b1253&amp;v_id=4208&amp;f_id=005385e3f0"
      method="post"
      name="mc-embedded-subscribe-form"
      target="_self"
      class="ds-inline-form mt-6"
    >
      <TextField
        class="flex-auto"
        label="Email address"
        hide-label
        type="email"
        name="EMAIL"
        autocomplete="email"
        placeholder="Email address"
        required
      />
      <input type="hidden" name="tags" value="7015796,7015800" />
      <!-- Honeypot: real people never fill this in. -->
      <div aria-hidden="true" class="absolute -left-[5000px]">
        <input type="text" name="b_f1c87cb6990c1181dc1ddb6cc_d4af0b1253" tabindex="-1" value="" />
      </div>
      <ActionButton type="submit" class="flex-none">Join</ActionButton>
    </form>
  </SidebarPanel>
</template>
