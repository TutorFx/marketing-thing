<script lang="ts" setup>
const fields = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <div class="grid min-h-dvh">
    <CoreFormLogin
      v-model:email="fields.email"
      v-model:password="fields.password"
    >
      <template #header>
        <div class="text-center">
          <UIcon name="tdesign:user-arrow-up" size="42" />
          <h2 class="font-black text-3xl">
            Welcome back
          </h2>
          <p>
            Don't have an account?
            <UButton
              square
              variant="link"
              :to="{ name: 'Register' }"
            >
              Sign up
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
    </CoreFormLogin>
  </div>
</template>
