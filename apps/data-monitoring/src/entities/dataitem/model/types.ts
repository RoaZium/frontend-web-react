/**
 * DataItem DTO 타입 정의
 */
export interface DataItemDto {
  id: string; // UUID string
  groupId: string; // UUID string (required)
  code: string; // string (required)
  name: string; // string (required)
  menuOrder: number; // int32 (required)
  datasourceProperties?: string; // string (optional)
  createdAt: string; // date-time string (required)
  updatedAt: string; // date-time string (required)
}

/**
 * DataItem 생성/수정을 위한 입력 타입
 */
export interface DataItemInput {
  groupId: string;
  code: string;
  name: string;
  menuOrder: number;
  datasourceProperties?: string;
}

/**
 * DataItem 필터 타입
 */
export interface DataItemFilter {
  groupId?: string; // UUID string (optional)
  code?: string; // string (optional)
  name?: string; // string (optional)
  menuOrder?: number; // int32 (optional)
}

/**
 * API 응답 타입
 */
export interface DataItemListResponse {
  data: DataItemDto[];
}

export interface DataItemResponse {
  data: DataItemDto;
}

/**
 * API 에러 응답 타입
 */
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
