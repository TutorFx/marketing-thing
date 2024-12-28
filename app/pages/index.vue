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
            <CoreHandlersTiptap v-if="editor.isHovering === null" ref="tiptap" v-model="editor.state" v-model:agent-model="editor.agent" @triggers="editor.fetchTips" />
            <CoreDiff v-else-if="editor.diffData" :data="editor.diffData" />
          </div>
          <div class="p-[var(--padding)] grid gap-6 items-start" @mouseleave="editor.isHovering = null">
            <UCard v-for="(item, i) in editor.tips" :key="i" :ui="{ body: 'sm:p-4', header: 'sm:p-4' }" @click="editor.applyTip(i)" @mouseenter="editor.isHovering = i">
              <template #header>
                {{ item.title }}
              </template>
              <div v-html="item.tip" />
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
