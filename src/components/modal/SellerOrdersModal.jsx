import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, ArrowLeft, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function SellerOrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'ORD20260118001',
      date: '18/01/2026 14:30',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0901234567',
      status: 'pending',
      items: [
        {
          name: 'Trà Sữa Trân Châu Đường Đen',
          quantity: 2,
          price: 35000,
          image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=100&h=100&fit=crop'
        }
      ],
      total: 70000,
      shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      paymentMethod: 'COD'
    },
    {
      id: '2',
      orderNumber: 'ORD20260117002',
      date: '17/01/2026 10:15',
      customerName: 'Trần Thị B',
      customerPhone: '0912345678',
      status: 'processing',
      items: [
        {
          name: 'Snack Khoai Tây Lay\'s Vị Phô Mai',
          quantity: 3,
          price: 15000,
          image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop'
        }
      ],
      total: 45000,
      shippingAddress: '456 Lê Lợi, Quận 3, TP.HCM',
      paymentMethod: 'Ví MoMo'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'bg-yellow-500' },
    processing: { label: 'Đang xử lý', icon: Package, color: 'bg-blue-500' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'bg-purple-500' },
    delivered: { label: 'Đã giao', icon: CheckCircle, color: 'bg-green-500' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === 'delivered' || order.status === 'cancelled') {
      toast.error('Không thể cập nhật đơn hàng đã hoàn thành hoặc đã hủy');
      return;
    }

    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    
    // Nếu đang ở trang chi tiết, cập nhật luôn view chi tiết
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
    
    toast.success(`Cập nhật trạng thái: ${statusConfig[newStatus].label}`);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-2xl border-none">
        <DialogHeader className="p-6 bg-gray-50/50 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-[#EE4D2D]" />
            Quản lý đơn hàng của quán
          </DialogTitle>
          <DialogDescription>Theo dõi và cập nhật tiến độ chuẩn bị món ăn cho khách hàng</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {!selectedOrder ? (
            <div className="space-y-6">
              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-[#EE4D2D] hover:bg-[#EE4D2D]/90' : 'rounded-full'}
                >
                  Tất cả ({orders.length})
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

              {/* List View */}
              <div className="grid gap-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status].icon;
                    const canUpdate = order.status !== 'delivered' && order.status !== 'cancelled';
                    
                    return (
                      <div key={order.id} className="border rounded-2xl p-5 hover:shadow-md transition-all bg-white group">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-lg">{order.orderNumber}</span>
                              <Badge className={`${statusConfig[order.status].color} text-white border-none rounded-full`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[order.status].label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {order.date}</div>
                              <div className="flex items-center gap-1 font-medium text-foreground"><User className="w-4 h-4" /> {order.customerName}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {canUpdate && (
                              <Select
                                value={order.status}
                                onValueChange={(val) => handleUpdateStatus(order.id, val)}
                              >
                                <SelectTrigger className="w-[160px] h-9 text-xs rounded-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                                  <SelectItem value="processing">Chuẩn bị món</SelectItem>
                                  <SelectItem value="shipping">Đang giao hàng</SelectItem>
                                  <SelectItem value="delivered">Đã giao</SelectItem>
                                  <SelectItem value="cancelled">Hủy đơn</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)} className="rounded-full h-9">
                              <Eye className="w-4 h-4 mr-2" /> Chi tiết
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">{order.items.length} món ăn | {order.paymentMethod}</p>
                          <p className="font-bold text-[#EE4D2D] text-lg">{order.total.toLocaleString()}đ</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-muted-foreground">Không tìm thấy đơn hàng nào ở trạng thái này.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Detail View */
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)} className="gap-2 -ml-2 hover:bg-orange-50 text-[#EE4D2D]">
                <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
              </Button>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Order Status & Info */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6 border">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Mã đơn: {selectedOrder.orderNumber}</h3>
                      <Badge className={`${statusConfig[selectedOrder.status].color} text-white px-4 py-1 rounded-full`}>
                        {statusConfig[selectedOrder.status].label}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Thông tin khách hàng</p>
                        <div className="text-sm space-y-1">
                          <p className="font-bold">{selectedOrder.customerName}</p>
                          <p className="text-muted-foreground">{selectedOrder.customerPhone}</p>
                          <p className="text-muted-foreground leading-relaxed mt-2 italic">{selectedOrder.shippingAddress}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Thanh toán</p>
                        <div className="text-sm">
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                          <p className="text-[#EE4D2D] font-bold text-lg mt-1">{selectedOrder.total.toLocaleString()}đ</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold">Danh sách món ăn</p>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border group hover:border-[#EE4D2D]/30 transition-colors">
                        <img src={item.image} className="w-16 h-16 rounded-lg object-cover shadow-sm" alt="" />
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.price.toLocaleString()}đ x {item.quantity}</p>
                        </div>
                        <p className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="space-y-4">
                  <div className="border rounded-2xl p-6 bg-white shadow-sm space-y-4">
                    <p className="text-sm font-bold">Cập nhật đơn hàng</p>
                    <div className="space-y-4">
                      {['pending', 'processing', 'shipping'].includes(selectedOrder.status) ? (
                        <div className="space-y-3">
                          <Label className="text-xs text-muted-foreground">Chuyển trạng thái sang:</Label>
                          <Select 
                            value={selectedOrder.status}
                            onValueChange={(val) => handleUpdateStatus(selectedOrder.id, val)}
                          >
                            <SelectTrigger className="w-full h-11 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Chờ xác nhận</SelectItem>
                              <SelectItem value="processing">Chuẩn bị món</SelectItem>
                              <SelectItem value="shipping">Giao cho shipper</SelectItem>
                              <SelectItem value="delivered">Hoàn tất đơn</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                            * Lưu ý: Khi chuyển sang "Đã giao" hoặc "Hủy", bạn sẽ không thể thay đổi lại trạng thái đơn hàng.
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-dashed">
                          <Info className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">Đơn hàng đã kết thúc xử lý</span>
                        </div>
                      )}
                      
                      {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                        <Button 
                          variant="destructive" 
                          className="w-full h-11 rounded-xl font-bold"
                          onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                        >
                          <XCircle className="w-4 h-4 mr-2" /> Hủy đơn hàng này
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Component phụ hiển thị thông báo nếu cần (Giả định)
function Info({ className, ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}