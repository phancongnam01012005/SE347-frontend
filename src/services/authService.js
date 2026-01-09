import api from './api';

const authService = {
  /**
   * Đăng nhập
   * @param {string} email - Email người dùng
   * @param {string} password - Mật khẩu
   * @returns {Promise} Response từ API
   */
  login: async (email, password) => {
    try {
      // Backend dùng @RequestParam nên phải gửi form-urlencoded
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);

      const response = await api.post('/public/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Response từ backend: { token: "jwt_token_here", message: "..." }
      if (response.data.token) {
        // Lưu JWT token vào localStorage
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Đăng ký tài khoản mới
   * @param {string} email - Email người dùng
   * @param {string} password - Mật khẩu
   * @param {string} name - Tên người dùng
   * @returns {Promise} Response từ API
   */
  register: async (email, password, name) => {
    try {
      // Backend dùng @RequestParam nên phải gửi form-urlencoded
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);
      params.append('name', name);

      const response = await api.post('/public/register', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lấy thông tin user hiện tại (nếu backend có endpoint này)
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    try {
      // Giải mã JWT token để lấy thông tin user
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      // Decode JWT payload (phần giữa của token)
      const payload = JSON.parse(atob(token.split('.')[1]));

      return {
        email: payload.sub, // JWT thường lưu email/username trong 'sub'
        name: payload.name || payload.sub,
        role: payload.role || 'BUYER',
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  /**
   * Đăng xuất
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Kiểm tra token còn hợp lệ không
   * @returns {boolean}
   */
  isTokenValid: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Kiểm tra expiration (exp là timestamp tính bằng giây)
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
