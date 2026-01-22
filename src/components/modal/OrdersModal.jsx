import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Package, Clock, CheckCircle, ChevronLeft, 
  CreditCard, Loader2, AlertCircle, ShoppingBag 
} from 'lucide-react';
import { toast } from 'sonner';
import api from "../../service/api";

export function OrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State cho phần chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    PAYMENT_PENDING: { label: 'Chờ thanh toán', icon: Clock, color: 'bg-orange-500' },
    PAID: { label: 'Đã thanh toán', icon: CheckCircle, color: 'bg-green-500' },
    PENDING: { label: 'Đang xử lý', icon: Clock, color: 'bg-blue-500' },
    CANCELLED: { label: 'Đã hủy', icon: AlertCircle, color: 'bg-red-500' }
  };

  const getStatusConfig = (status) => {
    return statusConfig[status] || { label: status, icon: Package, color: 'bg-gray-500' };
  };

  // 1. Lấy danh sách đơn hàng của User
  useEffect(() => {
    if (isOpen) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const res = await api.get("/order/order-by-user");
          setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          setError("Không thể tải lịch sử đơn hàng.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isOpen]);

  // 2. Lấy chi tiết sản phẩm khi nhấn vào 1 đơn hàng
  const handleViewDetail = async (order) => {
    setSelectedOrder(order);
    setItemsLoading(true);
    setOrderItems([]); // Reset lại danh sách cũ

    try {
      const res = await api.get("/orderitem", {
        params: { 
          orderId: order.orderID 
        },
      });
      
      setOrderItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi lấy Order Items:", err);
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setItemsLoading(false);
    }
  };

  // 3. Tính tổng tiền từ danh sách items (Đảm bảo chính xác hơn từ API)
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.productDTO.price,
    0
  );

  // 4. Thanh toán MoMo
  const handlePaymentMomo = async () => {
    if (!totalPrice || totalPrice <= 0) {
      toast.error("Số tiền không hợp lệ.");
      return;
    }

    toast.promise(
      api.post("/public/api/payment/momo", {
        orderId: selectedOrder.orderID,
        amount: totalPrice,
      }),
      {
        loading: 'Đang khởi tạo giao dịch MoMo...',
        success: (res) => {
          if (res.data?.payUrl) {
            window.location.href = res.data.payUrl;
            return 'Đang chuyển hướng...';
          }
          throw new Error('Lỗi liên kết thanh toán.');
        },
        error: 'Lỗi khi tạo thanh toán.'
      }
    );
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 border-b bg-slate-50/50">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <ShoppingBag className="text-[#EE4D2D]" /> Đơn hàng của tôi
          </DialogTitle>
          <DialogDescription className="pb-4">Quản lý các sản phẩm bạn đã đặt mua</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#EE4D2D]" />
            </div>
          ) : (
            <div className="space-y-6">
              {!selectedOrder ? (
                <>
                  {/* Danh sách Đơn hàng (Thu gọn) */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Button variant={filterStatus === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('all')} className={filterStatus === 'all' ? 'bg-[#EE4D2D]' : ''}>
                      Tất cả
                    </Button>
                    {/* ... (các button lọc khác giữ nguyên) */}
                  </div>

                  <div className="grid gap-4">
                    {filteredOrders.map((order) => (
                      <div key={order.orderID} className="border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetail(order)}>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <span className="font-mono text-xs text-slate-400">#{order.orderID.slice(0,8)}</span>
                            <p className="font-bold text-slate-700">{order.shippingAddress}</p>
                            <Badge className={getStatusConfig(order.status).color + " text-white border-none"}>
                              {getStatusConfig(order.status).label}
                            </Badge>
                          </div>
                          <ChevronLeft className="rotate-180 text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* GIAO DIỆN CHI TIẾT SẢN PHẨM (GIỐNG ORDERDETAIL) */
                <div className="animate-in slide-in-from-right-5 duration-300">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)} className="mb-4 -ml-2">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Trở về danh sách
                  </Button>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-b pb-2">Sản phẩm trong đơn hàng</h3>
                    
                    {itemsLoading ? (
                      <div className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-[#EE4D2D]" /></div>
                    ) : (
                      <>
                        {orderItems.map((item, index) => (
                          <div className="flex gap-4 p-4 border rounded-xl bg-slate-50/30" key={index}>
                            <img 
                              src={item.productDTO.image_url} 
                              alt={item.productDTO.productName} 
                              className="w-20 h-20 object-cover rounded-lg border bg-white" 
                            />
                            <div className="flex-1 space-y-1">
                              <h4 className="font-bold text-slate-800 line-clamp-1">{item.productDTO.productName}</h4>
                              <p className="text-xs text-slate-500 italic">Shop: {item.productDTO.shopName}</p>
                              <div className="flex justify-between items-center pt-1">
                                <p className="text-sm">
                                  {item.productDTO.price.toLocaleString()}đ x <b>{item.quantity}</b>
                                </p>
                                <p className="font-bold text-[#EE4D2D]">
                                  {(item.quantity * item.productDTO.price).toLocaleString()}đ
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="mt-8 bg-slate-900 text-white p-6 rounded-2xl">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-400">Tổng thanh toán:</span>
                            <span className="text-2xl font-black text-[#EE4D2D]">{totalPrice.toLocaleString()}đ</span>
                          </div>

                          {selectedOrder.status === 'PAYMENT_PENDING' && (
                            <Button 
                              onClick={handlePaymentMomo}
                              className="w-full bg-[#A50064] hover:bg-[#820050] h-14 text-lg font-bold"
                            >
                              <CreditCard className="mr-2" /> Thanh toán qua MoMo
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}