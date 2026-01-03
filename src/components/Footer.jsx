// src/components/Footer.jsx
import "../styles/Footer.css";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo & giới thiệu */}
        <div className="footer-section">
          <img src={logo} alt="FodieShop" className="footer-logo" />
          <p>
            FodieShop – Nền tảng mua bán đồ ăn tiện lợi, nhanh chóng và an toàn.
          </p>
        </div>

        {/* Liên hệ */}
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>Email: fodie@gmail.com</p>
          <p>Hotline: 0123 456 789</p>
          <p>Địa chỉ: TP.HCM</p>
        </div>

        {/* Chính sách */}
        <div className="footer-section">
          <h4>Chính sách</h4>
          <ul>
            <li>Chính sách bảo mật</li>
            <li>Chính sách đổi trả</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        {/* Link nhanh */}
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Giỏ hàng</li>
            <li>Đơn hàng</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <div className="social-icons">
            <span>🌐 Facebook</span>
            <span>📷 Instagram</span>
            <span>▶️ YouTube</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 FodieShop. All rights reserved.
      </div>
    </footer>
  );
}
