<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <div class="grid grid-rows-[max-content_1fr] w-xs gap-6 px-3 py-4">
    <div class="grid grid-flow-col justify-start items-center gap-1">
      <CoreBrandLogo class="w-6" /> <span class="text-sm font-black">Notepad</span>
    </div>
    <div>
      a
    </div>
    <USeparator />
    <div>
      <CoreUser v-if="loggedIn" popper="start" />
    </div>
  </div>
</template>
