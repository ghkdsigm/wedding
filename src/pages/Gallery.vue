<template>
	<section class="absolute w-full h-full overflow-hidden">
		<!-- 메인 이미지 전체 채우기 -->
		<Swiper
			:modules="[Thumbs]"
			:thumbs="{ swiper: thumbsSwiper }"
			:slidesPerView="1"
			:loop="true"
			class="relative top-0 left-0 w-full h-full z-0"
		>
			<SwiperSlide
				v-for="(img, i) in images"
				:key="i"
				class="w-full h-full"
			>
				<img
					:src="img"
					class="w-full object-cover"
					alt="메인 이미지"
				/>
			</SwiperSlide>
		</Swiper>

		<!-- 썸네일: 메인 위에 겹쳐진 float 스타일 -->
		<div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center pointer-events-none">
			<div class="w-[90%] max-w-sm pointer-events-auto">
				<Swiper
					:modules="[FreeMode, Thumbs]"
					@swiper="setThumbsSwiper"
					:spaceBetween="8"
					:slidesPerView="'auto'"
					freeMode
					watchSlidesProgress
					centeredSlides
				>
					<SwiperSlide
						v-for="(img, i) in images"
						:key="i"
						class="w-[60px] sm:w-[72px] cursor-pointer"
					>
						<img
							:src="img"
							class="h-16 w-full object-cover rounded-md border-2 border-white shadow-md hover:border-pink-400 transition"
							alt="썸네일"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
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
