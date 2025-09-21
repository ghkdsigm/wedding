<template>
  <!-- Gallery Section -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden px-4">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_0%_0%,#ffffff_0%,transparent_60%),radial-gradient(80%_60%_at_100%_20%,#efe9e6_0%,transparent_60%)]"/>

    <div class="relative mx-auto w-full py-6">
      <!-- Gallery Section -->
      <div class="overflow-hidden bg-[#f6efe2]">
        <div class="h-px bg-[#e8ded0]"></div>

        <!-- Main Swiper -->
        <div class="relative">
          <Swiper
            :modules="[Thumbs]"
            :thumbs="{ swiper: thumbsSwiper }"
            :loop="true"
            :slidesPerView="1"
            class="w-full h-[800px]"
            @slideChange="onMainSlideChange"
          >
            <SwiperSlide
              v-for="(img, i) in images"
              :key="i"
            >
              <img
                :src="img"
                class="w-full h-full object-cover"
                alt="갤러리 이미지"
              />
            </SwiperSlide>
          </Swiper>

          <!-- Thumbnail Swiper -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-10">
            <Swiper
              @swiper="setThumbsSwiper"
              :modules="[Thumbs]"
              :spaceBetween="8"
              :slidesPerView="3"
              :centeredSlides="true"
            >
              <SwiperSlide
                v-for="(img, i) in images"
                :key="i"
                class="cursor-pointer overflow-hidden rounded-lg border-2 transition duration-300"
                :class="{
                  'border-[#b57a52] opacity-100': i === activeThumbIndex,
                  'border-white/50 opacity-70': i !== activeThumbIndex,
                }"
              >
                <img
                  :src="img"
                  class="w-full h-16 object-cover"
                  alt="썸네일"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/thumbs'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'images'
])

// Swiper 관련 상태
const activeThumbIndex = ref(0)
const thumbsSwiper = ref(null)

// 기본 이미지들 (props가 없을 때 사용)
const defaultImages = [
  'https://www.iwedding.co.kr/center/iweddingb/product/800_17588_1730685980_90793400_3232256098.jpg',
  'https://www.iwedding.co.kr/center/iweddingb/product/800_11243_1716875969_31838900_3232256100.jpg',
  'https://www.iwedding.co.kr/center/iweddingb/product/800_12710_1716273463_83445300_3232256100.jpg',
  'https://www.iwedding.co.kr/center/iweddingb/product/800_14165_1711688929_18023400_3232256098.jpg',
  'https://www.iwedding.co.kr/center/iweddingb/product/800_11806_1736932570_03864000_3232256098.jpg',
  'https://cdn.imweb.me/upload/S201811245bf8fd46464e7/4eb0cd6ed2285.jpg',
]

// 이미지 배열 (props가 있으면 사용, 없으면 기본값)
const images = computed(() => props.images || defaultImages)

// Swiper 함수들
const setThumbsSwiper = swiper => {
  thumbsSwiper.value = swiper
}

const onMainSlideChange = swiper => {
  const realIndex = swiper.realIndex
  activeThumbIndex.value = realIndex

  if (thumbsSwiper.value) {
    thumbsSwiper.value.slideTo(realIndex)
  }
}
</script>

<style scoped>
/* visuals handled by Tailwind */
</style>
