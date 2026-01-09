import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getCart } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      {/* LEFT */}
      <div style={styles.left}>
        <NavLink to="/">
          <img src={logo} alt="FoodieShop Logo" style={styles.logo} />
        </NavLink>
      </div>

      {/* CENTER */}
      <nav style={styles.nav}>
        <NavLink to="/" end style={navLinkStyle}>
          Trang chủ
        </NavLink>

        <NavLink to="/cart" style={navLinkStyle}>
          Giỏ hàng ({totalItems})
        </NavLink>

        {user && (
          <NavLink to="/orders" style={navLinkStyle}>
            Đơn hàng
          </NavLink>
        )}
      </nav>

      {/* RIGHT */}
      <div style={styles.auth}>
        {user ? (
          <div style={styles.dropdown}>
            <span style={styles.user}>👤 {user.name || user.email}</span>

            <div style={styles.dropdownMenu}>
              <NavLink to="/orders">Đơn hàng</NavLink>
              <button onClick={logout}>Đăng xuất</button>
            </div>
          </div>
        ) : (
          <>
            <NavLink to="/login" style={styles.login}>
              Đăng nhập
            </NavLink>
            <NavLink to="/register" style={styles.register}>
              Đăng ký
            </NavLink>
          </>
        )}

        {totalItems > 0 && (
          <span style={styles.badge}>{totalItems}</span>
        )}
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
    textDecoration: "none",
    background: "transparent",
    border: "1px solid #ff7a18",
    color: "#ff7a18",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
  },
  register: {
    textDecoration: "none",
    background: "#ff7a18",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  user: {
  fontWeight: 500,
  color: "#333",
  },
  logout: {
    background: "#eee",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
  },

};

