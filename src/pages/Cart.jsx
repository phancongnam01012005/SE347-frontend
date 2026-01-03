import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return <h2>Giỏ hàng trống</h2>;
  }

  return (
    <div>
      <h1>Giỏ hàng</h1>

      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <h3>{item.name}</h3>
          <p>{item.price.toLocaleString()}đ</p>

          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) =>
              updateQuantity(item.id, Number(e.target.value))
            }
          />

          <button onClick={() => removeFromCart(item.id)}>
            Xóa
          </button>
        </div>
      ))}

      <h2>Tổng tiền: {totalPrice.toLocaleString()}đ</h2>
    </div>
  );
}
