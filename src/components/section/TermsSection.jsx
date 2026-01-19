import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export function TermsSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold">Điều khoản sử dụng</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vui lòng đọc kỹ điều khoản trước khi sử dụng dịch vụ để đảm bảo quyền lợi của bạn.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Quyền lợi khách hàng */}
          <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#EE4D2D]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <h3 className="text-xl font-semibold">Quyền lợi khách hàng</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Được hưởng các chương trình khuyến mãi và ưu đãi độc quyền.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Bảo mật tuyệt đối thông tin cá nhân và lịch sử giao dịch.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Hỗ trợ khách hàng tận tâm 24/7 qua nhiều kênh liên lạc.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Chính sách hoàn tiền nhanh chóng khi có sự cố đơn hàng.</span>
              </li>
            </ul>
          </div>
          
          {/* Trách nhiệm khách hàng */}
          <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Trách nhiệm khách hàng</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Cung cấp thông tin địa chỉ và số điện thoại chính xác.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Thanh toán đầy đủ và đúng hạn cho các đơn hàng đã đặt.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Tuân thủ các quy định chung về đặt hàng và nhận hàng.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Không lạm dụng các chương trình ưu đãi sai mục đích.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}