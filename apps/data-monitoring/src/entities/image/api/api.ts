// entities/image/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  ImageDto,
  ImageCreateRequest,
  ImageUpdateRequest,
  ImageQueryParams,
} from '../model/types';

export const imageApi = {
  /**
   * 전체 이미지 조회
   */
  getImages: async (params: ImageQueryParams = {}): Promise<ImageDto[]> => {
    const { name, path, contentType, size } = params;
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (path) queryParams.append('path', path);
    if (contentType) queryParams.append('contentType', contentType);
    if (size !== undefined) queryParams.append('size', size.toString());

    const url = `${ENV.api.baseUrl}/v1/images${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<ImageDto[]>(url);
    return response.data;
  },

  /**
   * 이미지 조회 (ID)
   */
  getImageById: async (id: string): Promise<ImageDto> => {
    const response = await axios.get<ImageDto>(
      `${ENV.api.baseUrl}/v1/images/${id}`
    );
    return response.data;
  },

  /**
   * 이미지 생성
   */
  createImage: async (imageData: ImageCreateRequest): Promise<ImageDto> => {
    const response = await axios.post<ImageDto>(
      `${ENV.api.baseUrl}/v1/images`,
      imageData
    );
    return response.data;
  },

  /**
   * 이미지 수정
   */
  updateImage: async (
    id: string,
    imageData: ImageUpdateRequest
  ): Promise<ImageDto> => {
    const response = await axios.put<ImageDto>(
      `${ENV.api.baseUrl}/v1/images/${id}`,
      imageData
    );
    return response.data;
  },

  /**
   * 이미지 삭제
   */
  deleteImage: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/images/${id}`);
  },

  /**
   * 이미지 파일 업로드
   */
  uploadImage: async (file: File): Promise<ImageDto> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<ImageDto>(
      `${ENV.api.baseUrl}/v1/images/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
