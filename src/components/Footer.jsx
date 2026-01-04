import "../styles/Footer.css";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Logo */}
        <div className="footer-col">
          <div className="footer-logo-box">
            <img src={logo} alt="FodieShop Logo" />
          </div>
          <p className="footer-desc">
            FodieShop – Nơi mua sắm tiện lợi, nhanh chóng và đáng tin cậy.
          </p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <p>Email: fodie@gmail.com</p>
          <p>Hotline: 0123 456 789</p>
          <p>Địa chỉ: TP.HCM</p>
        </div>

        {/* Cột 3: Chính sách */}
        <div className="footer-col">
          <h4>Chính sách</h4>
          <ul>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="footer-col">
          <h4>Kết nối với chúng tôi</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Zalo</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © 2025 FodieShop. All rights reserved.
      </div>
    </footer>
  );
}
