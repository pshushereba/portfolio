<template>
  <SidebarPanel title="Work">
    <template #icon>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path class="ds-ico-fill" d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" />
        <path class="ds-ico-line" d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5" />
      </svg>
    </template>

    <ol class="ds-work">
      <li v-for="job in resume" :key="job.company">
        <span class="ds-work-logo" aria-hidden="true">
          <img v-if="job.logo" :src="job.logo" alt="" class="h-7 w-7 rounded-full" />
          <BuildingOfficeIcon v-else class="h-5 w-5 text-muted" />
        </span>
        <dl>
          <dt>Company</dt>
          <dd class="ds-work-co">{{ job.company }}</dd>
          <dt>Role</dt>
          <dd class="ds-work-role">{{ job.title }}</dd>
          <dt>Date</dt>
          <dd class="ds-work-date">
            <time :datetime="dateTime(job.start)">{{ dateLabel(job.start) }}</time>
            <span aria-hidden="true"> — </span>
            <time :datetime="dateTime(job.end)">{{ dateLabel(job.end) }}</time>
          </dd>
        </dl>
      </li>
    </ol>

    <ActionButton variant="secondary" block :href="pdfResume" download="Shushereba_Resume.pdf" class="mt-6">
      Download CV
      <template #icon>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" /></svg>
      </template>
    </ActionButton>
  </SidebarPanel>
</template>

<script setup lang="ts">
import { BuildingOfficeIcon } from '@heroicons/vue/20/solid';
import nexient from '~/assets/images/nexient.png';
import sbc from '~/assets/images/san_bern_court.png';
import pdfResume from '~/assets/static/resume.pdf';
import type { Job, ResumeDate } from '~/types/portfolio';

const resume: Job[] = [
  {
    company: 'Nexient',
    title: 'Developer II',
    logo: nexient,
    start: '2021',
    end: '2023',
    // end: {
    //   label: 'Present',
    //   dateTime: String(new Date().getFullYear()),
    // },
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
];

function dateLabel(date: ResumeDate): string {
  return typeof date === 'string' ? date : date.label;
}

function dateTime(date: ResumeDate): string {
  return typeof date === 'string' ? date : date.dateTime;
}
</script>
