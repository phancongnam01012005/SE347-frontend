import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-[#EE4D2D] to-[#FF6F3D] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Nội dung bên trái */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Giao đồ ăn nhanh chóng
            </h1>
            <p className="text-xl text-white/90">
              Hàng ngàn món ngon đang chờ bạn khám phá. Miễn phí ship cho đơn hàng đầu tiên!
            </p>
            
            {/* Các thẻ khuyến mãi */}
            <div className="flex gap-4">
              <div className="bg-white text-[#EE4D2D] px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm opacity-80 font-medium">Giảm ngay</div>
                <div className="text-2xl font-bold">50K</div>
              </div>
              <div className="bg-white text-[#EE4D2D] px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm opacity-80 font-medium">Freeship</div>
                <div className="text-2xl font-bold">0Đ</div>
              </div>
            </div>
          </div>

          {/* Hình ảnh minh họa bên phải */}
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
            <ImageWithFallback
              src="src/assets/images/pedro-lastra-Nyvq2juw4_o-unsplash.jpg"
              alt="Food Delivery"
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}