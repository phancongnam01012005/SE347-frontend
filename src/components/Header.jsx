import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <header style={styles.header}>
      {/* LEFT */}
      <NavLink to="/">
        <img src={logo} alt="FoodieShop" style={styles.logo} />
      </NavLink>

      {/* CENTER */}
      <nav style={styles.nav}>
        <NavLink to="/" end style={navLinkStyle}>
          Trang chủ
        </NavLink>

        <NavLink to="/cart" style={navLinkStyle}>
          Giỏ hàng
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </NavLink>
        <NavLink to="/orders" style={navLinkStyle}>
          Đơn hàng
        </NavLink>
      </nav>

      {/* RIGHT */}
      <div style={styles.auth}>
        {user ? (
          <button onClick={handleLogout} style={styles.logout}>
            Đăng xuất
          </button>
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
      </div>
    </header>
  );
}

/* ACTIVE LINK */
const navLinkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: 600,
  color: isActive ? "#ff7a18" : "#000",
  position: "relative",
});

/* STYLE */
const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: {
    height: 40,
  },
  nav: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  auth: {
    display: "flex",
    gap: 10,
  },
  badge: {
    marginLeft: 6,
    background: "#ff4d4f",
    color: "#fff",
    borderRadius: "999px",
    padding: "2px 8px",
    fontSize: 12,
  },
  login: {
    border: "1px solid #ff7a18",
    color: "#ff7a18",
    padding: "6px 12px",
    borderRadius: 6,
    textDecoration: "none",
  },
  register: {
    background: "#ff7a18",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 6,
    textDecoration: "none",
  },
  logout: {
    background: "#eee",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
