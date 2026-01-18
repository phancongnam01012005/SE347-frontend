import React from 'react';
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Footer Component
 * Hiển thị thông tin liên hệ, các liên kết nhanh cho Người mua/Người bán và mạng xã hội.
 */
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
  
  // Hàm kiểm tra quyền hạn dành cho Người mua
  const handleBuyerAction = (action, actionName = 'này') => {
    if (!isLoggedIn) {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }
    if (userType !== 'buyer' && userType !== 'admin') {
      toast.error('Tính năng này dành cho tài khoản Người mua');
      return;
    }
    action?.();
  };

  // Hàm kiểm tra quyền hạn dành cho Người bán
  const handleSellerAction = (action, actionName = 'này') => {
    if (!isLoggedIn) {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }
    if (userType !== 'seller' && userType !== 'admin') {
      toast.error('Tính năng này dành cho tài khoản Người bán');
      return;
    }
    action?.();
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Nội dung chính chia cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-10">
          
          {/* Cột 1 & 2: Logo & Giới thiệu */}
          <div className="lg:col-span-2">
            <div 
              className="flex items-center gap-3 mb-6 cursor-pointer group w-fit"
              onClick={onLogoClick}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-3xl">🍔</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#EE4D2D]">FoodieShop</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Món ngon mọi nơi</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-sm">
              Nền tảng đặt đồ ăn hàng đầu Việt Nam. Kết nối hàng triệu tâm hồn ăn uống với những đầu bếp tâm huyết nhất, mang đến trải nghiệm ẩm thực tuyệt vời.
            </p>
            
            {/* Thông tin liên hệ nhanh */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#EE4D2D] transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#EE4D2D]/10">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">1900 xxxx (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#EE4D2D] transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#EE4D2D]/10">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">support@foodieshop.vn</span>
              </div>
            </div>
          </div>

          {/* Cột 3: Thông tin chung */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 border-l-4 border-[#EE4D2D] pl-3">Thông tin chung</h4>
            <ul className="space-y-4">
              {[
                { label: 'Giới thiệu', onClick: onAboutClick },
                { label: 'Liên hệ', onClick: onContactClick },
                { label: 'Chính sách bảo mật', onClick: onPolicyClick },
                { label: 'Điều khoản sử dụng', onClick: onTermsClick }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={item.onClick}
                    className="text-sm text-gray-500 hover:text-[#EE4D2D] hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Dành cho người mua */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 border-l-4 border-orange-400 pl-3">Người mua</h4>
            <ul className="space-y-4">
              {[
                { label: 'Giỏ hàng', action: onCartClick },
                { label: 'Theo dõi đơn hàng', action: onOrdersClick },
                { label: 'Món ăn yêu thích', action: onFavoritesClick }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleBuyerAction(item.action, item.label)}
                    className="text-sm text-gray-500 hover:text-[#EE4D2D] hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 5: Dành cho người bán */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 border-l-4 border-blue-400 pl-3">Đối tác bán hàng</h4>
            <ul className="space-y-4">
              {[
                { label: 'Quản lý đơn hàng', action: onSellerOrdersClick },
                { label: 'Quản lý thực đơn', action: onSellerProductsClick },
                { label: 'Thống kê doanh thu', action: onSellerStatisticsClick },
                { label: 'Chương trình ưu đãi', action: onSellerPromotionsClick }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleSellerAction(item.action, item.label)}
                    className="text-sm text-gray-500 hover:text-[#EE4D2D] hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Đường phân cách */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] px-6 py-1 rounded-full shadow-sm">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest text-center">Kết nối cộng đồng</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Mạng xã hội */}
          <div className="flex items-center gap-5">
            <a href="#" className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"><Facebook size={20} /></a>
            <a href="#" className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"><Youtube size={20} /></a>
            <a href="#" className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"><Instagram size={20} /></a>
          </div>
          
          {/* Bản quyền */}
          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-gray-900">
              © 2026 <span className="text-[#EE4D2D]">FoodieShop</span>. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-400 font-medium mt-1">
              Made with ❤️ by Foodie Team in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}