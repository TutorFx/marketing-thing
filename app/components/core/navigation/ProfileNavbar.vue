<script setup lang="ts">
const items = ref([
  [
    {
      label: 'Account',
      icon: 'i-heroicons:user-circle',
      to: '/Account',
      // active: true,
      defaultOpen: true,
    },
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true,
    },
  ],
])
</script>

<template>
  <div class="grid min-h-[100dvh] grid-rows-[max-content_1fr]">
    <div class="grid">
      <div class="px-3 py-4">
        <span class="text-xl font-black">Notepad</span>
      </div>
      <USeparator />
      <div class="overflow-x-auto">
        <div class="grid">
          <UNavigationMenu
            highlight
            highlight-color="primary"
            orientation="horizontal"
            :items="items"
            class="data-[orientation=horizontal]:border-b border-[var(--ui-border)] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
          />
        </div>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
