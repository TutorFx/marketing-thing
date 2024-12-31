<script lang="ts" setup>
const fields = reactive({
  name: '',
  email: '',
  password: '',
})
</script>

<template>
  <div class="grid min-h-dvh">
    <CoreFormRegister
      v-model:email="fields.email"
      v-model:name="fields.name"
      v-model:password="fields.password"
    >
      <template #header>
        <div class="text-center">
          <h2 class="font-black text-3xl">
            Create an account
          </h2>
          <p>
            Already have an account?
            <UButton
              square
              variant="link"
              :to="{ name: 'Login' }"
            >
              Login
            </UButton>.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="grid gap-3">
          <USeparator label="Or" />
          <a class="grid" href="/auth/google">
            <UButton icon="logos:google-icon" variant="soft" color="neutral" :ui="{ base: 'justify-center' }" size="lg">
              Continue with Google
            </UButton>
          </a>
        </div>
      </template>
    </CoreFormRegister>
  </div>
</template>
