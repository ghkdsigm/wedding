<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import KakaoShareButton from '@/components/KakaoShareButton.vue'

const KAKAO = 'ae118806548ca1d60ddf5d35da105e7f'
const route = useRoute()

// 각 버튼별 임시 URL 설정
const dadAttendingUrl = 'https://adorable-faun-527e08.netlify.app/home'
const dadNotAttendingUrl = 'https://adorable-faun-527e08.netlify.app/home2'
const defaultWithAccountUrl = 'https://adorable-faun-527e08.netlify.app/home3'
const defaultWithoutAccountUrl = 'https://adorable-faun-527e08.netlify.app/home4'

const galleryUrl = 'https://adorable-faun-527e08.netlify.app/wedding'

const place = {
  guest: '더퍼스트클래스파티 강서NH서울타워점',
  nonGuest: '스몰웨딩',
}

</script>

<template>
  <KakaoShareButton
    :kakao-key="KAKAO"
    title="승현 ♥ 정민, 저희 결혼합니다!"
    :description="`2025.10.25(토) 오전 11시30분 · ${place.guest}`"
    image-url="https://adorable-faun-527e08.netlify.app/imgs/wedding.jpg"
    :dad-attending-url="dadAttendingUrl"
    :dad-not-attending-url="dadNotAttendingUrl"
    :default-with-account-url="defaultWithAccountUrl"
    :default-without-account-url="defaultWithoutAccountUrl"
    :gallery-url="galleryUrl"
    :lat="37.557129"
    :lng="126.862107"
    place-name="더퍼스트클래스파티 강서NH서울타워점"
  />
</template>
