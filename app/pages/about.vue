<template>
  <div>
    <main>
      <!-- Hero -->
      <Container class="mt-9">
        <div class="max-w-[48rem]">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-tint px-3 py-0.5 text-xs font-medium text-ink">
            <span class="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
            About me
          </p>
          <h1 class="ds-hero-title">
            I'm Patrick. I took the <span class="ds-hl-underline">scenic route</span> into
            <mark class="ds-hl-mark">software</mark>.
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-body">
            Before I wrote code for a living, I studied political science and spent years inside the legal system —
            first at the San Bernardino County Superior Court, then as a paralegal. Today I'm a software developer at
            Esri in Redlands, California, and on the side I'm building
            <a
              href="https://supadata.app"
              target="_blank"
              rel="noopener"
              class="font-semibold text-citrus hover:text-citrus-hover"
              >Supadata</a
            >
            and
            <a
              href="https://appetizen.com"
              target="_blank"
              rel="noopener"
              class="font-semibold text-citrus hover:text-citrus-hover"
              >Appetizen</a
            >.
          </p>
        </div>
      </Container>

      <!-- Route band (brings its own 72px top margin) -->
      <Container>
        <RouteBand />
      </Container>

      <!-- Story + sidebar -->
      <Container class="mt-[88px]">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-16">
          <article class="max-w-2xl">
            <h2 class="text-xl leading-7 font-semibold text-ink-strong">From case files to code</h2>
            <p class="mt-4 text-base text-body">
              I spent three years at the San Bernardino County Superior Court as a legal processing assistant, then
              moved to Fragomen as an assistant paralegal.
              <!-- TODO(patrick) -->
              [TODO Patrick: what pulled you toward software — the moment it clicked, or the problem you wanted to
              solve.]
            </p>
            <p class="mt-7 text-base text-body">
              In 2021 I joined Nexient as a developer and haven't looked back. Now I'm at Esri.
              <!-- TODO(patrick) -->
              [TODO Patrick: what kind of work you do there, and what you care about as an engineer.]
            </p>

            <blockquote class="ds-quote mt-10">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 18v-4.5C4 9.4 6.2 6.6 10 6l.6 1.6C8.4 8.3 7.3 9.7 7.2 11.5H10V18H4Zm9 0v-4.5c0-4.1 2.2-6.9 6-7.5l.6 1.6c-2.2.7-3.3 2.1-3.4 3.9H19V18h-6Z"
                />
              </svg>
              <!-- TODO(patrick) -->
              [TODO Patrick: a line you live by — about building, running or learning.]
            </blockquote>

            <h2 class="mt-12 text-xl leading-7 font-semibold text-ink-strong">What I'm building now</h2>
            <p class="mt-4 text-base text-body">
              <a
                href="https://supadata.app"
                target="_blank"
                rel="noopener"
                class="font-semibold text-citrus hover:text-citrus-hover"
                >Supadata</a
              >
              maps data from various sources to your Supabase database.
              <a
                href="https://appetizen.com"
                target="_blank"
                rel="noopener"
                class="font-semibold text-citrus hover:text-citrus-hover"
                >Appetizen</a
              >
              is a platform that lets creators monetize their audiences. I write about what I learn along the way on
              the
              <NuxtLink to="/articles" class="font-semibold text-citrus hover:text-citrus-hover">articles page</NuxtLink>.
            </p>
          </article>

          <div class="flex flex-col gap-6">
            <h2 class="text-sm font-semibold text-ink-strong">Off the clock</h2>

            <SideTile title="Bookworm" tone="sun" to="/books" cta="See my bookshelf">
              <template #icon>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 6.5C10.5 5.2 8.2 4.75 4.75 4.75v13.5c3.45 0 5.75.45 7.25 1.75 1.5-1.3 3.8-1.75 7.25-1.75V4.75c-3.45 0-5.75.45-7.25 1.75ZM12 6.5V20"
                  />
                </svg>
              </template>
              <!-- TODO(patrick) -->
              Currently reading <strong class="font-semibold text-ink">[TODO: book title]</strong>. Everything I've
              read lately lives on the books page.
            </SideTile>

            <SideTile title="Distance runner" tone="teal">
              <template #icon>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="14.5" cy="4.75" r="1.75" />
                  <path d="m6 20 3.5-5 3 2.5V21M9.5 15l1.5-5.5 3.5 2.5 3 .5M11 9.5 7.5 9l-2 3" />
                </svg>
              </template>
              <!-- TODO(patrick) -->
              [TODO Patrick: favourite route, next race, or a distance you're proud of.]
            </SideTile>

            <SideTile title="Always building" tone="citrus" to="/articles" cta="Read my articles">
              <template #icon>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8.25 8-4 4 4 4M15.75 8l4 4-4 4M13.5 5.5l-3 13" />
                </svg>
              </template>
              Side projects are how I learn. I write up the lessons, bugs and wins as I go.
            </SideTile>

            <SidebarPanel title="Say hello" class="mt-4">
              <p class="ds-panel-body">I'm always happy to talk about software, side projects or a good book.</p>
              <div class="mt-5 flex flex-wrap gap-3">
                <ActionButton variant="ghost" href="https://github.com/pshushereba" target="_blank" rel="noopener">
                  <template #lead>
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="ds-btn-mark" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                      />
                    </svg>
                  </template>
                  GitHub
                </ActionButton>
                <ActionButton variant="ghost" href="https://www.linkedin.com/in/pshushereba/" target="_blank" rel="noopener">
                  <template #lead>
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="ds-btn-mark" fill="currentColor">
                      <path
                        d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
                      />
                    </svg>
                  </template>
                  LinkedIn
                </ActionButton>
                <ActionButton variant="secondary" :href="pdfResume" download="Shushereba_Resume.pdf">
                  Download CV
                  <template #icon>
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" /></svg>
                  </template>
                </ActionButton>
              </div>
            </SidebarPanel>
          </div>
        </div>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import pdfResume from '~/assets/static/resume.pdf';

useSeoMeta({
  title: 'About — Patrick Shushereba',
  description:
    "I'm Patrick, a software developer at Esri in Redlands, California, who took the scenic route into software.",
});
</script>
