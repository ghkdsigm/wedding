<!-- src/components/KakaoShareButton.vue -->
<template>
    <button
      class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
      @click="share"
    >
      카카오톡으로 공유하기
    </button>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  const props = defineProps({
    kakaoKey: { type: String, required: true },
    title: { type: String, default: '승현 ♥ 정민 모바일 청첩장' },
    description: { type: String, default: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워' },
    imageUrl: { type: String, required: true }, // 절대경로
    webUrl: { type: String, required: true },
    // 갤러리 전용 페이지(이미지 슬라이드) 주소
    galleryUrl: { type: String, default: '' },
  
    // 필요 시 지도 버튼을 다시 쓰고 싶으면 유지
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    placeName: { type: String, default: '웨딩홀' },
  })
  
  onMounted(async () => {
    if (!window.Kakao) await loadSdk()
    if (!window.Kakao.isInitialized()) window.Kakao.init(props.kakaoKey)
  })
  
  function loadSdk () {
    return new Promise((res, rej) => {
      const s = document.createElement('script')
      s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js'
      s.crossOrigin = 'anonymous'
      s.onload = res; s.onerror = rej
      document.head.appendChild(s)
    })
  }
  
  function share () {
    // 기본 버튼: 모바일 청첩장 보기
    const buttons = [
      { title: '모바일 청첩장 보기', link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl } },
    ]
  
    // 갤러리 버튼: galleryUrl이 있으면 두 번째 버튼으로 추가
    if (props.galleryUrl) {
      buttons.push({ title: '갤러리 보기', link: { mobileWebUrl: props.galleryUrl, webUrl: props.galleryUrl } })
    }
  
    // 카카오 기본 템플릿은 버튼 최대 2개. 초과 방지.
    const safeButtons = buttons.slice(0, 2)
  
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: props.title,
        description: props.description,
        imageUrl: props.imageUrl,
        link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl },
      },
      buttons: safeButtons,
    })
  }
  </script>
  