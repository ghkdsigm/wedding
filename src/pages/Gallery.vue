<template>
	<section class="absolute w-screen h-screen bg-black overflow-hidden">
		<!-- 메인 Swiper -->
		<Swiper
			:modules="[Thumbs]"
			:thumbs="{ swiper: thumbsSwiper }"
			:loop="true"
			:slidesPerView="1"
			class="w-full h-full z-0"
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
		<div class="absolute bottom-[15vh] left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md">
			<Swiper
				@swiper="setThumbsSwiper"
				:modules="[Thumbs]"
				:spaceBetween="12"
				:slidesPerView="3"
			>
				<SwiperSlide
					v-for="(img, i) in images"
					:key="i"
					class="cursor-pointer overflow-hidden rounded border-2 border-white hover:border-pink-400 transition"
				>
					<img
						:src="img"
						class="w-full h-[15vh] object-cover"
						alt="썸네일"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/thumbs'

const images = [
	'https://cdn.crowdpic.net/detail-thumb/thumb_d_1F5AF0BCBB2F43EF3C5B79DA763D3CFB.jpg',
	'https://png.pngtree.com/thumb_back/fh260/background/20210316/pngtree-vertical-version-of-romantic-spring-cherry-blossom-photography-image_586813.jpg',
	'https://images.pexels.com/photos/9392561/pexels-photo-9392561.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	'https://png.pngtree.com/thumb_back/fw800/background/20210316/pngtree-vertical-version-pink-photography-picture-cherry-blossom-spring-image_586851.jpg',
	'https://cdn.crowdpic.net/detail-thumb/thumb_d_5839A8E0D70738F27EB760E9DA6386DA.jpg',
	'https://product-image.wconcept.co.kr/productimg/image/img0/47/301348247_JD41603.jpg',
]

const thumbsSwiper = ref(null)
const setThumbsSwiper = swiper => {
	thumbsSwiper.value = swiper
}
</script>
