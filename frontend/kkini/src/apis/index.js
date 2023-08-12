import axios from 'axios';
import store from '../store';  // 실제 스토어 파일 경로로 수정하세요.

// axios 객체 생성
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_NAVER_API_KEY,
    headers: {
      // "Content-type": "application/json",
      'X-Custom-Header': 'foobar'
    },
});

// 요청 인터셉터 추가. 
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().jwt.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
