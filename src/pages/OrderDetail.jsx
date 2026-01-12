import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/OrderDetail.css";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orderitem", {
        params: { orderId },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Lỗi lấy order item:", err);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p>Đang tải đơn hàng ⏳</p>;
  if (!items || items.length === 0)
    return <p>Đơn hàng không có sản phẩm 😢</p>;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.productDTO.price,
    0
  );

  return (
    <div className="order-detail">
      {/* 🔙 Nút trở về */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Trở về
      </button>

      <h2>Chi tiết đơn hàng</h2>

      {items.map((item, index) => (
        <div className="order-item" key={index}>
          <img
            src={item.productDTO.image_url}
            alt={item.productDTO.productName}
          />

          <div className="info">
            <h4>{item.productDTO.productName}</h4>
            <p className="shop">{item.productDTO.shopName}</p>

            <div className="price-row">
              <span>
                Giá:{" "}
                <b>{item.productDTO.price.toLocaleString()} đ</b>
              </span>
              <span>
                SL: <b>{item.quantity}</b>
              </span>
            </div>

            <p className="total">
              Thành tiền:{" "}
              <b>
                {(item.quantity * item.productDTO.price).toLocaleString()} đ
              </b>
            </p>
          </div>
        </div>
      ))}

      <div className="order-summary">
        <h3>
          Tổng cộng:{" "}
          <span>{totalPrice.toLocaleString()} đ</span>
        </h3>
      </div>
    </div>
  );
}
