# I. Workspace 아키텍처 가이드 (팀 표준 구조)

## 목차
1. [Workspace 개요](#1-workspace-개요)
   - 1.1 [Workspace란?](#11-workspace란)
   - 1.2 [구조 철학](#12-구조-철학)
   - 1.3 [FSD 아키텍처 기반](#13-fsd-아키텍처-기반)
2. [Workspace 관리 방식](#2-workspace-관리-방식)
   - 2.1 [Monorepo vs Multirepo](#21-monorepo-vs-multirepo)
   - 2.2 [Monorepo 구성](#22-monorepo-구성)
   - 2.3 [Multirepo 구성](#23-multirepo-구성)
3. [전체 구조 및 네이밍 컨벤션](#3-전체-구조-및-네이밍-컨벤션)
   - 3.1 [워크스페이스 폴더 구조](#31-워크스페이스-폴더-구조)
   - 3.2 [네이밍 규칙](#32-네이밍-규칙)
   - 3.3 [실제 구조 예시](#33-실제-구조-예시)
4. [표준 앱 구조 템플릿](#4-표준-앱-구조-템플릿)
   - 4.1 [FSD 기반 폴더 구조](#41-fsd-기반-폴더-구조)
   - 4.2 [필수 구성 요소](#42-필수-구성-요소)
   - 4.3 [파일 및 설정](#43-파일-및-설정)
5. [공통 모듈(Packages) 설계](#5-공통-모듈packages-설계)
   - 5.1 [공통 모듈 분류](#51-공통-모듈-분류)
   - 5.2 [추출 기준](#52-추출-기준)
   - 5.3 [의존성 규칙](#53-의존성-규칙)
6. [새 서비스 추가 가이드](#6-새-서비스-추가-가이드)
   - 6.1 [서비스 추가 프로세스](#61-서비스-추가-프로세스)
   - 6.2 [체크리스트](#62-체크리스트)
   - 6.3 [커스터마이징](#63-커스터마이징)
7. [빌드 및 배포](#7-빌드-및-배포)
   - 7.1 [개발 환경 설정](#71-개발-환경-설정)
   - 7.2 [빌드 전략](#72-빌드-전략)
   - 7.3 [배포 전략](#73-배포-전략)

---

## 1. Workspace 개요

### 1.1 Workspace란?

**Workspace**는 여러 개의 React 서비스와 공통 모듈을 체계적으로 관리하는 구조입니다.

```
react-workspace/
├── apps/                    # 실제 서비스들
│   ├── monitoring/
│   ├── datasource/
│   └── admin/
└── packages/                # 공통 모듈들
    ├── ui/
    ├── api/
    └── utils/
```

### 1.2 구조 철학

#### 핵심 원칙

**1. 공통화 (Commonality)**
```typescript
// ❌ 각 서비스마다 중복
apps/monitoring/src/components/Button.tsx
apps/datasource/src/components/Button.tsx
apps/admin/src/components/Button.tsx

// ✅ 공통 모듈로 관리
packages/ui/src/Button.tsx
apps/monitoring → import from '@workspace/ui'
apps/datasource → import from '@workspace/ui'
apps/admin → import from '@workspace/ui'
```

**2. 일관성 (Consistency)**
```
모든 서비스가 동일한 구조를 따름:
- 동일한 폴더 구조 (FSD)
- 동일한 네이밍 규칙
- 동일한 개발 방식
```

**3. 재사용성 (Reusability)**
```typescript
// 한 번 작성하면 모든 서비스에서 사용
packages/api/src/useQuery.ts
packages/auth/src/AuthProvider.tsx
packages/utils/src/formatDate.ts
```

### 1.3 FSD 아키텍처 기반

우리 팀의 모든 서비스는 **Feature Sliced Design(FSD)** 아키텍처를 따릅니다.

```
apps/{service-name}/src/
├── app/         # 애플리케이션 설정 (providers, router, layout)
├── pages/       # 라우팅 페이지
├── widgets/     # 복합 UI 블록
├── features/    # 사용자 기능
├── entities/    # 도메인 엔티티
└── shared/      # 프로젝트 전용 공통 코드
```

> **FSD 상세 설명은 [02-project-structure.md](./02-project-structure.md)를 참조하세요.**

---

## 2. Workspace 관리 방식

### 2.1 Monorepo vs Multirepo

#### Monorepo (추천)

**하나의 저장소에서 모든 서비스와 모듈 관리**

```
✅ 장점:
- 코드 재사용 용이
- 일관된 버전 관리
- 원자적 커밋 가능
- 통합 빌드/테스트

❌ 단점:
- 저장소 크기 증가
- 빌드 시간 증가 (캐싱으로 해결)
```

```bash
# 하나의 커밋으로 여러 서비스 동시 업데이트
git commit -m "feat: Button 컴포넌트 disabled 속성 추가"
  - packages/ui/src/Button.tsx (수정)
  - apps/monitoring (자동 반영)
  - apps/datasource (자동 반영)
```

#### Multirepo

**각 서비스와 모듈을 별도 저장소로 관리**

```
✅ 장점:
- 독립적인 버전 관리
- 명확한 권한 분리
- 작은 저장소 크기

❌ 단점:
- 공통 모듈 관리 복잡
- 버전 동기화 어려움
- 중복 코드 발생 가능
```

```bash
github.com/company/workspace-ui
github.com/company/workspace-api
github.com/company/app-monitoring
github.com/company/app-datasource
```

### 2.2 Monorepo 구성

#### 도구 선택

**Turborepo + pnpm (추천)**

```bash
# pnpm: 빠르고 디스크 효율적인 패키지 매니저
# Turborepo: 고성능 빌드 시스템

# 디스크 사용량 비교 (100개 프로젝트)
npm:  10GB
yarn: 8GB
pnpm: 1GB  ⭐

# 빌드 속도
일반 빌드: 60초
Turborepo 캐싱: 0.3초  ⭐
```

#### Workspace 설정

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// package.json (루트)
{
  "name": "frontend-web-react",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

#### Turborepo 설정

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    }
  }
}
```

### 2.3 Multirepo 구성

#### NPM Private Registry 활용

```bash
# 공통 모듈을 NPM Registry에 배포
npm publish @company/ui
npm publish @company/api

# 각 서비스에서 설치
npm install @company/ui@1.0.0
npm install @company/api@1.0.0
```

#### 버전 관리

```json
// 각 서비스의 package.json
{
  "dependencies": {
    "@company/ui": "^1.0.0",      // 버전 명시
    "@company/api": "^2.0.0"
  }
}
```

---

## 3. 전체 구조 및 네이밍 컨벤션

### 3.1 워크스페이스 폴더 구조

```
react-workspace/
├── apps/                              # 🎯 실제 서비스들
│   ├── monitoring/                    # 데이터 모니터링 서비스
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── providers/
│   │   │   │   ├── layout/
│   │   │   │   └── router/
│   │   │   ├── pages/
│   │   │   ├── widgets/
│   │   │   ├── features/
│   │   │   ├── entities/
│   │   │   └── shared/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── datasource/                    # 데이터소스 관리 서비스
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── pages/
│   │   │   ├── widgets/
│   │   │   ├── features/
│   │   │   ├── entities/
│   │   │   └── shared/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── admin/                         # 관리자 서비스
│       └── ...
│
├── packages/                          # 📦 공통 모듈들
│   ├── ui/                            # UI 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/                           # API 클라이언트
│   │   ├── src/
│   │   │   ├── client/                # Axios 설정
│   │   │   ├── hooks/                 # React Query 훅
│   │   │   └── types/
│   │   └── package.json
│   │
│   ├── auth/                          # 인증 모듈
│   │   ├── src/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── useAuth.ts
│   │   │   └── types.ts
│   │   └── package.json
│   │
│   ├── utils/                         # 유틸리티 함수
│   │   ├── src/
│   │   │   ├── date/
│   │   │   ├── string/
│   │   │   ├── validation/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── types/                         # 공통 TypeScript 타입
│   │   ├── src/
│   │   │   ├── entities/
│   │   │   ├── api/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/                        # 공통 설정
│       ├── eslint-config/
│       ├── typescript-config/
│       └── vite-config/
│
├── package.json                       # 루트 package.json
├── pnpm-workspace.yaml                # Workspace 설정
├── turbo.json                         # Turborepo 설정
├── tsconfig.json                      # 루트 TypeScript 설정
├── .gitignore
└── README.md
```

### 3.2 네이밍 규칙

#### 서비스(Apps) 네이밍

```
apps/{service-name}/

규칙:
- 소문자, 하이픈 구분
- 간결하고 명확한 이름
- 접두사 불필요 (이미 apps/ 디렉토리 안에 있음)

✅ 좋은 예:
apps/monitoring/
apps/datasource/
apps/admin/
apps/dashboard/

❌ 나쁜 예:
apps/react-app-monitoring/           # 불필요한 접두사
apps/data-monitoring-service/        # 너무 장황
apps/Monitoring/                      # 대문자 사용
```

#### 공통 모듈(Packages) 네이밍

```
packages/{module-name}/

규칙:
- 소문자, 하이픈 구분 (선택)
- 기능을 명확히 표현
- 접두사 불필요

✅ 좋은 예:
packages/ui/
packages/api/
packages/auth/
packages/utils/
packages/types/

❌ 나쁜 예:
packages/shared-ui/                  # 불필요한 shared 접두사
packages/react-module-ui/            # 불필요한 react-module 접두사
```

#### Package.json Name

```json
// Monorepo (workspace protocol)
{
  "name": "@workspace/monitoring",     // 서비스
  "name": "@workspace/ui"              // 모듈
}

// Multirepo (npm publish)
{
  "name": "@company/monitoring",
  "name": "@company/ui"
}
```

### 3.3 실제 구조 예시

```
frontend-web-react/
├── apps/
│   ├── monitoring/                    # @workspace/monitoring
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── providers/
│   │   │   │   │   ├── WebSocketProvider.tsx
│   │   │   │   │   └── NotificationProvider.tsx
│   │   │   │   ├── layout/
│   │   │   │   │   ├── MonitoringLayout.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   └── Sidebar.tsx
│   │   │   │   └── router/
│   │   │   │       └── index.tsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage/
│   │   │   │   ├── RealtimeMonitorPage/
│   │   │   │   └── AlertsPage/
│   │   │   ├── widgets/
│   │   │   │   ├── RealtimeChart/
│   │   │   │   ├── MetricCard/
│   │   │   │   └── AlertList/
│   │   │   ├── features/
│   │   │   │   ├── data-visualization/
│   │   │   │   ├── alert-management/
│   │   │   │   └── data-export/
│   │   │   ├── entities/
│   │   │   │   ├── metric/
│   │   │   │   ├── datasource/
│   │   │   │   └── alert/
│   │   │   └── shared/
│   │   │       ├── ui/
│   │   │       ├── lib/
│   │   │       └── config/
│   │   └── package.json
│   │
│   └── datasource/                    # @workspace/datasource
│       ├── src/
│       │   ├── app/
│       │   │   ├── providers/
│       │   │   ├── layout/
│       │   │   └── router/
│       │   ├── pages/
│       │   │   ├── SourceListPage/
│       │   │   ├── SourceDetailPage/
│       │   │   └── CreateSourcePage/
│       │   ├── widgets/
│       │   │   ├── SourceCard/
│       │   │   ├── ConnectionForm/
│       │   │   └── TestResultPanel/
│       │   ├── features/
│       │   │   ├── source-management/
│       │   │   ├── connection-test/
│       │   │   └── schedule-config/
│       │   ├── entities/
│       │   │   ├── datasource/
│       │   │   ├── connection/
│       │   │   └── schedule/
│       │   └── shared/
│       └── package.json
│
└── packages/
    ├── ui/                            # @workspace/ui
    ├── api/                           # @workspace/api
    ├── auth/                          # @workspace/auth
    ├── utils/                         # @workspace/utils
    └── types/                         # @workspace/types
```

---

## 4. 표준 앱 구조 템플릿

### 4.1 FSD 기반 폴더 구조

모든 서비스는 동일한 FSD 구조를 따릅니다.

```
apps/{service-name}/
├── src/
│   ├── app/                           # 애플리케이션 레이어 (필수)
│   │   ├── providers/                 # Context Providers
│   │   │   ├── QueryProvider.tsx     # React Query
│   │   │   ├── AuthProvider.tsx      # 인증 (재export)
│   │   │   └── ThemeProvider.tsx     # 테마
│   │   │
│   │   ├── layout/                    # 레이아웃 컴포넌트
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── router/                    # 라우팅 설정
│   │   │   └── index.tsx
│   │   │
│   │   ├── styles/                    # 전역 스타일
│   │   │   └── global.css
│   │   │
│   │   └── App.tsx                    # 루트 컴포넌트
│   │
│   ├── pages/                         # 페이지 레이어 (필수)
│   │   ├── DashboardPage/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── index.ts
│   │   │   └── DashboardPage.test.tsx
│   │   ├── ListPage/
│   │   └── DetailPage/
│   │
│   ├── widgets/                       # 위젯 레이어 (선택)
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── index.ts
│   │   │   └── Header.module.css
│   │   ├── StatsCard/
│   │   └── DataTable/
│   │
│   ├── features/                      # 기능 레이어 (선택)
│   │   ├── user-authentication/
│   │   │   ├── ui/                    # UI 컴포넌트
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── model/                 # 비즈니스 로직
│   │   │   │   └── useAuth.ts
│   │   │   └── api/                   # API 호출
│   │   │       └── authApi.ts
│   │   ├── data-export/
│   │   └── notification-settings/
│   │
│   ├── entities/                      # 엔티티 레이어 (필수)
│   │   ├── user/
│   │   │   ├── model/
│   │   │   │   ├── types.ts
│   │   │   │   └── useUser.ts
│   │   │   ├── ui/
│   │   │   │   └── UserCard.tsx
│   │   │   └── api/
│   │   │       └── userApi.ts
│   │   ├── product/
│   │   └── order/
│   │
│   └── shared/                        # 공유 레이어 (필수)
│       ├── ui/                        # 프로젝트 전용 UI
│       │   └── CustomButton.tsx
│       ├── lib/                       # 프로젝트 전용 유틸
│       │   └── formatters.ts
│       ├── config/                    # 환경 설정
│       │   ├── env.ts
│       │   └── constants.ts
│       └── api/                       # API 기본 설정
│           └── client.ts
│
├── public/                            # 정적 파일
│   ├── assets/
│   └── favicon.ico
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env
```

**레이어 구성 참고:**
- **필수 레이어**: `app`, `pages`, `entities`, `shared` - 모든 프로젝트에 반드시 필요
- **선택 레이어**: `widgets`, `features` - 프로젝트 복잡도에 따라 선택적으로 사용
- 간단한 프로젝트는 `app` + `pages` + `shared`만으로도 충분
- 복잡한 프로젝트는 모든 레이어 활용

### 4.2 필수 구성 요소

#### App.tsx (진입점)

```typescript
// src/app/App.tsx
import { QueryProvider } from './providers/QueryProvider'
import { AuthProvider } from '@workspace/auth'
import { AppRouter } from './router'
import './styles/global.css'

export function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  )
}
```

#### Router 설정

```typescript
// src/app/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { ListPage } from '@/pages/ListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'list', element: <ListPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
```

#### Layout 컴포넌트

```typescript
// src/app/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
```

### 4.3 파일 및 설정

#### package.json

```json
{
  "name": "@workspace/monitoring",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.6.1",

    "@workspace/ui": "workspace:*",
    "@workspace/api": "workspace:*",
    "@workspace/auth": "workspace:*",
    "@workspace/utils": "workspace:*",
    "@workspace/types": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vitest": "^2.1.1"
  }
}
```

#### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
```

#### tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui": ["../../packages/ui/src"],
      "@workspace/api": ["../../packages/api/src"],
      "@workspace/auth": ["../../packages/auth/src"],
      "@workspace/utils": ["../../packages/utils/src"],
      "@workspace/types": ["../../packages/types/src"]
    }
  },
  "include": ["src"]
}
```

#### .env

```bash
# 환경 변수
VITE_APP_NAME=Monitoring Service
VITE_API_BASE_URL=https://api.example.com
VITE_WS_URL=wss://ws.example.com
```

---

## 5. 공통 모듈(Packages) 설계

### 5.1 공통 모듈 분류

```
packages/
├── ui/                    # UI 컴포넌트 라이브러리
├── api/                   # API 클라이언트 & React Query
├── auth/                  # 인증 모듈
├── utils/                 # 유틸리티 함수
├── types/                 # 공통 TypeScript 타입
└── config/                # 공통 설정 (ESLint, TS 등)
```

#### ui/ - UI 컴포넌트

```
packages/ui/
├── src/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   ├── Table/
│   └── index.ts              # 전체 export
└── package.json
```

```typescript
// packages/ui/src/Button/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

#### api/ - API 클라이언트

```
packages/api/
├── src/
│   ├── client/
│   │   ├── axios.ts           # Axios 인스턴스
│   │   └── interceptors.ts    # 인터셉터
│   ├── hooks/
│   │   ├── useQuery.ts        # React Query 래퍼
│   │   └── useMutation.ts
│   └── index.ts
└── package.json
```

```typescript
// packages/api/src/client/axios.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 처리
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

#### auth/ - 인증 모듈

```
packages/auth/
├── src/
│   ├── AuthProvider.tsx
│   ├── useAuth.ts
│   ├── types.ts
│   └── index.ts
└── package.json
```

```typescript
// packages/auth/src/AuthProvider.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // 로그인 로직
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    setUser(data.user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

#### utils/ - 유틸리티

```
packages/utils/
├── src/
│   ├── date/
│   │   ├── formatDate.ts
│   │   └── parseDate.ts
│   ├── string/
│   │   ├── capitalize.ts
│   │   └── truncate.ts
│   ├── validation/
│   │   ├── isEmail.ts
│   │   └── isUrl.ts
│   └── index.ts
└── package.json
```

```typescript
// packages/utils/src/date/formatDate.ts
export function formatDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}
```

#### types/ - 공통 타입

```
packages/types/
├── src/
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── api/
│   │   ├── Request.ts
│   │   └── Response.ts
│   ├── common/
│   │   ├── Pagination.ts
│   │   └── ApiError.ts
│   └── index.ts
└── package.json
```

```typescript
// packages/types/src/entities/User.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

// packages/types/src/common/Pagination.ts
export interface Pagination<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
```

### 5.2 추출 기준

#### 언제 공통 모듈로 추출할 것인가?

**Rule of Three (3번 규칙)**

```typescript
// ❌ 한 곳에서만 사용 → 추출하지 않음
apps/monitoring/src/shared/ui/CustomButton.tsx

// ❌ 두 곳에서 사용 → 아직 추출하지 않음
apps/monitoring/src/shared/ui/CustomButton.tsx
apps/datasource/src/shared/ui/CustomButton.tsx

// ✅ 세 곳 이상에서 사용 → 공통 모듈로 추출
packages/ui/src/Button/Button.tsx
apps/monitoring → import from '@workspace/ui'
apps/datasource → import from '@workspace/ui'
apps/admin → import from '@workspace/ui'
```

#### 추출 판단 기준

```
1. 재사용성
   - 3개 이상의 서비스에서 사용하는가?
   - 앞으로도 계속 사용될 가능성이 높은가?

2. 안정성
   - 인터페이스가 안정적인가?
   - 자주 변경되지 않는가?

3. 독립성
   - 특정 서비스에 종속되지 않는가?
   - 다른 서비스에서도 사용 가능한가?

✅ 공통 모듈로 추출:
- Button, Input, Modal 등 UI 컴포넌트
- formatDate, capitalize 등 유틸리티
- User, Product 등 공통 타입
- AuthProvider, API Client

❌ 서비스 내부에 유지:
- 특정 서비스만의 비즈니스 로직
- 한두 곳에서만 사용하는 컴포넌트
- 자주 변경되는 코드
```

### 5.3 의존성 규칙

#### 계층 규칙 (FSD)

```typescript
// ✅ 올바른 의존성 방향
apps/monitoring
  → packages/ui
  → packages/api
  → packages/auth

packages/ui
  → packages/utils
  → packages/types

// ❌ 잘못된 의존성 방향
packages/ui
  → apps/monitoring  // 에러! 공통 모듈은 서비스를 참조할 수 없음

packages/utils
  → packages/ui      // 에러! 하위 레벨이 상위 레벨 참조
```

#### 순환 참조 금지

```typescript
// ❌ 순환 참조
packages/ui → packages/utils → packages/ui  // 금지!

// ✅ 단방향 의존성
packages/ui → packages/utils
packages/api → packages/utils
packages/auth → packages/utils
```

#### Peer Dependencies 사용

```json
// packages/ui/package.json
{
  "name": "@workspace/ui",
  "peerDependencies": {
    "react": "^18.3.1",         // 앱에서 제공
    "react-dom": "^18.3.1"      // 중복 설치 방지
  },
  "dependencies": {
    "clsx": "^2.0.0"            // 내부 의존성만
  }
}
```

---

## 6. 새 서비스 추가 가이드

### 6.1 서비스 추가 프로세스

#### 1단계: 프로젝트 생성

```bash
# 새 앱 디렉토리 생성
mkdir apps/new-service
cd apps/new-service

# Vite 프로젝트 생성
pnpm create vite@latest . --template react-ts

# 또는 기존 서비스 복사 (추천)
cp -r apps/monitoring apps/new-service
```

#### 2단계: package.json 설정

```json
{
  "name": "@workspace/new-service",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.6.1",

    // 공통 모듈 연결
    "@workspace/ui": "workspace:*",
    "@workspace/api": "workspace:*",
    "@workspace/auth": "workspace:*",
    "@workspace/utils": "workspace:*",
    "@workspace/types": "workspace:*"
  }
}
```

#### 3단계: 폴더 구조 생성

```bash
# FSD 구조 생성
mkdir -p src/app/{providers,layout,router}
mkdir -p src/pages
mkdir -p src/widgets
mkdir -p src/features
mkdir -p src/entities
mkdir -p src/shared/{ui,lib,config}
```

#### 4단계: 기본 파일 생성

```typescript
// src/app/App.tsx
import { QueryProvider } from './providers/QueryProvider'
import { AuthProvider } from '@workspace/auth'
import { AppRouter } from './router'

export function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  )
}

// src/app/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
```

#### 5단계: 의존성 설치 및 실행

```bash
# 루트로 이동
cd ../..

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm --filter @workspace/new-service dev
```

### 6.2 체크리스트

#### 새 서비스 생성 체크리스트

```markdown
## 프로젝트 생성
- [ ] apps/{service-name} 디렉토리 생성
- [ ] package.json 작성 (@workspace/{service-name})
- [ ] FSD 폴더 구조 생성

## 기본 설정
- [ ] App.tsx 작성
- [ ] Router 설정
- [ ] Layout 컴포넌트 작성
- [ ] vite.config.ts 설정
- [ ] tsconfig.json 설정
- [ ] .env 파일 생성

## 공통 모듈 연결
- [ ] @workspace/ui 추가
- [ ] @workspace/api 추가
- [ ] @workspace/auth 추가
- [ ] @workspace/utils 추가
- [ ] @workspace/types 추가

## Providers 설정
- [ ] QueryProvider (React Query)
- [ ] AuthProvider (인증)
- [ ] ThemeProvider (선택)
- [ ] NotificationProvider (선택)

## 개발 환경
- [ ] pnpm install 실행
- [ ] pnpm dev 실행 테스트
- [ ] 공통 모듈 import 테스트

## 배포 준비
- [ ] 빌드 테스트 (pnpm build)
- [ ] 환경 변수 설정
- [ ] Docker/Vercel 설정 (필요시)
```

### 6.3 커스터마이징

#### 서비스별 브랜딩

```typescript
// src/shared/config/branding.ts
export const branding = {
  serviceName: 'New Service',
  logo: '/assets/logo.svg',
  primaryColor: '#1976d2',
  favicon: '/assets/favicon.ico',
}
```

#### 기능 플래그

```typescript
// src/shared/config/features.ts
export const features = {
  enableDarkMode: true,
  enableNotifications: true,
  enableExport: false,
}

// 사용
import { features } from '@/shared/config/features'

function SettingsPage() {
  return (
    <div>
      {features.enableDarkMode && <DarkModeToggle />}
      {features.enableNotifications && <NotificationSettings />}
    </div>
  )
}
```

#### 환경별 설정

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8001

# .env.production
VITE_API_BASE_URL=https://api.production.com
VITE_WS_URL=wss://ws.production.com
```

---

## 7. 빌드 및 배포

### 7.1 개발 환경 설정

#### 초기 설정 (Monorepo)

```bash
# 1. pnpm 설치
npm install -g pnpm@9.0.0

# 2. 워크스페이스 클론
git clone <repository>
cd frontend-web-react

# 3. 의존성 설치
pnpm install

# 4. 개발 서버 실행
pnpm dev                                    # 모든 서비스
pnpm --filter @workspace/monitoring dev     # 특정 서비스만
```

#### 워크스페이스 명령어

```bash
# 모든 서비스 개발 서버 실행
pnpm dev

# 특정 서비스 실행
pnpm --filter @workspace/monitoring dev
pnpm --filter @workspace/datasource dev

# 여러 서비스 동시 실행
pnpm --filter @workspace/monitoring --filter @workspace/datasource dev

# 공통 모듈만 빌드
pnpm --filter "./packages/*" build

# 특정 서비스와 의존 모듈 빌드
pnpm --filter @workspace/monitoring... build
```

### 7.2 빌드 전략

#### Turborepo 캐싱

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],       // 의존 패키지 먼저 빌드
      "outputs": ["dist/**"],        // 캐시 대상
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    }
  }
}
```

#### 빌드 실행

```bash
# 첫 번째 빌드
$ pnpm build
Building @workspace/ui... (5s)
Building @workspace/api... (3s)
Building @workspace/monitoring... (10s)
✓ Total: 18s

# 캐시 활용 (코드 변경 없을 때)
$ pnpm build
Cache hit: @workspace/ui... (0.1s)
Cache hit: @workspace/api... (0.1s)
Cache hit: @workspace/monitoring... (0.1s)
✓ Total: 0.3s  ⚡

# 특정 모듈만 변경 후 빌드
$ pnpm build
Building @workspace/ui... (5s)           # 재빌드
Cache hit: @workspace/api... (0.1s)
Building @workspace/monitoring... (10s)  # ui 의존하므로 재빌드
✓ Total: 15.1s
```

#### 증분 빌드

```bash
# 변경된 패키지만 빌드
git diff main...HEAD

# ui 모듈만 수정됨
pnpm build --filter=...[HEAD~1]
# → ui와 ui를 의존하는 서비스만 빌드
```

### 7.3 배포 전략

#### Vercel 배포

```json
// apps/monitoring/vercel.json
{
  "buildCommand": "cd ../.. && pnpm turbo run build --filter=@workspace/monitoring",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_BASE_URL": "https://api.example.com"
  }
}
```

#### Docker 배포

```dockerfile
# apps/monitoring/Dockerfile
FROM node:20-alpine AS builder

# pnpm 설치
RUN npm install -g pnpm@9.0.0

WORKDIR /app

# 워크스페이스 파일 복사
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages packages
COPY apps/monitoring apps/monitoring

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 빌드
RUN pnpm --filter @workspace/monitoring build

# 프로덕션 이미지
FROM nginx:alpine
COPY --from=builder /app/apps/monitoring/dist /usr/share/nginx/html
COPY apps/monitoring/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9.0.0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm turbo run build

      - name: Test
        run: pnpm turbo run test

  deploy-monitoring:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: |
          pnpm turbo run build --filter=@workspace/monitoring
          vercel deploy --prod
```

---

## 요약

### 핵심 포인트

1. **Workspace 구조**
   - apps/: 실제 서비스들
   - packages/: 공통 모듈들

2. **네이밍 규칙**
   - 서비스: apps/{service-name}
   - 모듈: packages/{module-name}
   - 패키지: @workspace/{name}

3. **표준 앱 구조**
   - FSD 아키텍처 기반
   - app, pages, widgets, features, entities, shared

4. **공통화 전략**
   - Rule of Three (3번 규칙)
   - 재사용성, 안정성, 독립성 판단

5. **새 서비스 추가**
   - 표준 템플릿 복사
   - 공통 모듈 연결
   - 체크리스트 활용

6. **빌드 최적화**
   - Turborepo 캐싱
   - 병렬 빌드
   - 증분 빌드

### 다음 단계

- [05-shared-modules-guide.md](./05-shared-modules-guide.md) - 공통 모듈 상세 개발 가이드

---

## 참조

- [Turborepo 공식 문서](https://turbo.build/)
- [pnpm Workspace 가이드](https://pnpm.io/workspaces)
- [Feature Sliced Design](https://feature-sliced.design/)
- [Vite 공식 문서](https://vitejs.dev/)
