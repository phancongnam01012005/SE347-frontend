import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * HeroSection Component
 * Hiển thị phần đầu trang ấn tượng với các thông tin khuyến mãi và hình ảnh chủ đạo.
 */
export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-[#EE4D2D] to-[#FF6F3D] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* CỘT TRÁI: Nội dung văn bản & Khuyến mãi */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Giao đồ ăn <br /> 
                <span className="text-yellow-300">nhanh chóng</span>
              </h1>
              <p className="text-xl text-white/90 font-medium max-w-lg leading-relaxed">
                Hàng ngàn món ngon đang chờ bạn khám phá. <br />
                Miễn phí vận chuyển cho đơn hàng đầu tiên ngay hôm nay!
              </p>
            </div>

            {/* Thẻ khuyến mãi (Badges) */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[120px] shadow-lg">
                <div className="text-xs uppercase tracking-wider font-bold opacity-80 mb-1">Giảm ngay</div>
                <div className="text-3xl font-black">50K</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[120px] shadow-lg">
                <div className="text-xs uppercase tracking-wider font-bold opacity-80 mb-1">Freeship</div>
                <div className="text-3xl font-black">0Đ</div>
              </div>
            </div>

            {/* Nút hành động */}
            <button className="bg-white text-[#EE4D2D] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
              Đặt món ngay
            </button>
          </div>

          {/* CỘT PHẢI: Hình ảnh banner */}
          <div className="relative animate-in zoom-in duration-1000">
            {/* Lớp trang trí phía sau ảnh */}
            <div className="absolute -inset-4 bg-white/10 rounded-3xl rotate-3 blur-sm"></div>
            
            <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1749982983229-ddc732890158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBiYW5uZXJ8ZW58MXx8fHwxNzY4MzcxMDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dịch vụ giao đồ ăn FoodieShop"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            
            {/* Thẻ trôi nổi thông tin nhanh */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:flex items-center gap-3 animate-bounce">
              <div className="bg-green-100 p-2 rounded-full text-green-600">✅</div>
              <div>
                <p className="text-gray-900 font-bold text-xs">10,000+</p>
                <p className="text-gray-400 text-[10px]">Đánh giá 5 sao</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}