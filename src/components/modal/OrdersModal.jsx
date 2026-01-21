import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Package, Clock, CheckCircle, ChevronLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function OrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: '9a24c8f7-9139-1103-955d-e8c8f2d33abf',
      date: '18/01/2026 14:30',
      status: 'payment_pending',
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
      shippingAddress: 'Dormitory Zone B, Nguyen Du',
      paymentMethod: 'MOMO'
    },
    {
      id: '2',
      orderNumber: '8b13d7e6-8028-2204-844c-d7b7e1c22bce',
      date: '17/01/2026 10:15',
      status: 'paid',
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
      orderNumber: '7c02b5d4-7017-1103-733b-c6a6d0b11aad',
      date: '16/01/2026 16:45',
      status: 'paid',
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
      paymentMethod: 'COD'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    payment_pending: { label: 'Chờ thanh toán', icon: Clock, color: 'bg-orange-500', textColor: 'text-orange-600' },
    paid: { label: 'Đã thanh toán', icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-600' }
  };

  const handlePaymentMomo = (orderId) => {
    // Mock payment process
    toast.success('Đang chuyển hướng đến MoMo để thanh toán...');
    
    // Simulate payment success after 2 seconds
    setTimeout(() => {
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, status: 'paid' } : o
      ));
      toast.success('Thanh toán thành công!');
      setSelectedOrder(null);
    }, 2000);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đơn hàng của tôi</DialogTitle>
          <DialogDescription>Quản lý và theo dõi đơn hàng của bạn</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-[#EE4D2D] hover:bg-[#EE4D2D]/90' : ''}
            >
              Tất cả ({orders.length})
            </Button>
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = orders.filter(o => o.status === status).length;
              return (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={filterStatus === status ? 'bg-[#EE4D2D] hover:bg-[#EE4D2D]/90' : ''}
                >
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>

          {/* Orders List */}
          {!selectedOrder ? (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="space-y-3">
                      {/* Mã đơn hàng */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Mã đơn hàng:</p>
                        <p className="font-medium text-sm">{order.orderNumber}</p>
                      </div>

                      {/* Địa chỉ */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Địa chỉ:</p>
                        <p className="text-sm">{order.shippingAddress}</p>
                      </div>

                      {/* Phương thức thanh toán */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Phương thức thanh toán:</p>
                        <p className="text-sm">{order.paymentMethod}</p>
                      </div>

                      {/* Trạng thái */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Trạng thái:</p>
                        <Badge className={`${statusConfig[order.status].color} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[order.status].label.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Nút xem chi tiết */}
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Không có đơn hàng nào</p>
                </div>
              )}
            </div>
          ) : (
            // Order Detail View
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Quay lại
              </Button>

              <div className="border rounded-lg p-4 md:p-6">
                {/* Header */}
                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 text-sm md:text-base">
                        Mã đơn hàng: {selectedOrder.orderNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedOrder.date}</p>
                    </div>
                    <Badge className={`${statusConfig[selectedOrder.status].color} text-white whitespace-nowrap`}>
                      {statusConfig[selectedOrder.status].label.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Địa chỉ:</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.shippingAddress}</p>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Thanh toán:</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.paymentMethod}</p>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">Sản phẩm đã đặt</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Số lượng: x{item.quantity}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                        <span className="font-medium text-sm md:text-base whitespace-nowrap">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Tổng số tiền:</span>
                    <span className="text-lg font-medium text-[#EE4D2D]">
                      {selectedOrder.total.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                {/* Payment Button for pending orders */}
                {selectedOrder.status === 'payment_pending' && selectedOrder.paymentMethod === 'MOMO' && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      className="w-full bg-[#A50064] hover:bg-[#A50064]/90 text-white"
                      size="lg"
                      onClick={() => handlePaymentMomo(selectedOrder.id)}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Thanh toán qua MoMo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}