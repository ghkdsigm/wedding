<template>
	<div class="font-sans text-gray-800">
		<Header />
		<router-view />
		<div class="bg-red-500 text-white p-4 text-center">Tailwind 테스트: 이게 빨간 배경이면 성공!</div>
		<Footer />
	</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
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
