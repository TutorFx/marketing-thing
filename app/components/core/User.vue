<script lang="ts" setup>
const { user, clear } = useUserSession()
const toast = useToast()

function notReady() {
  toast.add({
    title: 'Deu ruim!',
    description: 'Esse recurso nem existe ainda, tente novamente semana que vem',
    color: 'success',
  })
}

const items = [{
  label: 'Profile',
  icon: 'i-lucide-user',
  slot: 'profile',
  onSelect() {
    notReady()
  },
}, {
  label: 'Billing',
  icon: 'i-lucide-credit-card',
  onSelect() {
    notReady()
  },
}, {
  label: 'Settings',
  icon: 'i-lucide-cog',
  onSelect() {
    notReady()
  },
}, {
  label: 'Log Out',
  icon: 'i-lucide-log-out',
  onSelect() {
    clear()
  },
}]
</script>

<template>
  <UDropdownMenu
    v-if="user"
    :items="items" :ui="{ content: 'w-48' }" :content="{
      align: 'end',
      side: 'bottom',
    }"
  >
    <div class="grid grid-flow-col items-center gap-3">
      <UAvatar
        :src="user.picture ?? undefined"
        :alt="user.name ?? undefined"
        size="md"
      />
      <div class="grid grid-flow-col gap-3">
        {{ user.name }}
        <UBadge color="neutral" variant="outline" size="sm">
          {{ user.plan }}
        </UBadge>
      </div>
    </div>
  </UDropdownMenu>
</template>
