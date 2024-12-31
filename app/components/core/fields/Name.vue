<script setup lang="ts">
const name = defineModel<string>()
</script>

<template>
  <UFormField label="Name" :ui="{ container: 'grid' }" required>
    <UInput v-model="name" placeholder="Enter your name" />
  </UFormField>
</template>
