export const useGuest = defineStore('guest', () => {
  const { $api } = useNuxtApp()

  const repo = requestRepositoryV1($api)

  const { data, refresh } = useAsyncData('guest', () => repo.GuestGet(), { immediate: false })

  onMounted(() => refresh())

  return { data }
})
