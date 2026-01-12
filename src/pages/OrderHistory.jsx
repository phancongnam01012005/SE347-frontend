import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/order-by-user");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="order-loading">Đang tải đơn hàng...</p>;
  if (error) return <p className="order-error">{error}</p>;

  return (
    <div className="order-container">
      <h1 className="order-title">Lịch sử đơn hàng</h1>

      {orders.length === 0 && (
        <p className="order-empty">Chưa có đơn hàng nào</p>
      )}

      {orders.map((order) => (
        <div
          key={order.orderID}
          className="order-card"
          onClick={() => navigate(`/orders/${order.orderID}`)}
        >
          <div className="order-header">
            <span className="order-id">
              <p><b>Mã đơn hàng: </b> {order.orderID}</p>
            </span>
            <span className={`order-status ${order.status}`}>
              {order.status}
            </span>
          </div>
          {order.buyer && (
            <div className="order-footer">
              <p><b>Địa chỉ:</b> {order.shippingAddress}</p>
              <p><b>Thanh toán:</b> {order.paymentMethod}</p>
              {/* <p><b>Người mua:</b> {order.buyer.name}</p>
              <p><b>Email:</b> {order.buyer.email}</p> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}