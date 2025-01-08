<script setup lang="ts">
const tiptap = ref(null)
const editor = useTextEditor()
useGuest()
</script>

<template>
  <div class="grid md:grid-cols-3 gap-3 [--padding:theme(space.2)] [--rounded:theme(space.3)]">
    <div class="md:col-span-2">
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
      <div>
        {{ editor.currentUsage }}
      </div>
    </div>
    <div>
      <div class="grid gap-6 items-start sticky top-0" @mouseleave="editor.isHovering = null">
        <UCard>
          <template #header>
            <div>
              Revisar Documento
            </div>
          </template>
          <div class="grid gap-6 items-start">
            <UCard v-for="(item, i) in editor.tips" :key="i" :ui="{ body: 'sm:p-4', header: 'sm:p-4' }">
              <template #header>
                {{ item.title }}
              </template>
              <div v-text="item.tip" />
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
        </UCard>
      </div>
    </div>
  </div>
</template>
