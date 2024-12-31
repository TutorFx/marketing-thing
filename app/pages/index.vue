<script lang="ts" setup>
const tiptap = ref(null)
const editor = useTextEditor()
</script>

<template>
  <div class="min-h-[100dvh] grid py-32">
    <div>
      <div class="mx-auto max-w-screen-xl">
        <div class="grid md:grid-cols-3 gap-3 [--padding:theme(space.6)] [--rounded:theme(space.3)]">
          <div class="p-[var(--padding)] md:col-span-2">
            <div class="sticky top-3">
              <CoreHandlersTiptap
                v-if="editor.isHovering === null"
                ref="tiptap"
                v-model="editor.state"
                v-model:agent-model="editor.agent"
                @triggers="editor.fetchTips"
              />
              <CoreDiff v-else-if="editor.diffData" :data="editor.diffData" />
            </div>
          </div>
          <div>
            <div class="p-[var(--padding)] grid gap-6 items-start sticky top-0" @mouseleave="editor.isHovering = null">
              <UCard v-for="(item, i) in editor.tips" :key="i" :ui="{ body: 'sm:p-4', header: 'sm:p-4' }">
                <template #header>
                  {{ item.title }}
                </template>
                <div v-html="item.tip" />
                <template #footer>
                  <div class="grid grid-flow-col justify-end gap-3">
                    <UButton variant="soft" color="error" @click="editor.refuseTip(i)" @mouseenter="editor.isHovering = i">
                      Recusar
                    </UButton>
                    <UButton variant="soft" color="success" @click="editor.applyTip(i)" @mouseenter="editor.isHovering = i">
                      Aceitar
                    </UButton>
                  </div>
                </template>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
