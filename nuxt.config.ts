// https://nuxt.com/docs/api/configuration/nuxt-config

import process from 'node:process'

export default defineNuxtConfig({

  modules: ['@nuxtjs/mdc', '@nuxt/eslint', '@pinia/nuxt', '@nuxt/ui'],
  devtools: { enabled: true },

  css: ['./public/tailwind.css'],

  runtimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  pinia: {
    storesDirs: [
      './app/stores',
    ],
  },
})
