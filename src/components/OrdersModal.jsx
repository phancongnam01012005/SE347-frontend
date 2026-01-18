import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * OrdersModal Component
 * Hiển thị danh sách đơn hàng đã đặt, cho phép lọc theo trạng thái và xem chi tiết.
 */
export function OrdersModal({ isOpen, onClose }) {
  // Dữ liệu mẫu (Mock Data)
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'ORD20260118001',
      date: '18/01/2026 14:30',
      status: 'delivered',
      items: [
        {
          name: 'Trà Sữa Trân Châu Đường Đen',
          quantity: 2,
          price: 35000,
          image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=100&h=100&fit=crop'
        },
        {
          name: "Snack Khoai Tây Lay's Vị Phô Mai",
          quantity: 1,
          price: 15000,
          image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop'
        }
      ],
      total: 85000,
      shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      paymentMethod: 'COD'
    },
    {
      id: '2',
      orderNumber: 'ORD20260117002',
      date: '17/01/2026 10:15',
      status: 'shipping',
      items: [
        {
          name: 'Pizza Hải Sản Cao Cấp',
          quantity: 1,
          price: 129000,
          image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop'
        }
      ],
      total: 129000,
      shippingAddress: '456 Lê Lợi, Quận 3, TP.HCM',
      paymentMethod: 'MoMo'
    },
    {
      id: '3',
      orderNumber: 'ORD20260116003',
      date: '16/01/2026 16:45',
      status: 'processing',
      items: [
        {
          name: 'Gà Rán Giòn Tan (8 Miếng)',
          quantity: 1,
          price: 89000,
          image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=100&h=100&fit=crop'
        }
      ],
      total: 89000,
      shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      paymentMethod: 'ZaloPay'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Cấu hình hiển thị trạng thái
  const statusConfig = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'bg-yellow-500' },
    processing: { label: 'Đang xử lý', icon: Package, color: 'bg-blue-500' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'bg-purple-500' },
    delivered: { label: 'Đã giao', icon: CheckCircle, color: 'bg-green-500' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' }
  };

  const handleCancelOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === 'delivered') {
      toast.error('Không thể hủy đơn hàng đã giao thành công');
      return;
    }

    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    ));
    toast.success('Đã hủy đơn hàng');
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    setSelectedOrder(null);
    toast.success('Đã xóa đơn hàng');
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#EE4D2D]">Đơn hàng của tôi</DialogTitle>
          <DialogDescription>Theo dõi hành trình món ăn của bạn</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bộ lọc trạng thái */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-[#EE4D2D] hover:bg-[#d73a1e] font-bold' : ''}
            >
              Tất cả ({orders.length})
            </Button>
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = orders.filter(o => o.status === status).length;
              const Icon = config.icon;
              return (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={filterStatus === status ? 'bg-[#EE4D2D] hover:bg-[#d73a1e] font-bold' : ''}
                >
                  <Icon className="w-4 h-4 mr-1.5" />
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>

          {/* Danh sách đơn hàng */}
          {!selectedOrder ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <div key={order.id} className="border rounded-xl p-5 hover:border-orange-200 hover:shadow-sm transition-all bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-bold text-gray-900">{order.orderNumber}</span>
                          <Badge className={`${statusConfig[order.status].color} text-white border-0`}>
                            <StatusIcon className="w-3 h-3 mr-1.5" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">{order.date}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#EE4D2D] hover:bg-orange-50 font-bold"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        Chi tiết
                      </Button>
                    </div>

                    {/* Xem trước sản phẩm */}
                    <div className="space-y-3 mb-4">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">Số lượng: x{item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{item.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-[11px] text-gray-400 italic">
                          ...và {order.items.length - 2} sản phẩm khác
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng thanh toán</span>
                      <span className="text-lg font-black text-[#EE4D2D]">
                        {order.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredOrders.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-bold">Không tìm thấy đơn hàng nào</p>
                </div>
              )}
            </div>
          ) : (
            /* Chế độ xem chi tiết đơn hàng */
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-sm font-bold text-[#EE4D2D] hover:underline flex items-center gap-2"
              >
                ← Quay lại danh sách
              </button>

              <div className="border rounded-2xl p-6 bg-white shadow-sm space-y-6">
                <div className="flex items-start justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Mã đơn: #{selectedOrder.orderNumber}</h3>
                    <p className="text-sm text-gray-400">{selectedOrder.date}</p>
                  </div>
                  <Badge className={`${statusConfig[selectedOrder.status].color} text-white px-4 py-1`}>
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Địa chỉ giao hàng</p>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">{selectedOrder.shippingAddress}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Hình thức thanh toán</p>
                    <p className="text-sm font-medium text-gray-700">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Danh sách món ăn</p>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Số lượng: x{item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Tạm tính:</span>
                    <span>{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Phí vận chuyển:</span>
                    <span>15.000đ</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-2xl font-black text-[#EE4D2D]">
                      {(selectedOrder.total + 15000).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                    <Button
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 font-bold h-12"
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Hủy đơn hàng
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 text-gray-500 hover:bg-gray-100 font-bold h-12"
                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa đơn
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}