<script setup lang="ts">
const show = ref(false)
const password = defineModel<string>()
</script>

<template>
  <UFormField label="Password" :ui="{ container: 'grid' }" required>
    <UInput
      v-model="password"
      placeholder="Enter your password"
      :type="show ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
        />
      </template>
    </UInput>
  </UFormField>
</template>
