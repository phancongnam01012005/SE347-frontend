import axios from "axios";
import authService from "./authService";

// Tạo instance axios
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// === Request interceptor: attach token tự động ===
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      // Nếu đã có token, thêm Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Response interceptor: logout nếu 401 ===
api.interceptors.response.use(
  (response) => response, // trả bình thường
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Token expired / unauthorized → logout
      authService.logout();
      // Redirect về login, giữ trang trước nếu muốn
      window.location.href = "/login";
    }
    return Promise.reject(error); // trả về lỗi để component xử lý
  }
);

export default api;
