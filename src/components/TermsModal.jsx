import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { AlertCircle, CheckCircle } from 'lucide-react';

/**
 * TermsModal Component
 * Hiển thị các điều khoản và điều kiện sử dụng dịch vụ của FoodieShop.
 * Nội dung được chia thành các phần đánh số để người dùng dễ dàng theo dõi.
 */
export function TermsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-none shadow-2xl">
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#EE4D2D] tracking-tight">
              Điều khoản sử dụng
            </DialogTitle>
            <DialogDescription className="text-sm font-medium">
              Vui lòng đọc kỹ các quy định dưới đây trước khi bắt đầu trải nghiệm dịch vụ
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-8">
          {/* Thông báo lưu ý quan trọng */}
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-4">
              <div className="bg-[#EE4D2D] p-1.5 rounded-full shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm leading-relaxed">
                <p className="font-black text-[#EE4D2D] uppercase tracking-widest text-[10px] mb-1">
                  Lưu ý quan trọng
                </p>
                <p className="text-gray-600 font-medium italic">
                  Bằng việc truy cập và sử dụng FoodieShop, bạn mặc nhiên đồng ý tuân thủ 
                  các điều khoản và điều kiện này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ.
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung các điều khoản */}
          <div className="space-y-6">
            {/* Mục 1: Điều khoản chung */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-sm font-black">
                  1
                </div>
                <h3 className="font-black text-gray-800 uppercase text-sm tracking-wide">Điều khoản chung</h3>
              </div>
              <div className="text-sm text-gray-500 space-y-3 leading-relaxed ml-11">
                <p><strong>1.1.</strong> FoodieShop là nền tảng kết nối trực tiếp Người mua và Người bán trong lĩnh vực ẩm thực.</p>
                <p><strong>1.2.</strong> Độ tuổi tối thiểu tham gia là 13 tuổi. Người dùng dưới 18 tuổi cần có sự giám sát của người bảo hộ.</p>
                <p><strong>1.3.</strong> FoodieShop có quyền cập nhật điều khoản bất kỳ lúc nào để phù hợp với pháp luật hiện hành.</p>
              </div>
            </div>

            {/* Mục 2: Quyền lợi người mua */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-sm font-black">
                  2
                </div>
                <h3 className="font-black text-gray-800 uppercase text-sm tracking-wide">Người mua & Người bán</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-11">
                <div>
                  <p className="text-xs font-black text-[#EE4D2D] uppercase mb-2 tracking-tighter">Quyền lợi Người mua</p>
                  <ul className="text-sm text-gray-500 space-y-1.5 list-none">
                    {['Thông tin món ăn minh bạch', 'Bảo vệ dữ liệu cá nhân', 'Đổi trả theo chính sách'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-400 rounded-full"/>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-black text-blue-600 uppercase mb-2 tracking-tighter">Trách nhiệm Người bán</p>
                  <ul className="text-sm text-gray-500 space-y-1.5 list-none">
                    {['Đảm bảo VSAT thực phẩm', 'Giao hàng đúng thời gian', 'Xử lý khiếu nại tận tâm'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"/>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mục 3: Thanh toán */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-sm font-black">
                  3
                </div>
                <h3 className="font-black text-gray-800 uppercase text-sm tracking-wide">Giao dịch & Thanh toán</h3>
              </div>
              <div className="text-sm text-gray-500 space-y-3 leading-relaxed ml-11">
                <p><strong>3.1.</strong> Mọi thanh toán trực tuyến được xử lý qua cổng bảo mật SSL 256-bit.</p>
                <p><strong>3.2.</strong> Tiền thanh toán sẽ được giữ bởi FoodieShop và chỉ chuyển cho Người bán khi đơn hàng hoàn tất.</p>
              </div>
            </div>

            {/* Mục 4: Hành vi bị cấm */}
            <div className="border border-red-50 rounded-2xl p-6 bg-red-50/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-xl flex items-center justify-center text-sm font-black">
                  4
                </div>
                <h3 className="font-black text-red-600 uppercase text-sm tracking-wide">Các hành vi bị nghiêm cấm</h3>
              </div>
              <ul className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 ml-11 font-medium">
                <li>🚫 Gian lận giá cả & khuyến mãi</li>
                <li>🚫 Đăng bán hàng giả, hàng nhái</li>
                <li>🚫 Spam hoặc quấy rối người dùng</li>
                <li>🚫 Tạo đánh giá, đơn hàng ảo</li>
              </ul>
            </div>
          </div>

          {/* Acceptance Banner */}
          <div className="bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] p-8 rounded-3xl text-white shadow-xl shadow-orange-100 relative overflow-hidden group">
            <CheckCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <h4 className="font-black text-lg">Xác nhận chấp nhận</h4>
              </div>
              <p className="text-sm font-medium opacity-90 leading-relaxed max-w-lg">
                Bạn xác nhận đã đọc, hiểu rõ và đồng ý toàn bộ nội dung điều khoản. 
                FoodieShop sẽ luôn nỗ lực để bảo vệ quyền lợi chính đáng của bạn.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  Cập nhật lần cuối: 19/01/2026
                </span>
                <button 
                  onClick={onClose}
                  className="bg-white text-[#EE4D2D] px-6 py-2 rounded-xl font-black text-xs hover:bg-orange-50 transition-colors"
                >
                  ĐÃ HIỂU
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}