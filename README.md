# Maestic 고객 운영 포털

고객 유튜브 쇼츠 대행 운영을 관리하는 정적 웹 포털입니다. 관리자와 고객 권한을 분리하고, 고객 현황/월별 업로드/기사 Pick/대본 검토/AI 프롬프트/Webhook 알림을 한 흐름으로 관리합니다.

## 주요 기능

- 관리자 로그인: `admin / maestic2026!`
- 고객 로그인: 고객번호 + PIN `1234`
- 관리자 대시보드: KPI, 고객 목록, 관리 필요 고객, 구독자 TOP, 주간 업로드 큐
- 고객 월별 현황 관리: 1~4주차 일정/완료수, 공개 메모, 내부 메모
- 기사 Pick 관리: 관리자 추천 기사 등록, 고객 Pick 제출
- 대본 관리: 관리자 대본 등록, 고객 승인/수정 요청
- AI 프롬프트 및 Webhook 설정: 고객별 프롬프트, 알림 설정
- 브라우저 `localStorage` 기반 데모 데이터 저장

## 파일 구조

```text
index.html              # 로그인 페이지
admin.html              # 관리자 대시보드
admin-customers.html    # 고객 월별 현황 관리
admin-pick.html         # 기사 Pick 관리(관리자)
admin-script.html       # 대본 관리(관리자)
admin-prompt.html       # AI 프롬프트 + Webhook 설정
admin-notify.html       # 알림 이력
customer.html           # 고객 대시보드
customer-pick.html      # 기사 Pick(고객)
customer-script.html    # 내 대본(고객)
css/style.css           # 공통 스타일
js/common.js            # 공통 데이터/인증/유틸리티
```

## 실행

```bash
npm start
```

또는:

```bash
python3 -m http.server 4173 --directory .
```
