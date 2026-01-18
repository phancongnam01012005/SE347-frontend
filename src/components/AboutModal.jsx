import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Building2, Users, Target, Award } from 'lucide-react';

/**
 * AboutModal Component
 * Hiển thị thông tin giới thiệu về nền tảng FoodieShop
 */
export function AboutModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">
            Giới thiệu về FoodieShop
          </DialogTitle>
          <DialogDescription className="text-base">
            Nền tảng đặt đồ ăn hàng đầu Việt Nam
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#EE4D2D]/10 to-[#FF6B4A]/10 p-6 rounded-xl border border-[#EE4D2D]/20">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>🍔</span> Về chúng tôi
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              FoodieShop là nền tảng thương mại điện tử chuyên về đồ ăn vặt và đồ uống, 
              được thành lập với sứ mệnh kết nối người mua và người bán, mang đến trải nghiệm 
              mua sắm online tiện lợi, nhanh chóng và an toàn. Chúng tôi cam kết cung cấp 
              đa dạng các sản phẩm chất lượng với giá cả hợp lý.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <h4 className="font-bold text-lg">Sứ mệnh</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mang đến cho người dùng những sản phẩm đồ ăn vặt chất lượng cao, 
                đa dạng và phù hợp với túi tiền mọi người. Tạo ra một môi trường 
                kinh doanh công bằng cho các nhà bán hàng.
              </p>
            </div>

            <div className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <h4 className="font-bold text-lg">Tầm nhìn</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trở thành nền tảng đặt đồ ăn số 1 Việt Nam, phục vụ hàng triệu 
                khách hàng mỗi ngày, đồng hành cùng hàng ngàn đối tác bán hàng 
                phát triển kinh doanh bền vững.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#EE4D2D]" />
              Giá trị cốt lõi
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Chất lượng", desc: "Sản phẩm đạt chuẩn vệ sinh an toàn thực phẩm" },
                { title: "Tiện lợi", desc: "Đặt hàng dễ dàng, giao nhanh, thanh toán linh hoạt" },
                { title: "Uy tín", desc: "Minh bạch giao dịch, bảo vệ quyền lợi người dùng" },
                { title: "Đổi mới", desc: "Không ngừng cải tiến công nghệ và trải nghiệm" }
              ].map((value, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-transparent hover:border-muted-foreground/10 transition-colors">
                  <div className="w-7 h-7 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm mb-1">{value.title}</h5>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] p-8 rounded-2xl text-white shadow-lg shadow-[#EE4D2D]/20">
            <h4 className="font-bold text-lg mb-6 text-center">Con số ấn tượng</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black italic">1M+</div>
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-90">Người dùng</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black italic">10K+</div>
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-90">Đối tác</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black italic">50K+</div>
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-90">Sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}