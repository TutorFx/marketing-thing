<script setup lang="ts">
const email = defineModel<string>()
</script>

<template>
  <UFormField label="Email" :ui="{ container: 'grid' }" required>
    <UInput v-model="email" placeholder="Enter your email" />
  </UFormField>
</template>
