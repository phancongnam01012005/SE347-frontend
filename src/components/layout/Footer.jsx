import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

// Giả định asset ảnh logo của bạn
import logoImage from '../../assets/images/logo.png';

export function Footer({ 
  onLogoClick,
  onAboutClick,
  onContactClick,
  onPolicyClick,
  onTermsClick,
  onCartClick,
  onOrdersClick,
  onFavoritesClick,
  onSellerOrdersClick,
  onSellerProductsClick,
  onSellerStatisticsClick,
  onSellerPromotionsClick,
  isLoggedIn = false,
  userType
}) {
  // Xử lý kiểm tra quyền truy cập cho Người mua
  const handleBuyerAction = (action, actionName = 'này') => {
    if (!isLoggedIn) {
      toast.error(`Vui lòng đăng nhập để xem ${actionName}`);
      return;
    }
    if (userType !== 'buyer') {
      toast.error('Tính năng này dành cho tài khoản Người mua');
      return;
    }
    action?.();
  };

  // Xử lý kiểm tra quyền truy cập cho Người bán
  const handleSellerAction = (action, actionName = 'này') => {
    if (!isLoggedIn) {
      toast.error(`Vui lòng đăng nhập để vào ${actionName}`);
      return;
    }
    if (userType !== 'seller') {
      toast.error('Tính năng này dành cho tài khoản Đối tác bán hàng');
      return;
    }
    action?.();
  };

  return (
    <footer className="bg-gradient-to-b from-white to-muted border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Nội dung chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Cột 1 & 2: Giới thiệu & Liên hệ */}
          <div className="lg:col-span-2">
            <div 
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
            >
              <img 
                src={logoImage} 
                alt="FoodieShop Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Nền tảng đặt đồ ăn hàng đầu Việt Nam. Kết nối người mua và người bán, mang đến trải nghiệm ẩm thực tuyệt vời mọi lúc, mọi nơi.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#EE4D2D]/10">
                  <Phone className="w-4 h-4 text-[#EE4D2D]" />
                </div>
                <span>Hotline: 1900 xxxx</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#EE4D2D]/10">
                  <Mail className="w-4 h-4 text-[#EE4D2D]" />
                </div>
                <span>Email: support@foodieshop.vn</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#EE4D2D]" />
                </div>
                <span>Quận 1, TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Cột 3: Thông tin chung */}
          <div>
            <h4 className="font-bold text-[#EE4D2D] mb-4">
              Thông tin chung
            </h4>
            <ul className="space-y-4">
              <li><button onClick={onAboutClick} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Về chúng tôi</button></li>
              <li><button onClick={onContactClick} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Liên hệ hỗ trợ</button></li>
              <li><button onClick={onPolicyClick} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Chính sách bảo mật</button></li>
              <li><button onClick={onTermsClick} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Điều khoản dịch vụ</button></li>
            </ul>
          </div>

          {/* Cột 4: Dành cho Người mua */}
          <div>
            <h4 className="font-bold text-[#EE4D2D] mb-4">
              Khách hàng
            </h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleBuyerAction(onCartClick, 'Giỏ hàng')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Giỏ hàng của tôi</button></li>
              <li><button onClick={() => handleBuyerAction(onOrdersClick, 'Lịch sử mua hàng')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Lịch sử đặt món</button></li>
              <li><button onClick={() => handleBuyerAction(onFavoritesClick, 'Danh sách yêu thích')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Món ăn yêu thích</button></li>
            </ul>
          </div>

          {/* Cột 5: Dành cho Người bán */}
          <div>
            <h4 className="font-bold text-[#EE4D2D] mb-4">
              Đối tác
            </h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleSellerAction(onSellerOrdersClick, 'Quản lý đơn hàng')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Kênh người bán</button></li>
              <li><button onClick={() => handleSellerAction(onSellerProductsClick, 'Quản lý món ăn')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Thực đơn của quán</button></li>
              <li><button onClick={() => handleSellerAction(onSellerStatisticsClick, 'Thống kê doanh thu')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Báo cáo doanh thu</button></li>
              <li><button onClick={() => handleSellerAction(onSellerPromotionsClick, 'Khuyến mãi')} className="text-sm text-muted-foreground hover:text-[#EE4D2D] transition-colors">Chính sách khuyến mãi</button></li>
            </ul>
          </div>
        </div>

        {/* Phân cách với Gradient */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
              Kết nối với FoodieShop
            </span>
          </div>
        </div>

        {/* Chân trang cuối: MXH & Bản quyền */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <a href="https://facebook.com" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-md">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-md">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-md">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-center space-y-1">
            <p className="text-sm text-muted-foreground font-medium">
              © 2026 <span className="text-[#EE4D2D] font-bold">FoodieShop</span>. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
              Made with ❤️ in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}