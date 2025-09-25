<template>
  <section class="w-full max-w-[640px] mx-auto px-6 pt-12 pb-26">
    <div class="text-center mb-6">
      <div class="h-px w-4/5 mx-auto bg-gray-200 mb-4"></div>
      <h2 class="text-xl tracking-[0.3em] text-gray-800">MESSAGE</h2>
      <p class="mt-3 text-gray-500">축하 메시지를 남겨주세요.</p>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-3">
      <div class="grid grid-cols-2 gap-2">
        <input
          v-model.trim="form.name"
          type="text"
          placeholder="이름"
          class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
          :disabled="submitting"
          maxlength="20"
        />
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPw ? 'text' : 'password'"
            placeholder="비밀번호"
            class="h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            :disabled="submitting"
            maxlength="20"
            autocomplete="new-password"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            @click="showPw = !showPw"
          >
            {{ showPw ? '숨김' : '표시' }}
          </button>
        </div>
      </div>

      <textarea
        v-model.trim="form.content"
        placeholder="축하 메시지를 남겨주세요!"
        class="min-h-[120px] w-full rounded-md border border-gray-300 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-800"
        :disabled="submitting || !ready"
        maxlength="500"
      />

      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-500">
          본인 비밀번호로만 삭제 가능
        </div>
        <button
          type="submit"
          class="h-11 w-40 rounded-md bg-black text-white text-sm font-medium disabled:opacity-50"
          :disabled="!canSubmit || submitting || !ready"
        >
          {{ submitting ? '등록중...' : '등록하기' }}
        </button>
      </div>
      <p v-if="errorMsg" class="text-xs text-red-500">{{ errorMsg }}</p>
    </form>

    <div class="mt-8 space-y-6">
      <template v-for="m in items" :key="m.id">
        <article class="relative">
          <header class="flex items-center gap-2 text-sm text-gray-700">
            <span class="font-semibold">{{ m.name }}</span>
            <time class="text-gray-400">{{ formatDate(m.createdAt) }}</time>
            <button
              type="button"
              class="ml-auto -mr-1 inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="삭제"
              @click="tryRemove(m)"
            >
              <span class="sr-only">삭제</span>
              ✕
            </button>
          </header>
          <p class="mt-2 whitespace-pre-line text-gray-700 leading-relaxed">
            {{ m.content }}
          </p>
          <div class="h-px bg-gray-100 mt-4"></div>
        </article>
      </template>

      <p v-if="!loading && items.length === 0" class="text-center text-gray-400">
        아직 등록된 메시지가 없습니다.
      </p>

      <div v-if="loading" class="py-6 text-center text-sm text-gray-400">불러오는 중…</div>

      <div ref="sentinel" class="h-1"></div>

      <p v-if="endReached && items.length > 0" class="py-4 text-center text-xs text-gray-400">
        마지막 메시지입니다.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  startAfter
} from 'firebase/firestore'
import { db, ensureAnon } from '@/firebaseClient.js'

const props = defineProps({
  collectionName: { type: String, default: 'guestbook' },
  pageSize: { type: Number, default: 10 }
})

const form = ref({ name: '', password: '', content: '' })
const showPw = ref(false)
const submitting = ref(false)
const errorMsg = ref('')
const ready = ref(false)
const currentUser = ref(null)

// 간단한 금칙어 목록 (예시)
const bannedWords = [
  // 한국어
  '씨발', '시발', '십알', '씨팔', '씨바', '씹새끼', '씹할',
  '좆', '좆같', '좆나', '좆되', '좆밥','창놈','창녀','유흥','사창','좆된',
  '병신', '븅신', '빙신', '병싄','오피스','오피','떡집','빨갱이',
  '개새끼', '개색기', '개세끼', '개쉐끼', '개자식','젖가슴','유두',
  '닥쳐', '입닥쳐', '입싸물어','전과','폭행','바람','불륜',
  '꺼져', '좆까', '꺼지라','성폭행','잠자리','성범죄','범죄','강간','강.간','겁탈','겁.탈','살인',
  '미친놈', '미친년', '또라이', '정신병자','또라이놈','또라이년','또라이새끼','또라이쉐끼','또라이자식','또라이년새끼',
  '염병', '지랄', '지롤', '발광','한심','ㅉㅉ','ㅉㅉㅉ','학폭','학교폭력','일진','학 폭','가해자',
  '썅', '쌍놈', '쌍년', '쌍놈새끼','쌍놈년','쌍년놈','쌍놈새끼','쌍년새끼','쌍놈새끼년','쌍년새끼놈',
  '후레자식', '느금마', '애미뒤진', '애비없', '개년', '샤발', '거지', '그지', '좆병신', '시팔',
  '쌍놈','상놈','가난','걸뱅이','애미','섹스','유방','젖','후레','꼴려', '섹수', '젖탱','따먹','병신같',

  // 영어
  'fuck', 'fucking', 'fucker', 'motherfucker',
  'shit', 'bullshit', 'shitty',
  'bitch', 'son of a bitch', 'bitches',
  'asshole', 'dumbass', 'jackass',
  'bastard', 'jerk', 'loser',
  'dick', 'dickhead', 'cock', 'prick',
  'pussy', 'slut', 'whore', 'cunt',
  'faggot', 'retard', 'moron', 'idiot',
  'rape', 'kill yourself', 'suicide',

  // 축약/변형 (욕설 회피용 변형)
  'ㅅㅂ', 'ㅄ', 'ㅂㅅ', 'ㅗ', 'ㄲㅈ', 'ㄷㅊ',
  'fuk', 'fck', 'fuxk',
  'sh1t', '5hit', 'bi7ch', 'c0ck', 'dicc'
]

const canSubmit = computed(() =>
  form.value.name.length >= 1 &&
  form.value.password.length >= 1 &&    // 이제 1자리 이상이면 됨
  form.value.content.length >= 1
)

const items = ref([])
const loading = ref(false)
const endReached = ref(false)
const cursorDoc = ref(null)
const sentinel = ref(null)
let observer = null

watch(() => form.value.content, (val) => {
  if (val.length > 300) {
    errorMsg.value = '메시지는 최대 300자까지 입력 가능합니다.'
    // 초과된 글자는 잘라내기 (원하면 유지해도 됨)
    form.value.content = val.slice(0, 300)
  } else {
    if (errorMsg.value === '메시지는 최대 300자까지 입력 가능합니다.') {
      errorMsg.value = ''
    }
  }
})

function pad(n) { return String(n).padStart(2, '0') }
function formatDate(ts) {
  if (!ts) return ''
  const d = typeof ts === 'number' ? new Date(ts) : new Date(ts.seconds * 1000)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}


function containsBanned(text) {
  const t = String(text || '').toLowerCase()
  return bannedWords.some(w => t.includes(String(w).toLowerCase()))
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function loadMore() {
  if (loading.value || endReached.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    const colRef = collection(db, props.collectionName)
    const base = query(colRef, orderBy('createdAt', 'desc'))
    const q = cursorDoc.value
      ? query(base, startAfter(cursorDoc.value), fsLimit(props.pageSize))
      : query(base, fsLimit(props.pageSize))

    const snap = await getDocs(q)
    if (snap.empty) {
      endReached.value = true
      return
    }
    const docs = []
    snap.forEach(d => {
      const data = d.data()
      docs.push({
        id: d.id,
        name: data.name ?? '',
        content: data.content ?? '',
        createdAt: data.createdAt ?? null
      })
    })
    items.value.push(...docs)
    cursorDoc.value = snap.docs[snap.docs.length - 1]
    if (snap.size < props.pageSize) endReached.value = true
  } catch (e) {
    errorMsg.value = '목록을 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  if (!canSubmit.value || submitting.value || !ready.value) return

  // 이름/내용 모두 금칙어 검사
  if (containsBanned(form.value.name) || containsBanned(form.value.content)) {
    errorMsg.value = '부적절한 단어가 포함되어 있습니다.'
    return
  }

  submitting.value = true
  errorMsg.value = ''
  try {
    const passwordHash = await sha256(form.value.password)
    const colRef = collection(db, props.collectionName)
    const ref = await addDoc(colRef, {
      // 저장 전에 한 번 더 trim
      name: form.value.name.trim(),
      content: form.value.content.trim(),
      passwordHash,
      createdAt: serverTimestamp(),
      ownerUid: currentUser.value.uid
    })
    const snap = await getDoc(ref)
    const data = snap.data()
    const inserted = {
      id: snap.id,
      name: data?.name ?? '',
      content: data?.content ?? '',
      createdAt: data?.createdAt ?? null
    }
    items.value.unshift(inserted)

    // 입력값 초기화
    form.value.name = ''
    form.value.password = ''
    form.value.content = ''

    // 성공 피드백
    window.alert('등록되었습니다!')
  } catch (e) {
    if (String(e?.code || '').includes('permission-denied')) {
      errorMsg.value = '권한 오류입니다. 익명 로그인이 켜져 있고 보안 규칙이 맞는지 확인하세요.'
    } else {
      errorMsg.value = '등록에 실패했습니다.'
    }
  } finally {
    submitting.value = false
  }
}

function tryRemove(m) {
  const pw = window.prompt('비밀번호를 입력하세요.')
  if (pw == null) return
  removeItem(m.id, pw)
}

async function removeItem(id, password) {
  try {
    const refD = doc(db, props.collectionName, id)
    const snap = await getDoc(refD)
    if (!snap.exists()) {
      window.alert('이미 삭제되었거나 존재하지 않습니다.')
      return
    }
    const data = snap.data()
    const inputHash = await sha256(password)
    if (String(data.passwordHash) !== String(inputHash)) {
      window.alert('비밀번호가 일치하지 않습니다.')
      return
    }
    await deleteDoc(refD)
    const idx = items.value.findIndex(x => x.id === id)
    if (idx >= 0) items.value.splice(idx, 1)
    window.alert('삭제되었습니다!')
  } catch (e) {
    window.alert('삭제에 실패했습니다.')
  }
}

function setupObserver() {
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      loadMore()
    }
  }, { threshold: 1.0 })
  if (sentinel.value) observer.observe(sentinel.value)
}

onMounted(async () => {
  try {
    currentUser.value = await ensureAnon()
    ready.value = true
  } catch {
    errorMsg.value = '익명 로그인에 실패했습니다. Authentication 설정을 확인하세요.'
  }
  await loadMore()
  setupObserver()
})

onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value)
})
</script>

<style scoped>
/* 필요 시 추가 사용자 정의 스타일 작성 */
</style>