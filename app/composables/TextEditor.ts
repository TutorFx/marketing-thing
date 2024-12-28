import type { IAiSugestionRequest, IAiSugestionResponse, IAiSugestionResponses } from '~~/utils/schemas'
import { diff, diffCharsToLines, diffCleanupSemantic, diffLinesToChars, diffMain, diffPrettyHtml, patchApply, patchMake } from 'diff-match-patch-es'
import { defineStore } from 'pinia'
import { GoogleModelEnum } from '~~/utils/internal'

export const useTextEditor = defineStore('text-editor', () => {
  const defaultVal = '<p></p>'

  const isHovering = ref<number | null>(null)
  const state = ref(defaultVal)
  const tips = ref<Array<IAiSugestionResponse & { initial: string }>>([])
  const agent = ref<GoogleModelEnum>(GoogleModelEnum.thinking)

  function setText(text: string) {
    state.value = text
  }

  const diffData = computed(() => {
    if (isHovering.value === null)
      return null

    const currentTip = tips.value[isHovering.value]

    if (!currentTip)
      return null

    const diffs = diffMain(
      state.value.replace(/<[^>]*>/g, ''),
      currentTip.diff.replace(/<[^>]*>/g, ''),
    )

    // diffCharsToLines(diffs, lineArray)
    diffCleanupSemantic(diffs)

    return diffs
  })

  watch(state, () => tips.value.length = 0)

  function fetchTips() {
    $fetch<IAiSugestionResponses>('/api/v1/LookForTriggers', {
      method: 'POST',
      body: {
        redaction: state.value,
        agent: agent.value,
      } satisfies IAiSugestionRequest,
    })
      .then(res => res.forEach(item => tips.value.push({ ...item, initial: state.value })))
  }

  function applyTip(index: number) {
    isHovering.value = null

    const currentTip = tips.value[index]

    tips.value.splice(index, 1)

    if (!currentTip)
      return

    const diffs = patchMake(state.value, currentTip.diff)
    const patches = patchApply(diffs, state.value)

    const patch = patches[0]
    if (typeof patch !== 'string')
      return

    tips.value = tips.value.map((tip) => {
      const diffs = patchMake(patch, tip.diff)
      const patches = patchApply(diffs, tip.diff, { matchThreshold: 0.7 })

      const repatch = patches[0]

      if (typeof repatch !== 'string')
        return tip

      return {
        ...tip,
        diff: repatch,
      }
    })

    setText(patch)
  }

  return { state, diffData, fetchTips, applyTip, setText, tips, isHovering, agent }
})
