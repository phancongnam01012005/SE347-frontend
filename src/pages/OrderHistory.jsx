import { getOrders } from "../utils/storage";

export default function OrderHistory() {
  const orders = getOrders();

  return (
    <div>
      <h1>Lịch sử đơn hàng</h1>

      {orders.length === 0 && <p>Chưa có đơn hàng nào</p>}

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p><b>Mã đơn:</b> {order.id}</p>
          <p><b>Ngày:</b> {order.createdAt}</p>
          <p><b>Tổng:</b> {order.total.toLocaleString()} đ</p>
          <p><b>Trạng thái:</b> {order.status}</p>
        </div>
      ))}
    </div>
  );
}
