// DataGroup 엔티티 타입 정의

export interface DataGroupDto {
  id: string; // UUID format
  code: string;
  name: string;
  menuOrder: number;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// DataGroup 생성/수정을 위한 입력 타입 (ID 제외)
export interface DataGroupCreateRequest {
  code: string;
  name: string;
  menuOrder: number;
}

// DataGroup 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface DataGroupUpdateRequest {
  code?: string;
  name?: string;
  menuOrder?: number;
}

// DataGroup 조회 필터 파라미터
export interface DataGroupQueryParams {
  code?: string;
  name?: string;
}

// API 응답 타입
export interface DataGroupListResponse {
  data: DataGroupDto[];
}

export interface DataGroupResponse {
  data: DataGroupDto;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
