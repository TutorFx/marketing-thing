<script setup lang="ts">
const emits = defineEmits(['submit'])
const name = defineModel<string>('name')
const email = defineModel<string>('email')
const password = defineModel<string>('password')
</script>

<template>
  <div class="grid items-center">
    <div>
      <div class="grid max-w-sm mx-auto">
        <UCard class="py-8">
          <div class="grid gap-6">
            <slot name="header" />
            <div class="grid gap-8">
              <div class="grid gap-3">
                <CoreFieldsName v-model="name" />
                <CoreFieldsEmail v-model="email" />
                <CoreFieldsPassword v-model="password" />
              </div>
              <div class="grid">
                <UButton class="justify-center rounded-full" size="xl" @click="emits('submit')">
                  Create account
                </UButton>
              </div>
            </div>
            <slot name="footer" />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
