# Aptner Pass 과제 프로젝트

이 프로젝트는 Aptner Pass 과제 전형을 위해 **Next.js**를 사용하여 개발되었습니다.

## 개요

이 애플리케이션은 GitHub API를 활용해 GitHub 사용자 검색, 북마크 기능을 제공하는 서비스입니다.

## 시작 방법

1. **레포지토리 클론**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **의존성 설치**

   Yarn이 설치되어 있는지 확인한 후, 다음 명령어를 실행하여 의존성을 설치합니다:

   ```bash
   yarn install
   ```

3. **환경 변수 설정**
   프로젝트 내 .env.template 파일을 복사하여 .env로 이름을 변경합니다.
   GitHub 계정에서 발급받은 토큰을 .env 파일의 NEXT_PUBLIC_GITHUB_TOKEN에 입력합니다:

   ```makefile
   NEXT_PUBLIC_GITHUB_TOKEN={your_github_token}
   ```

4. **개발 서버 실행**
   ```bash
   yarn dev
   ```
   애플리케이션은 http://localhost:3000에서 실행됩니다.

## 사용 기술

- Next.js - 서버 사이드 렌더링(SSR)을 지원하는 React 프레임워크
- Tailwind CSS - 유틸리티 기반의 CSS 프레임워크
- TypeScript - 타입 안정성을 보장하기 위한 언어
- React Query & Zustand - 상태 및 서버 캐싱 관리
- GitHub API - GitHub 사용자 데이터를 가져오기 위해 사용

## 프로젝트 구조

- **components/** - 재사용 가능한 UI 컴포넌트들
- **pages/** - Next.js app router
- **hooks/** - 상태 및 API 관리를 위한 커스텀 훅
- **stores/**: Zustand에서 상태 관리를 위한 store
- **utils/**: 프로젝트 전반에 걸쳐 사용하는 유틸리티 함수.
- **public/assets**: 이미지 파일들이 저장되는 폴더

## 주요 기능

- GitHub 사용자 검색 - GitHub 프로필을 검색하고 조회
- 북마크 기능 - 자주 보는 프로필을 북마크하여 빠르게 접근
