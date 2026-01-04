import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Họ và tên" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mật khẩu" required />
          <input type="password" placeholder="Nhập lại mật khẩu" required />

          <button type="submit">Đăng ký</button>
        </form>

        <div className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
