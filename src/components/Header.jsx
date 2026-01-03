import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getCart } from "../utils/storage";

export default function Header() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={styles.header}>
      {/* LEFT */}
      <div style={styles.left}>
        <img src={logo} alt="FoodieShop Logo" style={styles.logo} />
      </div>

      {/* CENTER */}
      <nav style={styles.nav}>
        <NavLink to="/" end style={navLinkStyle}>
          Trang chủ
        </NavLink>

        <NavLink to="/cart" style={navLinkStyle}>
          Giỏ hàng ({totalItems})
        </NavLink>

        <NavLink to="/orders" style={navLinkStyle}>
          Đơn hàng
        </NavLink>
      </nav>

      {/* RIGHT */}
      <div style={styles.auth}>
        <button style={styles.login}>Đăng nhập</button>
        <button style={styles.register}>Đăng ký</button>
      </div>
    </header>
  );
}

/* STYLE CHO NAVLINK (ACTIVE / INACTIVE) */
const navLinkStyle = ({ isActive }) => ({
  position: "relative",
  color: isActive ? "#ff7a18" : "#000",
  textDecoration: "none",
  fontWeight: 600,
  paddingBottom: "4px",
  transition: "color 0.2s ease",
  borderBottom: isActive ? "2px solid #ff7a18" : "2px solid transparent",
});

/* STYLE CHUNG */
const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 24px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    width: "auto",
    objectFit: "contain",
  },
  nav: {
    display: "flex",
    gap: "24px",
  },
  auth: {
    display: "flex",
    gap: "10px",
  },
  login: {
    background: "transparent",
    border: "1px solid #ff7a18",
    color: "#ff7a18",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  register: {
    background: "#ff7a18",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
