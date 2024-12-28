<script setup lang="ts">
import type { GoogleModelEnum } from '~~/utils/internal'

const model = defineModel<GoogleModelEnum>()
const items = ref([...MODELS])
</script>

<template>
  <UInputMenu v-model="model" size="xs" :items="items" value-key="id" label-key="name" />
</template>
