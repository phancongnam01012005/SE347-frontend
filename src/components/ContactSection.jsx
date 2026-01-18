import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

/**
 * ContactSection Component
 * Hiển thị các phương thức liên lạc nhanh dưới dạng lưới 4 cột.
 */
export function ContactSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Liên hệ với chúng tôi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Mọi thắc mắc vui lòng liên hệ qua các kênh dưới đây.
          </p>
        </div>
        
        {/* Lưới thông tin liên lạc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotline */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-orange-200 transition-all text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-[#EE4D2D]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Hotline</h3>
            <p className="text-[#EE4D2D] font-bold text-lg">1900-xxxx</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Miễn phí cuộc gọi</p>
          </div>
          
          {/* Email */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-orange-200 transition-all text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-[#EE4D2D]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Email</h3>
            <p className="text-gray-600 font-medium break-all">support@foodieshop.vn</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Phản hồi trong 24h</p>
          </div>
          
          {/* Địa chỉ */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-orange-200 transition-all text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-[#EE4D2D]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Địa chỉ</h3>
            <p className="text-gray-600 font-medium">TP. Hồ Chí Minh</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Quận 1, Việt Nam</p>
          </div>
          
          {/* Giờ làm việc */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-orange-200 transition-all text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-[#EE4D2D]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Giờ làm việc</h3>
            <p className="text-gray-600 font-medium text-lg">Hằng ngày: 24/7</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Kể cả ngày lễ</p>
          </div>
        </div>
      </div>
    </section>
  );
}