<template>
  <!-- Single-month Calendar (2025-10 default) -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_0%_0%,#ffffff_0%,transparent_60%),radial-gradient(80%_60%_at_100%_20%,#efe9e6_0%,transparent_60%)]"/>

    <div class="relative mx-auto w-full px-0 py-6 bg-[#eef5ee] ">
      <div class="overflow-hidden p-6">
        <!-- Header -->
        <div class="py-4 text-center font-bold">
          <p class="text-[clamp(16px,5.5vw,28px)]">{{ month }}월</p>
        </div>
        <div class="h-px bg-[#e8ded0]"></div>

        <!-- Weekdays -->
        <div class="grid grid-cols-7 text-center text-[clamp(10px,3vw,14px)] text-[#8e877f] py-2">
          <div v-for="d in weekdays" :key="d">{{ d }}</div>
        </div>
        <div class="h-px bg-[#e8ded0]"></div>

        <!-- Dates -->
        <div class="grid grid-cols-7 gap-y-2 text-center select-none pt-2">
          <div v-for="(cell, idx) in cells" :key="idx" class="h-9 grid place-items-center">
            <span v-if="cell"
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full text-[clamp(10px,3vw,14px)]"
                  :class="{
                    'bg-[#6b5a4d] text-white font-medium shadow-sm': cell === selectedDay,
                    'text-[#9b948e]': !cell,
                  }">
              {{ cell }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'year',
  'month',
  'selectedDay'
])

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

const cells = computed(() => {
  const first = new Date(props.year, props.month - 1, 1)
  const firstDow = first.getDay() // 0-6 (Sun-Sat)
  const daysInMonth = new Date(props.year, props.month, 0).getDate()
  const arr = []
  // leading blanks
  for (let i = 0; i < firstDow; i++) arr.push(null)
  // month days
  for (let d = 1; d <= daysInMonth; d++) arr.push(d)
  // fill to 6 rows (42 cells) for consistent layout
  while (arr.length < 42) arr.push(null)
  return arr
})

const selectedDay = computed(() => props.selectedDay)
const month = computed(() => props.month)
</script>

<style scoped>
/* visuals handled by Tailwind */
</style>
