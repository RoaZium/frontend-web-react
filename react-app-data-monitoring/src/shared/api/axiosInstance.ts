import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 실제 API 주소로 변경
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰 등 공통 헤더 추가 가능
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 공통화 가능
    return Promise.reject(error)
  }
)