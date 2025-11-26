# II. 프로젝트 구조 및 개발 환경 (개별 앱 생성 가이드)

> **전제 조건**: 이 문서는 [01-workspace-architecture.md](./01-workspace-architecture.md)에서 정의한 Monorepo 구조 내에서 **새로운 앱(apps/)을 생성**하는 방법을 다룹니다.

## 목차
1. [소개](#1-소개)
2. [개발 환경 구축](#2-개발-환경-구축)
   - 2.1 [Node.js 및 pnpm](#21-nodejs-및-pnpm)
   - 2.2 [Workspace 내에서 새 앱 생성](#22-workspace-내에서-새-앱-생성)
   - 2.3 [ESLint 및 TypeScript 설정](#23-eslint-및-typescript-설정)
   - 2.4 [라우팅 설정](#24-라우팅-설정)
   - 2.5 [개발 환경 완료 확인](#25-개발-환경-완료-확인)
   - 2.6 [전체 설치 명령어 요약](#26-전체-설치-명령어-요약)
   - 2.7 [버전 선택 기준](#27-버전-선택-기준)
3. [프로젝트 구조: Feature Sliced Design](#3-프로젝트-구조-feature-sliced-design)
   - 3.1 [계층 (Layers)](#31-계층-layers)
   - 3.2 [슬라이스 (Slices)](#32-슬라이스-slices)
   - 3.3 [세그먼트 (Segments)](#33-세그먼트-segments)
   - 3.4 [권장 폴더 구조](#34-권장-폴더-구조)
4. [주요 라이브러리 및 도구](#4-주요-라이브러리-및-도구)
   - 4.1 [상태 관리](#41-상태-관리)
   - 4.2 [CSS 및 스타일링](#42-css-및-스타일링)
   - 4.3 [라우팅](#43-라우팅)
   - 4.4 [데이터 페칭](#44-데이터-페칭)
   - 4.5 [빌드 및 개발 도구](#45-빌드-및-개발-도구)
   - 4.6 [프레임워크](#46-프레임워크)
   - 4.7 [타입 안전성](#47-타입-안전성)
   - 4.8 [차트 및 데이터 시각화](#48-차트-및-데이터-시각화)

---

## 1. 소개

이 문서는 **[01-workspace-architecture.md](./01-workspace-architecture.md)에서 정의한 Monorepo 구조 내에서** 새로운 React 앱을 생성하고 설정하는 방법을 다룹니다.

**핵심 내용:**
- Workspace(apps/ 디렉토리) 내에서 새 앱 생성
- Feature Sliced Design(FSD) 폴더 구조 적용
- 공통 모듈(packages/) 연결 및 활용
- 팀 표준 라이브러리 및 개발 도구 설정

> **참고**: Workspace 전체 구조와 공통 모듈 설계는 01번 문서를, 공통 모듈 개발은 [05-shared-modules-guide.md](./05-shared-modules-guide.md)를 참조하세요.

## 2. 개발 환경 구축

## 2.1 Node.js 및 pnpm
- **설치**: [Node.js 공식 웹사이트](https://nodejs.org/)에서 최신 LTS 버전 다운로드 및 설치
- **pnpm 설치**: Workspace(Monorepo) 관리를 위한 고성능 패키지 매니저
- **권장 버전**: Node.js 20.x LTS, pnpm 9.x
- **확인 명령어**:
```bash
node --version  # v20.x
npm install -g pnpm@9.0.0
pnpm --version  # 9.0.0
```

## 2.2 Workspace 내에서 새 앱 생성

> **전제**: 01번 문서에 따라 Workspace가 이미 구성되어 있어야 합니다.

```bash
# 1. Workspace 루트로 이동
cd frontend-web-react

# 2. apps/ 디렉토리에 새 앱 생성
cd apps
pnpm create vite@latest my-new-app -- --template react-ts
cd my-new-app

# 3. package.json 수정 (Workspace 패키지명)
# "name": "@workspace/my-new-app"

# 4. 공통 모듈 의존성 추가
```

```json
// apps/my-new-app/package.json
{
  "name": "@workspace/my-new-app",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.6.1",

    // 공통 모듈 연결
    "@workspace/ui": "workspace:*",
    "@workspace/api": "workspace:*",
    "@workspace/auth": "workspace:*",
    "@workspace/utils": "workspace:*"
  }
}
```

- **루트에서 의존성 설치**:
```bash
# Workspace 루트로 이동
cd ../..

# 전체 의존성 설치
pnpm install
```

- **개발 서버 실행**:
```bash
# 특정 앱만 실행
pnpm --filter @workspace/my-new-app dev

# 또는 Turborepo 사용 (모든 앱)
pnpm dev
```

- **주요 패키지 특징**:
  - **Vite 5.4.8**: 빠른 빌드와 핫 모듈 리로딩(HMR) 제공, 안정적인 성능
  - **React 18.3.1**: 완전히 검증된 안정 버전, 프로덕션 환경에 최적화
  - **TypeScript 5.6.2**: 타입 안정성과 개발 경험 향상
  - **Zustand 4.5.5**: 경량화된 상태 관리 라이브러리, Redux 대비 단순함

## 2.3 ESLint 및 TypeScript 설정
- **ESLint 관련 패키지 설치**:
```bash
npm install --save-dev eslint-plugin-react@^7.37.5 eslint-plugin-react-hooks@^4.6.2 @typescript-eslint/eslint-plugin@^8.8.1 @typescript-eslint/parser@^8.8.1
```

- **ESLint 설정** (`.eslintrc.json`):
```json
{
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react-refresh", "@typescript-eslint"],
  "rules": {
    "react-refresh/only-export-components": "warn"
  }
}
```

- **패키지 상세 정보**:
  - **ESLint 8.57.0**: 안정적인 코드 품질 검사, 기존 설정 방식 유지
  - **eslint-plugin-react 7.37.5**: React 전용 린팅 규칙 제공
  - **eslint-plugin-react-hooks 4.6.2**: React Hooks 사용 규칙 검증
  - **@typescript-eslint/eslint-plugin 8.8.1**: TypeScript 코드 린팅 지원
  - **@typescript-eslint/parser 8.8.1**: TypeScript 파싱 엔진

## 2.4 라우팅 설정
- **React Router 설치**:
```bash
npm install react-router@^7.6.1
```

- **특징**:
  - **React Router 7.6.1**: 최신 라우팅 기능 지원 (주의: 새 버전이므로 프로덕션 사용 전 충분한 테스트 권장)
  - **대안**: 안정성 우선 시 `react-router-dom@^6.28.0` 사용 고려

## 2.5 개발 환경 완료 확인
- **패키지 설치 확인**:
```bash
npm list --depth=0
```

- **개발 서버 실행**:
```bash
npm run dev
```

- **빌드 테스트**:
```bash
npm run build
```

## 2.6 전체 설치 명령어 요약

### 개별 설치 (권장)
```bash
# 1. 프로젝트 생성
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app

# 2. Production Dependencies
npm install react@^18.3.1
npm install react-dom@^18.3.1
npm install zustand@^4.5.5
npm install react-router@^7.6.1

# 3. Dev Dependencies - Core
npm install --save-dev vite@^5.4.8
npm install --save-dev typescript@^5.6.2
npm install --save-dev eslint@^8.57.0

# 4. Dev Dependencies - Vite Plugin
npm install --save-dev @vitejs/plugin-react@^4.3.2

# 5. Dev Dependencies - ESLint Plugins
npm install --save-dev eslint-plugin-react@^7.37.5
npm install --save-dev eslint-plugin-react-hooks@^4.6.2
npm install --save-dev @typescript-eslint/eslint-plugin@^8.8.1
npm install --save-dev @typescript-eslint/parser@^8.8.1
```

## 2.7 버전 선택 기준
- **안정성 우선**: 프로덕션 환경에서 검증된 버전 선택
- **호환성 보장**: 모든 패키지 간 버전 충돌 방지
- **장기 지원**: LTS 버전 및 메이저 업데이트가 안정화된 버전 우선
- **생태계 지원**: 커뮤니티와 플러그인 지원이 풍부한 버전 선택

### 3. 프로젝트 구조: Feature Sliced Design

#### 3.1 계층 (Layers)
- **구성**:
  - `app`: 전역 설정, 스타일, 프로바이더(필수)
  - `processes`: 페이지 간 비즈니스 프로세스(사용되지 않음)
  - `pages`: 라우팅 가능한 화면(필수)
  - `widgets`: 독립적인 UI 블록(선택)
  - `features`: 사용자 상호작용 및 비즈니스 로직(선택)
  - `entities`: 도메인 객체(필수)
  - `shared`: 유틸리티, UI 키트, 상수(필수)
- **규칙**: 상위 계층은 하위 계층에만 의존, 관심사 분리 및 재사용성 강화

#### 3.2 슬라이스 (Slices)
- **설명**: 기능별 코드 분리 (예: `auth`, `cart`, `product-list`)
- **목적**: 독립적인 기능 단위로 모듈화하여 유지보수 및 확장 용이

#### 3.3 세그먼트 (Segments)
- **구성**:
  - `ui`: 컴포넌트
  - `model`: 상태 및 비즈니스 로직
  - `api`: HTTP 요청
  - `lib`: 유틸리티 함수
  - `config`: 설정
- **목적**: 각 기능의 코드를 논리적으로 그룹화, 재사용성 및 가독성 향상

#### 3.4 권장 폴더 구조
```
my-react-app/
├── src/
│   ├── app/
│   │   ├── styles/
│   │   ├── providers/
│   │   └── index.js
│   ├── processes/
│   │   └── auth-flow/
│   │       ├── ui/
│   │       ├── model/
│   │       └── api/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   └── profile/
│   │       ├── ui/
│   │       ├── model/
│   │       └── api/
│   ├── widgets/
│   │   ├── header/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   └── footer/
│   │       ├── ui/
│   │       ├── model/
│   │       └── api/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   └── product-list/
│   │       ├── ui/
│   │       ├── model/
│   │       └── api/
│   ├── entities/
│   │   ├── user/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   ├── post/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── api/
│   │   └── comment/
│   │       ├── ui/
│   │       ├── model/
│   │       └── api/
│   └── shared/
│       ├── ui/
│       ├── api/
│       ├── lib/
│       └── config/
├── package.json
└── README.md
```
- **이점**: 명확한 책임 분리, 확장성, 재사용성, 유지보수성, 협업 용이성

### 4. 주요 라이브러리 및 도구

#### 4.1 상태 관리

##### 4.1.1 React 내장 hook
- **설명**: React에서 제공하는 `useState`와 `useReducer` 훅으로, 컴포넌트 내부에서 로컬 상태를 관리. `useState`는 간단한 상태 관리에, `useReducer`는 복잡한 상태 로직에 적합.
- **설치**: 별도 설치 불필요 (React에 포함).
- **버전**: React 18 이상 권장.
- **사용 예시**:
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
- **이점**: 외부 의존성 없이 간단하고 직관적인 상태 관리, 높은 성능과 빠른 설정.

##### 4.1.2 Zustand
- **설명**: 간단하고 경량화된 전역 상태 관리 라이브러리로, 직관적인 API를 통해 상태를 중앙화하고 관리.
- **설치**: `npm install zustand`
- **버전**: 4.3.8
- **사용 예시**:
```javascript
import create from 'zustand';

// Zustand 스토어 생성
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

// 컴포넌트에서 사용
function Counter() {
  const { count, increment, reset } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
- **이점**: 최소한의 보일러플레이트, React Context 대비 성능 최적화, 간단한 설정.

#### 4.2 CSS 및 스타일링

##### 4.2.1 Styled Components
- **설명**: CSS-in-JS로 컴포넌트 스타일링
- **설치**: `npm install styled-components`
- **버전**: 5.3.10
- **예시**:
```javascript
const Button = styled.button`
  background: blue;
  color: white;
`;
```

##### 4.2.2 Material UI
- **설명**: Material Design 기반 UI 컴포넌트
- **설치**: `npm install @mui/material @emotion/react @emotion/styled`
- **버전**: 5.13.2
- **특징**: 풍부한 컴포넌트와 커스터마이징 가능

##### 4.2.3 Tailwind CSS
- **설명**: 유틸리티 우선 CSS 프레임워크
- **설치**: `npm install -D tailwindcss postcss autoprefixer`
- **버전**: 3.3.2
- **예시**:
```html
<div class="bg-blue-500 text-white p-4">Button</div>
```

## 4.3 라우팅

### 4.3.1 React Router DOM

### 설명
`react-router-dom`은 React로 작성된 SPA(Single Page Application)에서 웹 브라우저 기반의 컴포넌트 라우팅을 제공하는 라이브러리입니다. `react-router`의 코어 기능을 기반으로, 웹 환경에 특화된 기능을 추가하여 URL 관리와 내비게이션을 간편하게 처리합니다. 주요 컴포넌트로는 `<BrowserRouter>`, `<Link>`, `<NavLink>`, `<Routes>` 등이 포함됩니다. 웹 개발에서 표준적으로 사용되며, 페이지 새로고침 없이 동적 라우팅을 구현합니다.

### 설치
특정 버전(7.6.1)을 설치하려면 다음 명령어를 사용하세요:
```bash
npm install react-router-dom@7.6.1
```

### 버전
7.6.1 (사용자가 지정한 버전, 2025년 5월 기준 최신 정보는 [npm](https://www.npmjs.com/package/react-router-dom) 또는 [공식 문서](https://reactrouter.com/)에서 확인하세요)

### 예시
```javascript
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

export default App;
```

### `react-router`와의 차이
- **`react-router`**:
  - React 라우팅의 코어 라이브러리로, 플랫폼에 구애받지 않는 기본 라우팅 로직 제공.
  - 웹, React Native 등 다양한 환경에서 사용 가능.
  - 웹 개발에서는 직접 사용되지 않고, `react-router-dom`에 포함됨.

- **`react-router-dom`**:
  - 웹 애플리케이션 전용으로, `react-router`의 모든 기능을 포함.
  - `<BrowserRouter>`, `<Link>`, `<NavLink>` 등 웹 특화 컴포넌트 제공.
  - `react-router-dom`을 설치하면 `react-router`가 자동으로 포함되므로 별도 설치 불필요.

### 참고
- 웹 개발 시 `react-router-dom`을 사용하는 것이 표준입니다.
- 버전 7.6.1의 상세 API 및 최신 정보는 [React Router 공식 문서](https://reactrouter.com/)를 참고하세요.
- 버전 업그레이드나 호환성 문제는 [공식 업그레이드 가이드](https://reactrouter.com/en/main/upgrading/v6)에서 확인 가능합니다.

## 4.4 데이터 페칭

### 4.4.1 Axios
- **설명**: Axios는 Promise 기반의 HTTP 클라이언트로, 브라우저와 Node.js 환경에서 HTTP 요청을 처리합니다. GET, POST, PUT, DELETE 등의 요청을 간편하게 보내고, 요청/응답 인터셉터, JSON 데이터 자동 변환, 에러 처리 등을 지원합니다.
- **설치**:
  ```bash
  npm install axios@1.7.7
  ```
- **버전**: 1.7.7 (2024년 8월 22일 릴리스, 안정 버전)
- **주요 특징**:
  - Promise 기반 비동기 요청 처리
  - 요청/응답 인터셉터로 데이터 가공 가능
  - 타임아웃 설정 및 에러 처리
  - JSON 데이터 자동 직렬화/역직렬화
- **예시**:
  ```javascript
  import axios from 'axios';

  // GET 요청 예시
  axios.get('/api/users')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error.message));
  ```

### 4.4.2 React Query
- **설명**: React Query(현재 @tanstack/react-query)는 서버 상태 관리와 비동기 데이터 처리를 위한 강력한 라이브러리입니다. 데이터 fetching, 캐싱, 자동 재검증, 쿼리 무효화, 로딩/에러 상태 관리를 간소화하며, DevTools를 통해 디버깅을 지원합니다.
- **설치**:
  - 기본 패키지:
    ```bash
    npm install @tanstack/react-query@5.59.13
    ```
  - 개발 환경용 DevTools (개발 의존성):
    ```bash
    npm install --save-dev @tanstack/react-query-devtools@5.59.13
    ```
- **버전**: 5.59.13 (2025년 5월 20일 릴리스, 안정 버전)
- **주요 특징**:
  - 데이터 캐싱 및 재사용
  - 자동 재검증(refetching) 및 쿼리 무효화
  - 로딩/에러 상태 관리
  - Suspense 및 skipToken 지원
  - TypeScript 친화적, React 18+ 최적화
  - DevTools로 쿼리 상태 시각화 (개발 환경에서만 사용)
- **예시**:
  ```javascript
  import { useQuery } from '@tanstack/react-query';
  import axios from 'axios';

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/users');
    return data;
  };

  function Users() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div>
        {data && data.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    );
  }
  ```

### 4.4.3 Axios + React Query
- **설명**: Axios로 HTTP 요청을 처리하고, React Query로 데이터 캐싱 및 상태 관리를 통합하여 효율적인 데이터 페칭 파이프라인을 구축할 수 있습니다. Axios는 데이터 fetching의 "수단" 역할을, React Query는 데이터 관리와 UI 동기화 역할을 담당합니다.
- **예시**:
  ```javascript
  import { useQuery } from '@tanstack/react-query';
  import axios from 'axios';

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/users');
    return data;
  };

  function Users() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 1000 * 60, // 1분 동안 캐싱
      refetchOnWindowFocus: false, // 창 포커스 시 리패칭 비활성화
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div>
        <h2>Users</h2>
        {data && data.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    );
  }
  ```

### 4.4.4 React Query DevTools 설정
- **설명**: React Query DevTools는 개발 환경에서 쿼리 상태를 시각화하여 디버깅을 돕습니다. 프로덕션 환경에서는 번들 크기 최적화를 위해 포함시키지 않습니다.
- **설치**: 위에서 언급한 대로 `--save-dev` 플래그로 설치.
- **사용 방법**: 개발 환경에서만 조건부로 DevTools를 렌더링하도록 설정합니다.
  ```javascript
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const queryClient = new QueryClient();

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Users />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    );
  }
  ```
- **주의**: `process.env.NODE_ENV`를 확인하여 프로덕션 빌드에서 DevTools가 제외되도록 합니다. 이는 Webpack, Vite 등 빌드 도구에서 자동으로 처리됩니다.

### 4.4.5 추가 고려사항
- **Axios**:
  - 요청 인터셉터를 활용해 인증 토큰 추가 가능:
    ```javascript
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    ```
  - 에러 처리 시 `response.status`를 확인하여 세부적인 에러 핸들링 가능.
- **React Query**:
  - `staleTime`, `cacheTime` 설정으로 캐싱 동작을 최적화.
  - `useMutation`을 활용해 POST, PUT, DELETE 요청 처리 가능:
    ```javascript
    import { useMutation } from '@tanstack/react-query';

    const addUser = async (user) => {
      const { data } = await axios.post('/api/users', user);
      return data;
    };

    const { mutate, isPending } = useMutation({
      mutationFn: addUser,
      onSuccess: () => queryClient.invalidateQueries(['users']),
    });
    ```
- **호환성**:
  - Axios@1.7.7은 모든 현대 브라우저 및 Node.js 환경에서 안정적으로 동작.
  - React Query@5.59.13은 React 18+ 및 TypeScript 4.7+에 최적화.
  - 프로젝트에서 TypeScript 사용 시, 타입 정의를 활용해 안전한 코딩 가능.

### 4.4.6 권장 사항
- **Axios**: HTTP 요청이 많거나 복잡한 경우, 인터셉터를 활용해 공통 로직(예: 인증, 로깅)을 중앙화.
- **React Query**: 캐싱과 리패칭 설정을 프로젝트 요구사항에 맞게 조정. DevTools는 개발 환경에서만 사용하도록 설정.
- **DevTools 최적화**: 프로덕션 빌드에서 `@tanstack/react-query-devtools`가 포함되지 않도록 빌드 설정(Webpack, Vite 등)에서 `process.env.NODE_ENV`를 확인.
- **업그레이드 주의**:
  - Axios는 1.0 이전 버전이므로 마이너 업데이트에서도 호환성 깨짐 가능성 있음. 변경 로그 확인 필수.
  - React Query v5는 v3 대비 API 변경이 있으므로, v3에서 업그레이드 시 공식 문서 확인 권장.

#### 4.5 빌드 및 개발 도구

##### 4.5.1 Vite
- **설명**: 빠른 프론트엔드 빌드 도구
- **설치**: `npm create vite@latest`
- **버전**: 4.3.9
- **특징**: 빠른 개발 서버, 최적화된 빌드

##### 4.5.2 Yarn
- **설명**: 빠르고 안정적인 패키지 관리자
- **설치**: `npm install -g yarn`
- **버전**: 1.22.19
- **이점**: npm 대안, 병렬 설치

##### 4.5.3 Lerna
- **설명**: 모노레포 관리 도구
- **설치**: `npm install -g lerna`
- **버전**: 6.6.2
- **용도**: 다중 패키지 프로젝트 관리

#### 4.6 프레임워크

##### 4.6.1 Next.js
- **설명**: React 기반 프로덕션 프레임워크
- **설치**: `npx create-next-app@latest`
- **버전**: 13.4.4
- **특징**: SSR, SSG, API 라우트 지원

#### 4.7 타입 안전성

##### 4.7.1 TypeScript
- **설명**: JavaScript에 정적 타입 추가
- **설치**: `npm install --save-dev typescript @types/react @types/react-dom`
- **버전**: 5.0.4
- **이점**: 타입 안정성, 개발 생산성 향상

#### 4.8 차트 및 데이터 시각화

##### 4.8.1 ECharts
- **설명**:
  고성능 데이터 시각화 라이브러리로 500+ 컴포넌트 실시간 렌더링에 최적화됨. Canvas 기반 렌더링으로 대규모 데이터 처리와 복잡한 상호작용 지원.

- **설치**:
  `npm install echarts`

- **버전**:
  ECharts v5.6.0

- **특징**:
  - Canvas 기반 렌더링으로 DOM 부하 최소화
  - 실시간 갱신 최적화 (1초 주기 갱신 가능)
  - 내장 상호작용 (툴팁, 줌/팬, 데이터 하이라이트)
  - 50~200% 캔버스 줌 구현 지원

- **선정 이유**:
  - **성능 최적화**: 500개 컴포넌트 동시 렌더링 시 5-10ms 응답 속도
  - **직접 래핑**: 외부 래퍼 대신 직접 구현으로 최신 기능 전량 활용
  - **실시간 처리**: WebSocket + Web Workers 조합으로 1초 갱신 주기 구현
  - **확장성**: 4K 해상도 및 확대/축소(50~200%) 완벽 지원

- **SVG 대신 Canvas 선택 이유**:
  - **대용량 렌더링**: 500+ 컴포넌트 부드러운 처리 (SVG는 DOM 과부하)
  - **실시간 갱신**: 독립적 렌더링 스레드 (SVG는 전체 재계산 필요)
  - **확대/축소**: 비트맵 기반 저지연 줌 구현 (SVG는 벡터 리계산 필요)
  - **메모리 효율**: 대규모 컴포넌트에서 메모리 사용량 최적화

---

## 성능 비교
| 라이브러리          | 500개 성능 | 1초 갱신 | 상호작용 응답 |
|---------------------|------------|----------|---------------|
| ECharts (직접 래핑) | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ (5-10ms) |
| echarts-for-react   | ⭐⭐☆☆☆     | ⭐⭐☆☆☆   | ⭐⭐☆☆☆        |
| Recharts            | ⭐☆☆☆☆     | ⭐☆☆☆☆   | ⭐⭐☆☆☆ (50-100ms) |

---

## 최적화 전략
1. **렌더링 최적화**
   - 가상화: 화면 내 컴포넌트만 렌더링
   - 레이어 분리: 정적/동적 컴포넌트 별도 처리
2. **상호작용 최적화**
   - 이벤트 위임: 내장 이벤트 시스템 활용
   - 오프스크린 렌더링: 백그라운드 처리
3. **데이터 갱신**
   - Web Workers 활용 메인 스레드 보호
   - 증분 업데이트: 변경 데이터만 갱신

---

## 4.9 PWA (Progressive Web App)

### 개념

**PWA(Progressive Web App)**는 웹 기술로 구축되어 앱처럼 동작하는 애플리케이션입니다. 오프라인 지원, 푸시 알림, 홈 화면 설치 등 네이티브 앱의 기능을 웹에서 제공합니다.

### PWA의 핵심 특징

```
✅ Progressive (점진적 향상)
   - 모든 브라우저에서 동작, 최신 브라우저에서 더 많은 기능

✅ Responsive (반응형)
   - 모든 디바이스(데스크톱, 태블릿, 모바일)에서 동작

✅ Connectivity Independent (오프라인 동작)
   - 네트워크 연결이 없거나 불안정해도 동작

✅ App-like (앱과 유사한 경험)
   - 앱 스타일의 인터랙션과 네비게이션

✅ Fresh (항상 최신)
   - Service Worker를 통해 자동 업데이트

✅ Safe (안전)
   - HTTPS로만 제공

✅ Discoverable (검색 가능)
   - manifest.json으로 앱으로 인식

✅ Re-engageable (재참여 가능)
   - 푸시 알림으로 사용자 재유입

✅ Installable (설치 가능)
   - 홈 화면에 추가 가능

✅ Linkable (링크 가능)
   - URL로 쉽게 공유
```

### PWA 설정

#### 1. 패키지 설치

```bash
npm install -D vite-plugin-pwa
npm install workbox-window
```

#### 2. Vite PWA 플러그인 설정

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My React App',
        short_name: 'MyApp',
        description: 'My awesome React PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24시간
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30일
              },
            },
          },
        ],
      },
    }),
  ],
})
```

#### 3. manifest.json 상세 설정

```json
// public/manifest.json (선택적, 플러그인이 자동 생성)
{
  "name": "ODS-MES Monitoring Dashboard",
  "short_name": "ODS-MES",
  "description": "실시간 설비 모니터링 대시보드",
  "theme_color": "#2196f3",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "categories": ["business", "productivity"],
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker 통합

#### 1. Service Worker 등록

```typescript
// src/app/pwa/registerServiceWorker.ts
import { registerSW } from 'virtual:pwa-register'

export function registerServiceWorker() {
  const updateSW = registerSW({
    onNeedRefresh() {
      // 새 버전 사용 가능 알림
      if (confirm('새 버전이 있습니다. 업데이트하시겠습니까?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('앱이 오프라인에서 사용 가능합니다.')
    },
    onRegistered(registration) {
      console.log('Service Worker 등록 완료')

      // 주기적 업데이트 체크 (1시간마다)
      setInterval(() => {
        registration?.update()
      }, 60 * 60 * 1000)
    },
    onRegisterError(error) {
      console.error('Service Worker 등록 실패:', error)
    },
  })
}

// src/main.tsx
import { registerServiceWorker } from './app/pwa/registerServiceWorker'

// 앱 시작 시 Service Worker 등록
if ('serviceWorker' in navigator) {
  registerServiceWorker()
}
```

#### 2. 커스텀 Service Worker (고급)

```typescript
// public/custom-sw.ts
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare let self: ServiceWorkerGlobalScope

// Precache 파일들
precacheAndRoute(self.__WB_MANIFEST)

// API 요청 캐싱 (Network First)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5분
      }),
    ],
  })
)

// 이미지 캐싱 (Cache First)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
      }),
    ],
  })
)

// 정적 자산 (Stale While Revalidate)
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
)
```

### 오프라인 지원

#### 1. 오프라인 페이지

```typescript
// src/pages/OfflinePage/OfflinePage.tsx
export function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="offline-page">
      <div className="offline-icon">📡</div>
      <h1>오프라인입니다</h1>
      <p>인터넷 연결을 확인해주세요.</p>
      <button onClick={handleRetry}>다시 시도</button>
    </div>
  )
}
```

#### 2. 온라인/오프라인 감지

```typescript
// src/shared/lib/network/useOnlineStatus.ts
import { useState, useEffect } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// 사용 예시
function App() {
  const isOnline = useOnlineStatus()

  return (
    <div>
      {!isOnline && (
        <div className="offline-banner">
          ⚠️ 오프라인 모드입니다. 일부 기능이 제한될 수 있습니다.
        </div>
      )}
      <MainContent />
    </div>
  )
}
```

### 앱 설치 프롬프트

#### 1. 설치 가능 감지 및 프롬프트

```typescript
// src/shared/lib/pwa/useInstallPrompt.ts
import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // 이미 설치되었는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('사용자가 앱 설치를 수락했습니다')
    } else {
      console.log('사용자가 앱 설치를 거부했습니다')
    }

    setInstallPrompt(null)
    setIsInstallable(false)
  }

  return { isInstallable, isInstalled, promptInstall }
}

// 사용 예시
function InstallButton() {
  const { isInstallable, promptInstall } = useInstallPrompt()

  if (!isInstallable) return null

  return (
    <button onClick={promptInstall} className="install-button">
      📱 앱 설치하기
    </button>
  )
}
```

### 푸시 알림

#### 1. 푸시 알림 권한 요청

```typescript
// src/shared/lib/pwa/usePushNotifications.ts
import { useState, useEffect } from 'react'

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.')
      return
    }

    const result = await Notification.requestPermission()
    setPermission(result)

    if (result === 'granted') {
      await subscribeToPush()
    }
  }

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.VITE_VAPID_PUBLIC_KEY!
        ),
      })

      setSubscription(sub)

      // 서버에 구독 정보 전송
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
    } catch (error) {
      console.error('푸시 구독 실패:', error)
    }
  }

  const unsubscribe = async () => {
    if (subscription) {
      await subscription.unsubscribe()
      setSubscription(null)

      // 서버에 구독 취소 알림
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      })
    }
  }

  return {
    permission,
    isSubscribed: !!subscription,
    requestPermission,
    unsubscribe,
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
```

#### 2. 로컬 알림 표시

```typescript
// src/shared/lib/pwa/showNotification.ts
export async function showNotification(
  title: string,
  options?: NotificationOptions
) {
  if (!('Notification' in window)) {
    console.warn('이 브라우저는 알림을 지원하지 않습니다.')
    return
  }

  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, {
      body: options?.body || '새로운 알림이 있습니다.',
      icon: options?.icon || '/icons/icon-192x192.png',
      badge: options?.badge || '/icons/badge-72x72.png',
      vibrate: options?.vibrate || [200, 100, 200],
      data: options?.data,
      actions: options?.actions || [
        { action: 'open', title: '열기' },
        { action: 'close', title: '닫기' },
      ],
      ...options,
    })
  }
}

// Service Worker에서 알림 클릭 처리
// public/custom-sw.ts에 추가
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  }
})
```

### 백그라운드 동기화

```typescript
// src/shared/lib/pwa/useBackgroundSync.ts
export function useBackgroundSync() {
  const syncData = async (tag: string, data: any) => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready

        // IndexedDB에 데이터 저장
        await saveToIndexedDB(tag, data)

        // 백그라운드 동기화 등록
        await registration.sync.register(tag)

        console.log('백그라운드 동기화 예약됨:', tag)
      } catch (error) {
        console.error('백그라운드 동기화 실패:', error)
        // 즉시 전송 시도
        await sendDataToServer(data)
      }
    } else {
      // Service Worker 미지원 시 즉시 전송
      await sendDataToServer(data)
    }
  }

  return { syncData }
}

// Service Worker에서 동기화 처리
// public/custom-sw.ts에 추가
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncPendingData())
  }
})

async function syncPendingData() {
  const data = await getFromIndexedDB('pending-data')

  try {
    await fetch('/api/sync', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    await deleteFromIndexedDB('pending-data')
  } catch (error) {
    console.error('동기화 실패:', error)
    // 다음에 다시 시도
  }
}
```

### 베스트 프랙티스

**1. HTTPS 필수**
```
PWA는 HTTPS에서만 동작합니다 (localhost 제외)
→ 배포 시 SSL 인증서 필수
```

**2. 적절한 캐싱 전략**
```typescript
// ✅ API: Network First (최신 데이터 우선)
// ✅ 이미지: Cache First (빠른 로딩)
// ✅ 정적 자산: Stale While Revalidate (빠르면서도 최신 유지)
```

**3. 오프라인 UX**
```typescript
// ✅ 오프라인 상태 명확히 표시
// ✅ 오프라인에서도 핵심 기능 제공
// ✅ 온라인 복귀 시 자동 동기화
```

**4. 설치 프롬프트 타이밍**
```typescript
// ❌ 즉시 설치 프롬프트 표시
// ✅ 사용자가 앱 가치를 경험한 후 (예: 3번 방문 후)

const visitCount = Number(localStorage.getItem('visitCount') || 0) + 1
localStorage.setItem('visitCount', String(visitCount))

if (visitCount >= 3 && isInstallable) {
  promptInstall()
}
```

**5. 성능 최적화**
```typescript
// ✅ 필요한 파일만 precache
// ✅ 이미지 최적화 (WebP, lazy loading)
// ✅ 코드 분할 (React.lazy)
```
