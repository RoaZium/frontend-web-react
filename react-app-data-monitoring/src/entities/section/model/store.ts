// entities/section/model/store.ts
import { create } from 'zustand';
import { sectionApi } from '../api/api';
import type {
  SectionDto,
  SectionCreateRequest,
  SectionUpdateRequest,
  SectionQueryParams,
} from './types';

interface SectionState {
  // 상태
  sections: SectionDto[];
  selectedSection: SectionDto | null;
  isLoading: boolean;
  error: string | null;
  filters: SectionQueryParams;

  // 액션
  fetchSections: (filters?: SectionQueryParams) => Promise<SectionDto[]>;
  fetchSectionById: (id: string) => Promise<SectionDto>;
  createSection: (sectionData: SectionCreateRequest) => Promise<SectionDto>;
  updateSection: (
    id: string,
    sectionData: SectionUpdateRequest
  ) => Promise<SectionDto>;
  deleteSection: (id: string) => Promise<void>;
  setSelectedSection: (section: SectionDto | null) => void;
  setFilters: (filters: Partial<SectionQueryParams>) => void;
  resetState: () => void;
}

export const useSectionStore = create<SectionState>((set, get) => ({
  // 상태
  sections: [],
  selectedSection: null,
  isLoading: false,
  error: null,
  filters: {
    userId: '',
    name: '',
  },

  // 액션
  // 섹션 목록 조회
  fetchSections: async (
    filters: SectionQueryParams = {}
  ): Promise<SectionDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const sections = await sectionApi.getSections(filters);
      set({ sections, isLoading: false });
      return sections;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 섹션 단일 조회
  fetchSectionById: async (id: string): Promise<SectionDto> => {
    set({ isLoading: true, error: null });
    try {
      const section = await sectionApi.getSectionById(id);
      set({ selectedSection: section, isLoading: false });
      return section;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 섹션 생성
  createSection: async (
    sectionData: SectionCreateRequest
  ): Promise<SectionDto> => {
    set({ isLoading: true, error: null });
    try {
      const newSection = await sectionApi.createSection(sectionData);
      set(state => ({
        sections: [...state.sections, newSection],
        isLoading: false,
      }));
      return newSection;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 섹션 수정
  updateSection: async (
    id: string,
    sectionData: SectionUpdateRequest
  ): Promise<SectionDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedSection = await sectionApi.updateSection(id, sectionData);
      set(state => ({
        sections: state.sections.map(section =>
          section.id === id ? updatedSection : section
        ),
        selectedSection:
          state.selectedSection?.id === id
            ? updatedSection
            : state.selectedSection,
        isLoading: false,
      }));
      return updatedSection;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 섹션 삭제
  deleteSection: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await sectionApi.deleteSection(id);
      set(state => ({
        sections: state.sections.filter(section => section.id !== id),
        selectedSection:
          state.selectedSection?.id === id ? null : state.selectedSection,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 섹션 설정
  setSelectedSection: (section: SectionDto | null) => {
    set({ selectedSection: section });
  },

  // 필터 설정
  setFilters: (filters: Partial<SectionQueryParams>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      sections: [],
      selectedSection: null,
      isLoading: false,
      error: null,
      filters: { userId: '', name: '' },
    });
  },
}));
