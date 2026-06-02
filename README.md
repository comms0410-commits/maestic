# Maestic 고객 운영 포털

고객 서비스 관리 웹 시스템 - 업로드 현황 관리, 기사 Pick, 대본 협업, AI 연동, LINE/Claw Webhook 연동

---

## ✅ 현재 완료된 기능

### 🔐 인증 시스템
- **관리자 로그인**: ID/PW 방식 (기본: admin / maestic2026!)
- **고객 로그인**: 고객번호 + 4자리 PIN 방식
- **세션 기반 인증**: sessionStorage 활용
- **권한 분리**: 관리자는 전체, 고객은 자기 데이터만 조회

### 📊 관리자 대시보드 (`admin.html`)
- 전체 고객 KPI 현황 카드
- 고객 목록 표 (검색/필터/수정/추가)
- 월별 현황 요약 표
- 기사 Pick 대기 현황
- 대본 검토 대기 현황

### 📅 고객 월별 현황 관리 (`admin-customers.html`)
- 월 선택 + 고객 선택
- 주차별 업로드 현황 입력/수정 (1~4주차)
- 공개 메모 / 내부 메모 분리
- 상태 관리 (진행중/완료/일시정지)
- 저장 시 LINE/Claw 알림 자동 발송

### 👤 고객 대시보드 (`customer.html`)
- 본인 정보 + 이번 달 KPI 카드
- 주차별 진행 현황 시각화
- 기사 Pick 현황 및 바로가기
- 대본 현황 및 바로가기
- 담당자 공개 메모 표시

### 📰 기사 Pick 관리
- **관리자** (`admin-pick.html`): 고객별 추천 기사 10개 등록, Pick 결과 확인
- **고객** (`customer-pick.html`): 추천 기사 체크박스 선택(최대 5개), 직접 URL 입력(5칸), 임시저장/최종 제출

### 📝 대본 관리
- **관리자** (`admin-script.html`): 대본 생성/편집/버전관리, GPT/Claude API 연동, 고객 검토 요청
- **고객** (`customer-script.html`): 대본 확인, 승인/수정 요청, 수정 의견 입력

### 🤖 AI 프롬프트 관리 (`admin-prompt.html`)
- 고객별 맞춤 프롬프트 설정 (톤앤매너, 타겟, 키워드, CTA, 금지표현 등)
- OpenAI / Anthropic API 키 관리
- API 연결 테스트

### 💬 알림/Webhook 관리 (`admin-notify.html`)
- 알림 발송 이력 확인 (고객별/유형별 필터)
- 수동 알림 발송
- Claw Webhook URL 설정
- LINE 연동 설정
- Webhook 테스트 발송

---

## 🗂️ 파일 구조

```
index.html              # 로그인 페이지
admin.html              # 관리자 대시보드
admin-customers.html    # 고객 월별 현황 관리
admin-pick.html         # 기사 Pick 관리 (관리자)
admin-script.html       # 대본 관리 (관리자)
admin-prompt.html       # AI 프롬프트 + Webhook 설정
admin-notify.html       # 알림 이력
customer.html           # 고객 대시보드
customer-pick.html      # 기사 Pick (고객)
customer-script.html    # 내 대본 (고객)
css/style.css           # 공통 스타일
js/common.js            # 공통 유틸리티 (Auth, API, UI, Webhook, AI)
```

---

## 🌐 주요 페이지 URI

| 페이지 | URL | 접근 권한 |
|--------|-----|----------|
| 로그인 | `/index.html` | 전체 |
| 관리자 대시보드 | `/admin.html` | admin |
| 고객 현황 관리 | `/admin-customers.html` | admin |
| 기사 Pick 관리 | `/admin-pick.html` | admin |
| 대본 관리 | `/admin-script.html` | admin |
| AI 프롬프트 관리 | `/admin-prompt.html` | admin |
| 알림 이력 | `/admin-notify.html` | admin |
| 고객 대시보드 | `/customer.html` | customer |
| 기사 Pick | `/customer-pick.html` | customer |
| 내 대본 | `/customer-script.html` | customer |

---

## 🗄️ 데이터 모델

### customers - 고객 기본 정보
| 필드 | 설명 |
|------|------|
| customer_no | 고객번호 (예: 011) |
| customer_name | 고객명 |
| product_type | 가입상품 (콘텐츠형/성장형/제휴형/기업형) |
| monthly_fee | 계약금액/월 |
| monthly_quota | 월 제작 수량 |
| pin_hash | 4자리 PIN |
| status | 상태 (active/pause/inactive) |

### monthly_status - 월별 업로드 현황
| 필드 | 설명 |
|------|------|
| customer_no | 고객번호 |
| year, month | 연월 |
| total_target / total_completed | 목표/완료 수량 |
| week1~4_info / week1~4_done | 주차별 일정/완료수 |
| public_note | 고객 공개 메모 |
| internal_note | 관리자 내부 메모 (고객 비노출) |

### article_recommendations - 관리자 추천 기사
### article_customer_inputs - 고객 직접 입력 기사
### article_picks - 기사 Pick 결과
### scripts - 대본 (버전 포함)
### ai_prompts - 고객별 AI 프롬프트 설정
### notifications - 알림/Webhook 발송 이력

---

## 🔑 초기 로그인 정보

**관리자 로그인**
- ID: `admin`
- PW: `maestic2026!`

**고객 로그인 (엑셀 기반 초기 데이터)**
| 고객명 | 고객번호 | PIN |
|--------|---------|-----|
| 법무법인오현 | 011 | 1234 |
| 뉴스덕 | 012 | 1234 |
| 엘사국제학교 | 017 | 1234 |
| 한석준 | 018 | 1234 |
| 법무법인진솔 | 020 | 1234 |
| 도서출판크레타 | 021 | 1234 |
| 책책책 | 000 | 1234 |
| 부산광역시 | 022 | 1234 |
| 글로비세무 | 023 | 1234 |

---

## 💬 LINE/Claw Webhook 연동 방법

1. **관리자 접속** → AI 프롬프트 관리 (`admin-prompt.html`)
2. **Claw Webhook URL 입력**: Claw 에이전트의 Incoming Webhook URL 붙여넣기
3. **Webhook 알림 활성화** 체크
4. **저장** → 테스트 발송으로 수신 확인

### 발송되는 이벤트
- `pick_request`: 추천 기사 등록 알림
- `pick_submitted`: 고객 기사 Pick 제출
- `script_uploaded`: 대본 검토 요청
- `status_update`: 월별 현황 업데이트
- `feedback`: 고객 수정 의견
- `approval`: 대본 최종 승인

---

## 🤖 AI 대본 생성 연동

1. `admin-prompt.html`에서 API 키 저장
2. `admin-script.html`에서 대본 편집 시 AI 모델 선택
3. 기사 Pick 선택 → AI 초안 생성 → 편집 → 고객 검토 요청

---

## 🚧 미구현 / 향후 개발 권장 사항

- [ ] 서버측 PIN 해시 처리 (현재 평문 저장)
- [ ] 로그인 실패 횟수 제한 및 계정 잠금
- [ ] LINE LIFF 연동 (LINE 내 직접 접속)
- [ ] 대본 버전별 변경 이력 상세 비교
- [ ] 파일 업로드 지원 (PDF, Word 대본 업로드)
- [ ] 월간 리포트 PDF 자동 생성
- [ ] 통계 대시보드 (차트 시각화)
- [ ] 이메일 알림 연동
- [ ] 고객 비밀번호 self 변경 기능
