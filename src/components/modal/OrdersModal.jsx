import { useState , useEffect} from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function OrdersModal({ isOpen, onClose }) {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
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
  const statusConfig = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'bg-yellow-500' },
    processing: { label: 'Đang xử lý', icon: Package, color: 'bg-blue-500' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'bg-purple-500' },
    delivered: { label: 'Đã giao', icon: CheckCircle, color: 'bg-green-500' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' }
  };

  const handleCancelOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order?.status === 'delivered') {
      toast.error('Không thể hủy đơn hàng đã giao thành công');
      return;
    }

    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    ));
    toast.success('Đã hủy đơn hàng');
    setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    setSelectedOrder(null);
    toast.success('Đã xóa đơn hàng khỏi lịch sử');
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold">Đơn hàng của tôi</DialogTitle>
          <DialogDescription>Theo dõi hành trình món ăn của bạn</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Bộ lọc trạng thái */}
            {!selectedOrder && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-[#EE4D2D] hover:bg-[#EE4D2D]/90' : 'rounded-full'}
                >
                  Tất cả
                </Button>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className={`${filterStatus === status ? 'bg-[#EE4D2D] hover:bg-[#EE4D2D]/90' : 'rounded-full'} whitespace-nowrap`}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Danh sách đơn hàng */}
            {!selectedOrder ? (
              <div className="grid gap-4">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <div key={order.id} className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/50 transition-all bg-white shadow-sm hover:shadow-md">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">{order.orderNumber}</span>
                            <Badge className={`${statusConfig[order.status].color} text-white border-none`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[order.status].label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)} className="rounded-full">
                          <Eye className="w-4 h-4 mr-2" /> Xem chi tiết
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {order.items.slice(0, 1).map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <img src={item.image} className="w-16 h-16 rounded-xl object-cover border" alt="" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                              <p className="text-sm font-medium mt-1">{item.price.toLocaleString()}đ</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 1 && (
                          <p className="text-[10px] text-muted-foreground italic">+ và {order.items.length - 1} sản phẩm khác</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
                        <span className="text-sm font-medium">Tổng thanh toán:</span>
                        <span className="text-xl font-bold text-[#EE4D2D]">{order.total.toLocaleString()}đ</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Giao diện chi tiết đơn hàng */
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)} className="mb-2">
                  ← Trở về danh sách
                </Button>

                <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Chi tiết #{selectedOrder.orderNumber}</h3>
                    <Badge className={`${statusConfig[selectedOrder.status].color} text-white`}>
                      {statusConfig[selectedOrder.status].label}
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Địa chỉ giao hàng</p>
                      <p className="text-sm leading-relaxed">{selectedOrder.shippingAddress}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Phương thức thanh toán</p>
                      <p className="text-sm">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Món ăn đã đặt</p>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border">
                        <img src={item.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                        <div className="flex-1">
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Giá: {item.price.toLocaleString()}đ x {item.quantity}</p>
                        </div>
                        <p className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm"><span>Tạm tính</span><span>{selectedOrder.total.toLocaleString()}đ</span></div>
                    <div className="flex justify-between text-sm"><span>Phí vận chuyển</span><span>15.000đ</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 text-[#EE4D2D]">
                      <span>Tổng cộng</span>
                      <span>{(selectedOrder.total + 15000).toLocaleString()}đ</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {['pending', 'processing'].includes(selectedOrder.status) && (
                      <Button variant="outline" className="flex-1 text-red-500 hover:bg-red-50 border-red-200" onClick={() => handleCancelOrder(selectedOrder.id)}>
                        <XCircle className="w-4 h-4 mr-2" /> Hủy đơn hàng
                      </Button>
                    )}
                    <Button variant="destructive" className="flex-1" onClick={() => handleDeleteOrder(selectedOrder.id)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Xóa lịch sử
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}