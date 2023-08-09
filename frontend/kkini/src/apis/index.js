import axios from 'axios';
import { getItem } from '@SessionStorage'

// axios 객체 생성
export default axios.create({
    baseURL: process.env.REACT_APP_NAVER_API_KEY,
    headers: {
      "Content-type": "application/json",
    },
  })