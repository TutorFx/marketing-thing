<script setup lang="ts">
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, type DiffOperation } from 'diff-match-patch-es'

defineProps<{ data: Diff[] }>()

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
</script>

<template>
  <div>
    <span v-for="(item, i) in data" :key="i" :class="`${getColor(item[0])}`">
      {{ item[1] }}
    </span>
  </div>
</template>
