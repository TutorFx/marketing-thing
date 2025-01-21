// https://nuxt.com/docs/api/configuration/nuxt-config

import process from 'node:process'

export default defineNuxtConfig({

  modules: [
    '@nuxtjs/mdc',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/content',
  ],

  devtools: { enabled: true },

  css: ['./public/tailwind.css'],

  runtimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    google: {
      clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
    },
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
