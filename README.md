# 웨딩 초대장

Vue 3 + Vite로 제작된 반응형 웨딩 초대장입니다.

## 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# 웨딩 데이터
VITE_WEDDING_DATE=2025-10-25
VITE_WEDDING_TIME=오후 2시
VITE_VENUE_NAME=더퍼스트클래스파티 강서NH서울타워점
VITE_VENUE_ADDRESS=서울 강서구 양천로570(NH서울타워) 20층 더퍼스트클래스파티
VITE_VENUE_TEL=02-2013-5670
VITE_VENUE_LAT=37.514542
VITE_VENUE_LNG=127.031708
VITE_VENUE_LEVEL=3
VITE_SUBWAY_INFO=증미역 3번 출구에서 56m NH서울타워 20층 도보 1분
VITE_BUS_INFO=간선: 47, 240, 463\n지선: 4211\n마을: 강남08
VITE_PARKING_INFO=강서NH서울타워점 주차장 이용

# 카카오맵 API 키
VITE_KAKAO_MAP_KEY=your_kakao_map_key_here

# 신랑신부 정보
VITE_GROOM_NAME=황승현
VITE_BRIDE_NAME=김정민
VITE_GROOM_FAMILY=황운의 장남 황승현
VITE_BRIDE_FAMILY=권숙희의 장녀 김정민

# 계좌 정보
VITE_NOTICE_ACCOUNTS=농협 123-456788-7654321 예금주: 이지훈
VITE_EXTRA_NOTICE=화환은 정중히 사양합니다.
VITE_GROOM_ACCOUNTS=국민 111-22-333333 황승현,토스 1000-1234-5678 황승현
VITE_BRIDE_ACCOUNTS=신한 444-55-666666 김정민
```

## 설치 및 실행

```bash
npm install
npm run dev
```

## 보안 주의사항

- `.env` 파일은 Git에 커밋하지 마세요
- 실제 API 키나 개인정보는 환경변수로 관리하세요
- 프로덕션 배포 시 환경변수를 올바르게 설정하세요
