<!-- src/components/KakaoShareButton.vue -->
<template>
    <button class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
            @click="share">카카오톡으로 공유하기</button>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  const props = defineProps({
    kakaoKey: { type: String, required: true },
    title: { type: String, default: '승현 ♥ 정민 모바일 청첩장' },
    description: { type: String, default: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워' },
    imageUrl: { type: String, required: true }, // 절대경로
    webUrl: { type: String, required: true },
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
    const buttons = [
      { title: '모바일 청첩장 보기', link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl } },
    ]
    if (props.lat != null && props.lng != null) {
      const map = `https://map.kakao.com/link/map/${encodeURIComponent(props.placeName)},${props.lat},${props.lng}`
      buttons.push({ title: '길 안내', link: { mobileWebUrl: map, webUrl: map } })
    }
  
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: props.title,
        description: props.description,
        imageUrl: props.imageUrl,
        link: { mobileWebUrl: props.webUrl, webUrl: props.webUrl },
      },
      buttons,
    })
  }
  </script>
  