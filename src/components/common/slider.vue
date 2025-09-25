<template>
	<section class="relative max-w-[640px] mx-auto w-screen h-screen bg-black overflow-hidden">
		<!-- 메인 Swiper -->
		<Swiper
			:modules="[Thumbs]"
			:thumbs="{ swiper: thumbsSwiper }"
			:loop="true"
			:slidesPerView="1"
			:preloadImages="false"
			:lazy="true"
			:watchSlidesProgress="true"
			:resistanceRatio="0.85"
			:speed="300"
			class="w-full h-full z-0"
			@slideChange="onMainSlideChange"
		>
			<SwiperSlide
				v-for="(img, i) in images"
				:key="i"
				class="relative"
			>
				<!-- 전체 화면 이미지 -->
				<img
					:src="img"
					class="w-full h-full object-cover"
					alt="메인 이미지"
					:loading="i === 0 ? 'eager' : 'lazy'"
					:decoding="i === 0 ? 'sync' : 'async'"
				/>
				
				<!-- 필기체 오버레이 텍스트 -->
				<!-- <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
					<div class="text-center">
						<h1 class="handwriting-text text-5xl sm:text-8xl text-orange-400">
							{{ handwritingTexts[i] }}
						</h1>
						<h2 class="subtitle-text text-6xl sm:text-4xl text-white mt-4">
							{{ subtitleTexts[i] }}
						</h2>
					</div>
				</div> -->
			</SwiperSlide>
		</Swiper>

		<!-- 썸네일 Swiper -->
		<!-- <div class="absolute bottom-[7vh] left-1/2 -translate-x-1/2 z-10 w-[320px]">
			<Swiper
				@swiper="setThumbsSwiper"
				:modules="[Thumbs]"
				:spaceBetween="1"
				:slidesPerView="5"
				:centeredSlides="true"
				:preloadImages="false"
				:lazy="true"
				:speed="200"
			>
				<SwiperSlide
					v-for="(img, i) in images"
					:key="i"
					class="cursor-pointer transition duration-300 w-[40px] h-[40px] mx-auto flex items-center justify-center"
					:class="{
						'opacity-100 scale-110 w-[60px] h-[60px]': i === activeThumbIndex,
						'opacity-60': i !== activeThumbIndex,
					}"
				>
					<div class="w-[40px] h-[40px] overflow-hidden rounded-full">
						<img
							:src="img"
							class="w-full h-full object-cover"
							alt="썸네일"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div> -->

		<!-- ▼ 페이지 인디케이터 -->
		<div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white z-20 text-sm font-goun-batang">
			{{ currentSlide + 1 }}/{{ images.length }}
		</div>

		<!-- ▼ 스크롤 버튼 -->
		<button
			@click="scrollToNextSection"
			class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-20 text-sm animate-bounce font-goun-batang"
		>
			Scroll Down
		</button>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/thumbs'

const activeThumbIndex = ref(0)
const currentSlide = ref(0)

const images = [
	'/imgs/common/1-min.jpg',
	'/imgs/common/2-min.jpg',
	'/imgs/common/3-min.jpg',
	'/imgs/common/4-min.jpg',
	'/imgs/common/5-min.jpg',
	'/imgs/common/6-min.jpg',
	'/imgs/common/7-min.jpg',
	'/imgs/common/8-min.jpg',
	'/imgs/common/9-min.jpg',
	'/imgs/common/10-min.jpg',
	'/imgs/common/11-min.jpg',
	'/imgs/common/12-min.jpg',
	'/imgs/common/13-min.jpg',
	'/imgs/common/14-min.jpg',
	'/imgs/common/15-min.jpg',
	'/imgs/common/16-min.jpg',
	'/imgs/common/17-min.jpg',
	'/imgs/common/18-min.jpg',
	'/imgs/common/19-min.jpg',
]

// 각 슬라이드별 필기체 텍스트
const handwritingTexts = [
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE',
	'MOMOSHOUSE'
]

// 각 슬라이드별 서브타이틀 텍스트
const subtitleTexts = [
	'Our Story',
	'Better Together',
	'Blessed Day',
	'Happy Moments',
	'Beautiful Life',
	'Love Story',
	'Sweet Memories',
	'Forever & Always',
	'Two Hearts',
	'Perfect Match',
	'Dream Wedding',
	'Happily Ever After',
	'Love & Laughter',
	'Together Forever',
	'Wedding Bliss',
	'Romantic Moments',
	'Cherished Memories',
	'Love is Beautiful',
	'Perfect Day'
]

const thumbsSwiper = ref(null)

const setThumbsSwiper = swiper => {
	thumbsSwiper.value = swiper
}

const onMainSlideChange = swiper => {
	const realIndex = swiper.realIndex
	activeThumbIndex.value = realIndex
	currentSlide.value = realIndex

	if (thumbsSwiper.value) {
		thumbsSwiper.value.slideTo(realIndex)
	}
}

// ▼ 아래 섹션으로 스크롤하는 함수
const scrollToNextSection = () => {
	const section = document.getElementById('second-section')
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' })
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Parisienne&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

.handwriting-text {
	font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive !important;
	/* animation: fadeInScale 1.2s ease-out; */
	font-weight: 400;
	letter-spacing: 2px;
	/* transform: rotate(-1deg); */
	will-change: transform;
	transform: translateZ(0);
}

.subtitle-text {
	font-family: 'Playfair Display', 'Crimson Text', serif !important;
	font-weight: 300;
	letter-spacing: 1px;
	will-change: transform;
	transform: translateZ(0);
}

@keyframes fadeInScale {
	0% {
		opacity: 0;
		transform: scale(0.7) rotate(-3deg);
	}
	50% {
		opacity: 0.8;
		transform: scale(1.1) rotate(1deg);
	}
	100% {
		opacity: 1;
		transform: scale(1) rotate(-1deg);
	}
}
</style>
