import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK LOGIN
    login("user@gmail.com");

    // Redirect về trang trước đó hoặc trang chủ
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mật khẩu" required />

          <button type="submit">Đăng nhập</button>
        </form>

        <div className="auth-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
