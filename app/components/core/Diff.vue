<script setup lang="ts">
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, type DiffOperation } from 'diff-match-patch-es'

const props = defineProps<{ data: Diff[] }>()

function getColor(color: DiffOperation) {
  switch (color) {
    case DIFF_DELETE: {
      return 'text-rose-500 bg-rose-950/50 rounded-sm px-1 pb-1 box-decoration-clone'
    }
    case DIFF_INSERT: {
      return 'text-emerald-500 bg-emerald-950/50 rounded-sm px-1 pb-1 box-decoration-clone'
    }
    case DIFF_EQUAL: {
      return 'text-[currentColor]'
    }
  }
}

const html = computed(() => {
  let text = ''

  for (const item of props.data) {
    text += `<span class="${getColor(item[0])}">${item[1]}</span>`
  }

  return text
})
</script>

<template>
  <div>
    <div class="min-w-full prose text-neutral-300 focus:outline-none mx-auto min-6xl [--tw-prose-bold:theme(colors.neutral.300)] [--tw-prose-headings:theme(colors.neutral.300)]" v-html="html" />
  </div>
</template>
