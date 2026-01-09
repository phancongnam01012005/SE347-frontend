import axios from 'axios';

// Base URL của Backend API
const API_BASE_URL = 'http://localhost:8001';

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials bỏ đi vì không cần cookies cho JWT auth
});

// Request Interceptor - Tự động thêm JWT token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý lỗi chung
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu token hết hạn hoặc không hợp lệ (401)
    if (error.response?.status === 401) {
      // Xóa token và user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect về trang login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
