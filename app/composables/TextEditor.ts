import type { PromptEnum } from '~~/shared/utils/internal'
import type { IAiSugestionResponse } from '~~/shared/utils/schemas'
import { watchDebounced } from '@vueuse/core'
import { diffCleanupSemantic, diffMain } from 'diff-match-patch-es'
import { FetchError } from 'ofetch'
import { defineStore } from 'pinia'
import { GoogleModelEnum } from '~~/shared/utils/internal'

export const useTextEditor = defineStore('text-editor', () => {
  const usage = ref<null | IAiUsage>(null)

  const defaultVal = '<p></p>'

  const isHovering = ref<number | null>(null)
  const state = ref(defaultVal)
  const tips = ref<Array<IAiSugestionResponse & { initial: string }>>([])
  const agent = ref<GoogleModelEnum>(GoogleModelEnum.thinking)

  function setText(text: string) {
    state.value = text
  }

  const { $api } = useNuxtApp()

  const repo = requestRepositoryV1($api)
  const router = useRouter()

  const currentUsage = computed(() => usage.value ?? null)

  const diffData = computed(() => {
    if (isHovering.value === null)
      return null

    const currentTip = tips.value[isHovering.value]

    if (!currentTip)
      return null

    const diff = state.value.replaceAll(currentTip.diff.before, currentTip.diff.after)

    const diffs = diffMain(
      state.value,
      diff,
    )

    diffCleanupSemantic(diffs)

    return diffs
  })

  useAsyncData(() => repo.BudgetGet().then(usageResponse => usage.value = usageResponse))

  watchDebounced(
    state,
    removeImpossibleTips,
    { debounce: 500, maxWait: 1000 },
  )

  function removeImpossibleTips(currentState: string) {
    tips.value.forEach((item, index) => {
      if (!currentState.includes(item.diff.before)) {
        tips.value.splice(index, 1)
      }
    })
  }

  function fetchTips(prompt: PromptEnum) {
    repo.Tips(state.value, agent.value, prompt)
      .then((res) => {
        const localTips = res.responseMessage.forEach(item => tips.value.push({ ...item, initial: state.value }))
        usage.value = res.usage
        removeImpossibleTips(state.value)
        return localTips
      })
      .catch((e) => {
        if (e instanceof FetchError) {
          if (e.statusCode === 402) {
            router.push({ name: 'Login' })
          }
        }
      })
  }

  function refuseTip(index: number) {
    isHovering.value = null
    tips.value.splice(index, 1)
  }

  function applyTip(index: number) {
    isHovering.value = null

    const currentTip = tips.value[index]

    tips.value.splice(index, 1)

    if (!currentTip)
      return

    setText(state.value.replaceAll(currentTip.diff.before, currentTip.diff.after))
  }

  return {
    state,
    diffData,
    fetchTips,
    applyTip,
    refuseTip,
    setText,
    tips,
    isHovering,
    agent,
    currentUsage,
  }
})
