<template>
	<div class="font-sans text-gray-800">
		<!-- <div v-if="userType === 'a'">
			<router-view />
			<Bottom />
		</div>
		<div v-else>
			<router-view />
			<Bottom />
		</div> -->

		<!-- <Header /> -->
		<router-view />
		<FallingPetals />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Bottom from './components/Bottom.vue'
import FallingPetals from '@/components/common/FallingPetals.vue'

const userType = ref(null)

onMounted(() => {
	const path = window.location.pathname
	if (path === '/a' || path === '/b') {
		userType.value = path.replace('/', '') // 'a' or 'b'

		// URL을 / 로 덮어씀 (주소창 깔끔하게)
		history.replaceState({}, '', '/')

		// 선택: 기억해두기
		localStorage.setItem('userType', userType.value)
	} else {
		userType.value = localStorage.getItem('userType') || null
	}
})
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
