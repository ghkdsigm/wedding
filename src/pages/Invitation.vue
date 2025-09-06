<template>
  <section class="w-full text-[#4b3e33] bg-[#fbf6f2]">
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_10%_0%,#f8e9e2_0%,transparent_55%),radial-gradient(50%_40%_at_100%_20%,#f4ded4_0%,transparent_50%)]"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div class="space-y-6">
          <p class="tracking-[0.2em] text-sm font-medium text-rose-400">The Urban</p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            당신의 특별한 날,<br />
            감성을 담아 디자인합니다.
          </h1>
          <p class="text-[15px] leading-7 text-[#6b5a4d]">
            아늑한 감성의 모바일 청첩장 템플릿. 다양한 커버 스타일과 사진 배치를 지원하며,
            누구나 쉽게 꾸밀 수 있도록 설계했습니다.
          </p>
          <div class="flex gap-3">
            <button class="px-5 py-3 rounded-full bg-[#6b5a4d] text-white text-sm shadow-sm hover:opacity-90 transition">
              더 다양한 템플릿 보기
            </button>
            <button class="px-5 py-3 rounded-full border border-[#d9c7bc] text-sm hover:bg-white/70 transition">
              무료로 시작하기
            </button>
          </div>
        </div>

        <!-- Hero Image (placeholder arch) -->
        <div class="flex justify-center lg:justify-end">
          <div class="w-[320px] sm:w-[380px] md:w-[420px] aspect-[3/4] bg-[#e9e0da] rounded-[36px] shadow-lg relative overflow-hidden">
            <div class="absolute inset-0 mask-arch bg-gradient-to-b from-[#e6ddd7] to-[#dccfc6]"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-[#a8988e] text-sm">WEDDING PHOTO AREA</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <Divider />

    <!-- Design Lineup -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <header class="text-center mb-10">
        <p class="text-xs tracking-[0.25em] text-rose-400 mb-2">DESIGN LINEUP</p>
        <h2 class="text-2xl sm:text-3xl font-semibold">디자인 라인업</h2>
        <p class="text-sm text-[#7b6a5d] mt-3">분위기별 커버를 선택하세요. 모든 항목은 사진 영역이 비워져 있습니다.</p>
      </header>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <CardItem v-for="(item, idx) in lineup" :key="idx" :title="item.title" :badge="item.badge" />
      </div>
    </div>

    <!-- Why Section -->
    <div class="relative">
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_0%_0%,#f6e8e1_0%,transparent_50%)]"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div class="space-y-6">
          <p class="text-xs tracking-[0.25em] text-rose-400">WHY THE URBAN</p>
          <h3 class="text-2xl sm:text-3xl font-semibold">왜 “더 어반” 인가요?</h3>
          <p class="text-[15px] leading-7 text-[#6b5a4d]">
            친절한 가이드, 세련된 타이포그래피, 이미지 중심 구성으로 초보자도 쉽게 완성할 수 있습니다.
          </p>

          <ul class="space-y-4">
            <li class="flex gap-3">
              <IconCheck />
              <div>
                <p class="font-medium">감성적 디자인</p>
                <p class="text-sm text-[#7b6a5d]">곡선과 여백을 살린 레이아웃으로 웜톤 사진과 잘 어울립니다.</p>
              </div>
            </li>
            <li class="flex gap-3">
              <IconCheck />
              <div>
                <p class="font-medium">간편 편집</p>
                <p class="text-sm text-[#7b6a5d]">텍스트/이미지 변경만으로 완성. 섹션 온/오프를 자유롭게.</p>
              </div>
            </li>
            <li class="flex gap-3">
              <IconCheck />
              <div>
                <p class="font-medium">확장 가능한 기능</p>
                <p class="text-sm text-[#7b6a5d]">지도, 축의금, 갤러리, 방명록 등 추가 모듈 연결 준비됨.</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Supporting image card -->
        <div class="grid sm:grid-cols-2 gap-5 lg:gap-6">
          <PhotoCard class="h-64"/>
          <PhotoCard class="h-64" rounded="full"/>
          <PhotoCard class="sm:col-span-2 h-64"/>
        </div>
      </div>
    </div>

    <!-- Process -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <header class="text-center mb-10">
        <p class="text-xs tracking-[0.25em] text-rose-400 mb-2">HOW TO MAKE</p>
        <h2 class="text-2xl sm:text-3xl font-semibold">제작 방법</h2>
        <p class="text-sm text-[#7b6a5d] mt-3">무료로 만들어보고 결정하세요. 4단계로 간단합니다.</p>
      </header>

      <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StepCard v-for="(s, i) in steps" :key="i" :index="i+1" :title="s.title" :desc="s.desc"/>
      </ol>

      <div class="text-center mt-10">
        <button class="px-6 py-3 rounded-full bg-[#6b5a4d] text-white text-sm shadow-sm hover:opacity-90 transition">
          무료 제작하기
        </button>
      </div>
    </div>

    <!-- FAQ -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(50%_50%_at_100%_0%,#f3e0d7_0%,transparent_55%)]"></div>
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <h2 class="text-center text-2xl sm:text-3xl font-semibold mb-8">자주 묻는 질문</h2>
        <div class="divide-y divide-[#ead9cf] rounded-lg bg-white/70 backdrop-blur border border-[#ead9cf]">
          <details v-for="(f, i) in faq" :key="i" class="group p-5">
            <summary class="flex cursor-pointer list-none items-center justify-between">
              <span class="font-medium">{{ f.q }}</span>
              <svg class="w-5 h-5 shrink-0 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 9 6 6 6-6"/></svg>
            </summary>
            <p class="text-sm text-[#7b6a5d] mt-3 leading-6">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </div>

    <!-- Footer CTA -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div class="rounded-3xl border border-[#ead9cf] bg-white/70 backdrop-blur p-8 lg:p-10 text-center">
        <h3 class="text-xl sm:text-2xl font-semibold">지금 바로 샘플을 만들어보세요</h3>
        <p class="text-sm text-[#7b6a5d] mt-2">사진 영역은 비워두고, 텍스트만으로도 레이아웃 확인이 가능합니다.</p>
        <div class="mt-6 flex justify-center gap-3">
          <button class="px-6 py-3 rounded-full bg-[#6b5a4d] text-white text-sm shadow-sm hover:opacity-90 transition">샘플 생성</button>
          <button class="px-6 py-3 rounded-full border border-[#d9c7bc] text-sm hover:bg-white/70 transition">가이드 보기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineComponent, h } from 'vue'

const lineup = [
  { title: '어반 (S)', badge: 'NEW' },
  { title: '연두', badge: 'HOT' },
  { title: '어반 (A)', badge: '' },
  { title: '포엠', badge: '' },
  { title: '블러', badge: '' },
  { title: '라운디드', badge: '' },
  { title: '코지', badge: '' },
  { title: '샌디', badge: '' },
]

const steps = [
  { title: '무료 제작', desc: 'PC/모바일에서 템플릿을 선택해 샘플을 만들어 보세요.' },
  { title: '나만의 편집', desc: '사진은 비워두고 텍스트만 채워도 미리보기 가능.' },
  { title: '공유 테스트', desc: '가족·친구에게 링크 공유 후 피드백 받기.' },
  { title: '최종 확정', desc: '원하는 옵션만 선택해 저장/배포하세요.' },
]

const faq = [
  { q: '정말로 무료로 만들어볼 수 있나요?', a: '네. 샘플 생성과 편집은 무료입니다. 최종 저장 또는 특정 유료 옵션 선택 시에만 비용이 발생합니다.' },
  { q: '사진 자르는 기능이 있나요?', a: '커버/갤러리 모두 기본 크롭, 위치 조정, 라운드 마스크 옵션을 제공합니다.' },
  { q: '모바일에서 편집 가능할까요?', a: '네. 모바일/태블릿/데스크톱에서 편집이 가능하며 반응형으로 동작합니다.' },
]

const Badge = (props) => null

// Local components
const Divider = defineComponent({
  name: 'Divider',
  setup() {
    return () => h('div', { class: 'w-full h-px bg-gradient-to-r from-transparent via-[#ead9cf] to-transparent' })
  },
})

const IconCheck = defineComponent({
  name: 'IconCheck',
  setup() {
    return () => h('div', { class: 'shrink-0 w-6 h-6 rounded-full border border-[#e0cfc4] flex items-center justify-center' }, [
      h('svg', { viewBox: '0 0 24 24', class: 'w-3.5 h-3.5', fill: 'none', stroke: 'currentColor' }, [
        h('path', { d: 'M5 13l4 4L19 7', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      ]),
    ])
  },
})

const CardItem = defineComponent({
  name: 'CardItem',
  props: { title: { type: String, default: '' }, badge: { type: String, default: '' } },
  setup(props) {
    return () => h('div', { class: 'group rounded-3xl border border-[#ead9cf] bg-white/70 backdrop-blur p-3 hover:shadow-md transition' }, [
      h('div', { class: 'relative rounded-lg overflow-hidden aspect-[9/16] bg-[#e9e0da] flex items-center justify-center' }, [
        h('div', { class: 'absolute inset-0 mask-arch bg-gradient-to-b from-[#e6ddd7] to-[#dccfc6]' }),
        h('span', { class: 'text-[#a8988e] text-[11px]' }, 'PHOTO AREA')
      ]),
      h('div', { class: 'mt-3 flex items-center justify-between' }, [
        h('p', { class: 'text-sm font-medium' }, props.title),
        props.badge ? h('span', { class: 'text-[10px] px-2 py-1 rounded-full bg-[#f1e6df] text-[#8a7567]' }, props.badge) : null,
      ]),
    ])
  },
})

const StepCard = defineComponent({
  name: 'StepCard',
  props: { index: { type: Number, required: true }, title: { type: String, default: '' }, desc: { type: String, default: '' } },
  setup(props) {
    return () => h('li', { class: 'rounded-lg border border-[#ead9cf] bg-white/70 backdrop-blur p-5' }, [
      h('div', { class: 'w-9 h-9 rounded-full bg-[#6b5a4d] text-white flex items-center justify-center text-xs mb-3' }, String(props.index).padStart(2, '0')),
      h('p', { class: 'font-medium' }, props.title),
      h('p', { class: 'text-sm text-[#7b6a5d] mt-2 leading-6' }, props.desc),
    ])
  },
})

const PhotoCard = defineComponent({
  name: 'PhotoCard',
  props: { rounded: { type: String, default: 'xl' } },
  setup(props, { attrs }) {
    const shape = props.rounded === 'full' ? 'rounded-full' : 'rounded-3xl'
    return () => h('div', { class: `${shape} border border-[#ead9cf] bg-white/70 p-3 ${attrs.class || ''}` }, [
      h('div', { class: 'w-full h-full rounded-lg overflow-hidden bg-[#e9e0da] relative' }, [
        h('div', { class: 'absolute inset-0 mask-arch bg-gradient-to-b from-[#e6ddd7] to-[#dccfc6]' }),
        h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [h('span', { class: 'text-[#a8988e] text-[11px]' }, 'PHOTO AREA')])
      ])
    ])
  },
})
</script>

<style scoped>
/* Arch-shaped mask for placeholders */
.mask-arch {
  -webkit-mask-image: radial-gradient(120% 120% at 50% -20%, #000 60%, transparent 61%);
  mask-image: radial-gradient(120% 120% at 50% -20%, #000 60%, transparent 61%);
}
</style>
