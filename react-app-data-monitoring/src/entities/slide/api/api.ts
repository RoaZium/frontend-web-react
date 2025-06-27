// entities/slide/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  SlideDto,
  SlideCreateRequest,
  SlideUpdateRequest,
  SlideQueryParams,
} from '../model/types';

export const slideApi = {
  /**
   * 전체 슬라이드 조회
   */
  getSlides: async (params: SlideQueryParams = {}): Promise<SlideDto[]> => {
    const { sectionId, title, isVisible } = params;
    const queryParams = new URLSearchParams();
    
    if (sectionId) queryParams.append('sectionId', sectionId);
    if (title) queryParams.append('title', title);
    if (isVisible !== undefined) queryParams.append('isVisible', isVisible.toString());
    
    const url = `${ENV.api.baseUrl}/v1/slides${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<SlideDto[]>(url);
    return response.data;
  },

  /**
   * 슬라이드 조회 (ID)
   */
  getSlideById: async (id: string): Promise<SlideDto> => {
    const response = await axios.get<SlideDto>(`${ENV.api.baseUrl}/v1/slides/${id}`);
    return response.data;
  },

  /**
   * 슬라이드 생성
   */
  createSlide: async (slideData: SlideCreateRequest): Promise<SlideDto> => {
    const response = await axios.post<SlideDto>(`${ENV.api.baseUrl}/v1/slides`, slideData);
    return response.data;
  },

  /**
   * 슬라이드 수정
   */
  updateSlide: async (id: string, slideData: SlideUpdateRequest): Promise<SlideDto> => {
    const response = await axios.put<SlideDto>(`${ENV.api.baseUrl}/v1/slides/${id}`, slideData);
    return response.data;
  },

  /**
   * 슬라이드 삭제
   */
  deleteSlide: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/slides/${id}`);
  }
};
