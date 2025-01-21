import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    prompts: defineCollection({
      type: 'page',
      source: 'prompts/**/*.md',
      schema: z.object({
        rawbody: z.string(),
      }),
    }),
  },
})
