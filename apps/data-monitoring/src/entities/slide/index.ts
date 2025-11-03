// entities/slide/index.ts
export { slideApi } from './api/api';
export { useSlideStore } from './model/store';
export type {
  SlideDto,
  SlideCreateRequest,
  SlideUpdateRequest,
  SlideQueryParams,
  SlideListResponse,
  SlideResponse,
  ApiErrorResponse,
} from './model/types';
export { default as SlideCard } from './ui/Card';
export { default as SlideList } from './ui/List';
export { default as SlideForm } from './ui/Form';
