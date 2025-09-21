<!-- src/components/KakaoShareButton.vue -->
<template>
    <div class="flex flex-col gap-3">
      <!-- 아빠 - 올사람용 -->
      <button
        class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
        @click="share('dad-attending')"
      >
        카카오톡 공유하기(아빠 - 올사람용)
      </button>

      <!-- 아빠 - 못오는사람용 -->
      <button
        class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
        @click="share('dad-not-attending')"
      >
        카카오톡 공유하기(아빠 - 못오는사람용)
      </button>

      <!-- 기본 - 계좌정보있는용 -->
      <button
        class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
        @click="share('default-with-account')"
      >
        카카오톡 공유하기(기본 - 계좌정보있는용)
      </button>

      <!-- 기본 - 계좌정보없는용 -->
      <button
        class="px-4 py-2 rounded-full bg-[#6b5a4d] text-white text-sm shadow"
        @click="share('default-without-account')"
      >
        카카오톡 공유하기(기본 - 계좌정보없는용)
      </button>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  const props = defineProps({
    kakaoKey: { type: String, required: true },
    title: { type: String, default: '승현 ♥ 정민 모바일 청첩장' },
    description: { type: String, default: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워' },
    imageUrl: { type: String, required: true }, // 절대경로
    
    // 각 버튼별 URL
    dadAttendingUrl: { type: String, required: true },
    dadNotAttendingUrl: { type: String, required: true },
    defaultWithAccountUrl: { type: String, required: true },
    defaultWithoutAccountUrl: { type: String, required: true },
    
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
  
  function share (buttonType) {
    let targetUrl = ''
    
    // 버튼 타입에 따라 다른 URL 선택
    switch (buttonType) {
      case 'dad-attending':
        targetUrl = props.dadAttendingUrl
        break
      case 'dad-not-attending':
        targetUrl = props.dadNotAttendingUrl
        break
      case 'default-with-account':
        targetUrl = props.defaultWithAccountUrl
        break
      case 'default-without-account':
        targetUrl = props.defaultWithoutAccountUrl
        break
      default:
        targetUrl = props.defaultWithAccountUrl
    }
    
    // URL에 따라 동적으로 버튼 제목 설정
    let buttonTitle = '청첩장 보기'
    
    if (targetUrl.includes('/invitation')) {
      buttonTitle = '청첩장 보기'
    } else if (targetUrl.includes('/announcement')) {
      buttonTitle = '청첩장 보기'
    } else if (targetUrl.includes('/home')) {
      buttonTitle = '청첩장 보기'
    } else if (targetUrl.includes('/wedding')) {
      buttonTitle = '청첩장 보기'
    }
    
    const buttons = [
      { title: buttonTitle, link: { mobileWebUrl: targetUrl, webUrl: targetUrl } },
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
        link: { mobileWebUrl: targetUrl, webUrl: targetUrl },
      },
      buttons: safeButtons,
    })
  }
  </script>
  