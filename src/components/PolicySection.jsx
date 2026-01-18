import React from 'react';
import { Shield, RefreshCw, Lock, Truck } from 'lucide-react';

/**
 * PolicySection Component
 * Hiển thị các chính sách ưu việt của FoodieShop dưới dạng lưới 4 cột.
 */
export function PolicySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Tiêu đề phần chính sách */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Chính sách của chúng tôi
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Cam kết mang đến dịch vụ tận tâm và trải nghiệm mua sắm an toàn nhất cho khách hàng
        </p>
      </div>
      
      {/* Lưới hiển thị các thẻ chính sách */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Chính sách 1: Thanh toán */}
        <div className="p-8 border-2 border-transparent rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#EE4D2D]/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8 text-[#EE4D2D]" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Thanh toán an toàn</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mọi giao dịch đều được mã hóa, đảm bảo bảo mật thông tin tài chính của bạn tuyệt đối.
          </p>
        </div>
        
        {/* Chính sách 2: Đổi trả */}
        <div className="p-8 border-2 border-transparent rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#EE4D2D]/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <RefreshCw className="w-8 h-8 text-[#EE4D2D]" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Đổi trả dễ dàng</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hỗ trợ đổi trả hoặc hoàn tiền linh hoạt trong vòng 24 giờ nếu sản phẩm có lỗi.
          </p>
        </div>
        
        {/* Chính sách 3: Bảo mật */}
        <div className="p-8 border-2 border-transparent rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#EE4D2D]/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Lock className="w-8 h-8 text-[#EE4D2D]" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Bảo mật dữ liệu</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thông tin cá nhân của người dùng được bảo vệ bởi các tiêu chuẩn an ninh hàng đầu.
          </p>
        </div>
        
        {/* Chính sách 4: Vận chuyển */}
        <div className="p-8 border-2 border-transparent rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#EE4D2D]/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Truck className="w-8 h-8 text-[#EE4D2D]" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Miễn phí giao hàng</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tận hưởng ưu đãi Freeship không giới hạn cho tất cả đơn hàng có giá trị từ 100k.
          </p>
        </div>
        
      </div>
    </section>
  );
}