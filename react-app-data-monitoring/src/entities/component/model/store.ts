// entities/component/model/store.ts
import { create } from 'zustand';
import { componentApi } from '../api/api';
import type { ComponentDto, ComponentInput, ComponentFilter } from './types';

interface ComponentState {
  // 상태
  components: ComponentDto[];
  selectedComponent: ComponentDto | null;
  isLoading: boolean;
  error: string | null;
  filters: ComponentFilter;

  // 액션
  fetchComponents: (filters?: ComponentFilter) => Promise<ComponentDto[]>;
  fetchComponentById: (id: string) => Promise<ComponentDto>;
  createComponent: (componentData: ComponentInput) => Promise<ComponentDto>;
  updateComponent: (id: string, componentData: ComponentInput) => Promise<ComponentDto>;
  deleteComponent: (id: string) => Promise<void>;
  setSelectedComponent: (component: ComponentDto | null) => void;
  setFilters: (filters: Partial<ComponentFilter>) => void;
  resetState: () => void;
}

export const useComponentStore = create<ComponentState>((set, get) => ({
  // 상태
  components: [],
  selectedComponent: null,
  isLoading: false,
  error: null,
  filters: {
    slideId: '',
    category: '',
    name: ''
  },

  // 액션
  // 컴포넌트 목록 조회
  fetchComponents: async (filters: ComponentFilter = {}): Promise<ComponentDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const components = await componentApi.getComponents(filters);
      set({ components, isLoading: false });
      return components;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 컴포넌트 단일 조회
  fetchComponentById: async (id: string): Promise<ComponentDto> => {
    set({ isLoading: true, error: null });
    try {
      const component = await componentApi.getComponentById(id);
      set({ selectedComponent: component, isLoading: false });
      return component;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 컴포넌트 생성
  createComponent: async (componentData: ComponentInput): Promise<ComponentDto> => {
    set({ isLoading: true, error: null });
    try {
      const newComponent = await componentApi.createComponent(componentData);
      set((state) => ({
        components: [...state.components, newComponent],
        isLoading: false
      }));
      return newComponent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 컴포넌트 수정
  updateComponent: async (id: string, componentData: ComponentInput): Promise<ComponentDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedComponent = await componentApi.updateComponent(id, componentData);
      set((state) => ({
        components: state.components.map(component =>
          component.id === id ? updatedComponent : component
        ),
        selectedComponent: state.selectedComponent?.id === id ? updatedComponent : state.selectedComponent,
        isLoading: false
      }));
      return updatedComponent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 컴포넌트 삭제
  deleteComponent: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await componentApi.deleteComponent(id);
      set((state) => ({
        components: state.components.filter(component => component.id !== id),
        selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 컴포넌트 설정
  setSelectedComponent: (component: ComponentDto | null) => {
    set({ selectedComponent: component });
  },

  // 필터 설정
  setFilters: (filters: Partial<ComponentFilter>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      components: [],
      selectedComponent: null,
      isLoading: false,
      error: null,
      filters: { slideId: '', category: '', name: '' }
    });
  }
}));