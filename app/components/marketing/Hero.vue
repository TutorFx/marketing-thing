<script setup lang="ts">
function toGoogle() {
  window.location.href = '/auth/google'
}
</script>

<template>
  <div class="py-48">
    <CoreContainer>
      <div class="grid gap-10">
        <h1 class="text-5xl text-center font-black">
          Deixe a AI trabalhar por você,<br> não pensar por você.
        </h1>
        <div class="grid gap-6">
          <p class="text-xl max-w-md text-center mx-auto text-balance">
            Escreva com clareza e confiança, detectamos e apontamos correções de erros em seu texto.
          </p>
          <div class="grid justify-center grid-flow-col gap-3">
            <UButton icon="logos:google-icon" color="neutral" size="xl" @click="toGoogle">
              Start with Google
            </UButton>
            <UButton :to="{ name: 'Register' }" color="secondary" size="xl">
              Start with Email
            </UButton>
          </div>
        </div>
      </div>
    </CoreContainer>
  </div>
</template>
