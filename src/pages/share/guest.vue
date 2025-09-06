<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import KakaoShareButton from '@/components/KakaoShareButton.vue'

const KAKAO = 'ae118806548ca1d60ddf5d35da105e7f'
const route = useRoute()
// const currentUrl = computed(() =>
//   new URL(route.fullPath, window.location.origin).toString()
// )

const currentUrl = 'https://adorable-faun-527e08.netlify.app/home'
const galleryUrl = 'https://adorable-faun-527e08.netlify.app/wedding'

</script>

<template>
  <KakaoShareButton
    :kakao-key="KAKAO"
    title="승현 ♥ 정민 저희 결혼합니다"
    description="2025.10.25(토) 오전 11시30분 · 더퍼스트클래스파티 강서NH서울타워점"
    image-url="https://adorable-faun-527e08.netlify.app/imgs/wedding.jpg"
    :web-url="currentUrl"
    :gallery-url="galleryUrl"
    :lat="37.557129"
    :lng="126.862107"
    place-name="더퍼스트클래스파티 강서NH서울타워점"
  />
</template>
