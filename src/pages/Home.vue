<template>
	<section class="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center p-6">
		<h1 class="text-1xl font-bold mb-2">황승현 김정민</h1>
		<p class="text-lg">2025년 10월 25일 토요일 오전 11시30분</p>
		<p class="mt-2">더퍼스트클래스파티 강서NH서울타워점</p>
		
		<!-- 청첩장 보러가기 버튼 -->
		<div class="mt-8">
			<button 
				@click="goToInvitation"
				class="px-8 py-3 bg-pink-200 text-pink-800 rounded-full hover:bg-pink-300 transition-colors duration-200 font-medium"
			>
				청첩장 보러가기
			</button>
		</div>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToInvitation = () => {
	window.location.href = 'https://hshkjm251025.shop/home'
}
</script>
