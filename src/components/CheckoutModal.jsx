import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

/**
 * CheckoutModal Component
 * Cung cấp giao diện liên hệ bao gồm thông tin chi nhánh và form gửi tin nhắn hỗ trợ.
 */
export function CheckoutModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Giả lập gửi tin nhắn thành công
    toast.success('Đã gửi tin nhắn thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    // Đóng modal nếu cần
    // onClose(); 
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">
            Liên hệ với chúng tôi
          </DialogTitle>
          <DialogDescription className="text-base">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* CỘT TRÁI: Thông tin liên hệ */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#EE4D2D]/10 to-[#FF6B4A]/10 p-6 rounded-2xl border border-[#EE4D2D]/10">
              <h3 className="font-bold mb-4 text-lg text-gray-800">Thông tin chi tiết</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 text-gray-900">Hotline</h4>
                    <p className="text-sm text-gray-600">1900 xxxx</p>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Miễn phí cuộc gọi</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 text-gray-900">Email hỗ trợ</h4>
                    <p className="text-sm text-gray-600">support@foodieshop.vn</p>
                    <p className="text-sm text-gray-600">business@foodieshop.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 text-gray-900">Trụ sở chính</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      123 Nguyễn Huệ, Phường Bến Nghé, Quận 1<br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 text-gray-900">Giờ làm việc</h4>
                    <p className="text-sm text-gray-600">
                      T2 - T6: 08:00 - 18:00<br />
                      T7 - CN: 09:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner hỗ trợ 24/7 */}
            <div className="bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] p-6 rounded-2xl text-white shadow-lg shadow-orange-200">
              <div className="flex items-center gap-4 mb-3">
                <MessageCircle className="w-10 h-10 opacity-90" />
                <h3 className="font-bold text-lg">Hỗ trợ trực tuyến 24/7</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng giải đáp thắc mắc và xử lý sự cố của bạn mọi lúc.
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: Form liên hệ */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-lg mb-6 text-gray-800">Gửi lời nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="font-semibold text-xs">Họ và tên *</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  className="focus-visible:ring-[#EE4D2D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="font-semibold text-xs">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="email@example.com"
                    required
                    className="focus-visible:ring-[#EE4D2D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="font-semibold text-xs">Số điện thoại</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="focus-visible:ring-[#EE4D2D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-subject" className="font-semibold text-xs">Tiêu đề</Label>
                <Input
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  placeholder="Vấn đề bạn đang gặp phải..."
                  className="focus-visible:ring-[#EE4D2D]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="font-semibold text-xs">Nội dung tin nhắn *</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Mô tả chi tiết câu hỏi hoặc yêu cầu hỗ trợ..."
                  rows={5}
                  required
                  className="focus-visible:ring-[#EE4D2D] resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold h-12 shadow-md transition-all active:scale-[0.98]"
              >
                Gửi yêu cầu ngay
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}