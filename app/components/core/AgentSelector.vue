<script setup lang="ts">
import type { GoogleModelEnum } from '~~/shared/utils/internal'

const model = defineModel<GoogleModelEnum>()
const items = ref([...MODELS])
</script>

<template>
  <USelect v-model="model" size="xs" :items="items" value-key="id" label-key="name" />
</template>
