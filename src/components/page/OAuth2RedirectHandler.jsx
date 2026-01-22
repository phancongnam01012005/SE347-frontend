import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function OAuth2RedirectHandler({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false); // Dùng useRef để đánh dấu đã xử lý

  useEffect(() => {
    // Nếu đã xử lý rồi thì không chạy lại nữa
    if (hasProcessed.current) return;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      hasProcessed.current = true; // Đánh dấu đã xử lý xong
      
      localStorage.setItem("accessToken", token);
      
      if (onLoginSuccess) {
        onLoginSuccess(token);
      }
      
      // Quan trọng: replace: true để xóa query string khỏi lịch sử duyệt web
      navigate("/", { replace: true });
    }
  }, [location.search, navigate, onLoginSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <p>Đang xác thực tài khoản...</p>
    </div>
  );
}