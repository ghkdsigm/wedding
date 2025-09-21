<template>
  <!-- Gift / Account Section (unified layout) -->
  <section class="relative w-full bg-white text-[#3f3a37] overflow-hidden  py-12">
    <div class="absolute inset-0 pointer-events-none"/>

    <div class="relative mx-auto w-full max-w-md px-5 py-6 space-y-6">
     

      <!-- Center title with divider -->
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px bg-[#eee]"></div>
        <div class="text-center">
          <p class="text-sm tracking-[0.3em] text-[#7f776f]">{{ sectionTitle }}</p>
        </div>
        <div class="flex-1 h-px bg-[#eee]"></div>
      </div>
      

      <!-- Buttons: groom / bride -->
      <div class="space-y-6">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm">{{ groomLabel }}</span>
          <button class="px-4 py-2 rounded-full text-xs border border-[#eee] hover:opacity-90" @click="openModal('groom')">
            계좌번호 보기
          </button>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm">{{ brideLabel }}</span>
          <button class="px-4 py-2 rounded-full text-xs border border-[#eee] hover:opacity-90" @click="openModal('bride')">
            계좌번호 보기
          </button>
        </div>
      </div>

      <!-- Wish form area -->
      <!-- <div class="mt-2 rounded-3xl bg-[#eef5ee] border border-[#e0eadf] p-7 text-center">
        <div class="mb-4">
          <svg class="w-7 h-7 text-[#8b9b7a] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12c3-1 7-4 9-9 2 5 6 8 9 9-5 2-8 6-9 9-1-3-4-7-9-9Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="mt-2 text-[clamp(10px,3.25vw,16px)] tracking-[0.3em] text-[#7f776f]">축 하 해 주 세 요</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <input v-model="name" type="text" placeholder="이름" class="h-10 rounded-xl border border-[#dee9dc] bg-white px-3 text-[clamp(10px,3.25vw,16px)] outline-none" />
          <input v-model="password" type="password" placeholder="비밀번호" class="h-10 rounded-xl border border-[#dee9dc] bg-white px-3 text-[clamp(10px,3.25vw,16px)] outline-none" />
        </div>
        <button class="mt-4 w-full h-10 rounded-xl text-[clamp(10px,3.25vw,16px)] bg-[#6b5a4d] text-white hover:opacity-90" @click="submitDummy">등록</button>
      </div> -->
    </div>

     <!-- Top notice (quick account text + misc) -->
     <div class="rounded-xl bg-white/90 backdrop-blur p-4" v-if="extraNotice !== ''">
        <!-- <div v-if="noticeAccounts?.length" class="space-y-1">
          <p v-for="(t,i) in noticeAccounts" :key="i" class="text-[12px] text-[#5e554f]">{{ t }}</p>
        </div> -->
        <p class="text-center text-[clamp(10px,3vw,14px)] text-[#9b948e]">{{ extraNotice }}</p>
      </div>

    <!-- Modal for accounts -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 bg-black/40 grid place-items-end" @click="closeModal">
        <div class="w-full max-w-md mx-auto bg-white rounded-t-3xl p-5 pb-6" @click.stop>
          <div class="flex items-center justify-between">
            <h4 class="text-[clamp(12px,3.75vw,18px)] font-medium">{{ modalTitle }}</h4>
            <button class="text-[clamp(10px,3.25vw,16px)] text-[#6c625b]" @click="closeModal">닫기</button>
          </div>
          <div class="mt-3 divide-y divide-[#f0eeec] border-t border-b">
            <div v-for="(acc, i) in modalAccounts" :key="i" class="py-3 flex items-center justify-between gap-3">
              <div class="text-[clamp(10px,3.25vw,16px)]">
                <p class="font-medium">{{ acc.bank }} <span class="font-normal">{{ acc.number }}</span></p>
                <p class="text-[#9b948e]">예금주: {{ acc.holder }}</p>
              </div>
              <div class="shrink-0 flex gap-2">
                <button class="px-3 py-1.5 text-[clamp(10px,3vw,14px)] rounded-full border border-[#ddd]" @click="copy(acc)">복사</button>
              </div>
            </div>
          </div>
          <p v-if="toast" class="mt-3 text-center text-[clamp(10px,3vw,14px)] text-[#6c625b]">{{ toast }}</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// 부모로부터 받는 props만 정의 (기본값 없음)
const props = defineProps([
  'noticeAccounts',
  'extraNotice',
  'sectionTitle',
  'sectionSubtitle',
  'groomLabel',
  'brideLabel',
  'groomAccounts',
  'brideAccounts'
])

const name = ref('')
const password = ref('')

// modal controls
const showModal = ref(false)
const modalType = ref(null)
const modalAccounts = computed(() => modalType.value === 'groom' ? props.groomAccounts : props.brideAccounts)
const modalTitle = computed(() => modalType.value === 'groom' ? props.groomLabel : props.brideLabel)
const toast = ref('')

function openModal(type) { 
  modalType.value = type
  showModal.value = true 
}

function closeModal() { 
  showModal.value = false 
}

async function copy(acc) {
  try {
    const numberWithoutHyphens = acc.number.replace(/-/g, '')
    await navigator.clipboard.writeText(numberWithoutHyphens)
    toast.value = '계좌번호를 복사했어요.'
    setTimeout(() => (toast.value = ''), 1200)
  } catch {
    toast.value = '복사에 실패했어요.'
    setTimeout(() => (toast.value = ''), 1200)
  }
}

function submitDummy() {
  // 여기는 실제 방명록/축의금 폼으로 연동 시 교체하세요
  alert(`${name.value || '이름'}님, 감사합니다!`)
}
</script>

<style scoped>

</style>
