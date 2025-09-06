<template>
	<section
		id="second-section"
		class="w-screen bg-white flex items-center justify-center"
	>
		<div class="bg-white py-8 text-center space-y-4 font-goun-batang">
			<!-- 10년 연애 이야기 -->
			<div class="mb-6">
				<p class="text-gray-700 leading-relaxed">
					"10년이라는 시간동안의 연애를 끝으로<br />
					서로를 알게 되고 없어서는 안 될 존재가 되었습니다"
				</p>
			</div>
			
			<!-- 앞으로의 여정 -->
			<div class="mb-6">
				<p class="text-gray-600 italic leading-relaxed">
					이제 앞으로도 우리의 머나먼 여정<br />
					멀리서나마 저희의 앞날을 축복해 주시고 격려해 주시면<br />
					더 없는 기쁨으로 여기며 행복하게 살겠습니다.
				</p>
			</div>
			
			<!-- 청첩장 보기 버튼 -->
			<div class="mt-8 flex justify-center">
				<button 
					@click="goToHome"
					class="px-8 py-3 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors duration-200"
				>
					청첩장 보기
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
	router.push('/home')
}
</script>
