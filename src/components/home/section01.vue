<template>
  <!-- Full-screen section (no phone frame) -->
  <section class="relative min-h-[100svh] w-full bg-[#fff] text-[#3f3a37] overflow-hidden">
    <!-- soft fabric-ish backdrop -->
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_0%_0%,#ffffff_0%,transparent_60%),radial-gradient(80%_60%_at_100%_20%,#efe9e6_0%,transparent_60%)]"/>

    <div class="relative min-h-screen mx-auto w-full flex flex-col">
      <!-- photo area -->
      <div class="relative h-[calc(100vh-10rem)] md:h-[auto] w-full max-w-none mx-auto overflow-hidden bg-[#e9e4e1]">
        <img
          :src="imageSrc"
          alt="wedding"
          class="h-full w-full object-cover object-center"
          loading="eager"
          decoding="sync"
        />
        
        <!-- top captions floating on image -->
        <div class="absolute top-20 left-0 right-0 p-6">
          <div class="text-center">
            <!-- 폰트 테스트 -->
            <!-- <p class="text-xs text-white/50 mb-2 font-goun-batang">폰트 테스트: 고운바탕</p> -->
            <p class="text-[10px] tracking-[0] text-white/80 ">{{ title }}</p>
            <p class="mt-1 text-base tracking-wide text-white font-medium font-goun-batang">
              {{ bridegroom }} <span class="text-white/70 text-[clamp(10px,3vw,14px)]">and</span> {{ bride }}
            </p>
            <!-- D-Day 표시 -->
            <div class="mt-2">
              <div class="inline-block rounded-full px-4 py-1" style="background: #FFFFFF4D;">
                <p class="text-[10px] text-white font-medium">
                  {{ dDayText }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- bottom gradient effect (original) -->
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-32
                    bg-gradient-to-t from-white via-white/90 via-white/40 to-transparent"/>
      </div>

      <!-- middle script text (below image) -->
      <div class="mt-4 text-center">
        <p class="font-[500] text-sm font-goun-batang font-bold" :class="scriptFontClass">{{ scriptText }}</p>
      </div>

      <!-- bottom date & venue (below image) -->
      <div class="mt-2 text-center text-sm text-[#6c625b] leading-6 pb-3 font-goun-batang">
        <p>{{ dateText }}</p>
        <p>{{ venueText }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'title',
  'imageSrc',
  'bridegroom', 
  'bride',
  'scriptText',
  'dateText',
  'venueText',
  'scriptFontClass',
  'weddingDate' // YYYY-MM-DD 형식
])

// D-Day 계산을 위한 반응형 데이터
const currentTime = ref(new Date())
let timer = null

// D-Day 계산 함수
const calculateDDay = (weddingDate) => {
  if (!weddingDate) return 'D-Day'
  
  const targetDate = new Date(weddingDate)
  const today = currentTime.value
  
  // 시간을 00:00:00으로 설정하여 날짜만 비교
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  
  const diffTime = target - current
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'D-DAY'
  } else if (diffDays > 0) {
    return `D-${diffDays}`
  } else {
    return `D+${Math.abs(diffDays)}`
  }
}

// D-Day 텍스트 계산
const dDayText = computed(() => {
  return calculateDDay(props.weddingDate)
})

// 1분마다 시간 업데이트
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 60000) // 1분 = 60000ms
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
/* No extra CSS needed; gradients handled by Tailwind utilities */
</style>