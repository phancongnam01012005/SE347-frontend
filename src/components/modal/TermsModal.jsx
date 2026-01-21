import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';

export function TermsModal({ isOpen, onClose }) {
  const sections = [
    {
      title: "Điều khoản chung",
      content: [
        "1.1. FoodieShop là nền tảng thương mại điện tử kết nối người mua và người bán các sản phẩm đồ ăn, đồ uống.",
        "1.2. Người dùng phải từ 13 tuổi trở lên để sử dụng dịch vụ. Nếu dưới 18 tuổi, cần có sự đồng ý của phụ huynh.",
        "1.3. Người dùng chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.",
        "1.4. FoodieShop có quyền thay đổi điều khoản sử dụng bất cứ lúc nào mà không cần thông báo trước."
      ]
    },
    {
      title: "Quyền và nghĩa vụ của người mua",
      subsections: [
        {
          label: "Quyền lợi:",
          items: [
            "Được cung cấp thông tin đầy đủ, chính xác về sản phẩm",
            "Được lựa chọn sản phẩm và phương thức thanh toán",
            "Được bảo vệ thông tin cá nhân",
            "Được đổi trả hàng theo chính sách",
            "Được hỗ trợ và giải đáp thắc mắc"
          ]
        },
        {
          label: "Nghĩa vụ:",
          items: [
            "Cung cấp thông tin chính xác khi đặt hàng",
            "Thanh toán đầy đủ theo phương thức đã chọn",
            "Nhận hàng đúng thời gian đã hẹn",
            "Không lạm dụng chính sách đổi trả",
            "Đánh giá sản phẩm trung thực, khách quan"
          ]
        }
      ]
    },
    {
      title: "Quyền và nghĩa vụ của người bán",
      subsections: [
        {
          label: "Quyền lợi:",
          items: [
            "Được đăng bán sản phẩm trên nền tảng",
            "Tự quản lý giá cả và khuyến mãi",
            "Nhận thanh toán từ đơn hàng thành công",
            "Được hỗ trợ marketing và quảng bá"
          ]
        },
        {
          label: "Nghĩa vụ:",
          items: [
            "Cung cấp sản phẩm chất lượng, đúng mô tả",
            "Đảm bảo vệ sinh an toàn thực phẩm",
            "Giao hàng đúng hẹn, đóng gói cẩn thận",
            "Xử lý khiếu nại và hoàn tiền hợp lý",
            "Không bán hàng giả, hàng cấm"
          ]
        }
      ]
    },
    {
      title: "Giao dịch và thanh toán",
      content: [
        "4.1. Tất cả giao dịch phải được thực hiện qua nền tảng FoodieShop.",
        "4.2. FoodieShop giữ vai trò trung gian trong việc xử lý thanh toán và giải quyết tranh chấp.",
        "4.3. Người bán chỉ nhận được thanh toán sau khi đơn hàng được giao thành công và người mua xác nhận.",
        "4.4. Mọi tranh chấp về giao dịch sẽ được giải quyết theo quy định của pháp luật Việt Nam."
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Điều khoản sử dụng</DialogTitle>
          <DialogDescription>
            Điều khoản và điều kiện sử dụng dịch vụ FoodieShop
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Thông báo quan trọng */}
          <div className="bg-[#EE4D2D]/5 p-5 rounded-xl border border-[#EE4D2D]/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#EE4D2D] shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-[#EE4D2D] mb-1 text-base">Lưu ý quan trọng</p>
                <p className="text-muted-foreground leading-relaxed">
                  Bằng việc truy cập và sử dụng dịch vụ FoodieShop, bạn đồng ý tuân thủ 
                  các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ trước khi trải nghiệm.
                </p>
              </div>
            </div>
          </div>

          {/* Render các Section */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="border rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center text-sm font-black shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg">{section.title}</h3>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-4 ml-2 md:ml-11">
                  {section.content && section.content.map((p, i) => (
                    <p key={i} className="leading-relaxed">{p}</p>
                  ))}
                  
                  {section.subsections && section.subsections.map((sub, i) => (
                    <div key={i}>
                      <p className="font-bold text-foreground mb-2">{sub.label}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sub.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chấp nhận điều khoản */}
          <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] p-8 rounded-2xl text-white shadow-xl shadow-orange-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <p className="font-black text-xl">Xác nhận đồng ý</p>
                <p className="text-sm opacity-90 leading-relaxed">
                  Bằng việc tiếp tục sử dụng FoodieShop, bạn xác nhận đã hiểu và chấp thuận 
                  tất cả các quy định trên. FoodieShop luôn nỗ lực vì quyền lợi của bạn.
                </p>
                <div className="pt-4 flex justify-between items-center border-t border-white/20 mt-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    Phiên bản 1.2
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    Cập nhật: 18/01/2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}