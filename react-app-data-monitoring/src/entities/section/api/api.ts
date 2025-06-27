// entities/section/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  SectionDto,
  SectionCreateRequest,
  SectionUpdateRequest,
  SectionQueryParams,
} from '../model/types';

export const sectionApi = {
  /**
   * 전체 섹션 조회
   */
  getSections: async (
    params: SectionQueryParams = {}
  ): Promise<SectionDto[]> => {
    const { userId, name } = params;
    const queryParams = new URLSearchParams();

    if (userId) queryParams.append('userId', userId);
    if (name) queryParams.append('name', name);

    const url = `${ENV.api.baseUrl}/v1/sections${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<SectionDto[]>(url);
    return response.data;
  },

  /**
   * 섹션 조회 (ID)
   */
  getSectionById: async (id: string): Promise<SectionDto> => {
    const response = await axios.get<SectionDto>(
      `${ENV.api.baseUrl}/v1/sections/${id}`
    );
    return response.data;
  },

  /**
   * 섹션 생성
   */
  createSection: async (
    sectionData: SectionCreateRequest
  ): Promise<SectionDto> => {
    const response = await axios.post<SectionDto>(
      `${ENV.api.baseUrl}/v1/sections`,
      sectionData
    );
    return response.data;
  },

  /**
   * 섹션 수정
   */
  updateSection: async (
    id: string,
    sectionData: SectionUpdateRequest
  ): Promise<SectionDto> => {
    const response = await axios.put<SectionDto>(
      `${ENV.api.baseUrl}/v1/sections/${id}`,
      sectionData
    );
    return response.data;
  },

  /**
   * 섹션 삭제
   */
  deleteSection: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/sections/${id}`);
  },
};
