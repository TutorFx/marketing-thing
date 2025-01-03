export default defineNuxtPlugin({
  setup() {
    const headers = useRequestHeaders()

    const api = $fetch.create({
      baseURL: '/',
      headers,
    })

    return {
      provide: {
        api,
      },
    }
  },
})
