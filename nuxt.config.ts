// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-10-19',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      script: [
        {
          // Apply the saved (or system) theme before first paint so there is no flash.
          // Kept tiny and dependency-free; ThemeSwitch.vue writes the same `theme` key.
          innerHTML:
            "(function(){try{var s=localStorage.getItem('theme');var t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.dataset.theme=t}catch(e){}})()",
          tagPosition: 'head',
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
  },
});
