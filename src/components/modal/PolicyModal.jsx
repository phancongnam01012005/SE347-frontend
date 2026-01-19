import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Shield, Package, RefreshCw, Lock, CreditCard, Truck } from 'lucide-react';

export function PolicyModal({ isOpen, onClose }) {
  const policies = [
    {
      title: "Chính sách bảo mật",
      icon: Lock,
      content: "FoodieShop cam kết bảo vệ thông tin cá nhân của người dùng. Mọi thông tin cá nhân sẽ được mã hóa và bảo mật tuyệt đối.",
      bullets: [
        "Thông tin không được chia sẻ cho bên thứ ba khi chưa có sự đồng ý",
        "Dữ liệu được lưu trữ trên hệ thống bảo mật cao",
        "Người dùng có quyền yêu cầu xóa thông tin cá nhân",
        "Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng"
      ]
    },
    {
      title: "Chính sách thanh toán",
      icon: CreditCard,
      content: "FoodieShop hỗ trợ nhiều phương thức thanh toán linh hoạt và an toàn:",
      bullets: [
        "COD: Thanh toán khi nhận hàng (phí 15.000đ)",
        "MoMo: Thanh toán qua ví điện tử MoMo (miễn phí)",
        "ZaloPay: Thanh toán qua ví điện tử ZaloPay (miễn phí)",
        "Tất cả giao dịch đều được mã hóa và bảo mật",
        "Không lưu trữ thông tin thẻ thanh toán"
      ]
    },
    {
      title: "Chính sách giao hàng",
      icon: Truck,
      content: "Dịch vụ giao hàng nhanh chóng và đảm bảo:",
      bullets: [
        "Giao hàng nội thành: 30-60 phút",
        "Phí giao hàng: 15.000đ - 30.000đ tùy khoảng cách",
        "Miễn phí giao hàng cho đơn từ 200.000đ",
        "Kiểm tra hàng trước khi thanh toán (COD)",
        "Giao hàng 24/7 trong các khu vực hỗ trợ"
      ]
    },
    {
      title: "Chính sách đổi trả",
      icon: RefreshCw,
      content: "Chúng tôi chấp nhận đổi trả hàng trong các trường hợp sau:",
      bullets: [
        "Sản phẩm bị lỗi, hư hỏng do vận chuyển",
        "Sản phẩm không đúng như mô tả hoặc giao sai món",
        "Thời gian đổi trả: trong vòng 24 giờ kể từ khi nhận hàng",
        "Sản phẩm phải còn nguyên bao bì, chưa sử dụng",
        "FoodieShop chịu phí vận chuyển cho đơn đổi trả lỗi từ Shop"
      ]
    },
    {
      title: "Chính sách chất lượng",
      icon: Shield,
      content: "Cam kết về chất lượng sản phẩm:",
      bullets: [
        "Tất cả sản phẩm đều có nguồn gốc rõ ràng",
        "Đảm bảo vệ sinh an toàn thực phẩm",
        "Kiểm tra chất lượng trước khi giao hàng",
        "Hạn sử dụng còn tối thiểu 30% thời gian",
        "Đóng gói cẩn thận, bảo quản đúng cách"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Chính sách & Quy định</DialogTitle>
          <DialogDescription>
            Vui lòng đọc kỹ các chính sách của FoodieShop để đảm bảo quyền lợi của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <div key={index} className="group border rounded-xl p-6 hover:shadow-md hover:border-[#EE4D2D]/30 transition-all bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#EE4D2D]" />
                  </div>
                  <h3 className="font-bold text-lg">{policy.title}</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p className="font-medium text-foreground">{policy.content}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {policy.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EE4D2D] shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Contact Support Box */}
          <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] p-6 rounded-2xl text-white shadow-lg shadow-orange-100">
            <h4 className="font-bold mb-3 text-lg">Cần hỗ trợ thêm về pháp lý?</h4>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              Nếu bạn có bất kỳ thắc mắc nào về điều khoản hoặc cần khiếu nại về dịch vụ, 
              đội ngũ pháp chế của chúng tôi luôn sẵn sàng giải đáp.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg">
                <span>📞 Hotline: 1900 xxxx</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg">
                <span>📧 Email: support@foodieshop.vn</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}