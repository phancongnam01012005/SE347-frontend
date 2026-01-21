import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Building2, Users, Target, Award } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Giới thiệu về FoodieShop</DialogTitle>
          <DialogDescription>
            Nền tảng đặt đồ ăn hàng đầu Việt Nam
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#EE4D2D]/10 to-[#FF6B4A]/10 p-6 rounded-xl border border-[#EE4D2D]/10">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
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
            <div className="group border rounded-xl p-5 hover:shadow-lg hover:border-[#EE4D2D]/30 transition-all duration-300 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-[#EE4D2D]" />
                </div>
                <h4 className="font-bold">Sứ mệnh</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mang đến cho người dùng những sản phẩm đồ ăn vặt chất lượng cao, 
                đa dạng và phù hợp với túi tiền mọi người. Tạo ra một môi trường 
                kinh doanh công bằng cho các nhà bán hàng.
              </p>
            </div>

            <div className="group border rounded-xl p-5 hover:shadow-lg hover:border-[#EE4D2D]/30 transition-all duration-300 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-[#EE4D2D]" />
                </div>
                <h4 className="font-bold">Tầm nhìn</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trở thành nền tảng đặt đồ ăn số 1 Việt Nam, phục vụ hàng triệu 
                khách hàng mỗi ngày, đồng hành cùng hàng ngàn đối tác bán hàng 
                phát triển kinh doanh bền vững.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-[#EE4D2D]" />
              Giá trị cốt lõi
            </h4>
            <div className="grid gap-3">
              {[
                { title: "Chất lượng", desc: "Cam kết cung cấp sản phẩm đạt chuẩn vệ sinh an toàn thực phẩm" },
                { title: "Tiện lợi", desc: "Đặt hàng dễ dàng, giao hàng nhanh chóng, thanh toán linh hoạt" },
                { title: "Uy tín", desc: "Minh bạch trong giao dịch, bảo vệ quyền lợi người mua và người bán" },
                { title: "Đổi mới", desc: "Không ngừng cải tiến công nghệ để mang lại trải nghiệm tốt nhất" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors">
                  <div className="w-7 h-7 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">{item.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] p-8 rounded-2xl text-white shadow-xl shadow-orange-200/50">
            <h4 className="font-bold mb-6 text-center uppercase tracking-wider">Con số ấn tượng</h4>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold">1M+</div>
                <div className="text-[10px] md:text-xs font-medium uppercase opacity-80">Người dùng</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold">10K+</div>
                <div className="text-[10px] md:text-xs font-medium uppercase opacity-80">Đối tác</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold">50K+</div>
                <div className="text-[10px] md:text-xs font-medium uppercase opacity-80">Sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}