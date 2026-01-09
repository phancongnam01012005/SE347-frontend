import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khởi tạo: Kiểm tra token trong localStorage khi app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Kiểm tra token còn hợp lệ không
        if (authService.isTokenValid()) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            setUser(userData);
          } else {
            // Token không hợp lệ, xóa đi
            authService.logout();
          }
        } else {
          // Token hết hạn hoặc không tồn tại
          authService.logout();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Đăng nhập với email và password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const login = async (email, password) => {
    try {
      // Gọi API login
      const data = await authService.login(email, password);

      // Lấy thông tin user từ token
      const userData = await authService.getCurrentUser();

      if (userData) {
        setUser(userData);
        return { success: true };
      } else {
        throw new Error("Không thể lấy thông tin người dùng");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Xử lý lỗi từ backend
      let errorMessage = "Đăng nhập thất bại";

      if (error.response) {
        // Lỗi từ server
        errorMessage = error.response.data?.message || error.response.data || errorMessage;
      } else if (error.request) {
        // Không nhận được response từ server
        errorMessage = "Không thể kết nối đến server";
      } else {
        // Lỗi khác
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  /**
   * Đăng xuất
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
