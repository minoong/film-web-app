# Film Web App

영화를 위한 PWA(Progressive Web App) 애플리케이션입니다.

## 🚀 주요 기능

- **PWA 지원**: 오프라인에서도 사용 가능하고 홈 화면에 설치할 수 있습니다
- **서비스 워커**: 캐싱을 통한 빠른 로딩과 오프라인 지원
- **반응형 디자인**: 모든 기기에서 최적화된 사용자 경험
- **자동 업데이트**: 새로운 버전이 있을 때 자동으로 알림

## 🛠 기술 스택

- **React 19** + **TypeScript**
- **Vite** - 빠른 빌드 도구
- **Vite PWA Plugin** - PWA 기능 구현
- **Workbox** - 서비스 워커 관리
- **Radix UI** - UI 컴포넌트
- **React Router 7** - 라우팅

## 📱 PWA 기능

이 애플리케이션은 Progressive Web App으로 구현되어 다음 기능들을 제공합니다:

### 설치 가능

- 브라우저에서 "홈 화면에 추가" 또는 "설치" 버튼을 통해 앱처럼 설치 가능
- 독립실행형 모드로 브라우저 UI 없이 네이티브 앱과 같은 경험

### 오프라인 지원

- 한 번 방문한 페이지는 오프라인에서도 접근 가능
- 중요한 리소스들이 자동으로 캐시되어 빠른 로딩

### 자동 업데이트

- 새로운 버전이 배포되면 자동으로 감지
- 사용자에게 업데이트 알림을 표시하고 선택적 업데이트 가능

### 다양한 아이콘 지원

- 각종 기기와 플랫폼에 최적화된 아이콘 제공
- Apple Touch Icons, Favicon, Microsoft Tiles 등 지원

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 🔧 개발 도구

### 코드 스타일

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포매팅
- **TypeScript**: 타입 안정성

### 명령어

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포매팅 검사
npm run format:check

# 코드 포매팅 적용
npm run format
```

## 📁 프로젝트 구조

```
src/
├── app/           # 앱 설정 및 라우팅
├── pages/         # 페이지 컴포넌트
├── widgets/       # 위젯 컴포넌트
├── features/      # 기능별 컴포넌트
├── entities/      # 엔티티 관련
└── shared/        # 공유 리소스
    ├── ui/        # 공통 UI 컴포넌트
    ├── lib/       # 유틸리티 및 훅
    └── config/    # 설정 파일
```

## 📱 PWA 테스트 방법

1. **개발 환경에서 테스트**:
   - Chrome DevTools > Application > Service Workers에서 서비스 워커 확인
   - Network 탭에서 "Offline" 체크박스를 선택하여 오프라인 모드 테스트

2. **설치 테스트**:
   - Chrome 주소창 오른쪽 "설치" 아이콘 클릭
   - 또는 Chrome 메뉴 > "앱 설치" 선택

3. **프로덕션 빌드에서 테스트**:
   ```bash
   npm run build
   npm run preview
   ```

## 🔗 참고 자료

- [Vite PWA Plugin 공식 문서](https://vite-pwa-org.netlify.app/)
- [Workbox 가이드](https://developers.google.com/web/tools/workbox)
- [PWA 체크리스트](https://web.dev/pwa-checklist/)
