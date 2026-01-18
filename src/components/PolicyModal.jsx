import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Shield, Package, RefreshCw, Lock, CreditCard, Truck } from 'lucide-react';

/**
 * PolicyModal Component
 * Hiển thị các chính sách và quy định chi tiết của FoodieShop.
 */
export function PolicyModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-none shadow-2xl">
        {/* Header với nền trắng cố định */}
        <div className="sticky top-0 z-10 bg-white px-6 py-5 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Chính sách & Quy định</DialogTitle>
            <DialogDescription className="text-sm font-medium">
              Cam kết mang lại trải nghiệm an toàn và minh bạch cho khách hàng
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Chính sách Bảo mật */}
          <div className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:shadow-md transition-all bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Chính sách bảo mật</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
              <p>
                FoodieShop cam kết bảo vệ thông tin cá nhân của người dùng bằng công nghệ mã hóa hiện đại nhất.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#EE4D2D]">•</span> Thông tin không chia sẻ cho bên thứ ba
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE4D2D]">•</span> Lưu trữ trên hệ thống bảo mật cao
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE4D2D]">•</span> Người dùng có quyền yêu cầu xóa dữ liệu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE4D2D]">•</span> Sử dụng cookie để tối ưu trải nghiệm
                </li>
              </ul>
            </div>
          </div>

          {/* Chính sách Thanh toán */}
          <div className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:shadow-md transition-all bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Chính sách thanh toán</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-3">
              <p className="font-medium">Hỗ trợ các phương thức linh hoạt:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg border text-center">
                  <p className="font-bold text-gray-900">COD</p>
                  <p className="text-[10px] text-gray-400">Thanh toán khi nhận</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border text-center">
                  <p className="font-bold text-[#A50064]">Ví MoMo</p>
                  <p className="text-[10px] text-gray-400">Nhanh chóng & Miễn phí</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border text-center">
                  <p className="font-bold text-[#0068FF]">ZaloPay</p>
                  <p className="text-[10px] text-gray-400">An toàn & Bảo mật</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chính sách Giao hàng */}
          <div className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:shadow-md transition-all bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Chính sách giao hàng</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                <span className="font-semibold text-orange-800">Miễn phí vận chuyển</span>
                <span className="font-bold text-orange-800">Đơn từ 200.000đ</span>
              </div>
              <ul className="space-y-1.5 ml-2">
                <li className="flex items-center gap-2">🚀 <span className="font-medium">Nội thành:</span> 30 - 60 phút</li>
                <li className="flex items-center gap-2">🛵 <span className="font-medium">Ngoại thành:</span> 1 - 2 giờ</li>
                <li className="flex items-center gap-2">✅ Kiểm tra hàng trước khi thanh toán</li>
              </ul>
            </div>
          </div>

          {/* Chính sách Đổi trả */}
          <div className="group border rounded-2xl p-5 hover:border-[#EE4D2D]/30 hover:shadow-md transition-all bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Chính sách đổi trả</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-3">
              <p>Chấp nhận đổi trả trong vòng <span className="font-bold text-red-500">24 giờ</span> nếu:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 italic">
                <li>Sản phẩm hư hỏng do vận chuyển</li>
                <li>Giao sai mẫu mã hoặc thiếu số lượng</li>
                <li>Sản phẩm không đúng mô tả</li>
              </ul>
            </div>
          </div>

          {/* Banner Hỗ trợ */}
          <div className="bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] p-6 rounded-2xl text-white shadow-lg">
            <h4 className="font-bold text-lg mb-2">Cần hỗ trợ thêm về chính sách?</h4>
            <p className="text-sm opacity-90 mb-4">
              Đội ngũ pháp lý và CSKH của chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-bold">
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">📞 1900 xxxx</div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">📧 support@foodieshop.vn</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}