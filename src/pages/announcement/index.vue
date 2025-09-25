<template>
  <div class="home-page">
    <Section01
      :title="weddingData.tit"
      :image-src="weddingData.imageSrc"
      :bridegroom="weddingData.bridegroom"
      :bride="weddingData.bride"
      :script-text="weddingData.scriptText"
      :date-text="weddingData.dateText"
      :venue-text="weddingData.venueText"
      :script-font-class="weddingData.scriptFontClass"
      :wedding-date="weddingData.weddingDate"
    />
    <Section02
      :notice="'전합니다'"
      :body-text="weddingData.bodyText.nonGuest"
      :user-type="weddingData.userType"
      :groom-family="weddingData.groomFamily"
      :bride-family="weddingData.brideFamily"
    />
    <Section05
      :year="weddingData.year"
      :month="weddingData.month"
      :selected-day="weddingData.selectedDay"
    />    
   
    
    <!-- <Section03
      :kakao-key="weddingData.kakaoKey"
      :venue-name="weddingData.venueName"
      :address="weddingData.address"
      :tel="weddingData.tel"
      :lat="weddingData.lat"
      :lng="weddingData.lng"
      :level="weddingData.level"
      :subway-info="weddingData.subwayInfo"
      :bus-info="weddingData.busInfo"
      :parking-info="weddingData.parkingInfo"
    /> -->

    <Section04
      :notice-accounts="weddingData.noticeAccounts"
      :extra-notice="weddingData.extraNotice"
      :section-title="weddingData.sectionTitle"
      :section-subtitle="weddingData.sectionSubtitle"
      :groom-label="weddingData.groomLabel"
      :bride-label="weddingData.brideLabel"
      :groom-accounts="weddingData.groomAccounts"
      :bride-accounts="weddingData.brideAccounts"
    />

    <Section06
      :images="weddingData.galleryImages"
    />

    <Section07
      :kakao-key="weddingData.kakaoKey"
      :title="weddingData.shareTitle"
      :description="weddingData.shareDescription"
      :image-url="weddingData.shareImageUrl"
      :web-url="weddingData.shareWebUrl"
    />

    <Section08
    />

    <!-- <Section06
      :images="weddingData.galleryImages"
    /> -->

  </div>
</template>

<script setup>
import Section01 from '@/components/home/section01.vue'
import Section02 from '@/components/home/section02.vue'
import Section03 from '@/components/home/section03.vue'
import Section04 from '@/components/home/section04.vue'
import Section05 from '@/components/home/section05.vue'
import Section06 from '@/components/home/section06.vue'
import Section07 from '@/components/home/section07.vue'
import Section08 from '@/components/home/section08.vue'

// 부모에서 모든 웨딩 데이터 관리
const weddingData = {
  // Section01 데이터
  // imageSrc: '/src/assets/imgs/wedding.jpg',
  tit: 'THE BEGINNING',
  imageSrc: '/imgs/common/representative.png',
  bridegroom: '황승현',
  bride: '김정민',
  scriptText: 'The Start of Our Journey',
  dateText: '2025년 10월 25일 토요일 오전 11시30분',
  venueText: '',
  scriptFontClass: '',
  weddingDate: '2025-10-25', // D-Day 계산용 (YYYY-MM-DD 형식)
  
  // Section02 데이터
  bodyText: {
    guest: `10년 연애 끝에 서로의 든든한 동반자가 되려 합니다.\n\n양가 직계 가족과 가장 가까운 분들만 모시고\n사랑과 약속에 집중하는 작은 예식을 올립니다.\n귀한 걸음 하시어 자리를 빛내주시면 감사하겠습니다.\n\n소중한 마음으로 축복해 주시는 만큼\n행복하게 잘 살겠습니다.`,
    nonGuest: `10년 연애 끝에 서로의 든든한 동반자가 되려 합니다.\n\n양가 직계 가족만 모시고 사랑과 약속에 집중하는\n작은 예식을 올립니다.\n모든 분을 모시지 못하는 점, 너그러이 양해 부탁드립니다.\n멀리서나마 저희의 앞날을 축복해주시면\n행복하게 잘 사는 모습으로 보답하겠습니다.\n\n감사합니다.`
  },
  groomFamily: '황운의 장남 황승현',
  brideFamily: '권숙희의 장녀 김정민',
  userType: 'guest', // 'guest' 또는 'nonGuest'
  
  // Section03 데이터
  kakaoKey: 'ae118806548ca1d60ddf5d35da105e7f', // 실제 카카오 맵 API 키로 교체 필요
  venueName: '',
  address: '서울 강서구 양천로570(NH서울타워) 20층 \n더퍼스트클래스파티',
  tel: '02-2013-5670',
  lat: 37.557129,
  lng: 126.862107,
  level: 3,
  subwayInfo: '증미역 3번 출구에서 56m NH서울타워 20층 (도보 1분)',
  busInfo: '간선(파랑): 47, 240, 463\n지선(초록): 4211\n좌석(빨강): 강남08',
  parkingInfo: '강서NH서울타워점 주차장 이용',
  
  // Section04 데이터
  noticeAccounts: [
    '농협 123-456788-7654321 예금주: 이지훈'
  ],
  extraNotice: '',
  sectionTitle: '마음 전하실 곳',
  sectionSubtitle: '마음을 전해주실 분들을 위해 계좌번호를 안내해드립니다.',
  groomLabel: '신랑측',
  brideLabel: '신부측',
  groomAccounts: [
    { bank: '신한', number: '110-377-929023', holder: '황승현' },
    { bank: '국민', number: '848601-04-138274', holder: '황운' }
  ],
  brideAccounts: [
    { bank: '국민', number: '90118120272', holder: '김정민' },    
    { bank: '우리', number: '10025581443902', holder: '권숙희' }
  ],
    
  // Section05 데이터
  year: 2025,
  month: 10,
  selectedDay: 25,
  
  // Section06 데이터 (갤러리 이미지)
  galleryImages: [
    '/imgs/common/1-min.jpg',
    '/imgs/common/2-min.jpg',
    '/imgs/common/3-min.jpg',
    '/imgs/common/4-min.jpg',
    '/imgs/common/5-min.jpg',
    '/imgs/common/6-min.jpg',
  ],


  // Section07 데이터 (공유)
  shareTitle: '승현 ♥ 정민, 저희 결혼합니다!',
  shareDescription: '',
  shareImageUrl: 'https://hshkjm251025.shop/imgs/common/thumb.png',
  shareWebUrl: 'https://hshkjm251025.shop/announcement'
}
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100vh;
}
</style>
