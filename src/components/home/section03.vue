<template>
  <!-- Kakao Map Section (unified layout) -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_0%_0%,#ffffff_0%,transparent_60%),radial-gradient(80%_60%_at_100%_20%,#efe9e6_0%,transparent_60%)]"/>

    <div class="relative mx-auto w-full max-w-md px-5 py-5 space-y-4">
      <!-- Header: venue info -->
      <div class="rounded-xl border border-[#eee] bg-white/90 backdrop-blur p-4">
        <h3 class="text-[clamp(12px,3.75vw,18px)] font-semibold break-words">{{ venueName }}</h3>
        <p v-if="address" class="text-[clamp(10px,3vw,14px)] text-[#6c625b] mt-0.5 break-words">{{ address }}</p>
        <p v-if="tel" class="text-[clamp(10px,3vw,14px)] text-[#6c625b] mt-0.5">Tel. {{ tel }}</p>
      </div>

      <!-- Action buttons -->
      <div v-if="tel || address" class="grid grid-cols-2 gap-2">
        <button v-if="tel" @click="callTel" class="rounded-full bg-[#6b5a4d] text-white px-3 py-2 text-[clamp(8px,2.5vw,12px)] shadow hover:bg-[#5a4a3d] active:scale-95 transition-all duration-150">전화하기</button>
        <button v-if="address" @click="copyAddress" class="rounded-full border border-[#ddd] px-3 py-2 text-[clamp(8px,2.5vw,12px)] shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-150">주소 복사</button>
      </div>

      <!-- Map area -->
      <div class="relative rounded-xl overflow-hidden border border-[#eee] bg-[#f3f1ef]">
        <div ref="mapWrap" class="h-[360px] sm:h-[420px] w-full"></div>
        <div v-if="loading" class="absolute inset-0 grid place-items-center text-[clamp(10px,3vw,14px)] text-[#9b948e] bg-white/40 backdrop-blur">지도를 불러오는 중…</div>
      </div>

      <!-- Nav buttons (Kakao 중심) -->
      <!-- <div class="grid grid-cols-4 gap-3">
        <button type="button" class="nav-pill" @click="openAppOrWeb(kakaoNaviScheme, kakaoMapGuide)">
          <div class="nav-ico bg-[#f59e0b]">K</div>
          <span class="nav-txt">카카오내비</span>
        </button>
        <button type="button" class="nav-pill" @click="openAppOrWeb(kakaoMapScheme, kakaoMapWeb)">
          <div class="nav-ico bg-[#fbbf24]">K</div>
          <span class="nav-txt">카카오맵</span>
        </button>
        <button type="button" class="nav-pill" @click="openAppOrWeb(naverScheme, naverWeb)">
          <div class="nav-ico bg-[#10b981]">N</div>
          <span class="nav-txt">네이버지도</span>
        </button>
        <button type="button" class="nav-pill" @click="openAppOrWeb(tmapScheme, tmapWeb)">
          <div class="nav-ico bg-[#ef4444]">T</div>
          <span class="nav-txt">티맵</span>
        </button>
      </div> -->

      <!-- Guides -->
      <div class="mt-3 space-y-5">
        <div>
          <h4 class="text-[clamp(10px,3.25vw,16px)] font-bold">지하철안내</h4>
          <p class="text-[clamp(10px,3vw,14px)] text-[#6c625b] mt-1 leading-6">{{ subwayInfo }}</p>
        </div>
        <div class="h-px bg-[#eee]"></div>
        <div>
          <h4 class="text-[clamp(10px,3.25vw,16px)] font-bold">버스안내</h4>
          <p class="text-[clamp(10px,3vw,14px)] text-[#6c625b] mt-1 leading-6 whitespace-pre-line">{{ busInfo }}</p>
        </div>
        <div class="h-px bg-[#eee]"></div>
        <div>
          <h4 class="text-[clamp(10px,3.25vw,16px)] font-bold">주차안내</h4>
          <p class="text-[clamp(10px,3vw,14px)] text-[#6c625b] mt-1 leading-6">{{ parkingInfo }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'kakaoKey',
  'venueName',
  'address',
  'tel',
  'lat',
  'lng',
  'level',
  'subwayInfo',
  'busInfo',
  'parkingInfo'
])

const mapWrap = ref(null)
const loading = ref(true)
let map, marker

onMounted(init)
watch(() => [props.lat, props.lng, props.level], () => {
  if (map && typeof props.lat === 'number' && typeof props.lng === 'number') {
    const center = new window.kakao.maps.LatLng(props.lat, props.lng)
    map.setLevel(props.level)
    map.setCenter(center)
    if (!marker) marker = new window.kakao.maps.Marker({ position: center })
    marker.setMap(map)
  }
})

async function init() {
  await loadKakao(props.kakaoKey)
  window.kakao.maps.load(async () => {
    // 좌표가 없고 주소만 있으면 지오코딩으로 좌표 보정
    let lat = props.lat, lng = props.lng
    if ((lat == null || lng == null) && props.address) {
      try {
        const pos = await geocode(props.address)
        lat = pos.lat; lng = pos.lng
      } catch {}
    }

    const center = new window.kakao.maps.LatLng(lat ?? 37.5665, lng ?? 126.9780) // 서울 기본값
    const options = { center, level: props.level }
    map = new window.kakao.maps.Map(mapWrap.value, options)

    // 컨트롤
    map.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT)

    marker = new window.kakao.maps.Marker({ position: center })
    marker.setMap(map)

    loading.value = false
  })
}

function callTel() { if (props.tel) window.location.href = `tel:${props.tel}` }
async function copyAddress() { 
  try { 
    await navigator.clipboard.writeText(props.venueName)
    alert('주소가 복사되었습니다.')
  } catch {
    alert('복사에 실패했습니다.')
  } 
}

// --- Kakao script loader & helpers ---
let kakaoLoaded = false
function loadKakao(appkey) {
  return new Promise((resolve) => {
    if (kakaoLoaded || (window.kakao && window.kakao.maps)) return resolve()
    const s = document.createElement('script')
    s.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false&libraries=services`
    s.async = true
    s.onload = () => { kakaoLoaded = true; resolve() }
    document.head.appendChild(s)
  })
}

function geocode(query) {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch(query, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK && result[0]) {
        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) })
      } else { reject(status) }
    })
  })
}

// 딥링크
const encName = computed(() => encodeURIComponent(props.venueName || '목적지'))
const kakaoNaviScheme = computed(() => (props.lat != null && props.lng != null)
  ? `kakaonavi://navigate?name=${encName.value}&dest_lat=${props.lat}&dest_lng=${props.lng}`
  : '')
const kakaoMapScheme = computed(() => (props.lat != null && props.lng != null)
  ? `kakaomap://look?p=${props.lat},${props.lng}`
  : '')
const kakaoMapWeb = computed(() => `https://map.kakao.com/link/map/${encName.value},${props.lat},${props.lng}`)
const naverScheme = computed(() => (props.lat != null && props.lng != null)
  ? `nmap://navigation?dlat=${props.lat}&dlng=${props.lng}&dname=${encName.value}`
  : '')
const naverWeb = computed(() => `https://map.naver.com/v5/search/${encName.value}`)
const tmapScheme = computed(() => (props.lat != null && props.lng != null)
  ? `tmap://route?goalname=${encName.value}&goalx=${props.lng}&goaly=${props.lat}`
  : '')
const tmapWeb = 'https://play.google.com/store/apps/details?id=com.skt.skaf.l001mtm091'
const kakaoMapGuide = 'https://kakaonavi.kakao.com/guide'

function openAppOrWeb(scheme, web) {
  const start = Date.now()
  if (scheme) window.location.href = scheme
  setTimeout(() => {
    if (Date.now() - start < 1200) {
      window.open(typeof web === 'function' ? web() : web, '_blank')
    }
  }, 700)
}
</script>

<style scoped>

</style>
