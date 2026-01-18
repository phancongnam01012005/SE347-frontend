import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

/**
 * TermsSection Component
 * Hiển thị tóm tắt các điều khoản sử dụng chính yếu để khách hàng nắm bắt nhanh.
 */
export function TermsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề phần điều khoản */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-black text-gray-900 md:text-4xl uppercase tracking-tight">
            Điều khoản sử dụng
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Sử dụng dịch vụ minh bạch, đảm bảo quyền lợi tốt nhất cho bạn
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Cột 1: Quyền lợi khách hàng */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">Quyền lợi của bạn</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Được hưởng các chương trình khuyến mãi độc quyền",
                "Bảo mật thông tin cá nhân tuyệt đối",
                "Hỗ trợ giải đáp thắc mắc 24/7",
                "Chính sách hoàn tiền minh bạch khi có sự cố"
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-3 text-sm font-bold text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cột 2: Trách nhiệm khách hàng */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">Trách nhiệm cá nhân</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Cung cấp thông tin liên hệ và địa chỉ chính xác",
                "Thanh toán đúng hạn cho các đơn hàng đã đặt",
                "Tuân thủ các quy định về đặt và hủy món",
                "Sử dụng dịch vụ văn minh, không lạm dụng"
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-3 text-sm font-bold text-gray-600">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chú thích thêm */}
        <div className="mt-12 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
            Mọi tranh chấp sẽ được giải quyết dựa trên <br /> 
            <span className="text-[#EE4D2D] underline cursor-pointer">Chính sách bảo mật</span> và <span className="text-[#EE4D2D] underline cursor-pointer">Quy định chung</span> của hệ thống.
          </p>
        </div>
      </div>
    </section>
  );
}