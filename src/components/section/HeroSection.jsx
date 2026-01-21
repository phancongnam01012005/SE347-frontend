import React from 'react';

// Lưu ý: Trong môi trường React thông thường, bạn nên để ảnh trong thư mục public hoặc assets
// Nếu heroImage là một đường dẫn URL hoặc file local, hãy điều chỉnh import cho phù hợp.
import heroImage from '../../assets/images/hero-image.jpg';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-[#EE4D2D] to-[#FF6F3D] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Giao đồ ăn <br /> nhanh chóng
            </h1>
            <p className="text-xl text-white/90 max-w-lg">
              Hàng ngàn món ngon đang chờ bạn khám phá. Miễn phí ship cho đơn hàng đầu tiên!
            </p>
            <div className="flex gap-4">
              <div className="bg-white text-[#EE4D2D] px-6 py-3 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-sm font-semibold opacity-80 uppercase tracking-wider">Giảm ngay</div>
                <div className="text-3xl font-bold">50K</div>
              </div>
              <div className="bg-white text-[#EE4D2D] px-6 py-3 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-sm font-semibold opacity-80 uppercase tracking-wider">Freeship</div>
                <div className="text-3xl font-bold">0Đ</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 animate-in fade-in zoom-in duration-1000">
            <img
              src={heroImage}
              alt="Food Delivery Hero"
              className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
            />
            {/* Lớp overlay trang trí nếu cần */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}