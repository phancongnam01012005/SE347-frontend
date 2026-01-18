import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/**
 * SellerOrdersModal Component
 * Giao diện dành riêng cho Người bán để quản lý luồng đơn hàng từ khách hàng.
 */
export function SellerOrdersModal({ isOpen, onClose }) {
  // Dữ liệu mẫu dành cho Seller
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
          name: "Snack Khoai Tây Lay's Vị Phô Mai",
          quantity: 3,
          price: 15000,
          image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop'
        }
      ],
      total: 45000,
      shippingAddress: '456 Lê Lợi, Quận 3, TP.HCM',
      paymentMethod: 'MoMo'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Cấu hình trạng thái
  const statusConfig = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'bg-yellow-500' },
    processing: { label: 'Đang chuẩn bị', icon: Package, color: 'bg-blue-500' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'bg-purple-500' },
    delivered: { label: 'Đã giao', icon: CheckCircle, color: 'bg-green-500' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === 'delivered' || order.status === 'cancelled') {
      toast.error('Đơn hàng này đã kết thúc, không thể thay đổi trạng thái');
      return;
    }

    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    
    toast.success(`Trạng thái mới: ${statusConfig[newStatus].label}`);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-0 border-none">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-white border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Kênh Quản Lý Đơn Hàng</DialogTitle>
            <DialogDescription className="text-sm font-medium">Theo dõi và xử lý các yêu cầu từ khách hàng của bạn</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Lọc trạng thái (Dạng Tabs ngang) */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className={`rounded-full px-5 font-bold ${filterStatus === 'all' ? 'bg-[#EE4D2D] hover:bg-[#d73a1e]' : ''}`}
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
                  className={`rounded-full px-5 font-bold ${filterStatus === status ? 'bg-[#EE4D2D] hover:bg-[#d73a1e]' : ''}`}
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5" />
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>

          {/* HIỂN THỊ DANH SÁCH HOẶC CHI TIẾT */}
          {!selectedOrder ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                const canUpdate = order.status !== 'delivered' && order.status !== 'cancelled';
                
                return (
                  <div key={order.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-all bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-gray-900">#{order.orderNumber}</span>
                          <Badge className={`${statusConfig[order.status].color} text-white border-none px-3 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider`}>
                            <StatusIcon className="w-3 h-3 mr-1.5" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-gray-400">
                          <span>📅 {order.date}</span>
                          <span className="text-[#EE4D2D]">👤 {order.customerName} - {order.customerPhone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {canUpdate && (
                          <Select
                            value={order.status}
                            onValueChange={(val) => handleUpdateStatus(order.id, val)}
                          >
                            <SelectTrigger className="w-[160px] h-9 rounded-xl border-gray-200 text-xs font-bold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="pending">Chờ xác nhận</SelectItem>
                              <SelectItem value="processing">Bắt đầu chuẩn bị</SelectItem>
                              <SelectItem value="shipping">Giao cho shipper</SelectItem>
                              <SelectItem value="delivered">Hoàn tất đơn</SelectItem>
                              <SelectItem value="cancelled">Hủy đơn này</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-9 rounded-xl font-bold bg-gray-100 hover:bg-gray-200"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-1.5" /> Chi tiết
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
                      <p className="text-xs text-gray-500 font-medium italic truncate max-w-[70%]">📍 {order.shippingAddress}</p>
                      <p className="text-lg font-black text-[#EE4D2D]">{order.total.toLocaleString()}đ</p>
                    </div>
                  </div>
                );
              })}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Chưa có đơn hàng nào</p>
                </div>
              )}
            </div>
          ) : (
            /* CHI TIẾT ĐƠN HÀNG DÀNH CHO SELLER */
            <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
              <button onClick={() => setSelectedOrder(null)} className="text-sm font-black text-[#EE4D2D] flex items-center gap-1.5 hover:translate-x-[-4px] transition-transform">
                <ChevronLeft size={18} /> QUAY LẠI DANH SÁCH
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border rounded-3xl p-8 space-y-6 shadow-sm">
                    <h3 className="font-black text-xl border-l-4 border-[#EE4D2D] pl-4">Thông tin món ăn</h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-5 p-4 bg-gray-50 rounded-2xl">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-sm border-2 border-white" />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Số lượng: <span className="text-[#EE4D2D] font-black">x{item.quantity}</span></p>
                          </div>
                          <p className="font-black text-gray-900">{(item.price * item.quantity).toLocaleString()}đ</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-dashed">
                      <span className="font-bold text-gray-400 uppercase tracking-tighter">Tổng doanh thu đơn:</span>
                      <span className="text-3xl font-black text-[#EE4D2D]">{selectedOrder.total.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 space-y-4">
                    <h4 className="font-black text-sm uppercase text-orange-800 tracking-widest">Khách hàng</h4>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-900 text-lg">{selectedOrder.customerName}</p>
                      <p className="text-sm font-bold text-[#EE4D2D]">{selectedOrder.customerPhone}</p>
                    </div>
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Địa chỉ nhận hàng</p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-3xl p-6 space-y-4 shadow-sm">
                    <h4 className="font-black text-sm uppercase text-gray-400 tracking-widest">Hành động</h4>
                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' ? (
                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500">Cập nhật trạng thái mới:</Label>
                        <Select
                          value={selectedOrder.status}
                          onValueChange={(val) => {
                            handleUpdateStatus(selectedOrder.id, val);
                            setSelectedOrder({ ...selectedOrder, status: val });
                          }}
                        >
                          <SelectTrigger className="w-full h-12 rounded-xl font-bold border-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="pending">Chờ xác nhận</SelectItem>
                            <SelectItem value="processing">Bắt đầu chuẩn bị</SelectItem>
                            <SelectItem value="shipping">Giao cho shipper</SelectItem>
                            <SelectItem value="delivered">Hoàn tất đơn</SelectItem>
                            <SelectItem value="cancelled">Hủy đơn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-100 rounded-xl text-center">
                        <p className="text-xs font-bold text-gray-500">Đơn hàng này không thể chỉnh sửa</p>
                      </div>
                    )}
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