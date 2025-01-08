<script lang="ts" setup>
definePageMeta({
  layout: 'landing-page',
})
</script>

<template>
  <div class="min-h-[100dvh] grid py-2">
    <div class="grid gap-6">
      <div>
        <MarketingHero />
      </div>
      <div class="mb-48">
        <CoreContainer>
          <CoreEditor />
        </CoreContainer>
      </div>
      <div>
        a
      </div>
    </div>
  </div>
</template>
