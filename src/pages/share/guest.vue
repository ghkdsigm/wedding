<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import KakaoShareButton from '@/components/KakaoShareButton.vue'

const KAKAO = 'ae118806548ca1d60ddf5d35da105e7f'
const route = useRoute()

// invitation/index.vue와 동일한 데이터 구조 사용
const weddingData = {
  shareTitle: '승현 ♥ 정민, 저희 결혼합니다!',
  shareDescription: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워',
  shareImageUrl: 'https://hshkjm251025.shop/imgs/common/thumb.png',
  shareWebUrl: 'https://hshkjm251025.shop/home'
}

// 각 버튼별 URL 설정 (동적으로 매칭)
const dadAttendingUrl = 'https://hshkjm251025.shop/invitation'
const dadNotAttendingUrl = 'https://hshkjm251025.shop/announcement'
const defaultWithAccountUrl = weddingData.shareWebUrl
const defaultWithoutAccountUrl = weddingData.shareWebUrl
const galleryUrl = 'https://hshkjm251025.shop/wedding'

const place = {
  guest: '더퍼스트클래스파티 강서NH서울타워점',
  nonGuest: '스몰웨딩',
}

</script>

<template>
  <KakaoShareButton
    :kakao-key="KAKAO"
    :title="weddingData.shareTitle"
    :description="weddingData.shareDescription"
    :image-url="weddingData.shareImageUrl"
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
