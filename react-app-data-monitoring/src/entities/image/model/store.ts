// entities/image/model/store.ts
import { create } from 'zustand';
import { imageApi } from '../api/api';
import type { ImageDto, ImageCreateRequest, ImageUpdateRequest, ImageQueryParams } from './types';

interface ImageState {
  // 상태
  images: ImageDto[];
  selectedImage: ImageDto | null;
  isLoading: boolean;
  error: string | null;
  filters: ImageQueryParams;

  // 액션
  fetchImages: (filters?: ImageQueryParams) => Promise<ImageDto[]>;
  fetchImageById: (id: string) => Promise<ImageDto>;
  createImage: (imageData: ImageCreateRequest) => Promise<ImageDto>;
  updateImage: (id: string, imageData: ImageUpdateRequest) => Promise<ImageDto>;
  deleteImage: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<ImageDto>;
  setSelectedImage: (image: ImageDto | null) => void;
  setFilters: (filters: Partial<ImageQueryParams>) => void;
  resetState: () => void;
}

export const useImageStore = create<ImageState>((set, get) => ({
  // 상태
  images: [],
  selectedImage: null,
  isLoading: false,
  error: null,
  filters: {
    name: '',
    path: '',
    contentType: '',
    size: undefined
  },

  // 액션
  // 이미지 목록 조회
  fetchImages: async (filters: ImageQueryParams = {}): Promise<ImageDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const images = await imageApi.getImages(filters);
      set({ images, isLoading: false });
      return images;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 이미지 단일 조회
  fetchImageById: async (id: string): Promise<ImageDto> => {
    set({ isLoading: true, error: null });
    try {
      const image = await imageApi.getImageById(id);
      set({ selectedImage: image, isLoading: false });
      return image;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 이미지 생성
  createImage: async (imageData: ImageCreateRequest): Promise<ImageDto> => {
    set({ isLoading: true, error: null });
    try {
      const newImage = await imageApi.createImage(imageData);
      set((state) => ({
        images: [...state.images, newImage],
        isLoading: false
      }));
      return newImage;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 이미지 수정
  updateImage: async (id: string, imageData: ImageUpdateRequest): Promise<ImageDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedImage = await imageApi.updateImage(id, imageData);
      set((state) => ({
        images: state.images.map(image =>
          image.id === id ? updatedImage : image
        ),
        selectedImage: state.selectedImage?.id === id ? updatedImage : state.selectedImage,
        isLoading: false
      }));
      return updatedImage;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 이미지 삭제
  deleteImage: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await imageApi.deleteImage(id);
      set((state) => ({
        images: state.images.filter(image => image.id !== id),
        selectedImage: state.selectedImage?.id === id ? null : state.selectedImage,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 이미지 파일 업로드
  uploadImage: async (file: File): Promise<ImageDto> => {
    set({ isLoading: true, error: null });
    try {
      const uploadedImage = await imageApi.uploadImage(file);
      set((state) => ({
        images: [...state.images, uploadedImage],
        isLoading: false
      }));
      return uploadedImage;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 이미지 설정
  setSelectedImage: (image: ImageDto | null) => {
    set({ selectedImage: image });
  },

  // 필터 설정
  setFilters: (filters: Partial<ImageQueryParams>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      images: [],
      selectedImage: null,
      isLoading: false,
      error: null,
      filters: { name: '', path: '', contentType: '', size: undefined }
    });
  }
}));