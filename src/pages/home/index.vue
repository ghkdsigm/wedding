<template>
  <div class="home-page">
    <Section01
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
      :body-text="weddingData.bodyText"
      :user-type="weddingData.userType"
      :groom-family="weddingData.groomFamily"
      :bride-family="weddingData.brideFamily"
    />
    <Section05
      :year="weddingData.year"
      :month="weddingData.month"
      :selected-day="weddingData.selectedDay"
    />    
   
    
    <Section03
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
    />

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

// 부모에서 모든 웨딩 데이터 관리
const weddingData = {
  // Section01 데이터
  // imageSrc: '/src/assets/imgs/wedding.jpg',
  imageSrc: '/imgs/common/10-min.jpg',
  bridegroom: '황승현',
  bride: '김정민',
  scriptText: 'The Start of Our Journey',
  dateText: '2025년 10월 25일 토요일 오전 11시30분',
  venueText: '더퍼스트클래스파티 강서NH서울타워점',
  scriptFontClass: '',
  weddingDate: '2025-10-25', // D-Day 계산용 (YYYY-MM-DD 형식)
  
  // Section02 데이터
  bodyText: {
    guest: `안녕하세요.
            신랑 황승현, 신부 김정민의 결혼식에
            귀한 걸음 하여 자리를 빛내 주시면 깊이 감사하겠습니다.

            소중한 인연으로 만난 황승현과 김정민이 이제 서로의 든든한
            동반자가 되어 서로를 존중하고 함께 사랑하고자 합니다.

            저희는 양가 가족과 지장 가까운 분들을 모신,
            두 사람의 진심과 사랑의 약속이 담금질되는 작은 예식을
            올리게 되었습니다.

            함께해 주시는 분들의 따뜻한 마음으로 배려를 양해하며,
            따뜻한 마음으로 축복해 주시면 더없는 기쁨이겠습니다.
            소중한 마음으로 축복해 주시는 만큼 행복하게 잘 살겠습니다.`,
                nonGuest: `안녕하세요?
            신랑 황승현과 신부 김정민이 멋진 가약을 맺고
            서로의 가정을 꾸리게 되었습니다.

            장소의 여건을 감안, 모든 분들을 모시지 못함을 양해
            바랍니다. 자리는 [수용 인원/주최 측 방침]에 따라
            양가 직계 가족 분과 [가까운/소수의] 지인 중심의 예식으로
            올리고자 합니다.

            바쁘신 가운데 [많은 분을 정성껏 모시지 못하는 점] 너그러이
            양해 해 주세요.
            정작 찾아뵙고 결혼 소식을 전해드리지 못해
            송구스러운 마음입니다.

            멀리서나마 저희 두 사람의 앞날을 마음으로 축복해 주시면
            더할 나위 없는 기쁨으로 예쁘게 살아가겠습니다.
            늘 건강하시고 가정에 행복이 가득하시길 바랍니다.`
  },
  groomFamily: '황운의 장남 황승현',
  brideFamily: '권숙희의 장녀 김정민',
  userType: 'guest', // 'guest' 또는 'nonGuest'
  
  // Section03 데이터
  kakaoKey: 'ae118806548ca1d60ddf5d35da105e7f', // 실제 카카오 맵 API 키로 교체 필요
  venueName: '더퍼스트클래스파티 강서NH서울타워점',
  address: '서울 강서구 양천로570(NH서울타워) 20층 더퍼스트클래스파티',
  tel: '02-2013-5670',
  lat: 37.557129,
  lng: 126.862107,
  level: 3,
  subwayInfo: '증미역 3번 출구에서 56m NH서울타워 20층 (도보 1분)',
  busInfo: '간선(파랑): 47, 240, 463\n지선(초록): 4211\좌석(빨강): 강남08',
  parkingInfo: '강서NH서울타워점 주차장 이용',
  
  // Section04 데이터
  noticeAccounts: [
    '농협 123-456788-7654321 예금주: 이지훈'
  ],
  extraNotice: '화환은 정중히 사양합니다.',
  sectionTitle: '마음 전하실 곳',
  sectionSubtitle: '마음을 전해주실 분들을 위해 계좌번호를 안내해드립니다.',
  groomLabel: '신랑측',
  brideLabel: '신부측',
  groomAccounts: [
    { bank: '신한', number: '110-377-929023', holder: '황승현' },
    { bank: '국민', number: '848601-04-138274', holder: '황운' }
  ],
  brideAccounts: [
    { bank: '신한', number: '444-55-666666', holder: '김정민' },    
    { bank: '신한', number: '444-55-666666', holder: '권숙희' }
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
  shareTitle: '승현 ♥ 정민 모바일 청첩장',
  shareDescription: '2025.10.25(토) 오전 11시30분 · 강서NH서울타워',
  shareImageUrl: 'https://adorable-faun-527e08.netlify.app/imgs/common/1-min.jpg',
  shareWebUrl: 'https://adorable-faun-527e08.netlify.app/home'
}
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100vh;
}
</style>
