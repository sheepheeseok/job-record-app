📘 JobRecord

취업 준비 활동을 구조화하여 기록하고, 준비 과정을 객관적으로 설명할 수 있도록 돕는 서비스입니다.

JobRecord는 학습, 프로젝트, 지원, 피드백 등 다양한 취업 준비 활동을 데이터 단위로 구조화하여
사용자가 자신의 준비 과정을 수치와 흐름 기반으로 설명할 수 있도록 설계된 서비스입니다.

⸻

🔎 Background

취업 준비 과정에서는 다양한 활동이 발생합니다.
그러나 이를 구조적으로 정리하고 설명하는 것은 쉽지 않습니다.
	•	무엇을 얼마나 준비했는지 한눈에 보기 어렵다
	•	면접에서 준비 과정을 논리적으로 설명하기 어렵다
	•	공백기에 대한 불안감이 크다
	•	기존 서비스는 일정 관리에 치중되어 ‘노력의 축적’을 보여주기 어렵다

JobRecord는 활동 데이터를 구조화하여
취업 준비 과정을 하나의 흐름으로 보여주는 것을 목표로 합니다.

⸻

🎯 Target Users
	•	대학교 재학생
	•	졸업 예정자
	•	일반 취업 준비생
	•	특정 직무에 국한되지 않음

📌 사용자 문제 정의
	•	내가 무엇을 얼마나 준비했는지 파악하기 어렵다
	•	준비 과정을 말로 설명하기 어렵다
	•	노력의 축적이 보이지 않아 불안감이 발생한다

⸻

🧩 Core Features

1️⃣ 회원 관리
	•	이메일 기반 회원가입 / 로그인
	•	JWT 기반 인증 처리
	•	기본 프로필 설정 (준비 상태, 목표 분야)

2️⃣ 활동 기록
	•	날짜 / 시간 / 카테고리 / 제목 / 설명 / 태그 입력
	•	카테고리:
	•	노력
	•	완성
	•	탐색
	•	지원
	•	피드백

3️⃣ 활동 관리
	•	활동 목록 조회
	•	활동 수정 및 삭제
	•	최근 활동 4개 요약 표시

4️⃣ 자동 요약 시스템
	•	주 / 월 단위 총 활동 시간 계산
	•	카테고리별 활동 비율 분석
	•	활동 일수 및 공백 분석

5️⃣ 대시보드
	•	이번 달 활동 요약
	•	카테고리별 비율 차트
	•	최근 활동 추이 그래프
	•	주요 활동 요약 문장 제공

6️⃣ 월간 리포트
	•	월 단위 활동 자동 집계
	•	자기소개 및 면접 활용 가능한 요약 문장 생성

⸻

🏗️ Architecture

🔹 Frontend
	•	Expo (React Native)
	•	TypeScript
	•	Chart 라이브러리 활용
	•	Custom Hook 기반 API 관리

🔹 Backend
	•	Java
	•	Spring Boot
	•	JPA (Hibernate)
	•	RESTful API 설계
	•	JWT 기반 인증

🔹 Database
	•	MySQL

🔹 통신 구조
	•	REST API 기반 클라이언트-서버 분리 구조
	•	활동 중심 데이터 모델 설계
	•	통계 집계 로직은 서버에서 처리

📱 Screenshots

<img width="393" height="1134" alt="Home2" src="https://github.com/user-attachments/assets/2ca35df8-395e-4967-8f9f-b18a0da75187" />
<img width="409" height="1097" alt="Report" src="https://github.com/user-attachments/assets/6fb7e5f6-24af-4857-a41f-c667a62cf667" />
<img width="393" height="1003" alt="Activity" src="https://github.com/user-attachments/assets/ffa3c29f-e4e4-41cf-a6d2-9783ab4a337a" />
<img width="393" height="757" alt="AI" src="https://github.com/user-attachments/assets/8f271cab-ae20-4b18-934d-e809ec722b70" />
<img width="393" height="1187" alt="My" src="https://github.com/user-attachments/assets/e7110448-1dda-4bcd-8f8d-2baa5e4ad137" />


⸻

🚀 Expected Impact
	•	취업 준비 과정을 시각적으로 정리 가능
	•	자기소개서 및 면접 답변에 활용 가능
	•	공백기 불안감 완화
	•	데이터 기반 자기 관리
	•	개인 포트폴리오 프로젝트로 활용 가능

⸻

📅 Development Schedule

Notion 일정표
👉 https://www.notion.so/2f7bbc6ecbe5801e83abfbb0ca8a7d90?pvs=21

⸻

🌍 Deployment & Challenges

본 프로젝트는 Fly.io를 활용한 배포를 시도하였습니다.

시도 내용
	•	Spring Boot 애플리케이션 Dockerization
	•	Fly.io 배포 환경 구성
	•	PostgreSQL 연결 테스트

한계 및 이슈
	•	환경 변수 설정 및 DB 연결 오류
	•	JJWT 의존성 관련 런타임 오류 발생
	•	배포 환경에서의 설정 충돌 문제

향후 개선 방향
	•	Docker 환경 재구성
	•	환경 변수 관리 개선
	•	CI/CD 환경 구축
	•	클라우드 배포 재시도

배포 과정에서 발생한 이슈를 통해 서버 환경 설정과 배포 구조에 대한 이해를 높일 수 있었습니다.

⸻

📌 Future Improvements
	•	직무별 활동 분석 기능
	•	기업 맞춤형 준비도 분석
	•	AI 기반 활동 요약 고도화
	•	PDF 리포트 자동 생성
	•	웹 버전 확장
	•	배포 자동화 (CI/CD)
