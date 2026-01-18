import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { TrendingUp, DollarSign, Package, ShoppingCart, Star, Award } from 'lucide-react';

/**
 * SellerStatisticsModal Component
 * Cung cấp cái nhìn tổng quan về hiệu suất kinh doanh cho Người bán: 
 * Doanh thu, tăng trưởng, sản phẩm bán chạy và các đơn hàng gần đây.
 */
export function SellerStatisticsModal({ isOpen, onClose }) {
  // Dữ liệu thống kê giả lập
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
      image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: "Snack Khoai Tây Lay's Vị Phô Mai",
      sold: 85,
      revenue: 1275000,
      image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=200&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Pizza Hải Sản Cao Cấp',
      sold: 45,
      revenue: 5805000,
      image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=200&h=200&fit=crop'
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        {/* Header với hiệu ứng gradient nhẹ */}
        <div className="bg-white border-b px-8 py-6 sticky top-0 z-20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Thống kê kinh doanh</DialogTitle>
            <DialogDescription className="text-sm font-medium">Báo cáo hiệu suất bán hàng tính đến ngày hôm nay</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-8">
          {/* 1. Thẻ chỉ số tổng quan (Overview) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Doanh thu */}
            <div className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50 font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{stats.revenueGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng doanh thu</p>
              <p className="text-2xl font-black text-[#EE4D2D] mt-1">{stats.totalRevenue.toLocaleString()}đ</p>
            </div>

            {/* Đơn hàng */}
            <div className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50 font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{stats.ordersGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đơn hàng</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{stats.totalOrders}</p>
            </div>

            {/* Sản phẩm */}
            <div className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thực đơn</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{stats.totalProducts} món</p>
            </div>

            {/* Rating */}
            <div className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đánh giá TB</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{stats.averageRating}/5.0</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2. Top sản phẩm bán chạy */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter italic">
                <Award className="w-5 h-5 text-orange-500" /> Ngôi sao của Shop
              </h3>
              <div className="bg-gray-50/50 border rounded-2xl overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-white transition-colors group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-black text-xs shrink-0 group-hover:bg-[#EE4D2D]">
                        {index + 1}
                      </div>
                      <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover shadow-sm border-2 border-white" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate text-sm">{product.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Đã bán: {product.sold}</span>
                          <span className="text-[10px] font-black text-[#EE4D2D]">{product.revenue.toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Hoạt động đơn hàng mới nhất */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter italic">
                <ShoppingCart className="w-5 h-5 text-blue-500" /> Đơn hàng mới
              </h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col p-4 bg-white border-2 border-gray-50 rounded-2xl shadow-sm hover:border-blue-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-gray-900">#{order.orderNumber}</span>
                      <Badge className={`${statusConfig[order.status].color} border-none font-black text-[9px] uppercase px-2 py-0.5`}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-gray-400">
                        {order.customer} <span className="mx-1">•</span> {order.date}
                      </div>
                      <span className="text-sm font-black text-gray-800">{order.total.toLocaleString()}đ</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#EE4D2D] transition-colors border-t border-dashed mt-2">
                  Xem tất cả đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}