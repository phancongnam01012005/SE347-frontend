import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🛒 Giỏ hàng trống</h2>
        <p>Thêm sản phẩm vô đi 😅</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 20 }}>🛒 Giỏ hàng</h1>

      {cartItems.map((item) => {
        const itemTotal = item.price * item.quantity;

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                background: "#f5f5f5",
                borderRadius: 8,
              }}
            />

            {/* INFO */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: "4px 0", color: "#666" }}>
                Đơn giá: {item.price.toLocaleString()}đ
              </p>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Thành tiền:{" "}
                <span style={{ color: "#d0011b" }}>
                  {itemTotal.toLocaleString()}đ
                </span>
              </p>
            </div>

            {/* QUANTITY */}
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, Number(e.target.value))
              }
              style={{
                width: 60,
                padding: 6,
                textAlign: "center",
              }}
            />

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
        );
      })}

      {/* FOOTER */}
      <div
        style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: "2px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          Tổng tiền:{" "}
          <span style={{ color: "#d0011b" }}>
            {totalPrice.toLocaleString()}đ
          </span>
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "#ff7a18",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Thanh toán ➜
        </button>
      </div>
    </div>
  );
}
