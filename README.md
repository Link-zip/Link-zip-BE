# Link.Zip Project
> 사용자 맞춤 링크 아카이빙 서비스
<div align="center">

  ![img_roading_logo](https://github.com/user-attachments/assets/ffb57eba-df8f-4cc8-8983-24c905a9f613)
  
</div>

## 주요 기능📦
### ⭐링크 CRUD
  - 사용자에게 URL을 입력받아 제목, 메모, 알림날짜 등을 설정하여 저장
  - 저장된 링크는 자유롭게 폴더(zip)별로 관리, 조회, 검색, 수정 가능
### ⭐리마인드 알림
  - 사용자가 설정한 알림 날짜에 맞춰 리마인드 알림 생성 후 알림 페이지에서 조회 가능
  - 리마인드 알림을 놓친 경우, 놓친 알림에 대해 한번 더 리마인드 알림을 생성 
### ⭐텍스트 AI 요약
  - AI 요약 사용 시 어떤 URL인지 간단히 요약한 내용을 추천받아 링크 설명 내용 저장 가능 
## 배포 서버 🌐
> [http://linkzip6.store:3000](http://linkzip6.store:3000)

## 개발인원/기간 ⏲
> 개발인원: 백엔드 4명<br>
> 개발기간: 2024.07.07 ~ 2024.08.22


## 시작 가이드
### Requeirements
For building and running the application you need:

- Node.js 22.x 이상
- npm 9.x 이상

### Installation
```
$ git clone https://github.com/Link-zip/Link-zip-BE.git
$ cd Link-zip-BE
$ npm install
$ npm start
```

## 기술 스택 🛠
> - Development : <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp; <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>&nbsp; <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>&nbsp;  
> - Deploy : <img src="https://img.shields.io/badge/AWS%20RDS%2FEC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white"/>&nbsp; <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white"/>
> - Environment : <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>&nbsp; <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>&nbsp;
> - ETC: <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>&nbsp;  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>&nbsp;  
> - Communication: <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>&nbsp; <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>&nbsp;



## 백엔드 팀원/역할 소개 👥
**머랭/김선우(리드)**
- 개발 기능
  - Link 데이터 CRUD
  - Link 데이터 방문 수, 날짜 체크 기능 및 좋아요 기능 구현
  - Link 생성/수정 시 알림 데이터 생성/수정 연동
  - 텍스트 AI 요약 기능 구현(`rapidapi`, `openai` 활용)
  - `axios`로 링크(URL) 메타 데이터 추출(썸네일/제목)
  - 공지사항 데이터 CRUD
- 프로젝트 전반적인 코드 리뷰 및 피드백
- 개발환경 및 배포환경 세팅(프로젝트 구조 설계, RDS 연결,swagger 세팅, ec2세팅, pm2세팅)
- 🐈 GitHub: [https://github.com/meoraeng](https://github.com/meoraeng) <br>

**시미/심승보**
- 개발 기능
  - 카카오 로그인 기능 구현(`Redis`, `JWT`)
  - 회원가입, 닉네임 변경, 회원탈퇴
- 깃허브 리포지토리 세팅
- 🐈 GitHub: [https://github.com/seungboshim](https://github.com/seungboshim) <br>

**민트/박하은**
- 개발 기능
  - Alert 데이터 생성, 조회, 확인
  - 미확인 알림 체크
  - 조건별(알림 설정한, 미열람한, 오래된, 전체...)링크 개수 카운트
  - 리스트 조회(미열람, 좋아요, 최근저장한) 기능 구현
- 🐈 GitHub: [https://github.com/haeun9634](https://github.com/haeun9634) <br>

**링크/여지호**
- 개발 기능
  - Zip CRUD 기능 구현
  - 링크 검색 기능 구현
  - 최근 검색기록 조회, 삭제 구현
- 🐈 GitHub: [https://github.com/GodUser1005](https://github.com/GodUser1005) <br>



## 아키텍처
### 디텍터리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── jsconfig.json
├── index.js
├── babel.config.js
├── src : 
│   ├── controllers : 각 기능에 대한 컨트롤러 파일들 (요청 처리 로직)
│   │   ├── alert.controller.js
│   │   ├── link.controller.js
│   │   ├── linkscount.controller.js
│   │   ├── list.controller.js
│   │   ├── notice.controller.js
│   │   ├── search.controller.js
│   │   ├── user.controller.js
│   │   └── zip.controller.js
│   ├── dtos :  데이터 전송 객체(DTO) 정의 파일들 (요청 형식, 응답 형식 결정)
│   │   ├── alert.dto.js
│   │   ├── link.dto.js
│   │   ├── linkscount.dto.js
│   │   ├── list.dto.js
│   │   ├── notice.dto.js
│   │   ├── serach.dto.js
│   │   ├── user.dto.js
│   │   └── zip.dto.js
│   ├── models :  데이터베이스 접근 객체 및 SQL 쿼리 파일들
│   │   ├── alert.dao.js
│   │   ├── alert.sql.js
│   │   ├── link.dao.js
│   │   ├── link.sql.js
│   │   ├── linkscount.dao.js
│   │   ├── linkscount.sql.js
│   │   ├── list.dao.js
│   │   ├── link.sql.js
│   │   ├── notice.dao.js
│   │   ├── notice.sql.js
│   │   ├── search.dao.js
│   │   ├── search.sql.js
│   │   ├── user.dao.js
│   │   ├── user.sql.js
│   │   ├── zip.dao.js
│   │   └── zip.sql.js
│   ├── providers : 외부 서비스나 데이터 제공자 로직 파일들
│   │   ├── link.provider.js
│   │   ├── linkscount.provider.js
│   │   ├── list.provider.js
│   │   ├── search.provider.js
│   │   ├── user.provider.js
│   │   └── zip.provider.js
│   ├── routes : 라우터 설정 파일들 (각 URL에 대한 처리)
│   │   ├── about
│   │   ├── alert.route.js
│   │   ├── link.route.js
│   │   ├── linkscount.route.js
│   │   ├── list.route.js
│   │   ├── notice.route.js
│   │   ├── search.route.js
│   │   ├── user.route.js
│   │   └── zip.route.js
│   ├── services :  비즈니스 로직을 처리하는 서비스 파일들
│   │   ├── alert.service.js
│   │   ├── link.service.js
│   │   ├── notice.service.js
│   │   ├── search.services.js
│   │   ├── user.service.js
│   │   └── zip.service.js
│   ├── utils :  유틸리티 함수 및 도구
│       └── jwt.util.js
├── swagger :  API문서화를 위한 Swagger 파일들
│   ├── alert.swagger.yml
│   ├── homeCount.swagger.yml
│   ├── link.swagger.yml
│   ├── list.swagger.yml
│   ├── noice.swagger.yml
│   ├── search.swagger.yml
│   ├── user.swagger.yml
│   └── zip.swagger.yml
└── config : 설정 파일들
    ├── authMiddleware.js
    ├── db.config.js
    ├── error.js
    ├── global.js
    ├── redis.js
    ├── response.js
    ├── response.status.js
    ├── session.js
    └── swagger.config.js

```
