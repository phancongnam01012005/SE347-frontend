import React from 'react';
import { Shield, RefreshCw, Lock, Truck } from 'lucide-react';

export function PolicySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="mb-4 text-3xl font-bold">Chính sách của chúng tôi</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cam kết mang đến dịch vụ tốt nhất cho khách hàng
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group p-6 border rounded-xl hover:shadow-xl hover:border-[#EE4D2D]/50 transition-all duration-300 bg-background">
          <Shield className="w-10 h-10 text-[#EE4D2D] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="mb-2 font-semibold text-lg">Thanh toán an toàn</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Đảm bảo bảo mật thông tin thanh toán của bạn với các tiêu chuẩn quốc tế.
          </p>
        </div>
        
        <div className="group p-6 border rounded-xl hover:shadow-xl hover:border-[#EE4D2D]/50 transition-all duration-300 bg-background">
          <RefreshCw className="w-10 h-10 text-[#EE4D2D] mb-4 group-hover:rotate-180 transition-transform duration-500" />
          <h3 className="mb-2 font-semibold text-lg">Đổi trả dễ dàng</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Chính sách đổi trả linh hoạt trong vòng 24 giờ kể từ khi nhận món.
          </p>
        </div>
        
        <div className="group p-6 border rounded-xl hover:shadow-xl hover:border-[#EE4D2D]/50 transition-all duration-300 bg-background">
          <Lock className="w-10 h-10 text-[#EE4D2D] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="mb-2 font-semibold text-lg">Bảo mật thông tin</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thông tin cá nhân của khách hàng được bảo vệ tuyệt đối qua hệ thống mã hóa.
          </p>
        </div>
        
        <div className="group p-6 border rounded-xl hover:shadow-xl hover:border-[#EE4D2D]/50 transition-all duration-300 bg-background">
          <Truck className="w-10 h-10 text-[#EE4D2D] mb-4 group-hover:translate-x-2 transition-transform" />
          <h3 className="mb-2 font-semibold text-lg">Miễn phí vận chuyển</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Miễn phí vận chuyển cho tất cả đơn hàng có giá trị từ 100k trở lên.
          </p>
        </div>
      </div>
    </section>
  );
}