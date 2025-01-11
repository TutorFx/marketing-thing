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
  <div class="[--padding:theme(space.2)] [--rounded:theme(space.3)]">
    <div class="mx-auto max-w-4xl">
      <div class="grid gap-3 grid-rows-[1fr_max-content]">
        <div class="grid">
          <CoreHandlersTiptap
            v-if="editor.isHovering === null"
            ref="tiptap"
            v-model="editor.state"
            v-model:agent-model="editor.agent"
            @triggers="editor.fetchTips"
          >
            <template #default>
              <UChip :text="editor.tips.length" size="3xl" :show="editor.tips.length > 0">
                <UButton
                  :loading="editor.isPendingRequest"
                  :disabled="editor.tips.length === 0"
                  icon="healthicons:artificial-intelligence" color="neutral" size="xs"
                  variant="subtle"
                  @click="editor.displayTips = true"
                />
              </UChip>
            </template>
          </CoreHandlersTiptap>
          <CoreDiff v-else-if="editor.diffData" :data="editor.diffData" />
        </div>
        <div v-if="remain">
          {{ convertToAbbreviation(Math.max(remain, 0)) }} tokens diários restantes
        </div>
      </div>
    </div>
    <USlideover
      v-model:open="editor.displayTips"
      title="Dicas AI"
    >
      <template #content>
        <div class="relative h-full">
          <div class="p-4 overflow-auto absolute inset-0" @mouseleave="editor.isHovering = null">
            <div class="grid gap-8 items-start">
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
    </USlideover>
  </div>
</template>
