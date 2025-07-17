<template>
	<section class="relative w-screen h-screen bg-white overflow-hidden z-100">
		<!-- 벚꽃 떨어지는 곳 -->
		<div
			id="sakura"
			class="absolute inset-0 z-0"
		></div>

		<!-- 나머지 청첩장 콘텐츠 -->
		<div class="relative z-10 p-6">
			<h1 class="text-4xl">ccccc</h1>
			<!-- 기타 텍스트 -->
		</div>
	</section>
</template>

<script setup>
import { onMounted } from 'vue'
import $ from 'jquery'

onMounted(() => {
	// Sakura 효과 적용
	$('#sakura').sakura({
		blowAnimations: ['blow-soft-left', 'blow-soft-right'],
		maxSize: 14,
		minSize: 9,
		newOn: 300, // 숫자가 작을수록 꽃이 자주 생김
		className: 'sakura',
	})
})
</script>

<!-- jQuery + jQuery-Sakura 스크립트 불러오기 -->
<!-- ⚠️ App.vue 또는 index.html에서 한 번만 불러오면 됨 -->
