// entities/slide/model/store.ts
import { create } from 'zustand';
import { slideApi } from '../api/api';
import type {
  SlideDto,
  SlideCreateRequest,
  SlideUpdateRequest,
  SlideQueryParams,
} from './types';

interface SlideState {
  // 상태
  slides: SlideDto[];
  selectedSlide: SlideDto | null;
  isLoading: boolean;
  error: string | null;
  filters: SlideQueryParams;

  // 액션
  fetchSlides: (filters?: SlideQueryParams) => Promise<SlideDto[]>;
  fetchSlideById: (id: string) => Promise<SlideDto>;
  createSlide: (slideData: SlideCreateRequest) => Promise<SlideDto>;
  updateSlide: (id: string, slideData: SlideUpdateRequest) => Promise<SlideDto>;
  deleteSlide: (id: string) => Promise<void>;
  setSelectedSlide: (slide: SlideDto | null) => void;
  setFilters: (filters: Partial<SlideQueryParams>) => void;
  resetState: () => void;
}

export const useSlideStore = create<SlideState>((set, get) => ({
  // 상태
  slides: [],
  selectedSlide: null,
  isLoading: false,
  error: null,
  filters: {
    userId: '',
    presentationId: '',
    sectionId: '',
    name: '',
    menuOrder: undefined,
  },

  // 액션
  // 슬라이드 목록 조회
  fetchSlides: async (filters: SlideQueryParams = {}): Promise<SlideDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const slides = await slideApi.getSlides(filters);
      set({ slides, isLoading: false });
      return slides;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 슬라이드 단일 조회
  fetchSlideById: async (id: string): Promise<SlideDto> => {
    set({ isLoading: true, error: null });
    try {
      const slide = await slideApi.getSlideById(id);
      set({ selectedSlide: slide, isLoading: false });
      return slide;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 슬라이드 생성
  createSlide: async (slideData: SlideCreateRequest): Promise<SlideDto> => {
    set({ isLoading: true, error: null });
    try {
      const newSlide = await slideApi.createSlide(slideData);
      set(state => ({
        slides: [...state.slides, newSlide],
        isLoading: false,
      }));
      return newSlide;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 슬라이드 수정
  updateSlide: async (
    id: string,
    slideData: SlideUpdateRequest
  ): Promise<SlideDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedSlide = await slideApi.updateSlide(id, slideData);
      set(state => ({
        slides: state.slides.map(slide =>
          slide.id === id ? updatedSlide : slide
        ),
        selectedSlide:
          state.selectedSlide?.id === id ? updatedSlide : state.selectedSlide,
        isLoading: false,
      }));
      return updatedSlide;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 슬라이드 삭제
  deleteSlide: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await slideApi.deleteSlide(id);
      set(state => ({
        slides: state.slides.filter(slide => slide.id !== id),
        selectedSlide:
          state.selectedSlide?.id === id ? null : state.selectedSlide,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 슬라이드 설정
  setSelectedSlide: (slide: SlideDto | null) => {
    set({ selectedSlide: slide });
  },

  // 필터 설정
  setFilters: (filters: Partial<SlideQueryParams>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      slides: [],
      selectedSlide: null,
      isLoading: false,
      error: null,
      filters: {
        userId: '',
        presentationId: '',
        sectionId: '',
        name: '',
        menuOrder: undefined,
      },
    });
  },
}));
