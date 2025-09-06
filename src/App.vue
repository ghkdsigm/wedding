<template>
	<div id="app-shell" class="app-shell font-goun-batang text-gray-800">
	  <!-- 필요 시 헤더/푸터 다시 열면 됨 -->
	  <!-- <Header /> -->
	  <router-view />
	  <!-- <Bottom /> -->
	  <!-- <FallingPetals /> -->
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import Header from './components/Header.vue'
  // import Bottom from './components/Bottom.vue'
  // import FallingPetals from '@/components/common/FallingPetals.vue'
  
  const userType = ref(null)
  
  onMounted(() => {
	const path = window.location.pathname
	if (path === '/a' || path === '/b') {
	  userType.value = path.replace('/', '') // 'a' or 'b'
	  // 주소창 깔끔하게
	  history.replaceState({}, '', '/')
	  localStorage.setItem('userType', userType.value)
	} else {
	  userType.value = localStorage.getItem('userType') || null
	}
  })
  </script>
  
  <style scoped>
  .app-shell{
	/* 인앱/노치 대응 + 한 화면 섹션과 일관성 */
	min-height: 100svh;
	padding-top: calc(16px + env(safe-area-inset-top));
	padding-bottom: calc(16px + env(safe-area-inset-bottom));
  }
  .logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
  }
  .logo:hover { filter: drop-shadow(0 0 2em #646cffaa); }
  .logo.vue:hover { filter: drop-shadow(0 0 2em #42b883aa); }
  </style>
  