# IV. 개발 실무 및 협업

## 목차
1. [상태 관리](#1-상태-관리)
   - 1.1 [로컬 상태 관리](#11-로컬-상태-관리)
   - 1.2 [전역 상태 관리](#12-전역-상태-관리)
2. [API 통신](#2-api-통신)
   - 2.1 [API 호출 구조](#21-api-호출-구조)
   - 2.2 [인증 관리](#22-인증-관리)
   - 2.3 [에러 처리](#23-에러-처리)
   - 2.4 [데이터 페칭 패턴](#24-데이터-페칭-패턴)
   - 2.5 [CORS 처리](#25-cors-처리)
3. [테스팅](#3-테스팅)
   - 3.1 [단위 테스트](#31-단위-테스트)
   - 3.2 [통합 테스트](#32-통합-테스트)
   - 3.3 [스냅샷 테스트](#33-스냅샷-테스트)
   - 3.4 [E2E 테스트](#34-e2e-테스트)
   - 3.5 [테스트 커버리지](#35-테스트-커버리지)
4. [성능 최적화 및 모니터링](#4-성능-최적화-및-모니터링)
   - 4.1 [메모이제이션](#41-메모이제이션)
   - 4.2 [가상화](#42-가상화)
   - 4.3 [코드 분할](#43-코드-분할)
   - 4.4 [성능 측정](#44-성능-측정)
   - 4.5 [이미지 및 번들 최적화](#45-이미지-및-번들-최적화)
   - 4.6 [클라이언트 사이드 모니터링](#46-클라이언트-사이드-모니터링)
5. [배포 및 CI/CD](#5-배포-및-cicd)
   - 5.1 [배포 플랫폼](#51-배포-플랫폼)
   - 5.2 [환경 변수 관리](#52-환경-변수-관리)
   - 5.3 [CI/CD 파이프라인](#53-cicd-파이프라인)
   - 5.4 [모니터링](#54-모니터링)
6. [팀 협업](#6-팀-협업)
   - 6.1 [Git 워크플로우](#61-git-워크플로우)
   - 6.2 [코드 리뷰](#62-코드-리뷰)
   - 6.3 [이슈 관리](#63-이슈-관리)
   - 6.4 [문서 관리](#64-문서-관리)
7. [참조](#7-참조)

---

## 1. 상태 관리

### 1.1 로컬 상태 관리
- **도구**: React 내장 훅 (`useState`, `useReducer`)
- **정의**: `useState`는 컴포넌트 내에서 간단한 상태를 관리하는 훅이며, `useReducer`는 복잡한 상태 전환 로직을 처리하는 훅입니다.
- **사용 이유**: React 내장 훅은 외부 라이브러리 없이 간단하고 직관적으로 상태를 관리하며, 빠른 설정과 높은 성능을 제공합니다.
- **예시**:
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
- **권장**: 간단한 상태는 `useState` 사용, 복잡한 로직은 `useReducer` 활용
- **목적**: 컴포넌트 내부 상태를 효율적으로 관리, 불필요한 외부 라이브러리 의존성 최소화

### 1.2 전역 상태 관리
- **도구**: Zustand
- **정의**: Zustand는 간단한 API를 제공하는 경량 전역 상태 관리 라이브러리로, 스토어를 통해 상태를 중앙화합니다.
- **사용 이유**: 최소한의 보일러플레이트와 직관적인 API로 전역 상태를 효율적으로 관리하며, React Context보다 가볍고 성능 최적화에 유리합니다.
- **설치**: `npm install zustand`
- **예시**:
```javascript
import create from 'zustand';

// Zustand 스토어 생성
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// 컴포넌트에서 사용
function UserProfile() {
  const { user, setUser, clearUser } = useStore();

  return (
    <div>
      {user ? <p>Welcome, {user.name}</p> : <p>Please log in</p>}
      <button onClick={() => setUser({ name: 'John' })}>Login</button>
      <button onClick={clearUser}>Logout</button>
    </div>
  );
}
```
- **권장**: 전역 상태를 간결하게 관리, 상태 업데이트 로직을 스토어 내 중앙화
- **이점**: 간단한 설정, 보일러플레이트 최소화, 성능 최적화

## 2. API 통신

### 2.1 API 호출 구조
- **방식**: `api` 세그먼트에 모듈화
- **예시**:
```javascript
// src/shared/api/user.js
import axios from 'axios';
export const fetchUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};
```
- **목적**: 재사용 가능한 서비스 파일 생성

### 2.2 인증 관리
- **방식**: JWT 또는 OAuth 기반 토큰 사용
- **관리**: 전역 상태(Zustand/Redux)로 토큰 저장
- **예시**:
```javascript
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### 2.3 에러 처리
- **방식**: 중앙화된 에러 핸들링
- **예시**:
```javascript
axios.interceptors.response.use(
  response => response,
  error => {
    alert(error.response.data.message);
    return Promise.reject(error);
  }
);
```
- **목적**: 사용자 친화적 메시지 제공

### 2.4 데이터 페칭 패턴
- **도구**: SWR, React Query
- **특징**: 캐싱, 재검증, 로딩/에러 상태 관리
- **예시** (React Query):
```javascript
import { useQuery } from 'react-query';
const { data, isLoading, error } = useQuery('users', fetchUsers);
```

### 2.5 CORS 처리
- **정의**: CORS는 다른 출처(프로토콜, 도메인, 포트)에서 리소스를 요청할 때 발생하는 보안 매커니즘입니다.
- **원인**: 웹 브라우저는 기본적으로 동일 출처 정책(SOP)을 적용하여 다른 출처의 리소스 접근을 제한합니다.
- **구성 요소**:
  - 출처(Origin): 프로토콜 + 도메인 + 포트의 조합
  - 프리플라이트 요청: 실제 요청 전 브라우저가 보내는 확인 요청(OPTIONS 메서드)
- **출처 차이 예시**:
  ```
  https://my-domain.com:8080  // HTTPS 프로토콜
  http://my-domain.com:8080   // HTTP 프로토콜이 다름 (CORS 발생)
  http://my-domain.com:1020   // 포트가 다름 (CORS 발생)
  https://api.my-domain.com:8080  // 서브도메인이 다름 (CORS 발생)
  ```
- **해결 방법**:
  1. **백엔드 설정**: 프론트엔드 애플리케이션의 출처를 허용 목록에 추가
     ```javascript
     // Node.js Express 예시
     app.use(cors({
       origin: 'https://your-frontend-domain.com',
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
       credentials: true
     }));
     ```
  2. **프록시 설정**: 개발 환경에서 Vite/Webpack 개발 서버 프록시 활용
     ```javascript
     // vite.config.js
     export default {
       server: {
         proxy: {
           '/api': {
             target: 'http://localhost:8080',
             changeOrigin: true
           }
         }
       }
     }
     ```
- **주의 사항**:
  - CORS 에러는 프론트엔드가 아닌 백엔드에서 해결해야 합니다.
  - 개발 환경에서는 프록시 설정으로 우회 가능하나, 프로덕션 환경에서는 반드시 백엔드 CORS 설정이 필요합니다.
  - `credentials: true` 설정 시 백엔드에서는 구체적인 출처를 명시해야 합니다(`Access-Control-Allow-Origin: *` 사용 불가).
- **관련 HTTP 헤더**:
  - `Access-Control-Allow-Origin`: 허용된 출처
  - `Access-Control-Allow-Methods`: 허용된 HTTP 메서드
  - `Access-Control-Allow-Headers`: 허용된 헤더
  - `Access-Control-Allow-Credentials`: 인증 정보(쿠키) 허용 여부

## 3. 테스팅

### 3.1 단위 테스트
- **도구**: Jest, React Testing Library
- **예시**:
```javascript
import { render, screen } from '@testing-library/react';
test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```
- **목적**: 컴포넌트별 기능 검증

### 3.2 통합 테스트
- **방식**: 주요 사용자 플로우 테스트
- **예시**: 로그인 플로우 테스트 (입력 → 제출 → 성공)
- **목적**: 실제 시나리오 시뮬레이션

### 3.3 스냅샷 테스트
- **방식**: UI 변경 추적
- **예시**:
```javascript
test('matches snapshot', () => {
  const { container } = render(<Button />);
  expect(container).toMatchSnapshot();
});
```
- **주의**: 과도한 의존 지양

### 3.4 E2E 테스트
- **도구**: Cypress, Playwright
- **예시**: 브라우저에서 로그인 → 대시보드 이동 테스트
- **목적**: 실제 사용자 경험 검증

### 3.5 테스트 커버리지
- **목표**: 최소 80% 커버리지
- **도구**: Jest `--coverage` 옵션
- **목적**: 코드 품질 보장, 약점 분석

## 4. 성능 최적화 및 모니터링

### 4.1 메모이제이션
- **도구**: `React.memo`, `useMemo`, `useCallback`
- **예시**:
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- **주의**: 과도한 사용은 메모리 비용 초래

### 4.2 가상화
- **도구**: `react-window`, `react-virtualized`
- **예시**:
```javascript
import { FixedSizeList } from 'react-window';
<FixedSizeList height={400} itemCount={1000} itemSize={35}>
  {Row}
</FixedSizeList>
```
- **목적**: 긴 리스트 렌더링 최적화

### 4.3 코드 분할
- **방식**: `React.lazy`, `Suspense`
- **예시**:
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
```
- **목적**: 번들 크기 감소, 로딩 시간 단축

### 4.4 성능 측정
- **도구**: React DevTools, Lighthouse
- **방식**: 렌더링 시간, 병목 지점 분석
- **목적**: 사용자 경험 개선

### 4.5 이미지 및 번들 최적화
- **이미지**: WebP 포맷, lazy loading
- **번들**: Webpack/Vite 번들 분석 도구 사용
- **예시**:
```html
<img src="image.webp" loading="lazy" />
```

### 4.6 클라이언트 사이드 모니터링
- **도구**: Sentry, LogRocket
- **용도**: 런타임 에러 추적, 사용자 행동 분석
- **예시**: Sentry로 JS 에러 캡처 및 알림 설정

## 5. 배포 및 CI/CD

### 5.1 배포 플랫폼
- **옵션**: Vercel, Netlify, AWS Amplify
- **특징**: 정적 사이트 배포, 자동 스케일링
- **예시**: Vercel로 Next.js 앱 배포

### 5.2 환경 변수 관리
- **방식**: `.env` 파일 사용
- **예시**:
```
API_URL=https://api.example.com
```
- **주의**: 민감 정보는 CI/CD 환경에서 관리

### 5.3 CI/CD 파이프라인
- **도구**: GitHub Actions, Jenkins
- **단계**: 테스트 → 빌드 → 배포
- **예시** (GitHub Actions):
```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
```
- **목적**: 배포 프로세스 자동화

### 5.4 모니터링
- **도구**: New Relic, Datadog
- **용도**: 성능, 에러, 로그 모니터링
- **예시**: New Relic으로 API 응답 시간 추적

## 6. 팀 협업

### 6.1 Git 워크플로우
- **방식**: GitFlow 또는 트렁크 기반 개발
- **규칙**: 브랜치 명명 규칙 (예: `feature/login`, `fix/bug-123`)
- **목적**: 코드 충돌 최소화, 체계적 관리

### 6.2 코드 리뷰
- **프로세스**: PR 기반, 최소 1명 리뷰어
- **도구**: GitHub, GitLab
- **목적**: 코드 품질 보장, 지식 공유

### 6.3 이슈 관리
- **도구**: Jira, GitHub Issues
- **방식**: 이슈 템플릿 사용 (문제, 재현 단계, 기대 결과)
- **목적**: 명확한 태스크 관리

### 6.4 문서 관리
- **도구**: Confluence, Notion
- **방식**: 최신화된 문서 유지, API 명세, 아키텍처 다이어그램 포함
- **목적**: 팀 간 정보 공유

## 7. 참조
- [Feature Sliced Design 상세 가이드](https://emewjin.github.io/feature-sliced-design/)
- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [ESLint 공식 문서](https://eslint.org/)
- [Prettier 공식 문서](https://prettier.io/)
- [Next.js 공식 문서](https://nextjs.org/)
- [React Router 공식 문서](https://reactrouter.com/)
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [Redux 공식 문서](https://redux.js.org/)
- [Material UI 공식 문서](https://mui.com/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/)
- [Axios 공식 문서](https://axios-http.com/)
- [SWR 공식 문서](https://swr.vercel.app/)
- [React Query 공식 문서](https://tanstack.com/query/)

---

## 부록: 추가 개념 및 패턴

### A. FSD 최소 구조 (필수 레이어만)

```
src/
├── app/                    # 필수: 애플리케이션 진입점
│   ├── index.js           # 메인 App 컴포넌트
│   ├── providers/         # 전역 프로바이더
│   └── styles/            # 전역 스타일
├── entities/              # 필수: 도메인 엔티티
│   ├── user/
│   │   ├── ui/           # User 관련 UI 컴포넌트
│   │   ├── model/        # User 상태/로직
│   │   └── api/          # User API 호출
│   └── product/
│       ├── ui/
│       ├── model/
│       └── api/
└── shared/               # 필수: 공통 유틸리티
    ├── ui/              # 공통 UI 컴포넌트 (Button, Input 등)
    ├── api/             # HTTP 클라이언트
    ├── lib/             # 유틸리티 함수
    └── config/          # 설정 파일
```

### B. FSD 완전 구조 (모든 레이어 포함)

```
src/
├── app/                    # 필수: 애플리케이션 진입점
├── processes/              # 선택: 복잡한 비즈니스 플로우
│   └── auth-flow/
├── pages/                  # 선택: 라우팅 페이지
│   ├── home/
│   └── profile/
├── widgets/                # 선택: 복합 UI 블록
│   ├── header/
│   └── footer/
├── features/               # 선택: 사용자 기능
│   ├── auth/
│   └── product-search/
├── entities/               # 필수: 도메인 엔티티
│   ├── user/
│   └── product/
└── shared/                 # 필수: 공통 코드
    ├── ui/
    ├── api/
    ├── lib/
    └── config/
```

### C. 프로젝트 규모별 권장사항

#### 소규모 프로젝트
- **필수**: `app`, `entities`, `shared`
- **선택적 추가**: `features` (기능이 복잡한 경우)

#### 중규모 프로젝트
- **필수**: `app`, `entities`, `shared`
- **권장 추가**: `features`, `pages`
- **선택적 추가**: `widgets`

#### 대규모 프로젝트
- **모든 레이어 사용 권장**
- 복잡한 비즈니스 로직을 위해 `processes` 레이어 활용

### D. 핵심 원칙

1. **의존성 규칙**: 상위 레이어는 하위 레이어에만 의존
2. **단방향 의존성**: `app` → `processes` → `pages` → `widgets` → `features` → `entities` → `shared`
3. **필요에 따른 확장**: 작은 구조로 시작해서 필요에 따라 레이어 추가

---

### E. React 컴포넌트 명명 규칙 가이드

#### 왜 컴포넌트는 대문자로 시작해야 하는가?

**1. React의 JSX 변환 과정**

```javascript
// JSX 코드 (개발자가 작성)
const element1 = <QueryProvider>...</QueryProvider>
const element2 = <queryProvider>...</queryProvider>

// Babel이 변환한 결과
const element1 = React.createElement(QueryProvider, null, "...")  // ✅ 함수/컴포넌트 참조
const element2 = React.createElement("queryProvider", null, "...")  // ❌ 문자열 (HTML 태그)
```

**2. React가 구분하는 방식**

```javascript
// ✅ 대문자 시작 = React 컴포넌트
function MyComponent() {
  return <div>Hello</div>
}

// React가 인식: "이것은 컴포넌트야!"
<MyComponent />  // React.createElement(MyComponent, ...)

// ❌ 소문자 시작 = HTML 태그
function myComponent() {  // 이렇게 정의해도
  return <div>Hello</div>
}

// React가 인식: "이것은 HTML 태그야!"
<myComponent />  // React.createElement("myComponent", ...)
// 결과: <mycomponent></mycomponent> (알 수 없는 HTML 태그)
```

**3. Provider 패턴에서의 명명 규칙**

```javascript
// ✅ 올바른 Provider 명명
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// 사용할 때
function App() {
  return (
    <QueryProvider>      {/* ✅ React 컴포넌트로 인식 */}
      <AuthProvider>     {/* ✅ React 컴포넌트로 인식 */}
        <MainApp />
      </AuthProvider>
    </QueryProvider>
  )
}
```

**4. 명명 규칙 요약**

```javascript
// ✅ 컴포넌트들 (PascalCase)
function Button() {}
function UserProfile() {}
function ProductList() {}
function QueryProvider() {}

// ✅ Hook들 (camelCase, use 접두사)
function useAuth() {}
function useTheme() {}
function useQuery() {}

// ✅ 일반 함수들 (camelCase)
function fetchData() {}
function formatDate() {}
function validateEmail() {}

// ✅ 상수들 (UPPER_SNAKE_CASE)
const API_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
```

---

### F. 환경 변수 설정 가이드

#### 1. .env (기본값)

```bash
# 앱 정보
VITE_APP_NAME=Data Monitoring App
VITE_APP_VERSION=1.0.0

# API 설정
VITE_API_BASE_URL=http://localhost:8081/api
VITE_API_TIMEOUT=10000

# 웹소켓
VITE_WS_URL=ws://localhost:8082

# 기능 설정
VITE_FEATURE_DARK_MODE=true
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_REAL_TIME=true

# 개발 설정
VITE_LOG_LEVEL=debug
VITE_ENABLE_DEV_TOOLS=true
```

#### 2. .env.production (배포용)

```bash
# 프로덕션 환경 설정
VITE_APP_NAME=Data Monitoring App
VITE_APP_VERSION=1.0.0

# API 설정
VITE_API_BASE_URL=https://api.datamonitor.com/api
VITE_API_TIMEOUT=15000

# 웹소켓
VITE_WS_URL=wss://api.datamonitor.com/ws

# 기능 설정
VITE_FEATURE_DARK_MODE=true
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_REAL_TIME=true

# 프로덕션 설정
VITE_LOG_LEVEL=error
VITE_ENABLE_DEV_TOOLS=false
```

#### 3. TypeScript 환경 변수 설정

```typescript
// src/shared/config/env.ts
export const ENV = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Data Monitoring App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8082',
  },
  features: {
    darkMode: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
    notifications: import.meta.env.VITE_FEATURE_NOTIFICATIONS === 'true',
    realTime: import.meta.env.VITE_FEATURE_REAL_TIME === 'true',
  },
  dev: {
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  },
};

// 환경 확인 유틸리티
export const isDevelopment = () => import.meta.env.MODE === 'development';
export const isProduction = () => import.meta.env.MODE === 'production';
```

---

### G. useEffect 사용 가이드

#### 개념

**1. Side Effects (사이드 이펙트)**
- 컴포넌트 렌더링과 별개의 작업
- 데이터 페칭, 구독 설정, DOM 수동 조작 등

**2. After Rendering (렌더링 이후 실행)**
- 컴포넌트가 화면에 그려진 후 실행
- 렌더링 성능에 영향을 주지 않음

**3. Synchronize (외부 시스템과 동기화)**
- React 트리 외부의 시스템과 상태 동기화
- API, 브라우저 API, 서드파티 라이브러리 등

#### 파라미터별 사용법

**1. 빈 의존성 배열 `[]` - 한 번만 실행**

```javascript
useEffect(() => {
  // 실행할 코드
}, []); // 마운트 시 한 번만
```

**사용 시기:**
- 초기 데이터 로딩 - 컴포넌트 시작 시 필요한 데이터 가져오기
- 이벤트 리스너 등록 - 윈도우 리사이즈, 스크롤 등
- 타이머/인터벌 설정 - 주기적 작업 시작
- 외부 라이브러리 초기화 - Google Analytics, 채팅 위젯 등

**2. 특정 값 의존성 `[value]` - 값 변경 시 실행**

```javascript
useEffect(() => {
  // value가 변경될 때마다 실행
}, [value]);
```

**사용 시기:**
- 검색어 변경 시 재검색 - 사용자 입력에 따른 실시간 검색
- 사용자 ID 변경 시 프로필 로드 - 다른 사용자 선택 시
- 테마 변경 시 CSS 적용 - 다크/라이트 모드 전환
- 폼 유효성 검사 - 입력값 변경에 따른 검증

**3. 여러 값 의존성 `[val1, val2]` - 여러 값 중 하나라도 변경 시**

```javascript
useEffect(() => {
  // val1 또는 val2가 변경될 때마다 실행
}, [val1, val2]);
```

**사용 시기:**
- 필터 + 정렬 조건 변경 - 상품 목록 필터링/정렬
- 사용자 설정 적용 - 언어, 폰트 크기, 테마 동시 적용
- 차트 데이터 + 옵션 변경 - 차트 설정과 데이터 동시 업데이트

#### 사용 빈도 순위

1. **`[특정값]`** - 가장 많이 사용
2. **`[]`** - 두 번째로 많이 사용
3. **`[여러값]`** - 중간 정도 사용
4. **`[함수포함]`** - 특수한 경우 사용
5. **의존성 없음** - 거의 사용 안 함

#### 핵심 포인트

**좋은 사용법:**
- 사용하는 모든 값을 의존성 배열에 포함
- useCallback으로 함수 메모이제이션
- 정리 함수로 메모리 누수 방지

**피해야 할 사용법:**
- 의존성 누락으로 인한 버그
- 객체/배열을 직접 의존성으로 사용
- 의존성 배열 없이 상태 업데이트

**기억하기:**
useEffect = **"렌더링 후에 사이드 이펙트를 안전하게 처리하는 도구"**

---

## H. 국제화 (Internationalization, i18n)

### 개념

**국제화(i18n)**는 애플리케이션을 여러 언어와 지역에 맞게 조정하는 프로세스입니다. "i18n"은 "internationalization"의 첫 글자 'i'와 마지막 글자 'n' 사이에 18개의 글자가 있다는 의미입니다.

### 왜 i18n이 필요한가?

```typescript
// ❌ 하드코딩된 텍스트
function WelcomeMessage() {
  return <h1>Welcome to our website</h1>
}

// ✅ 국제화 지원
function WelcomeMessage() {
  const { t } = useTranslation()
  return <h1>{t('welcome.message')}</h1>
}

// 한국어: "우리 웹사이트에 오신 것을 환영합니다"
// 영어: "Welcome to our website"
// 일본어: "私たちのウェブサイトへようこそ"
```

### react-i18next 설치 및 설정

#### 1. 패키지 설치

```bash
npm install react-i18next i18next
```

#### 2. i18n 설정 파일

```typescript
// src/shared/lib/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 번역 리소스
const resources = {
  ko: {
    translation: {
      welcome: {
        message: '우리 웹사이트에 오신 것을 환영합니다',
        subtitle: '최고의 서비스를 제공합니다',
      },
      common: {
        save: '저장',
        cancel: '취소',
        delete: '삭제',
        edit: '수정',
        loading: '로딩 중...',
        error: '오류가 발생했습니다',
      },
      user: {
        profile: '프로필',
        settings: '설정',
        logout: '로그아웃',
      },
      validation: {
        required: '{{field}}은(는) 필수 항목입니다',
        email: '올바른 이메일 형식이 아닙니다',
        minLength: '최소 {{min}}자 이상 입력해주세요',
      },
    },
  },
  en: {
    translation: {
      welcome: {
        message: 'Welcome to our website',
        subtitle: 'We provide the best service',
      },
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        loading: 'Loading...',
        error: 'An error occurred',
      },
      user: {
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
      },
      validation: {
        required: '{{field}} is required',
        email: 'Invalid email format',
        minLength: 'Minimum {{min}} characters required',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'en', // 번역 누락 시 대체 언어
    interpolation: {
      escapeValue: false, // React는 XSS 자동 방어
    },
  })

export default i18n
```

#### 3. App에 i18n Provider 적용

```typescript
// src/app/App.tsx
import { I18nextProvider } from 'react-i18next'
import i18n from '@/shared/lib/i18n/config'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <YourApp />
    </I18nextProvider>
  )
}
```

### 기본 사용법

#### 1. useTranslation 훅 사용

```typescript
import { useTranslation } from 'react-i18next'

function WelcomePage() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('welcome.message')}</h1>
      <p>{t('welcome.subtitle')}</p>

      <button onClick={() => i18n.changeLanguage('ko')}>한국어</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>

      <p>Current Language: {i18n.language}</p>
    </div>
  )
}
```

#### 2. 변수 보간 (Interpolation)

```typescript
function UserGreeting({ username }: { username: string }) {
  const { t } = useTranslation()

  return (
    <div>
      {/* 번역 파일: "greeting": "안녕하세요, {{name}}님!" */}
      <h2>{t('greeting', { name: username })}</h2>

      {/* 번역 파일: "itemCount": "{{count}}개의 아이템" */}
      <p>{t('itemCount', { count: 5 })}</p>
    </div>
  )
}
```

#### 3. 복수형 처리 (Pluralization)

```typescript
// 번역 파일
const resources = {
  ko: {
    translation: {
      item_one: '{{count}}개의 아이템',
      item_other: '{{count}}개의 아이템',
    },
  },
  en: {
    translation: {
      item_one: '{{count}} item',
      item_other: '{{count}} items',
    },
  },
}

// 사용
function ItemCount({ count }: { count: number }) {
  const { t } = useTranslation()
  return <p>{t('item', { count })}</p>
}
// count=1: "1 item" (영어) / "1개의 아이템" (한국어)
// count=5: "5 items" (영어) / "5개의 아이템" (한국어)
```

### 고급 패턴

#### 1. Namespace 분리

```typescript
// src/shared/lib/i18n/locales/ko/common.json
{
  "save": "저장",
  "cancel": "취소"
}

// src/shared/lib/i18n/locales/ko/dashboard.json
{
  "title": "대시보드",
  "stats": "통계"
}

// 사용
const { t } = useTranslation(['common', 'dashboard'])
t('common:save')      // "저장"
t('dashboard:title')  // "대시보드"
```

#### 2. 날짜 및 통화 포맷

```typescript
import { useTranslation } from 'react-i18next'

function FormattedData() {
  const { t, i18n } = useTranslation()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    const currency = i18n.language === 'ko' ? 'KRW' : 'USD'
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(amount)
  }

  return (
    <div>
      <p>Date: {formatDate(new Date())}</p>
      <p>Price: {formatCurrency(10000)}</p>
    </div>
  )
}
```

#### 3. 언어 감지 및 지속성

```typescript
// src/shared/lib/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector) // 브라우저 언어 자동 감지
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'], // localStorage 우선, 없으면 브라우저 설정
      caches: ['localStorage'], // localStorage에 저장
    },
  })
```

#### 4. 로딩 상태 처리

```typescript
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

function App() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <MainApp />
    </Suspense>
  )
}

function MainApp() {
  const { t, ready } = useTranslation()

  if (!ready) return <div>Loading...</div>

  return <div>{t('welcome.message')}</div>
}
```

### 베스트 프랙티스

**1. 번역 키 네이밍 규칙**
```typescript
// ✅ 좋은 예: 계층적 구조
{
  "user.profile.title": "프로필",
  "user.profile.edit": "프로필 수정",
  "user.settings.password": "비밀번호 변경"
}

// ❌ 나쁜 예: 플랫한 구조
{
  "userProfileTitle": "프로필",
  "editUserProfile": "프로필 수정"
}
```

**2. 번역 파일 관리**
```
src/shared/lib/i18n/
├── config.ts
└── locales/
    ├── ko/
    │   ├── common.json
    │   ├── dashboard.json
    │   └── user.json
    └── en/
        ├── common.json
        ├── dashboard.json
        └── user.json
```

**3. 타입 안전성 확보**
```typescript
// src/shared/lib/i18n/types.ts
export type TranslationKey =
  | 'welcome.message'
  | 'welcome.subtitle'
  | 'common.save'
  | 'common.cancel'

// 사용 시 자동완성 및 타입 체크
const key: TranslationKey = 'welcome.message'
t(key)
```

---

## I. 에러 바운더리 및 전역 에러 처리

### 개념

**에러 바운더리(Error Boundary)**는 React 컴포넌트 트리에서 발생한 JavaScript 에러를 포착하고, 에러를 로깅하며, 폴백 UI를 보여주는 React 컴포넌트입니다.

### 왜 필요한가?

```typescript
// ❌ 에러가 발생하면 전체 앱이 크래시
function UserProfile({ userId }: { userId: string }) {
  const user = JSON.parse(localStorage.getItem('user')!) // null이면 에러!
  return <div>{user.name}</div>
}

// ✅ 에러 바운더리로 감싸서 부분 UI만 영향
<ErrorBoundary fallback={<ErrorFallback />}>
  <UserProfile userId="123" />
</ErrorBoundary>
```

### 에러 바운더리 구현

#### 1. 기본 Error Boundary

```typescript
// src/shared/ui/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    console.error('Error Boundary caught:', error, errorInfo)

    // 외부 에러 로깅 서비스로 전송
    this.props.onError?.(error, errorInfo)

    // Sentry, LogRocket 등으로 전송
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>문제가 발생했습니다</h2>
          <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

#### 2. 커스텀 Fallback UI

```typescript
// src/shared/ui/ErrorBoundary/ErrorFallback.tsx
import { Button } from '@mycompany/shared-ui'

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="error-fallback">
      <div className="error-icon">⚠️</div>
      <h2>앗! 문제가 발생했습니다</h2>
      <p>예상치 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.</p>

      {process.env.NODE_ENV === 'development' && error && (
        <details style={{ marginTop: '20px' }}>
          <summary>에러 상세 정보 (개발 모드)</summary>
          <pre style={{ textAlign: 'left', overflow: 'auto' }}>
            {error.message}
            {'\n\n'}
            {error.stack}
          </pre>
        </details>
      )}

      <div className="error-actions">
        <Button onClick={resetError}>다시 시도</Button>
        <Button variant="secondary" onClick={() => window.location.href = '/'}>
          홈으로 이동
        </Button>
      </div>
    </div>
  )
}
```

#### 3. react-error-boundary 라이브러리 사용 (권장)

```bash
npm install react-error-boundary
```

```typescript
// src/shared/ui/ErrorBoundary/index.tsx
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'

interface AppErrorBoundaryProps {
  children: React.ReactNode
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: { componentStack: string }) => {
    // 에러 로깅
    console.error('Error caught by boundary:', error, errorInfo)

    // Sentry로 전송
    // Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  const handleReset = () => {
    // 에러 상태 리셋 시 추가 로직
    console.log('Error boundary reset')
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ReactErrorBoundary>
  )
}
```

### 사용 예시

#### 1. 전체 앱 레벨

```typescript
// src/app/App.tsx
import { AppErrorBoundary } from '@/shared/ui/ErrorBoundary'

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes />
        </Router>
      </QueryClientProvider>
    </AppErrorBoundary>
  )
}
```

#### 2. 컴포넌트 레벨

```typescript
// src/pages/DashboardPage/DashboardPage.tsx
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/shared/ui/ErrorBoundary'

export function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* 위젯별로 독립적인 에러 바운더리 */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <StatsWidget />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ChartWidget />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UserListWidget />
      </ErrorBoundary>
    </div>
  )
}
```

### 전역 에러 처리

#### 1. 전역 에러 핸들러

```typescript
// src/shared/lib/errorHandler/globalErrorHandler.ts

export function setupGlobalErrorHandlers() {
  // 처리되지 않은 에러 캐치
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)

    // Sentry로 전송
    // Sentry.captureException(event.error)

    // 사용자에게 알림
    // toast.error('예상치 못한 오류가 발생했습니다')
  })

  // Promise rejection 캐치
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)

    // Sentry로 전송
    // Sentry.captureException(event.reason)

    // 사용자에게 알림
    // toast.error('작업 중 오류가 발생했습니다')
  })
}

// src/app/App.tsx에서 초기화
setupGlobalErrorHandlers()
```

#### 2. API 에러 처리

```typescript
// src/shared/api/errorHandler.ts
import { AxiosError } from 'axios'

export interface ApiError {
  code: string
  message: string
  status: number
  details?: unknown
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500
    const serverError = error.response?.data

    return {
      code: serverError?.code || 'UNKNOWN_ERROR',
      message: serverError?.message || getDefaultErrorMessage(status),
      status,
      details: serverError?.details,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: '알 수 없는 오류가 발생했습니다',
    status: 500,
  }
}

function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return '잘못된 요청입니다'
    case 401:
      return '인증이 필요합니다'
    case 403:
      return '권한이 없습니다'
    case 404:
      return '요청한 리소스를 찾을 수 없습니다'
    case 500:
      return '서버 오류가 발생했습니다'
    default:
      return '오류가 발생했습니다'
  }
}
```

#### 3. React Query 에러 처리

```typescript
// src/app/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { handleApiError } from '@/shared/api/errorHandler'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // 401, 403, 404는 재시도 안 함
        if (error instanceof AxiosError) {
          const status = error.response?.status
          if ([401, 403, 404].includes(status || 0)) {
            return false
          }
        }
        return failureCount < 3
      },
      onError: (error) => {
        const apiError = handleApiError(error)
        toast.error(apiError.message)
      },
    },
    mutations: {
      onError: (error) => {
        const apiError = handleApiError(error)
        toast.error(apiError.message)
      },
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### 에러 유형별 처리

```typescript
// src/shared/lib/errorHandler/errorTypes.ts

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '인증이 필요합니다') {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '권한이 없습니다') {
    super(message, 'AUTHORIZATION_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '리소스를 찾을 수 없습니다') {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

// 사용 예시
function processUserData(data: unknown) {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('유효하지 않은 데이터입니다', {
      data: '객체 형식이어야 합니다',
    })
  }

  // ...
}
```

### 베스트 프랙티스

**1. 계층적 에러 바운더리**
```typescript
<ErrorBoundary fallback={<AppCrashFallback />}>  {/* 앱 레벨 */}
  <App>
    <ErrorBoundary fallback={<PageErrorFallback />}>  {/* 페이지 레벨 */}
      <DashboardPage>
        <ErrorBoundary fallback={<WidgetErrorFallback />}>  {/* 위젯 레벨 */}
          <StatsWidget />
        </ErrorBoundary>
      </DashboardPage>
    </ErrorBoundary>
  </App>
</ErrorBoundary>
```

**2. 에러 로깅 전략**
```typescript
// 개발: console.error
// 스테이징: Sentry (warning 레벨)
// 프로덕션: Sentry + 알림 (error 레벨)

if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error)
} else {
  console.error(error)
}
```

**3. 사용자 친화적 에러 메시지**
```typescript
// ❌ 기술적 메시지
"TypeError: Cannot read property 'name' of null"

// ✅ 사용자 친화적 메시지
"사용자 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요."
```

---

## J. 로깅 및 디버깅 전략

### 개념

**로깅(Logging)**은 애플리케이션 실행 중 발생하는 이벤트, 에러, 성능 데이터를 기록하는 프로세스입니다. 효과적인 로깅은 버그 진단, 성능 분석, 보안 감사에 필수적입니다.

### 로그 레벨 (Log Levels)

```typescript
// src/shared/lib/logger/types.ts
export enum LogLevel {
  DEBUG = 'debug',   // 상세한 디버깅 정보 (개발 환경만)
  INFO = 'info',     // 일반 정보 메시지
  WARN = 'warn',     // 경고 메시지
  ERROR = 'error',   // 에러 메시지
  FATAL = 'fatal',   // 치명적 에러
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
  userId?: string
  sessionId?: string
}
```

### 구조화된 로거 구현

#### 1. 기본 Logger 클래스

```typescript
// src/shared/lib/logger/Logger.ts
import { LogLevel, LogEntry } from './types'

class Logger {
  private minLevel: LogLevel
  private context: Record<string, any> = {}

  constructor(minLevel: LogLevel = LogLevel.INFO) {
    this.minLevel = minLevel
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL]
    return levels.indexOf(level) >= levels.indexOf(this.minLevel)
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: { ...this.context, ...context },
      error,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
    }
  }

  private getUserId(): string | undefined {
    // 현재 로그인한 사용자 ID 가져오기
    return localStorage.getItem('userId') || undefined
  }

  private getSessionId(): string | undefined {
    // 세션 ID 가져오기
    return sessionStorage.getItem('sessionId') || undefined
  }

  private log(entry: LogEntry) {
    // 콘솔에 출력
    const style = this.getConsoleStyle(entry.level)
    console.log(
      `%c[${entry.level.toUpperCase()}] ${entry.timestamp}`,
      style,
      entry.message,
      entry.context
    )

    // 프로덕션 환경에서는 외부 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToLogService(entry)
    }
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      [LogLevel.DEBUG]: 'color: gray',
      [LogLevel.INFO]: 'color: blue',
      [LogLevel.WARN]: 'color: orange',
      [LogLevel.ERROR]: 'color: red',
      [LogLevel.FATAL]: 'color: white; background-color: red; font-weight: bold',
    }
    return styles[level]
  }

  private sendToLogService(entry: LogEntry) {
    // Sentry, LogRocket, Datadog 등으로 전송
    // Sentry.captureMessage(entry.message, {
    //   level: entry.level,
    //   contexts: { custom: entry.context },
    // })
  }

  // Public 메서드
  debug(message: string, context?: Record<string, any>) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.log(this.createLogEntry(LogLevel.DEBUG, message, context))
    }
  }

  info(message: string, context?: Record<string, any>) {
    if (this.shouldLog(LogLevel.INFO)) {
      this.log(this.createLogEntry(LogLevel.INFO, message, context))
    }
  }

  warn(message: string, context?: Record<string, any>) {
    if (this.shouldLog(LogLevel.WARN)) {
      this.log(this.createLogEntry(LogLevel.WARN, message, context))
    }
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.log(this.createLogEntry(LogLevel.ERROR, message, context, error))
    }
  }

  fatal(message: string, error?: Error, context?: Record<string, any>) {
    if (this.shouldLog(LogLevel.FATAL)) {
      this.log(this.createLogEntry(LogLevel.FATAL, message, context, error))
    }
  }

  // 컨텍스트 설정
  setContext(context: Record<string, any>) {
    this.context = { ...this.context, ...context }
  }

  clearContext() {
    this.context = {}
  }
}

// 싱글톤 인스턴스
const logLevel = process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG
export const logger = new Logger(logLevel)
```

#### 2. 사용 예시

```typescript
// 기본 사용
import { logger } from '@/shared/lib/logger'

function UserProfile({ userId }: { userId: string }) {
  logger.debug('UserProfile component rendered', { userId })

  useEffect(() => {
    logger.info('Fetching user data', { userId })

    fetchUser(userId)
      .then((user) => {
        logger.info('User data fetched successfully', { userId, userName: user.name })
      })
      .catch((error) => {
        logger.error('Failed to fetch user data', error, { userId })
      })
  }, [userId])

  return <div>...</div>
}

// 컨텍스트 설정
logger.setContext({ feature: 'user-management', version: '1.0.0' })
logger.info('User created', { userId: '123' })
// → { feature: 'user-management', version: '1.0.0', userId: '123' }
```

### 성능 로깅

#### 1. Performance API 활용

```typescript
// src/shared/lib/logger/performance.ts

export class PerformanceLogger {
  private marks: Map<string, number> = new Map()

  // 성능 측정 시작
  start(name: string) {
    this.marks.set(name, performance.now())
    logger.debug(`Performance measurement started: ${name}`)
  }

  // 성능 측정 종료
  end(name: string, context?: Record<string, any>) {
    const startTime = this.marks.get(name)
    if (!startTime) {
      logger.warn(`Performance measurement not found: ${name}`)
      return
    }

    const duration = performance.now() - startTime
    this.marks.delete(name)

    logger.info(`Performance: ${name}`, {
      duration: `${duration.toFixed(2)}ms`,
      ...context,
    })

    // 임계값 초과 시 경고
    if (duration > 1000) {
      logger.warn(`Slow operation detected: ${name}`, {
        duration: `${duration.toFixed(2)}ms`,
        threshold: '1000ms',
        ...context,
      })
    }

    return duration
  }

  // 함수 실행 시간 측정 (데코레이터 패턴)
  async measure<T>(name: string, fn: () => T | Promise<T>, context?: Record<string, any>): Promise<T> {
    this.start(name)
    try {
      const result = await fn()
      this.end(name, context)
      return result
    } catch (error) {
      this.end(name, { ...context, error: true })
      throw error
    }
  }
}

export const performanceLogger = new PerformanceLogger()

// 사용 예시
async function fetchUserData(userId: string) {
  return performanceLogger.measure(
    'fetchUserData',
    async () => {
      const response = await fetch(`/api/users/${userId}`)
      return response.json()
    },
    { userId }
  )
}
```

#### 2. React 컴포넌트 렌더링 로깅

```typescript
// src/shared/lib/logger/reactPerformance.ts
import { useEffect, useRef } from 'react'
import { logger } from './Logger'

export function useRenderLogger(componentName: string, props?: Record<string, any>) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    logger.debug(`${componentName} rendered`, {
      renderCount: renderCount.current,
      props,
    })
  })
}

// 사용 예시
function UserProfile({ userId }: { userId: string }) {
  useRenderLogger('UserProfile', { userId })

  return <div>...</div>
}
```

### 네트워크 요청 로깅

```typescript
// src/shared/api/loggingInterceptor.ts
import axios from 'axios'
import { logger, performanceLogger } from '@/shared/lib/logger'

export function setupApiLogging() {
  // 요청 인터셉터
  axios.interceptors.request.use(
    (config) => {
      const requestId = crypto.randomUUID()
      config.headers['X-Request-ID'] = requestId

      logger.info('API Request', {
        requestId,
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
      })

      // 성능 측정 시작
      performanceLogger.start(`api-${requestId}`)

      // 요청 ID를 config에 저장
      ;(config as any)._requestId = requestId

      return config
    },
    (error) => {
      logger.error('API Request failed', error)
      return Promise.reject(error)
    }
  )

  // 응답 인터셉터
  axios.interceptors.response.use(
    (response) => {
      const requestId = (response.config as any)._requestId

      // 성능 측정 종료
      const duration = performanceLogger.end(`api-${requestId}`, {
        status: response.status,
        url: response.config.url,
      })

      logger.info('API Response', {
        requestId,
        status: response.status,
        duration: `${duration?.toFixed(2)}ms`,
        url: response.config.url,
      })

      return response
    },
    (error) => {
      const requestId = (error.config as any)?._requestId

      if (requestId) {
        performanceLogger.end(`api-${requestId}`, {
          status: error.response?.status,
          error: true,
        })
      }

      logger.error('API Error', error, {
        requestId,
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
      })

      return Promise.reject(error)
    }
  )
}
```

### 사용자 행동 로깅 (Analytics)

```typescript
// src/shared/lib/logger/analytics.ts
import { logger } from './Logger'

export class AnalyticsLogger {
  // 페이지뷰 추적
  trackPageView(pageName: string, path: string) {
    logger.info('Page view', {
      pageName,
      path,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    })

    // Google Analytics, Mixpanel 등으로 전송
    // gtag('event', 'page_view', { page_path: path })
  }

  // 이벤트 추적
  trackEvent(eventName: string, properties?: Record<string, any>) {
    logger.info('User event', {
      eventName,
      ...properties,
    })

    // Analytics 서비스로 전송
    // gtag('event', eventName, properties)
  }

  // 버튼 클릭 추적
  trackClick(buttonName: string, context?: Record<string, any>) {
    this.trackEvent('button_click', {
      buttonName,
      ...context,
    })
  }

  // 폼 제출 추적
  trackFormSubmit(formName: string, success: boolean, context?: Record<string, any>) {
    this.trackEvent('form_submit', {
      formName,
      success,
      ...context,
    })
  }

  // 에러 추적
  trackError(errorType: string, errorMessage: string, context?: Record<string, any>) {
    logger.error('User-facing error', undefined, {
      errorType,
      errorMessage,
      ...context,
    })
  }
}

export const analytics = new AnalyticsLogger()

// 사용 예시
function LoginForm() {
  const handleSubmit = async (data: LoginData) => {
    analytics.trackEvent('login_attempt', { method: 'email' })

    try {
      await login(data)
      analytics.trackFormSubmit('login', true)
    } catch (error) {
      analytics.trackFormSubmit('login', false, { error: error.message })
      analytics.trackError('login_failed', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        onClick={() => analytics.trackClick('login_button')}
        type="submit"
      >
        로그인
      </button>
    </form>
  )
}
```

### React Router와 통합

```typescript
// src/app/router/loggingRouter.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '@/shared/lib/logger/analytics'

export function RouterLogger() {
  const location = useLocation()

  useEffect(() => {
    analytics.trackPageView(location.pathname, location.pathname)
  }, [location])

  return null
}

// src/app/App.tsx
function App() {
  return (
    <Router>
      <RouterLogger />
      <Routes />
    </Router>
  )
}
```

### 디버깅 도구

#### 1. React DevTools 활용

```typescript
// src/shared/lib/debug/reactDevTools.ts

// 개발 환경에서만 전역 객체에 노출
if (process.env.NODE_ENV === 'development') {
  // 전역 스토어 접근
  ;(window as any).__DEBUG__ = {
    logger,
    performanceLogger,
    analytics,
  }

  console.log('🛠️ Debug tools available: window.__DEBUG__')
}
```

#### 2. 조건부 로깅

```typescript
// src/shared/lib/logger/conditionalLogger.ts

export class ConditionalLogger {
  private enabledFeatures = new Set<string>()

  // 특정 기능에 대한 로깅 활성화
  enable(feature: string) {
    this.enabledFeatures.add(feature)
    logger.info(`Logging enabled for feature: ${feature}`)
  }

  disable(feature: string) {
    this.enabledFeatures.delete(feature)
    logger.info(`Logging disabled for feature: ${feature}`)
  }

  log(feature: string, message: string, context?: Record<string, any>) {
    if (this.enabledFeatures.has(feature)) {
      logger.debug(`[${feature}] ${message}`, context)
    }
  }
}

export const conditionalLogger = new ConditionalLogger()

// 브라우저 콘솔에서 활성화
// window.__DEBUG__.conditionalLogger.enable('user-auth')

// 사용
conditionalLogger.log('user-auth', 'Login attempt', { email: 'user@example.com' })
```

### 로그 수집 및 분석

#### 1. Sentry 통합

```typescript
// src/shared/lib/logger/sentry.ts
import * as Sentry from '@sentry/react'

export function initSentry() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.VITE_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1, // 10% 샘플링
      beforeSend(event, hint) {
        // 민감 정보 제거
        if (event.request) {
          delete event.request.cookies
        }
        return event
      },
    })

    // 사용자 정보 설정
    const userId = localStorage.getItem('userId')
    if (userId) {
      Sentry.setUser({ id: userId })
    }
  }
}

// 커스텀 에러 캡처
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  })
}
```

### 베스트 프랙티스

**1. 로그 레벨 선택**
```typescript
// ✅ 적절한 로그 레벨
logger.debug('Detailed debugging info')           // 개발 환경
logger.info('User logged in')                     // 일반 정보
logger.warn('Deprecated API used')                // 경고
logger.error('Failed to save data', error)        // 에러
logger.fatal('Database connection lost', error)   // 치명적

// ❌ 부적절한 로그 레벨
logger.error('User clicked button')  // info로 해야 함
logger.info('Database crashed', error)  // fatal로 해야 함
```

**2. 민감 정보 제거**
```typescript
// ❌ 민감 정보 포함
logger.info('User login', {
  email: 'user@example.com',
  password: 'secret123',  // 절대 안 됨!
  creditCard: '1234-5678-9012-3456',
})

// ✅ 민감 정보 제거
logger.info('User login', {
  email: 'user@example.com',
  emailDomain: 'example.com',  // 도메인만
})
```

**3. 구조화된 로깅**
```typescript
// ❌ 문자열에 모든 정보 포함
logger.info(`User 123 created order 456 with total $100`)

// ✅ 구조화된 데이터
logger.info('Order created', {
  userId: '123',
  orderId: '456',
  totalAmount: 100,
  currency: 'USD',
})
```

**4. 성능 고려**
```typescript
// ❌ 과도한 로깅
function render() {
  logger.debug('Rendering component')  // 매 렌더마다!
}

// ✅ 조건부 로깅
function render() {
  if (process.env.VERBOSE_LOGGING === 'true') {
    logger.debug('Rendering component')
  }
}
```
