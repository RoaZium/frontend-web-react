# III. 코드 컨벤션 및 개발 표준

## 목차
1. [네이밍 및 코딩 규칙](#1-네이밍-및-코딩-규칙)
   - 1.1 [컴포넌트 명명 규칙](#11-컴포넌트-명명-규칙)
   - 1.2 [Props 명명 규칙](#12-props-명명-규칙)
   - 1.3 [이벤트 핸들러 명명 규칙](#13-이벤트-핸들러-명명-규칙)
   - 1.4 [상태 및 변수 명명 규칙](#14-상태-및-변수-명명-규칙)
   - 1.5 [파일 및 폴더 명명 규칙](#15-파일-및-폴더-명명-규칙)
2. [코드 구조 및 조직](#2-코드-구조-및-조직)
   - 2.1 [컴포넌트 구조](#21-컴포넌트-구조)
   - 2.2 [파일 구성](#22-파일-구성)
   - 2.3 [Import 문 정리](#23-import-문-정리)
3. [코딩 관행](#3-코딩-관행)
   - 3.1 [함수형 프로그래밍](#31-함수형-프로그래밍)
   - 3.2 [조건부 렌더링](#32-조건부-렌더링)
   - 3.3 [리스트 렌더링](#33-리스트-렌더링)
   - 3.4 [Prop 전달](#34-prop-전달)
4. [주석 및 문서화](#4-주석-및-문서화)
   - 4.1 [코드 주석](#41-코드-주석)
   - 4.2 [README 작성](#42-readme-작성)

---

## 1. 네이밍 및 코딩 규칙

### 1.1 컴포넌트 명명 규칙
- **규칙**: PascalCase 사용, 명사형으로 역할 명확히 (예: `UserProfile`, `ProductList`)
- **목적**: 가독성과 일관성 유지

### 1.2 Props 명명 규칙
- **규칙**: camelCase 사용, 설명적 이름, Boolean은 `is`, `has`, `can` 접두사 (예: `userName`, `isLoading`)
- **목적**: 명확한 의도 전달

### 1.3 이벤트 핸들러 명명 규칙
- **규칙**: `handle` 접두사 + 이벤트 이름, camelCase (예: `handleClick`, `handleSubmit`)
- **목적**: 이벤트 처리 함수의 역할 명확화

### 1.4 상태 및 변수 명명 규칙
- **규칙**: camelCase 사용, 의미 있는 이름 (예: `userList`, `isLoading`)
- **목적**: 코드 가독성과 유지보수성 향상

### 1.5 파일 및 폴더 명명 규칙
- **컴포넌트 파일**: PascalCase (예: `UserProfile.js`)
- **일반 JS 파일**: camelCase (예: `apiService.js`)
- **스타일 파일**: 컴포넌트와 동일 이름 (예: `UserProfile.module.css`)
- **폴더**: kebab-case (예: `user-profile`)
- **목적**: 일관된 구조와 탐색 용이성

## 2. 코드 구조 및 조직

### 2.1 컴포넌트 구조
- **방식**: 함수형 컴포넌트와 훅 사용
- **권장**: 큰 컴포넌트를 작은 단위로 분리하여 재사용성과 테스트 용이성 확보

### 2.2 파일 구성
- **방식**: 관련 컴포넌트를 같은 폴더에 그룹화
- **공통 유틸리티**: 별도 파일로 분리 (예: `shared/lib`)
- **목적**: 코드 조직화 및 재사용성 강화

### 2.3 Import 문 정리
- **규칙**:
  - 그룹화: 내장 모듈 → 외부 라이브러리 → 로컬 임포트
  - 알파벳 순 정렬
- **예시**:
```javascript
import React from 'react';
import styled from 'styled-components';
import { useUser } from './hooks/useUser';
```
- **목적**: 가독성과 유지보수성 향상

## 3. 코딩 관행

### 3.1 함수형 프로그래밍
- **원칙**: 순수 함수 사용, 불변성 유지
- **이점**: 예측 가능한 코드, 디버깅 용이

### 3.2 조건부 렌더링
- **방식**: 삼항 연산자 또는 `&&` 사용
- **권장**: 복잡한 조건은 변수/함수로 추출
- **예시**:
```javascript
{isLoading ? <Spinner /> : <Content />}
```

### 3.3 리스트 렌더링
- **규칙**: `key` prop 필수, 인덱스 사용 지양
- **예시**:
```javascript
items.map(item => <Item key={item.id} {...item} />)
```
- **목적**: 렌더링 최적화 및 버그 방지

### 3.4 Prop 전달
- **방식**: 스프레드 연산자 활용, 타입 명시 (PropTypes/TypeScript)
- **예시**:
```javascript
<Component {...props} />
```
- **목적**: 간결한 코드와 타입 안정성

## 4. 주석 및 문서화

### 4.1 코드 주석
- **규칙**: 복잡한 로직에만 JSDoc 스타일 주석 사용
- **예시**:
```javascript
/** Fetches user data by ID */
async function fetchUser(id: number): Promise<User> {
  // ...
}
```
- **목적**: 간단한 코드는 주석 최소화, 가독성 유지

### 4.2 README 작성
- **내용**: 컴포넌트/모듈 설명, 사용 예시, prop 정의
- **예시**:
```markdown
# UserProfile Component
Displays user information.

## Props
- `name`: string - User's name
- `age`: number - User's age
```
- **목적**: 프로젝트 이해도 향상, 협업 지원
