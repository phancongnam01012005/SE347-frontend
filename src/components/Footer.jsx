import { Utensils, Facebook, Youtube, Instagram } from 'lucide-react';
import logo from '../assets/images/logo.png';

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <a href="/" className="flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="ShopeeFood Logo" 
                  className="h-20 w-auto object-contain" // Tùy chỉnh chiều cao phù hợp
                />
              </a>
            </div>
          </div>

          {/* Thông tin chung */}
          <div>
            <h4 className="mb-4 text-[#EE4D2D] font-semibold">Thông tin chung</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Chính sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>

          {/* Người mua */}
          <div>
            <h4 className="mb-4 text-[#EE4D2D] font-semibold">Người mua</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Theo dõi đơn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Đánh giá sản phẩm
                </a>
              </li>
            </ul>
          </div>

          {/* Người bán */}
          <div>
            <h4 className="mb-4 text-[#EE4D2D] font-semibold">Người bán</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Đăng ký bán hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Quản lý sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Thống kê doanh thu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EE4D2D] transition-colors">
                  Chính sách hợp tác
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t my-16"></div>

        {/* Bottom Section */}
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground text-center">
            Nền tảng đặt đồ ăn nhanh chóng – tiện lợi – an toàn. Kết nối người mua và người bán mọi lúc mọi nơi.
          </p>
          
          <p className="text-sm text-muted-foreground text-center font-medium">
            © 2026 ShopeeFood. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 flex items-center justify-center transition-opacity shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}