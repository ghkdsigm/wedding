<template>
	<div id="app-shell" class="font-goun-batang text-gray-800">
	  <router-view />
  
	  <!-- 재생/일시정지 토글 버튼 -->
	  <button
		class="fixed top-5 right-5 z-50 w-10 h-10 rounded-full 
			   bg-white/70 backdrop-blur border border-gray-200 
			   shadow-lg flex items-center justify-center 
			   hover:scale-105 hover:bg-white/90 transition"
		:disabled="!ytReady"
		@click="togglePlay"
		aria-label="배경음악 재생/일시정지"
		title="배경음악 재생/일시정지"
	  >
		<!-- 재생 아이콘 -->
		<svg
		  v-if="!isPlaying"
		  xmlns="http://www.w3.org/2000/svg"
		  viewBox="0 0 24 24"
		  class="w-7 h-7 fill-gray-700"
		>
		  <path d="M8 5v14l11-7z" />
		</svg>
		<!-- 일시정지 아이콘 -->
		<svg
		  v-else
		  xmlns="http://www.w3.org/2000/svg"
		  viewBox="0 0 24 24"
		  class="w-7 h-7 fill-gray-700"
		>
		  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
		</svg>
	  </button>
  
	  <!-- 숨김 플레이어 -->
	  <div class="w-0 h-0 overflow-hidden">
		<div id="yt-bgm-player"></div>
	  </div>
	</div>
  </template>
  
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const ytReady = ref(false)
const isPlaying = ref(false)
let player = null

// 재생할 여러 유튜브 영상 ID
const VIDEO_IDS = ['fqxNYjDFJUk','QLMzP4rhFT8', 'TcY_EkaZSNw','9hese2_Bbig'] // 원하는 만큼 추가

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
  })
}

async function initPlayer() {
  const YT = await loadYouTubeAPI()
  player = new YT.Player('yt-bgm-player', {
    width: 0,
    height: 0,
    videoId: VIDEO_IDS[0], // 첫 곡
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: VIDEO_IDS.join(',') // 여러 곡 순차 재생
    },
    events: {
      onReady: () => {
        ytReady.value = true
        isPlaying.value = false
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) isPlaying.value = true
        else if (e.data === YT.PlayerState.PAUSED) isPlaying.value = false
        else if (e.data === YT.PlayerState.ENDED) isPlaying.value = false
      }
    }
  })
}

function togglePlay() {
  if (!player) return
  if (isPlaying.value) player.pauseVideo()
  else player.playVideo()
}

onMounted(() => {
  initPlayer()
})

onBeforeUnmount(() => {
  if (player && player.destroy) {
    player.destroy()
    player = null
  }
})
</script>

  
  <style scoped>
  .app-shell{
	min-height: 100svh;
	padding-top: calc(16px + env(safe-area-inset-top));
	padding-bottom: calc(16px + env(safe-area-inset-bottom));
  }
  </style>
  