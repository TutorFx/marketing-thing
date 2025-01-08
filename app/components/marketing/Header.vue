<script setup lang="ts">
import { useScroll, useScrollLock } from '@vueuse/core'

const isMenuOpen = useScrollLock(document)
const { y } = useScroll(document)

const isTop = computed(() => y.value > 0)

const { loggedIn } = useUserSession()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="translate-x-[150%] opacity-0"
      enter-active-class="transition duration-300"
    >
      <div v-if="isMenuOpen" class="fixed z-50">
        <div>
          <menu
            class="grid h-screen w-screen grid-rows-[max-content_1fr] bg-[var(--ui-bg)]"
          >
            <div
              class="grid min-h-[85px] grid-flow-col items-stretch justify-between gap-4 py-4 pl-6 pr-12"
            >
              <div>
                <CoreBrandLogo />
              </div>

              <button
                aria-label="Fechar Menu"
                @click="isMenuOpen = !isMenuOpen"
              >
                <Icon size="34" name="line-md:close-small" />
              </button>
            </div>
            <div class="px-6">
              <nav class="grid gap-4 pt-24">
                <h6>MENU</h6>
                a
                <div class="mt-6">
                  <UButton size="lg">
                    Falar com especialista
                  </UButton>
                </div>
              </nav>
            </div>
          </menu>
        </div>
      </div>
    </Transition>
  </Teleport>
  <div class="h-[100px] bg-secondary" />
  <div
    v-if="!isMenuOpen"
    class="fixed inset-x-0 top-0 z-50 grid transition-all duration-500 backdrop-blur-xs border border-transparent"
    :class="{
      'inset-x-[16px] top-[16px] md:inset-x-[50px] md:top-[50px] rounded-xl bg-[var(--ui-bg)]/65 !border-[var(--ui-border)]': isTop,
    }"
  >
    <nav
      class="min-h-[100px] border-b-0 border-b-transparent transition-all"
      :class="{ '!border-b border-b-stone-800 bg-secondary': !isTop }"
    >
      <div
        class="flex size-full justify-center p-0 transition-all duration-300"
      >
        <!-- :class="{ 'flex-1': !isTop }" -->
        <div
          class="grid min-w-fit flex-1 transform-gpu grid-flow-col items-center rounded-lg bg-secondary px-4 transition-all duration-500 md:gap-12 md:px-6 xl:grid-cols-[max-content_1fr_max-content]"
        >
          <div class="grid grid-flow-col items-center justify-start gap-3">
            <CoreBrandLogo class="max-w-12 min-w-12" /> <span class="text-2xl font-black">Notepad</span>
          </div>
          <div
            class="grid grid-flow-col justify-end items-center gap-4 text-white md:px-6 xl:hidden"
          >
            <UButton
              v-if="!isMenuOpen"
              aria-label="Abrir Menu"
              variant="link"
              size="xl"
              icon="line-md:close-to-menu-alt-transition"
              @click="isMenuOpen = !isMenuOpen"
            />
          </div>
          <div class="hidden xl:block">
            <menu class="grid grid-flow-col justify-start gap-4">
              menu items
            </menu>
          </div>
          <div class="hidden xl:block">
            <CoreUser v-if="loggedIn" />
            <div v-else class="grid grid-flow-col gap-3">
              <UButton variant="soft" :to="{ name: 'Login' }">
                Sign In
              </UButton>
              <UButton :to="{ name: 'Register' }">
                Free Trial
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
