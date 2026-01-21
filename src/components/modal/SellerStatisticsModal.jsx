import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { TrendingUp, DollarSign, Package, ShoppingCart, Star, Trophy, ArrowUpRight } from 'lucide-react';

export function SellerStatisticsModal({ isOpen, onClose }) {
  // Dữ liệu thống kê mẫu
  const stats = {
    totalRevenue: 5450000,
    totalOrders: 87,
    totalProducts: 24,
    averageRating: 4.8,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3
  };

  const topProducts = [
    {
      id: '1',
      name: 'Trà Sữa Trân Châu Đường Đen',
      sold: 120,
      revenue: 4200000,
      image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Snack Khoai Tây Lay\'s Vị Phô Mai',
      sold: 85,
      revenue: 1275000,
      image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'Pizza Hải Sản Cao Cấp',
      sold: 45,
      revenue: 5805000,
      image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop'
    }
  ];

  const recentOrders = [
    {
      id: '1',
      orderNumber: 'ORD20260118001',
      date: '18/01/2026 14:30',
      customer: 'Nguyễn Văn A',
      total: 70000,
      status: 'delivered'
    },
    {
      id: '2',
      orderNumber: 'ORD20260117002',
      date: '17/01/2026 10:15',
      customer: 'Trần Thị B',
      total: 45000,
      status: 'shipping'
    }
  ];

  const statusConfig = {
    pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
    processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700' },
    shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border-none p-0">
        <DialogHeader className="p-6 bg-gray-50/50 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#EE4D2D]" />
            Hiệu suất kinh doanh
          </DialogTitle>
          <DialogDescription>Phân tích doanh thu và hành vi khách hàng trong 30 ngày qua</DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Hàng chỉ số chính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 rounded-xl text-[#EE4D2D]"><DollarSign className="w-5 h-5" /></div>
                <Badge className="bg-green-100 text-green-700 border-none font-bold">+{stats.revenueGrowth}%</Badge>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Doanh thu</p>
              <h4 className="text-xl font-black text-[#EE4D2D]">{stats.totalRevenue.toLocaleString()}đ</h4>
            </div>

            <div className="p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><ShoppingCart className="w-5 h-5" /></div>
                <Badge className="bg-green-100 text-green-700 border-none font-bold">+{stats.ordersGrowth}%</Badge>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Đơn hàng</p>
              <h4 className="text-xl font-black">{stats.totalOrders}</h4>
            </div>

            <div className="p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 rounded-xl text-purple-600"><Package className="w-5 h-5" /></div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sản phẩm</p>
              <h4 className="text-xl font-black">{stats.totalProducts}</h4>
            </div>

            <div className="p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600"><Star className="w-5 h-5 fill-current" /></div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Đánh giá TB</p>
              <h4 className="text-xl font-black">{stats.averageRating}/5.0</h4>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top món ăn bán chạy */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <Trophy className="w-5 h-5 text-yellow-500" /> Top món bán chạy
              </h3>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-[#EE4D2D]/20 transition-all">
                    <span className="text-lg font-black text-gray-300 w-4">{index + 1}</span>
                    <div className="w-14 h-14 rounded-xl overflow-hidden border bg-white shrink-0">
                      <img src={product.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{product.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Đã bán: {product.sold} suất</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#EE4D2D]">{product.revenue.toLocaleString()}đ</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Đơn hàng mới nhất */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <ArrowUpRight className="w-5 h-5 text-blue-500" /> Đơn hàng vừa nhận
              </h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-2xl bg-white shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{order.orderNumber}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{order.customer}</span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold">{order.total.toLocaleString()}đ</p>
                      <Badge className={`${statusConfig[order.status].color} border-none text-[10px] rounded-full`}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}