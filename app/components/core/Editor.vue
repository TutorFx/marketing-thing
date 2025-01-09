<script setup lang="ts">
const tiptap = ref(null)
const editor = useTextEditor()
useGuest()

const remain = computed(() => {
  if (editor.currentUsage == null)
    return 0
  return editor.currentUsage.available.tokenCount - editor.currentUsage.current.tokenCount
})
</script>

<template>
  <div class="grid md:grid-cols-3 gap-8 [--padding:theme(space.2)] [--rounded:theme(space.3)]">
    <div class="md:col-span-2 sticky top-64">
      <div class="grid gap-3 items-start">
        <div>
          <CoreHandlersTiptap
            v-if="editor.isHovering === null"
            ref="tiptap"
            v-model="editor.state"
            v-model:agent-model="editor.agent"
            @triggers="editor.fetchTips"
          />
          <CoreDiff v-else-if="editor.diffData" :data="editor.diffData" />
        </div>
        <div v-if="remain">
          {{ convertToAbbreviation(remain) }} tokens diários restantes
        </div>
      </div>
    </div>
    <div>
      <div class="grid gap-8 items-start" @mouseleave="editor.isHovering = null">
        <div v-for="(item, i) in editor.tips" :key="i" class="grid gap-2 items-start">
          <div class="font-black text-xl">
            {{ item.title }}
          </div>
          <div class="text-sm" v-text="item.tip" />
          <div>
            <div class="grid grid-flow-col justify-start gap-3">
              <UButton variant="soft" color="error" @click="editor.refuseTip(i)" @mouseenter="editor.isHovering = i">
                Recusar
              </UButton>
              <UButton variant="soft" color="success" @click="editor.applyTip(i)" @mouseenter="editor.isHovering = i">
                Aceitar
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
