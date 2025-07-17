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
			>
				<img
					:src="img"
					class="w-full h-full object-cover"
					alt="메인 이미지"
				/>
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
						'border-pink-400 opacity-100': i === activeThumbIndex,
						'border-white opacity-70': i !== activeThumbIndex,
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
			class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-20 text-sm animate-bounce"
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
	'https://www.iwedding.co.kr/center/iweddingb/product/800_11243_1716875969_31838900_3232256100.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_12710_1716273463_83445300_3232256100.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_14165_1711688929_18023400_3232256098.jpg',
	'https://www.iwedding.co.kr/center/iweddingb/product/800_11806_1736932570_03864000_3232256098.jpg',
	'https://cdn.imweb.me/upload/S201811245bf8fd46464e7/4eb0cd6ed2285.jpg',
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
