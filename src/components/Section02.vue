<template>
	<section
		id="second-section"
		class="w-screen bg-white flex items-center justify-center"
	>
		<div class="bg-white py-8 text-center space-y-4 font-goun-batang">
			<!-- 10년 연애 이야기 -->
			<div class="mb-6">
				<p class="text-gray-700 leading-relaxed text-sm">
					"10년이라는 시간동안의 연애를 끝으로<br />
					서로를 알게 되고 없어서는 안 될 존재가 되었습니다"
				</p>
			</div>
			
			<!-- 앞으로의 여정 -->
			<div class="mb-6">
				<p class="text-gray-600 italic leading-relaxed text-sm">
					이제 앞으로도 우리의 머나먼 여정<br />
					멀리서나마 저희의 앞날을 축복해 주시고 격려해 주시면<br />
					더 없는 기쁨으로 여기며 행복하게 살겠습니다.
				</p>
			</div>
			
			<!-- 동적 버튼 -->
			<div class="mt-8 flex justify-center">
				<button 
					@click="goToPage"
					class="px-8 py-3 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm"
				>
					{{ props.buttonText }}
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
	buttonText: { type: String, default: '청첩장 보기' },
	buttonUrl: { type: String, default: '/home' }
})

const router = useRouter()
const route = useRoute()

const goToPage = () => {
	// query 파라미터에서 이전 페이지 정보 가져오기
	const fromPage = route.query.from
	
	// 이전 페이지 정보가 있으면 그 페이지로, 없으면 기본값 사용
	let targetPath = fromPage || props.buttonUrl
	
	// query 파라미터가 없는 경우 기본 경로로 이동
	if (!fromPage) {
		targetPath = props.buttonUrl
	}
	
	console.log('현재 경로:', route.path)
	console.log('query.from:', fromPage)
	console.log('props.buttonUrl:', props.buttonUrl)
	console.log('최종 이동 경로:', targetPath)
	
	router.push(targetPath)
	// 페이지 이동 후 스크롤을 맨 위로
	setTimeout(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, 100)
}
</script>
