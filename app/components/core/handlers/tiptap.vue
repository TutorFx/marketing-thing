<script setup lang="ts">
import type { GoogleModelEnum, PromptEnum } from '~~/shared/utils/internal'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const props = withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'Digite aqui...',
})

const emits = defineEmits<{
  (e: 'triggers', value: PromptEnum): void
}>()

const model = defineModel<string>()
const agentModel = defineModel<GoogleModelEnum>('agentModel')

const editor = useEditor({
  content: model.value,
  editorProps: {
    attributes: {
      class: 'min-w-full min-h-64 prose text-neutral-300 focus:outline-none mx-auto min-6xl [--tw-prose-bold:theme(colors.neutral.300)] [--tw-prose-headings:theme(colors.neutral.300)]',
    },
  },
  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
  },
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Underline,
  ],
})

watch(model, (newValue) => {
  if (editor.value && newValue && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, false, {
      preserveWhitespace: 'full',
    })
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <UCard :ui="{ body: 'min-h-full' }">
    <template #header>
      <div class="grid grid-flow-col justify-start items-center">
        <div v-if="editor" class="pr-2 flex flex-wrap gap-1 border-r border-[var(--ui-border)]">
          <UButton
            size="xs"
            icon="material-symbols:format-bold-rounded"
            :variant="editor.isActive('bold') ? 'solid' : 'subtle'"
            @click="editor.chain().focus().toggleBold().run()"
          />
          <UButton
            size="xs"
            icon="material-symbols:format-italic"
            :variant="editor.isActive('italic') ? 'solid' : 'subtle'"
            @click="editor.chain().focus().toggleItalic().run()"
          />
          <UButton
            size="xs"
            icon="material-symbols:format-underlined"
            :variant="editor.isActive('underline') ? 'solid' : 'subtle'"
            @click="editor.chain().focus().toggleUnderline().run()"
          />
          <UButton
            v-for="heading in 5"
            :key="`heading-${heading}`"
            size="xs"
            :icon="`material-symbols:format-h${heading}`"
            :variant="editor.isActive('heading', { level: heading }) ? 'solid' : 'subtle'"
            @click="editor.chain().focus().toggleHeading({ level: heading as 1 | 2 | 3 | 4 | 5 }).run()"
          />
        </div>
        <div class="pl-2 flex flex-wrap gap-1">
          <UButton v-for="({ icon, id, name, isPro }, i) in PROMPTS" :key="i" size="xs" :icon @click="emits('triggers', id)">
            {{ name }} <Icon v-if="isPro" name="solar:medal-ribbon-star-bold-duotone" />
          </UButton>
          <CoreAgentSelector v-model="agentModel" />
        </div>
      </div>
    </template>
    <EditorContent :editor="editor" />
  </UCard>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
