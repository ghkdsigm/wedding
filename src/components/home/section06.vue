<template>
  <!-- Gallery Section -->
  <section class="relative max-w-[640px] mx-auto w-full bg-white text-[#3f3a37] overflow-hidden px-6">
    <div class="absolute inset-0 pointer-events-none"/>

    <div class="relative mx-auto w-full py-6">
      <!-- Gallery Section -->
      <div class="overflow-hidden">
        <div class="h-px bg-[#e8ded0]"></div>

        <!-- Main Swiper -->
        <div class="relative">
          <Swiper
            :modules="[Thumbs]"
            :thumbs="{ swiper: thumbsSwiper }"
            :loop="true"
            :slidesPerView="1"
            class="w-full h-[auto]"
            @slideChange="onMainSlideChange"
          >
            <SwiperSlide
              v-for="(img, i) in images"
              :key="i"
              class="cursor-pointer"
              @click="openPopup"
            >
              <img
                :src="img"
                class="w-full h-full object-cover"
                alt="갤러리 이미지"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Thumbnail Swiper - 아래로 이동 -->
        <div class="py-2">
          <Swiper
            @swiper="setThumbsSwiper"
            :modules="[Thumbs]"
            :spaceBetween="8"
            :slidesPerView="4"
            :centeredSlides="false"
          >
            <SwiperSlide
              v-for="(img, i) in images"
              :key="i"
              class="cursor-pointer overflow-hidden transition duration-300 relative"
              :class="{
                'opacity-100': i === activeThumbIndex,
                'opacity-70 thumb-inactive': i !== activeThumbIndex,
              }"
            >
              <img
                :src="img"
                class="w-full h-20 object-cover"
                alt="썸네일"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        </div>
      </div>

    <!-- 팝업 모달 -->
    <div
      v-if="showPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 popup-overlay"
      @click="closePopup"
    >
      <div class="relative w-full h-full max-w-6xl max-h-[90vh] p-4" @click.stop>
        <!-- 닫기 버튼 -->
        <button
          @click="closePopup"
          class="absolute top-4 right-4 z-10 text-white text-2xl hover:text-gray-300 transition-colors"
        >
          ✕
        </button>

        <!-- 팝업 내부 슬라이더 -->
        <Swiper
          :modules="[Navigation, Pagination]"
          :navigation="true"
          :pagination="{ clickable: true }"
          :loop="true"
          :initialSlide="activeThumbIndex"
          class="w-full h-full"
          @slideChange="onPopupSlideChange"
        >
          <SwiperSlide
            v-for="(img, i) in images"
            :key="i"
          >
            <img
              :src="img"
              class="w-full h-full object-contain"
              alt="갤러리 이미지"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'images'
])

// Swiper 관련 상태
const activeThumbIndex = ref(0)
const thumbsSwiper = ref(null)
const showPopup = ref(false)

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

// 팝업 관련 함수들
const openPopup = () => {
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}

const onPopupSlideChange = swiper => {
  const realIndex = swiper.realIndex
  activeThumbIndex.value = realIndex

  if (thumbsSwiper.value) {
    thumbsSwiper.value.slideTo(realIndex)
  }
}
</script>

<style scoped>
/* 비활성 썸네일에 어두운 오버레이 추가 */
.thumb-inactive::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* 팝업 모달 스타일 */
.popup-overlay {
  backdrop-filter: blur(4px);
}

/* Swiper 네비게이션 버튼 커스터마이징 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 44px;
  height: 44px;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 18px;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  opacity: 1;
}
</style>
