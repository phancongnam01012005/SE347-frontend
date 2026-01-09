import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import authService from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password match
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      // Gọi API register
      await authService.register(email, password, name);

      // Đăng ký thành công
      setSuccess("Đăng ký thành công! Đang chuyển đến trang đăng nhập...");

      // Chờ 2 giây rồi redirect về login
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Đăng ký thành công! Vui lòng đăng nhập."
          }
        });
      }, 2000);

    } catch (err) {
      console.error("Register error:", err);

      // Xử lý lỗi từ backend
      let errorMessage = "Đăng ký thất bại";

      if (err.response) {
        // Lỗi từ server
        errorMessage = err.response.data?.message || err.response.data || errorMessage;
      } else if (err.request) {
        // Không nhận được response từ server
        errorMessage = "Không thể kết nối đến server";
      } else {
        // Lỗi khác
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>

        {error && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "6px",
            color: "#c33",
            fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#efe",
            border: "1px solid #cfc",
            borderRadius: "6px",
            color: "#3c3",
            fontSize: "14px",
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
