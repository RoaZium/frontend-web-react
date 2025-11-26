# V. 공통 모듈 개발 가이드

## 목차
1. [공통 모듈 개요](#1-공통-모듈-개요)
   - 1.1 [공통 모듈이란?](#11-공통-모듈이란)
   - 1.2 [언제 공통 모듈로 만들까?](#12-언제-공통-모듈로-만들까)
   - 1.3 [공통 모듈 설계 원칙](#13-공통-모듈-설계-원칙)
2. [shared-ui: UI 컴포넌트 라이브러리](#2-shared-ui-ui-컴포넌트-라이브러리)
   - 2.1 [구조 및 설정](#21-구조-및-설정)
   - 2.2 [컴포넌트 작성 규칙](#22-컴포넌트-작성-규칙)
   - 2.3 [Storybook 연동](#23-storybook-연동)
   - 2.4 [테스트 작성](#24-테스트-작성)
3. [shared-api: API 클라이언트](#3-shared-api-api-클라이언트)
   - 3.1 [Axios 설정](#31-axios-설정)
   - 3.2 [React Query 통합](#32-react-query-통합)
   - 3.3 [API 엔드포인트 정의](#33-api-엔드포인트-정의)
   - 3.4 [에러 처리](#34-에러-처리)
4. [shared-auth: 인증 모듈](#4-shared-auth-인증-모듈)
   - 4.1 [AuthProvider 구현](#41-authprovider-구현)
   - 4.2 [useAuth 훅](#42-useauth-훅)
   - 4.3 [토큰 관리](#43-토큰-관리)
   - 4.4 [Protected Route](#44-protected-route)
5. [shared-utils: 유틸리티 함수](#5-shared-utils-유틸리티-함수)
   - 5.1 [날짜 유틸리티](#51-날짜-유틸리티)
   - 5.2 [문자열 유틸리티](#52-문자열-유틸리티)
   - 5.3 [유효성 검사](#53-유효성-검사)
6. [shared-types: 공통 타입](#6-shared-types-공통-타입)
   - 6.1 [도메인 엔티티 (DDD)](#61-도메인-엔티티-ddd)
   - 6.2 [API 타입](#62-api-타입)
   - 6.3 [공통 타입](#63-공통-타입)
7. [shared-config: 공통 설정](#7-shared-config-공통-설정)
   - 7.1 [ESLint 설정](#71-eslint-설정)
   - 7.2 [TypeScript 설정](#72-typescript-설정)
   - 7.3 [Vite 설정](#73-vite-설정)
8. [패키지 버전 관리](#8-패키지-버전-관리)
   - 8.1 [시맨틱 버저닝](#81-시맨틱-버저닝)
   - 8.2 [Changeset 사용](#82-changeset-사용)
   - 8.3 [배포 전략](#83-배포-전략)

---

## 1. 공통 모듈 개요

### 1.1 공통 모듈이란?

**공통 모듈**은 여러 프로젝트에서 재사용 가능한 독립적인 패키지입니다.

```
❌ 각 프로젝트마다 중복 코드
apps/ods-mes/src/components/Button.tsx
apps/admin-portal/src/components/Button.tsx
apps/customer-dashboard/src/components/Button.tsx

✅ 공통 모듈로 한 곳에서 관리
packages/shared-ui/src/Button/Button.tsx
  ↓ import
apps/ods-mes → @mycompany/shared-ui
apps/admin-portal → @mycompany/shared-ui
apps/customer-dashboard → @mycompany/shared-ui
```

### 1.2 언제 공통 모듈로 만들까?

#### ✅ 공통 모듈로 만들어야 할 때

**1. 3회 이상 반복되는 코드 (Rule of Three)**
```typescript
// ❌ 3개 프로젝트에서 동일한 formatDate 함수 복사
// ✅ shared-utils로 추출
```

**2. 도메인 무관한 범용 기능**
```typescript
// ✅ 공통 모듈로 적합
- Button, Input 같은 기본 UI 컴포넌트
- API 클라이언트 (Axios, React Query)
- 날짜, 문자열 유틸리티
- 인증 로직

// ❌ 공통 모듈로 부적합
- 특정 프로젝트 전용 비즈니스 로직
- 프로젝트 특화 페이지 컴포넌트
```

**3. 일관성이 중요한 요소**
```typescript
// ✅ 모든 프로젝트에서 동일해야 하는 것들
- 디자인 시스템 (색상, 타이포그래피)
- API 에러 처리 방식
- 인증 플로우
```

#### ❌ 공통 모듈로 만들지 말아야 할 때

**1. 프로젝트 특화 기능**
```typescript
// ❌ ODS-MES 전용 설비 제어 로직
apps/ods-mes/src/features/equipment-control/

// 이건 shared-* 패키지가 아닌 apps/ods-mes 내부에 위치
```

**2. 아직 안정화되지 않은 코드**
```typescript
// ❌ 실험적 기능, 자주 변경되는 코드
// ✅ 프로젝트 내에서 충분히 검증 후 공통 모듈로 추출
```

**3. 외부 의존성이 많은 코드**
```typescript
// ❌ 너무 많은 외부 라이브러리에 의존
// → 공통 모듈이 무거워짐
```

### 1.3 공통 모듈 설계 원칙

#### 1. 단일 책임 원칙 (SRP)
```typescript
// ✅ 각 패키지는 하나의 명확한 목적
shared-ui      → UI 컴포넌트만
shared-api     → API 통신만
shared-auth    → 인증만

// ❌ 여러 책임을 한 패키지에
shared-everything → UI + API + 인증 (비추천)
```

#### 2. 의존성 최소화
```typescript
// ✅ Peer Dependencies 활용
{
  "peerDependencies": {
    "react": "^18.3.1"  // 앱에서 제공
  }
}

// ❌ 불필요한 의존성
{
  "dependencies": {
    "lodash": "^4.17.21",  // 전체가 아닌 필요한 것만
    "moment": "^2.29.4"    // 대신 date-fns 사용 (가벼움)
  }
}
```

#### 3. Tree-shaking 지원
```typescript
// ✅ Named Export 사용
export { Button } from './Button'
export { Input } from './Input'

// 앱에서 필요한 것만 import
import { Button } from '@mycompany/shared-ui'  // Input은 번들에 포함 안 됨

// ❌ Default Export
export default { Button, Input }  // 전체가 번들에 포함됨
```

---

## 2. shared-ui: UI 컴포넌트 라이브러리

### 2.1 구조 및 설정

#### 폴더 구조

```
packages/shared-ui/
├── src/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Modal/
│   ├── Table/
│   ├── theme/                    # 디자인 토큰
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── index.ts                  # 전체 export
├── package.json
├── tsconfig.json
├── vite.config.ts                # 라이브러리 빌드
└── README.md
```

#### package.json

```json
{
  "name": "@mycompany/shared-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./theme": {
      "import": "./dist/theme/index.js",
      "types": "./dist/theme/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly",
    "dev": "vite build --watch",
    "test": "vitest",
    "storybook": "storybook dev -p 6006"
  },
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "vite": "^5.4.8",
    "typescript": "^5.6.2",
    "vitest": "^1.0.0",
    "@storybook/react-vite": "^7.6.0"
  },
  "dependencies": {
    "clsx": "^2.0.0"               # 조건부 className
  }
}
```

#### vite.config.ts (라이브러리 모드)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true })  // .d.ts 생성
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],  // Peer dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

### 2.2 컴포넌트 작성 규칙

#### Button 컴포넌트 예시

```typescript
// packages/shared-ui/src/Button/Button.types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

// packages/shared-ui/src/Button/Button.tsx
import { forwardRef } from 'react'
import clsx from 'clsx'
import type { ButtonProps } from './Button.types'
import './Button.css'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'button',
          `button--${variant}`,
          `button--${size}`,
          loading && 'button--loading',
          className
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? <Spinner /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// packages/shared-ui/src/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'
```

#### 디자인 토큰 사용

```typescript
// packages/shared-ui/src/theme/colors.ts
export const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    500: '#2196f3',  // main
    700: '#1976d2',
    900: '#0d47a1',
  },
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    500: '#9e9e9e',
    900: '#212121',
  },
  error: '#f44336',
  warning: '#ff9800',
  success: '#4caf50',
} as const

// packages/shared-ui/src/Button/Button.css
.button--primary {
  background-color: var(--color-primary-500);
  color: white;
}

.button--secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}
```

### 2.3 Storybook 연동

#### Button.stories.tsx

```typescript
// packages/shared-ui/src/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
```

### 2.4 테스트 작성

```typescript
// packages/shared-ui/src/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--primary')

    rerender(<Button variant="secondary">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--secondary')
  })
})
```

---

## 3. shared-api: API 클라이언트

### 3.1 Axios 설정

#### 폴더 구조

```
packages/shared-api/
├── src/
│   ├── client/
│   │   ├── axios.ts              # Axios 인스턴스
│   │   ├── interceptors.ts       # 인터셉터
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useQuery.ts           # React Query 래퍼
│   │   ├── useMutation.ts
│   │   └── index.ts
│   ├── endpoints/
│   │   ├── user.ts
│   │   ├── equipment.ts
│   │   └── index.ts
│   └── index.ts
└── package.json
```

#### axios.ts

```typescript
// packages/shared-api/src/client/axios.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiError {
  code: string
  message: string
  details?: unknown
}

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰 추가
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // 401 에러 처리 (토큰 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const { data } = await axios.post('/auth/refresh', { refreshToken })

        localStorage.setItem('access_token', data.accessToken)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        // 리프레시 실패 → 로그아웃
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
```

### 3.2 React Query 통합

```typescript
// packages/shared-api/src/hooks/useQuery.ts
import { useQuery as useReactQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { ApiError } from '../client/axios'

export function useQuery<TData = unknown, TError = AxiosError<ApiError>>(
  options: UseQueryOptions<TData, TError>
) {
  return useReactQuery<TData, TError>({
    staleTime: 1000 * 60 * 5,  // 5분
    retry: (failureCount, error) => {
      // 401, 403, 404는 재시도 안 함
      if (error instanceof AxiosError) {
        if ([401, 403, 404].includes(error.response?.status || 0)) {
          return false
        }
      }
      return failureCount < 3
    },
    ...options,
  })
}

// packages/shared-api/src/hooks/useMutation.ts
import { useMutation as useReactMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { ApiError } from '../client/axios'

export function useMutation<TData = unknown, TVariables = unknown>(
  options: UseMutationOptions<TData, AxiosError<ApiError>, TVariables>
) {
  return useReactMutation<TData, AxiosError<ApiError>, TVariables>(options)
}
```

### 3.3 API 엔드포인트 정의

```typescript
// packages/shared-api/src/endpoints/user.ts
import { apiClient } from '../client/axios'
import type { User, UserUpdatePayload } from '@mycompany/shared-types'

export const userApi = {
  // 사용자 목록 조회
  getUsers: async () => {
    const { data } = await apiClient.get<User[]>('/users')
    return data
  },

  // 사용자 상세 조회
  getUser: async (id: string) => {
    const { data } = await apiClient.get<User>(`/users/${id}`)
    return data
  },

  // 사용자 수정
  updateUser: async (id: string, payload: UserUpdatePayload) => {
    const { data } = await apiClient.put<User>(`/users/${id}`, payload)
    return data
  },

  // 사용자 삭제
  deleteUser: async (id: string) => {
    await apiClient.delete(`/users/${id}`)
  },
}

// 사용 예시
// packages/shared-api/src/endpoints/user.hooks.ts
import { useQuery, useMutation } from '../hooks'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from './user'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserUpdatePayload }) =>
      userApi.updateUser(id, payload),
    onSuccess: (data) => {
      // 캐시 업데이트
      queryClient.setQueryData(['users', data.id], data)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 3.4 에러 처리

```typescript
// packages/shared-api/src/utils/errorHandler.ts
import { AxiosError } from 'axios'
import type { ApiError } from '../client/axios'

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined

    // 서버에서 보낸 에러 메시지
    if (apiError?.message) {
      return apiError.message
    }

    // HTTP 상태 코드별 기본 메시지
    switch (error.response?.status) {
      case 400:
        return '잘못된 요청입니다.'
      case 401:
        return '인증이 필요합니다.'
      case 403:
        return '권한이 없습니다.'
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.'
      case 500:
        return '서버 오류가 발생했습니다.'
      default:
        return '알 수 없는 오류가 발생했습니다.'
    }
  }

  return '네트워크 오류가 발생했습니다.'
}

// 사용 예시
import { handleApiError } from '@mycompany/shared-api'

function MyComponent() {
  const { data, error } = useUsers()

  if (error) {
    const errorMessage = handleApiError(error)
    return <div>Error: {errorMessage}</div>
  }

  // ...
}
```

---

## 4. shared-auth: 인증 모듈

### 4.1 AuthProvider 구현

```typescript
// packages/shared-auth/src/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '@mycompany/shared-types'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          await refreshUser()
        } catch (error) {
          console.error('Failed to refresh user:', error)
          logout()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const { user, accessToken, refreshToken } = await response.json()

    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const refreshUser = async () => {
    const response = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const user = await response.json()
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
```

### 4.2 useAuth 훅

```typescript
// packages/shared-auth/src/useAuth.ts
export { useAuthContext as useAuth } from './AuthContext'

// 사용 예시
import { useAuth } from '@mycompany/shared-auth'

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('email@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  )
}
```

### 4.3 토큰 관리

```typescript
// packages/shared-auth/src/tokenStorage.ts
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}
```

### 4.4 Protected Route

```typescript
// packages/shared-auth/src/ProtectedRoute.tsx
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

// 사용 예시
import { ProtectedRoute } from '@mycompany/shared-auth'

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

## 5. shared-utils: 유틸리티 함수

### 5.1 날짜 유틸리티

```typescript
// packages/shared-utils/src/date/formatDate.ts
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: ko })
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
}

export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) return '방금 전'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
  return `${Math.floor(diffInSeconds / 86400)}일 전`
}
```

### 5.2 문자열 유틸리티

```typescript
// packages/shared-utils/src/string/truncate.ts
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

// packages/shared-utils/src/string/capitalize.ts
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// packages/shared-utils/src/string/formatNumber.ts
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num)
}

export function formatCurrency(amount: number, currency: string = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
  }).format(amount)
}
```

### 5.3 유효성 검사

```typescript
// packages/shared-utils/src/validation/validators.ts
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export function isPhoneNumber(value: string): boolean {
  const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
  return phoneRegex.test(value)
}

export function isStrongPassword(password: string): boolean {
  // 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return strongPasswordRegex.test(password)
}

export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  return value != null
}
```

---

## 6. shared-types: 공통 타입

### 6.1 도메인 엔티티 (DDD)

```typescript
// packages/shared-types/src/entities/User.ts
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'guest'
  createdAt: string
  updatedAt: string
}

export interface UserCreatePayload {
  email: string
  password: string
  name: string
}

export interface UserUpdatePayload {
  name?: string
  email?: string
}

// packages/shared-types/src/entities/Equipment.ts
export interface Equipment {
  id: string
  name: string
  type: 'sensor' | 'actuator' | 'controller'
  status: 'online' | 'offline' | 'error'
  location: string
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface EquipmentStatus {
  equipmentId: string
  status: 'online' | 'offline' | 'error'
  lastHeartbeat: string
  errorMessage?: string
}
```

### 6.2 API 타입

```typescript
// packages/shared-types/src/api/requests.ts
export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface SearchParams extends PaginationParams {
  query?: string
  filters?: Record<string, unknown>
}

// packages/shared-types/src/api/responses.ts
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}
```

### 6.3 공통 타입

```typescript
// packages/shared-types/src/common/index.ts
export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

export type ValueOf<T> = T[keyof T]

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```

---

## 7. shared-config: 공통 설정

### 7.1 ESLint 설정

```typescript
// packages/shared-config/eslint-config/index.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',  // React 17+
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

// 사용 예시 (apps/ods-mes/.eslintrc.js)
module.exports = {
  extends: ['@mycompany/shared-config/eslint-config'],
  // 프로젝트 전용 규칙 추가
}
```

### 7.2 TypeScript 설정

```json
// packages/shared-config/typescript-config/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true
  }
}

// 사용 예시 (apps/ods-mes/tsconfig.json)
{
  "extends": "@mycompany/shared-config/typescript-config/base.json",
  "include": ["src"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 7.3 Vite 설정

```typescript
// packages/shared-config/vite-config/index.ts
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export function createViteConfig(options: UserConfig = {}): UserConfig {
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    ...options,
  })
}

// 사용 예시 (apps/ods-mes/vite.config.ts)
import { createViteConfig } from '@mycompany/shared-config/vite-config'

export default createViteConfig({
  server: {
    port: 3001,  // 프로젝트별 포트
  },
})
```

---

## 8. 패키지 버전 관리

### 8.1 시맨틱 버저닝

```
Major.Minor.Patch (예: 1.2.3)

Major (1.x.x): Breaking Changes
  - API 변경으로 기존 코드 수정 필요
  - 예: Button props 인터페이스 변경

Minor (x.2.x): New Features
  - 하위 호환성 유지하며 기능 추가
  - 예: Button에 새로운 variant 추가

Patch (x.x.3): Bug Fixes
  - 버그 수정만
  - 예: Button 클릭 이벤트 버그 수정
```

### 8.2 Changeset 사용

```bash
# Changeset 설치
pnpm add -Dw @changesets/cli
pnpm changeset init

# 변경사항 추가
pnpm changeset

# 질문에 답변
? Which packages would you like to include? @mycompany/shared-ui
? What kind of change is this for @mycompany/shared-ui? minor
? Please enter a summary: Add disabled prop to Button component

# 버전 업데이트
pnpm changeset version

# 배포
pnpm changeset publish
```

#### .changeset/config.json

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@mycompany/shared-config"]
}
```

### 8.3 배포 전략

#### 자동 배포 (GitHub Actions)

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
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

      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run build --filter="./packages/*"
      - run: pnpm turbo run test --filter="./packages/*"

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 요약

### 공통 모듈 체크리스트

- [ ] **shared-ui**: 재사용 가능한 UI 컴포넌트
- [ ] **shared-api**: API 클라이언트 + React Query
- [ ] **shared-auth**: 인증 로직
- [ ] **shared-utils**: 유틸리티 함수
- [ ] **shared-types**: 공통 TypeScript 타입
- [ ] **shared-config**: ESLint, TS, Vite 설정

### 다음 단계

이제 [06-project-templates.md](./06-project-templates.md)에서 실제 프로젝트 템플릿과 업체별 커스터마이징 방법을 알아보겠습니다.

---

## 참조

- [React Component Library 가이드](https://react.dev/learn/your-first-component)
- [Axios 공식 문서](https://axios-http.com/)
- [React Query 공식 문서](https://tanstack.com/query/)
- [Storybook 공식 문서](https://storybook.js.org/)
- [Changesets 공식 문서](https://github.com/changesets/changesets)
