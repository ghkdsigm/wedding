<template>
	<section class="relative w-screen h-screen bg-black overflow-hidden">
		<!-- 메인 Swiper -->
		<Swiper
			:modules="[Thumbs]"
			:thumbs="{ swiper: thumbsSwiper }"
			:loop="true"
			:slidesPerView="1"
			class="w-full h-full z-0"
			@slideChange="onMainSlideChange"
		>
			<SwiperSlide
				v-for="(img, i) in images"
				:key="i"
				class="relative"
			>
				<!-- 배경 블러 이미지 -->
				<div 
					class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
					:style="{ backgroundImage: `url(${img})` }"
					style="filter: blur(8px); transform: scale(1.1);"
				></div>
				
				<!-- 중앙 선명한 이미지 영역 -->
				<div class="relative z-10 w-full h-full flex items-center justify-center p-5">
					<div class="w-full h-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl">
						<img
							:src="img"
							class="w-full h-full object-cover"
							alt="메인 이미지"
						/>
					</div>
				</div>
				
				<!-- 필기체 오버레이 텍스트 -->
				<div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
					<div class="text-center">
						<h1 class="handwriting-text text-5xl sm:text-8xl text-orange-400">
							{{ handwritingTexts[i] }}
						</h1>
						<h2 class="subtitle-text text-6xl sm:text-4xl text-white mt-4">
							{{ subtitleTexts[i] }}
						</h2>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>

		<!-- 썸네일 Swiper -->
		<div class="absolute bottom-[7vh] left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md">
			<Swiper
				@swiper="setThumbsSwiper"
				:modules="[Thumbs]"
				:spaceBetween="12"
				:slidesPerView="3"
				:centeredSlides="true"
			>
				<SwiperSlide
					v-for="(img, i) in images"
					:key="i"
					class="cursor-pointer overflow-hidden rounded border-2 transition duration-300"
					:class="{
						'border-transparent opacity-100': i === activeThumbIndex,
						'border-transparent opacity-50': i !== activeThumbIndex,
					}"
				>
					<img
						:src="img"
						class="w-full h-[15vh] object-cover"
						alt="썸네일"
					/>
				</SwiperSlide>
			</Swiper>
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

const images = [
	'https://www.iwedding.co.kr/center/iweddingb/product/800_17588_1730685980_90793400_3232256098.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_12710_1716273463_83445300_3232256100.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_14165_1711688929_18023400_3232256098.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_11806_1736932570_03864000_3232256098.jpg',
	'https://cdn.imweb.me/upload/S201811245bf8fd46464e7/4eb0cd6ed2285.jpg',
]

// 각 슬라이드별 필기체 텍스트
const handwritingTexts = [
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
	'Beautiful Life'
]

const thumbsSwiper = ref(null)

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

// ▼ 아래 섹션으로 스크롤하는 함수
const scrollToNextSection = () => {
	const section = document.getElementById('second-section')
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' })
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Parisienne&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.handwriting-text {
	font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive !important;
	/* animation: fadeInScale 1.2s ease-out; */
	font-weight: 400;
	letter-spacing: 2px;
	/* transform: rotate(-1deg); */
}

.subtitle-text {
	font-family: 'Playfair Display', 'Crimson Text', serif !important;
	font-weight: 300;
	letter-spacing: 1px;
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
