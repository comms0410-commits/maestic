# Maestic 고객 운영 포털

고객 유튜브 쇼츠 대행 운영을 관리하는 정적 웹 포털입니다. 관리자와 고객 권한을 분리하고, 고객 현황/월별 업로드/기사 Pick/대본 검토/AI 프롬프트/알림을 한 흐름으로 관리합니다.

## 주요 기능

- 관리자 로그인: `admin / maestic2026!`
- 고객 로그인: 고객번호 + PIN `1234`
- 고객관리: 콘텐츠형, 성장형, 제휴형, 기업형 상품 구분
- 계약관리: 계약 연장이 없는 고객은 계약대기/비활성 분류, 3개월 이상 장기 미계약 고객은 삭제 처리
- 관리자 대시보드: KPI, 고객 목록, 관리 필요 고객, 구독자 TOP, 주간 업로드 큐
- 고객 월별 현황 관리: 2026년 1월부터 현재 월까지 기간 선택, 1~5주차 제작 수량 합산으로 월 완료 자동 계산
- 기사 Pick 관리: 관리자가 주차별 추천 기사를 등록하고, 고객은 추천 기사 선택 및 직접 URL 제출 가능
- 대본 관리: 고객별 확정 기사 Pick URL과 OpenAI API를 사용해 고객별 프롬프트 기반 대본 생성
- 알림: 관리자가 고객에게 메시지를 남기고 고객이 답글을 등록 가능
- 브라우저 `localStorage` 기반 데모 데이터 저장

## 파일 구조

```text
index.html              # 로그인 페이지
admin.html              # 관리자 대시보드
admin-customers.html    # 고객관리 및 월별 현황 관리
admin-pick.html         # 기사 Pick 관리(관리자)
admin-script.html       # 대본 관리(관리자)
admin-prompt.html       # OpenAI API + 고객별 대본작성 프롬프트
admin-notify.html       # 알림
customer.html           # 고객 대시보드 + 알림 답글
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
