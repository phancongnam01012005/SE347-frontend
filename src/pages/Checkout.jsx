import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "../styles/Checkout.css";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD hoặc MOMO

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!user) navigate("/login", { state: { from: "/checkout" } });
    else if (cartItems.length === 0) navigate("/");
  }, [user, cartItems, navigate]);

  const onSubmit = async (data) => {
    if (!user) return;
    if (cartItems.length === 0) return;

    const orderRequest = {
      userId: user.userId,
      shippingAddress: data.address,
      items: cartItems.map((item) => ({
        productid: item.id,
        qty: item.quantity,
      })),
    };

    try {
      // 1️⃣ Tạo đơn hàng
      const orderResponse = await api.post("order/create-new-order", orderRequest);
      const orderId = orderResponse.data.orderId;

      if (paymentMethod === "MOMO") {
        // 2️⃣ Thanh toán Momo
        const paymentResponse = await api.post("/public/api/payment/momo", {
          orderId,
          amount: totalAmount,
        });

        const { payUrl } = paymentResponse.data;
        clearCart();
        window.location.href = payUrl; // redirect sang Momo
      } else {
        // 3️⃣ COD
        clearCart();
        alert(`Đơn hàng ${orderId} đã tạo thành công!`);
        navigate("/orders");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Có lỗi khi tạo đơn / thanh toán");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Thanh toán</h1>
      <h3 className="total-amount">Tổng tiền: {totalAmount.toLocaleString()} đ</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Họ tên"
          {...register("name", { required: "Vui lòng nhập họ tên" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          placeholder="Số điện thoại"
          {...register("phone", {
            required: "Vui lòng nhập số điện thoại",
            pattern: {
              value: /^[0-9]{9,12}$/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}

        <input
          placeholder="Địa chỉ giao hàng"
          {...register("address", { required: "Vui lòng nhập địa chỉ" })}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}

        <div className="payment-method">
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label>
            <input
              type="radio"
              value="MOMO"
              checked={paymentMethod === "MOMO"}
              onChange={() => setPaymentMethod("MOMO")}
            />
            Thanh toán Momo
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || cartItems.length === 0}
        >
          {isSubmitting ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
        </button>
      </form>
    </div>
  );
}
