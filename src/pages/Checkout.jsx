import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart, getOrders, saveOrders } from "../utils/storage";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = getCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: form,
      items: cart,
      total,
      status: "Đã đặt",
      createdAt: new Date().toLocaleString(),
    };

    const orders = getOrders();
    saveOrders([...orders, newOrder]);
    saveCart([]); // clear cart

    navigate("/orders");
  };

  return (
    <div>
      <h1>Thanh toán</h1>

      <input
        placeholder="Họ tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Số điện thoại"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <br />

      <input
        placeholder="Địa chỉ giao hàng"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <br />

      <h3>Tổng tiền: {total.toLocaleString()} đ</h3>

      <button onClick={handleSubmit}>Đặt hàng (COD)</button>
    </div>
  );
}
