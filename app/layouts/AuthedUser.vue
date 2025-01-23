<script setup lang="ts"></script>

<template>
  <div class="grid min-h-[100dvh] md:grid-cols-[max-content_1fr]">
    <CoreNavigationSideMenu class="max-md:hidden border-r border-[var(--ui-border-accented)]" />
    <div>
      <slot />
    </div>
  </div>
</template>
