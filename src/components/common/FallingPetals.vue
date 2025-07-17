<template>
	<div class="pointer-events-none fixed inset-0 overflow-hidden z-99">
		<div
			v-for="n in 20"
			:key="n"
			class="absolute w-4 h-4 bg-pink-300 rounded-full opacity-70 animate-fall"
			:style="randomStyle(n)"
		/>
	</div>
</template>

<script setup>
function randomStyle(index) {
	const left = Math.random() * 100
	const delay = Math.random() * 5
	const duration = 5 + Math.random() * 5
	const size = 8 + Math.random() * 8
	return {
		left: `${left}%`,
		animationDelay: `${delay}s`,
		animationDuration: `${duration}s`,
		width: `${size}px`,
		height: `${size}px`,
		backgroundColor: `hsl(${330 + index * 2}, 80%, 85%)`,
	}
}
</script>

<style scoped>
@keyframes fall {
	0% {
		transform: translateY(-10%) rotate(0deg);
		opacity: 1;
	}
	100% {
		transform: translateY(120vh) rotate(360deg);
		opacity: 0;
	}
}
.animate-fall {
	animation-name: fall;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}
</style>
