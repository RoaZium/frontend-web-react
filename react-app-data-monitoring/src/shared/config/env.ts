// src/shared/config/env.ts
export const ENV = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'React App Data Monitoring',
    version: import.meta.env.VITE_APP_VERSION || '0.0.0',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8082',
  },
  chart: {
    theme: import.meta.env.VITE_CHART_THEME || 'default',
    animation: import.meta.env.VITE_CHART_ANIMATION === 'true',
    updateInterval: Number(import.meta.env.VITE_CHART_UPDATE_INTERVAL) || 5000,
  },
  monitoring: {
    refreshInterval: Number(import.meta.env.VITE_MONITORING_REFRESH_INTERVAL) || 30000,
    maxDataPoints: Number(import.meta.env.VITE_MONITORING_MAX_DATA_POINTS) || 100,
  },
  features: {
    darkMode: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
    notifications: import.meta.env.VITE_FEATURE_NOTIFICATIONS === 'true',
    realTime: import.meta.env.VITE_FEATURE_REAL_TIME === 'true',
    dataExport: import.meta.env.VITE_FEATURE_DATA_EXPORT === 'true',
  },
  query: {
    staleTime: Number(import.meta.env.VITE_QUERY_STALE_TIME) || 300000,
    cacheTime: Number(import.meta.env.VITE_QUERY_CACHE_TIME) || 600000,
  },
  dev: {
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
    enableReactQueryDevtools: import.meta.env.VITE_ENABLE_REACT_QUERY_DEVTOOLS === 'true',
  },
};

// 환경 확인 유틸리티 (Vite 내장 변수 사용)
export const isDevelopment = () => import.meta.env.DEV;
export const isProduction = () => import.meta.env.PROD;
export const getMode = () => import.meta.env.MODE;