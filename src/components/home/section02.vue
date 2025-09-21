<template>
  <!-- Full-screen section (same outer layout as Section01) -->
  <section class="relative min-h-[100svh] w-full bg-white text-[#3f3a37] overflow-hidden">
    <!-- soft fabric-ish backdrop -->    
    <div class="mx-auto w-full px-5 flex flex-col justify-center items-center h-full absolute">
      <!-- content card (텍스트 길이에 맞춰 자연스럽게) -->
      <div class="relative text-center">
        <!-- top small icon -->
        <!-- <div class="mb-6">
          <slot name="icon">
            <svg class="w-6 h-6 text-[#8b9b7a] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12c3-1 7-4 9-9 2 5 6 8 9 9-5 2-8 6-9 9-1-3-4-7-9-9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </slot>
          <p class="mt-2 text-[clamp(10px,3.25vw,16px)] tracking-[0.4em] text-[#9b968f]">{{ notice }}</p>
        </div> -->

        <!-- body text -->
        <p class="whitespace-pre-line text-[clamp(10px,3.25vw,16px)] leading-7 text-[#5c554f]">
          {{ bodyText }}
        </p>

        <!-- bottom family lines -->
        <div class="mt-8 text-[clamp(10px,3vw,14px)] leading-6 text-[#6c625b]">
          <p v-if="groomFamily">{{ groomFamily }}</p>
          <p v-if="brideFamily">{{ brideFamily }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'notice',
  'bodyText',
  'userType',
  'groomFamily', 
  'brideFamily'
])

// userType에 따라 bodyText 선택
const currentBodyText = computed(() => {
  return props.bodyText[props.userType] || props.bodyText.guest
})
</script>

<style scoped>
/* all visuals via Tailwind */
</style>
