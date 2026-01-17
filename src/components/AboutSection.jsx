import React from 'react';
import { Store, Users, Award, Clock } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Phần tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#EE4D2D]">Giới thiệu về FoodieShop</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            FoodieShop là nền tảng đặt đồ ăn trực tuyến hàng đầu, kết nối người mua và người bán 
            với hàng ngàn món ăn ngon từ các quán ăn uy tín trên toàn quốc.
          </p>
        </div>

        {/* Các chỉ số thống kê & Tính năng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-lg">1000+ Quán ăn</h3>
            <p className="text-sm text-gray-500">
              Đa dạng lựa chọn từ các quán ăn uy tín
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-lg">100K+ Khách hàng</h3>
            <p className="text-sm text-gray-500">
              Được tin tưởng bởi hàng nghìn người dùng
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-lg">Giao hàng nhanh</h3>
            <p className="text-sm text-gray-500">
              Đảm bảo giao hàng trong 30-45 phút
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-[#EE4D2D] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-lg">Chất lượng đảm bảo</h3>
            <p className="text-sm text-gray-500">
              Cam kết về chất lượng và an toàn thực phẩm
            </p>
          </div>
        </div>

        {/* Phần nội dung chi tiết */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border p-8">
          <h3 className="text-xl font-bold mb-4 text-[#EE4D2D]">Câu chuyện của chúng tôi</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            FoodieShop được thành lập với sứ mệnh mang đến trải nghiệm đặt đồ ăn trực tuyến 
            tuyệt vời nhất cho người dùng Việt Nam. Chúng tôi tin rằng việc thưởng thức những 
            món ăn ngon không chỉ là nhu cầu mà còn là niềm vui trong cuộc sống.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Với công nghệ hiện đại và đội ngũ giao hàng chuyên nghiệp, chúng tôi cam kết 
            mang đến cho bạn những bữa ăn ngon, nóng hổi và an toàn nhất trong thời gian nhanh nhất.
          </p>
        </div>
      </div>
    </section>
  );
}