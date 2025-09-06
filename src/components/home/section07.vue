<template>
  <!-- Share Section -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_0%_0%,#ffffff_0%,transparent_60%),radial-gradient(80%_60%_at_100%_20%,#efe9e6_0%,transparent_60%)]"/>

    <div class="relative mx-auto w-full max-w-md px-0 py-6 flex flex-col justify-center items-center">
      <!-- Share Button -->
      <div class="w-full max-w-sm flex justify-center">
        <button
          @click="share"
          class="w-[auto] px-5 border border-gray-300 text-gray-500 rounded-full py-2 flex items-center justify-center gap-3 hover:border-gray-400 hover:text-gray-600 active:scale-95 transition-all duration-200"
        >
          <!-- 카카오톡 아이콘 -->
          <div class="w-8 h-8 flex items-center justify-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZHEBapCSKx2cjml_d5T6wvFaEczwtye9yZyIOjN5sqSZ9DTZIs7BS4pR27V2vw_zObao&usqp=CAU" 
              alt="카카오톡" 
              class="w-6 h-6"
            />
          </div>
          
          <!-- 텍스트 -->
          <span class="font-medium">카카오톡 공유하기</span>
          
          <!-- 우측 화살표 -->
          <!-- <div class="w-6 h-6 flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div> -->
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

// 부모로부터 받는 props
const props = defineProps({
  kakaoKey: { type: String, required: true },
  title: { type: String, default: '승현 ♥ 정민 모바일 청첩장' },
  description: { type: String, default: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워' },
  imageUrl: { type: String, required: true },
  webUrl: { type: String, required: true },
})

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
      description: props.description,
      imageUrl: props.imageUrl,
      link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl },
    },
    buttons: [
      { title: '모바일 청첩장 보기', link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl } },
    ],
  })
}
</script>

<style scoped>
/* visuals handled by Tailwind */
</style>
