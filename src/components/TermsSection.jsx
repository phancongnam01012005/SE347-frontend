import React from 'react';
import { FileCheck, UserCheck, AlertCircle, Scale } from 'lucide-react';

export function TermsSection() {
  return (
    <section id="terms" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#EE4D2D]">Điều khoản sử dụng</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Các điều khoản và điều kiện khi sử dụng dịch vụ FoodieShop nhằm đảm bảo môi trường mua sắm văn minh và an toàn.
          </p>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Điều kiện sử dụng */}
          <div className="bg-gray-50 rounded-xl p-6 border border-transparent hover:border-gray-200 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Điều kiện sử dụng</h3>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Người dùng phải từ đủ 18 tuổi trở lên</li>
              <li>• Cung cấp thông tin chính xác khi đăng ký tài khoản</li>
              <li>• Chịu trách nhiệm về bảo mật tài khoản cá nhân</li>
              <li>• Không sử dụng dịch vụ cho mục đích vi phạm pháp luật</li>
              <li>• Tuân thủ quy định và hướng dẫn sử dụng nền tảng</li>
            </ul>
          </div>

          {/* Quyền và nghĩa vụ */}
          <div className="bg-gray-50 rounded-xl p-6 border border-transparent hover:border-gray-200 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Quyền và nghĩa vụ người dùng</h3>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Quyền được sử dụng các tính năng của nền tảng</li>
              <li>• Quyền khiếu nại khi có vấn đề với đơn hàng</li>
              <li>• Nghĩa vụ thanh toán đầy đủ cho đơn hàng</li>
              <li>• Nghĩa vụ đánh giá trung thực về dịch vụ</li>
              <li>• Không spam hay lạm dụng hệ thống khuyến mãi</li>
            </ul>
          </div>

          {/* Trách nhiệm FoodieShop */}
          <div className="bg-gray-50 rounded-xl p-6 border border-transparent hover:border-gray-200 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Trách nhiệm của FoodieShop</h3>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Cung cấp nền tảng đặt hàng ổn định và bảo mật</li>
              <li>• Hỗ trợ giải quyết tranh chấp giữa người dùng và quán</li>
              <li>• Bảo vệ thông tin cá nhân của người dùng</li>
              <li>• Cung cấp dịch vụ chăm sóc khách hàng chuyên nghiệp</li>
              <li>• Không chịu trách nhiệm về chất lượng món ăn từ quán</li>
            </ul>
          </div>

          {/* Hành vi bị cấm */}
          <div className="bg-gray-50 rounded-xl p-6 border border-transparent hover:border-gray-200 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Hành vi bị cấm</h3>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Sử dụng tài khoản giả mạo hoặc không hợp lệ</li>
              <li>• Đặt hàng ảo, hủy đơn liên tục gây thiệt hại</li>
              <li>• Đánh giá sai sự thật để bôi nhọ quán ăn</li>
              <li>• Lợi dụng lỗi hệ thống để trục lợi cá nhân</li>
              <li>• Quấy rối nhân viên giao hàng hoặc đối tác quán</li>
            </ul>
          </div>
        </div>

        {/* Detailed Articles Section */}
        <div className="bg-gray-50 rounded-2xl border p-8 space-y-8">
          <div className="border-b pb-6 last:border-0 last:pb-0">
            <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">1. Điều khoản đặt hàng</h3>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Khi thực hiện thao tác đặt hàng trên FoodieShop, bạn đồng ý với các điều kiện:
            </p>
            <ul className="space-y-2 text-sm text-gray-500 ml-4 list-disc">
              <li>Giá món ăn có thể thay đổi tùy theo thời điểm và chương trình khuyến mãi hiện hành.</li>
              <li>Thời gian giao hàng là ước tính, có thể biến động tùy theo tình hình giao thông và thời tiết.</li>
              <li>Món ăn có thể hết hàng đột xuất trong các khung giờ cao điểm.</li>
              <li>Quán ăn và tài xế có quyền từ chối đơn hàng trong các trường hợp bất khả kháng hoặc địa chỉ không hợp lệ.</li>
            </ul>
          </div>

          <div className="border-b pb-6 last:border-0 last:pb-0">
            <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">2. Điều khoản thanh toán</h3>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Các quy định bắt buộc về giao dịch tài chính:
            </p>
            <ul className="space-y-2 text-sm text-gray-500 ml-4 list-disc">
              <li>Bạn đồng ý thanh toán toàn bộ giá trị đơn hàng được hiển thị tại màn hình xác nhận, bao gồm các loại phí.</li>
              <li>Phí dịch vụ, phí gửi xe và VAT (nếu có) sẽ được tính theo quy định của hệ thống.</li>
              <li>Quy trình hoàn tiền cho đơn thanh toán trước sẽ được xử lý từ 7-14 ngày tùy ngân hàng.</li>
              <li>Mã giảm giá và điểm thưởng không có giá trị quy đổi thành tiền mặt.</li>
            </ul>
          </div>

          <div className="border-b pb-6 last:border-0 last:pb-0">
            <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">3. Quy định về hủy đơn</h3>
            <ul className="space-y-2 text-sm text-gray-500 ml-4 list-disc">
              <li>Người dùng có thể hủy đơn miễn phí nếu quán chưa bắt đầu chế biến.</li>
              <li>Sau khi món ăn đã được chế biến, việc hủy đơn có thể bị tính phí bồi thường cho quán.</li>
              <li>Việc lạm dụng tính năng hủy đơn có thể dẫn đến việc khóa tài khoản vĩnh viễn.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">4. Thay đổi điều khoản</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FoodieShop có quyền cập nhật và thay đổi các điều khoản này bất kỳ lúc nào để phù hợp với quy định pháp luật. 
              Việc bạn tiếp tục sử dụng dịch vụ sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận các điều khoản mới nhất.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Cập nhật lần cuối: 18/01/2026</p>
          <p className="mt-2">
            Mọi thắc mắc về pháp lý và điều khoản, vui lòng liên hệ:{' '}
            <a href="mailto:legal@foodieshop.vn" className="text-[#EE4D2D] hover:underline font-medium">
              legal@foodieshop.vn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}