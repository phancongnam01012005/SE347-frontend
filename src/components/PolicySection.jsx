import React from 'react';
import { ShieldCheck, Lock, RefreshCw, FileText } from 'lucide-react';

export function PolicySection() {
  return (
    <section id="policy" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề mục */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#EE4D2D]">Chính sách</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Các chính sách và cam kết của FoodieShop đối với khách hàng để đảm bảo quyền lợi mua sắm tốt nhất.
          </p>
        </div>

        {/* Lưới các chính sách */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Bảo mật */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Chính sách bảo mật</h3>
                <p className="text-sm text-gray-500">
                  Thông tin cá nhân của bạn được bảo mật tuyệt đối
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Không chia sẻ thông tin cá nhân với bên thứ ba</li>
              <li>• Mã hóa dữ liệu thanh toán SSL 256-bit</li>
              <li>• Bảo vệ thông tin đăng nhập và lịch sử giao dịch</li>
              <li>• Tuân thủ luật bảo vệ dữ liệu cá nhân Việt Nam</li>
            </ul>
          </div>

          {/* Đổi trả */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Chính sách đổi trả</h3>
                <p className="text-sm text-gray-500">
                  Cam kết hoàn tiền nếu sản phẩm không đạt chất lượng
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Hoàn tiền 100% nếu món ăn bị lỗi sản xuất</li>
              <li>• Giao hàng muộn quá 60 phút: hỗ trợ hoàn phí ship</li>
              <li>• Món ăn sai so với đơn hàng: đổi trả miễn phí</li>
              <li>• Hỗ trợ xử lý khiếu nại trong vòng 24h</li>
            </ul>
          </div>

          {/* Chất lượng */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Chính sách chất lượng</h3>
                <p className="text-sm text-gray-500">
                  Đảm bảo chất lượng món ăn và dịch vụ tốt nhất
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Kiểm tra chất lượng quán ăn trước khi hợp tác</li>
              <li>• Đảm bảo vệ sinh an toàn thực phẩm 100%</li>
              <li>• Quy trình đóng gói cẩn thận, giữ nhiệt tốt</li>
              <li>• Hệ thống đánh giá quán ăn công khai minh bạch</li>
            </ul>
          </div>

          {/* Thanh toán */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#EE4D2D]">Chính sách thanh toán</h3>
                <p className="text-sm text-gray-500">
                  Đa dạng phương thức thanh toán an toàn
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Thanh toán khi nhận hàng (COD) tiện lợi</li>
              <li>• Liên kết ví điện tử: MoMo, ZaloPay, ShopeePay</li>
              <li>• Chấp nhận thẻ ATM, Visa, Mastercard</li>
              <li>• Hệ thống bảo mật giao dịch trực tuyến 100%</li>
            </ul>
          </div>
        </div>

        {/* Cam kết chung */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">Cam kết của chúng tôi</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            FoodieShop cam kết mang đến trải nghiệm mua sắm trực tuyến an toàn, thuận tiện 
            và chất lượng cao nhất cho khách hàng. Chúng tôi luôn lắng nghe phản hồi và đặt 
            quyền lợi của khách hàng lên hàng đầu trong mọi quy trình phục vụ.
          </p>
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#EE4D2D]">
            <p className="text-sm text-gray-700">
              Mọi thắc mắc hoặc cần hỗ trợ về chính sách, vui lòng liên hệ hotline: 
              <span className="font-bold text-[#EE4D2D]"> 1900-xxxx</span> hoặc email: 
              <span className="font-bold"> support@foodieshop.vn</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}