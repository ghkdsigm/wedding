<template>
  <!-- Share Section -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden pt-0 pb-0">
    <div class="absolute inset-0 pointer-events-none"/>

    <div class="relative mx-auto w-full max-w-md px-5 py-6 flex flex-col justify-center items-center">
      <!-- Buttons Row -->
      <div class="w-full flex gap-3 justify-between">
        <!-- 카카오톡 공유 버튼 (좌측) -->
        <button
          @click="share"
          class="flex-1 px-4 border border-gray-300 text-gray-500 rounded-full py-2 flex items-center justify-center gap-1 hover:border-gray-400 hover:text-gray-600 active:scale-95 transition-all duration-200"
        >
          <!-- 카카오톡 아이콘 -->
          <div class="w-6 h-6 flex items-center justify-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZHEBapCSKx2cjml_d5T6wvFaEczwtye9yZyIOjN5sqSZ9DTZIs7BS4pR27V2vw_zObao&usqp=CAU" 
              alt="카카오톡" 
              class="w-5 h-5"
            />
          </div>
          
          <!-- 텍스트 -->
          <span class="font-medium text-sm">카톡 공유하기</span>
        </button>

        <!-- 갤러리 보러가기 버튼 (우측) -->
        <button
          @click="goToGallery"
          class="flex-1 px-4 border border-gray-300 text-gray-500 rounded-full py-2 flex items-center justify-center gap-1 hover:border-gray-400 hover:text-gray-600 active:scale-95 transition-all duration-200"
        >
          <!-- 갤러리 아이콘 -->
          <div class="w-6 h-6 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          
          <!-- 텍스트 -->
          <span class="font-medium text-sm">사진 더보기</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 부모로부터 받는 props
const props = defineProps({
  kakaoKey: { type: String, required: true },
  title: { type: String, default: '승현 ♥ 정민, 저희 결혼합니다!' },
  description: { type: String, default: '2025.10.25(토) 오전 11시30분' },
  imageUrl: { type: String, required: true },
  webUrl: { type: String, required: true },
})

const router = useRouter()
const route = useRoute()

// 현재 페이지에 따라 description 설정
const getDescription = () => {
  if (route.path.includes('/announcement')) {
    return '2025.10.25(토) 오전 11시30분'
  }
  return props.description
}

// 카카오 SDK 로드
onMounted(async () => {
  if (!window.Kakao) await loadSdk()
  if (!window.Kakao.isInitialized()) window.Kakao.init(props.kakaoKey)
})

function loadSdk() {
  return new Promise((res, rej) => {
    const s = document.createElement('script')
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js'
    s.crossOrigin = 'anonymous'
    s.onload = res
    s.onerror = rej
    document.head.appendChild(s)
  })
}

function share() {
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: props.title,
      description: getDescription(),
      imageUrl: props.imageUrl,
      link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl },
    },
    buttons: [
      { title: '모바일 청첩장 보기', link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl } },
    ],
  })
}

function goToGallery() {
  // 현재 페이지 정보를 query 파라미터로 전달하여 갤러리 페이지로 이동
  router.push({
    path: '/wedding',
    query: { from: route.path }
  })
  // 페이지 이동 후 스크롤을 맨 위로
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}
</script>

<style scoped>
/* visuals handled by Tailwind */
</style>
