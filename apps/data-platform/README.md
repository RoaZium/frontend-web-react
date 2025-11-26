# Data Platform

데이터 에코시스템을 위한 통합 플랫폼

## Features

- **Datasource Management**: 데이터소스 연동 및 관리
- **Pipeline Orchestration**: ETL/ELT 파이프라인 구축
- **Data Catalog**: 데이터 자산 검색 및 메타데이터 관리
- **Data Quality**: 데이터 품질 모니터링 및 검증

## Getting Started

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Tech Stack

- React 18.3.1
- TypeScript 5.6.2
- Vite 5.4.8
- React Router DOM 7.6.1
- React Query 5.59.13
- Zustand 4.5.5
- ECharts 5.6.0

## Architecture

이 프로젝트는 Feature Sliced Design (FSD) 아키텍처를 따릅니다.

```
src/
├── app/          # 애플리케이션 설정
├── pages/        # 라우팅 페이지
├── widgets/      # 복합 UI 블록
├── features/     # 사용자 기능
├── entities/     # 도메인 엔티티
└── shared/       # 공통 코드
```
