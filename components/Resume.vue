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
          d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
          class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        />
        <path
          d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
          class="stroke-zinc-400 dark:stroke-zinc-500"
        />
      </svg>
      <span class="ml-3">Work</span>
    </h2>
    <ol class="mt-6 space-y-4" v-for="(job, index) in resume">
      <li :key="index" class="flex gap-4">
        <div
          class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
        >
          <img v-if="job.logo" :src="job.logo" alt="" class="h-7 w-7 rounded-full" unoptimized />
          <span v-else>
            <BuildingOfficeIcon class="h-5 w-5 flex-shrink-0 text-gray-400" />
          </span>
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Company</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {{ job.company }}
          </dd>
          <dt class="sr-only">Role</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">{{ job.title }}</dd>
          <dt class="sr-only">Date</dt>
          <dd class="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
            <time :dateTime="job.start.dateTime">
              <span v-if="job.start.label">{{ job.start.label }}</span>
              <span v-else>{{ job.start }}</span> </time
            ><span aria-hidden="true">—</span>
            <time :dateTime="job.end.dateTime">
              <span v-if="job.end.label">{{ job.end.label }}</span>
              <span v-else="job.end">{{ job.end }}</span>
            </time>
          </dd>
        </dl>
      </li>
    </ol>
    <button
      @click="downloadResume"
      variant="secondary"
      class="group mt-6 w-full inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
    >
      Download CV
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
      >
        <path
          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import nexient from '~/assets/images/nexient.png';
import sbc from '~/assets/images/san_bern_court.png';
import { BuildingOfficeIcon } from '@heroicons/vue/20/solid';
import pdf_resume from "~/assets/static/resume.pdf"

let resume = ref([
  {
    company: 'Nexient',
    title: 'Developer II',
    logo: nexient,
    start: '2021',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear(),
    },
  },
  {
    company: 'Fragomen, Del Rey, Bernsen, & Loewy',
    title: 'Assistant Paralegal',
    logo: null,
    start: '2019',
    end: '2020',
  },
  {
    company: 'San Bernardino County Superior Court',
    title: 'Legal Processing Assistant',
    logo: sbc,
    start: '2016',
    end: '2019',
  },
]);

function downloadResume() {
  const link = document.createElement('a');
  link.href = pdf_resume
  link.download = 'Shushereba_Resume.pdf';
  link.target = '_blank'
  link.click()
}
</script>

<style lang="scss" scoped></style>
