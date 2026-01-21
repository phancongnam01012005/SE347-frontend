import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export function ContactModal({ isOpen, onClose }) {
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
    
    // Reset form và đóng modal
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    onClose();
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EE4D2D]">Liên hệ với chúng tôi</DialogTitle>
          <DialogDescription>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái: Thông tin liên hệ */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#EE4D2D]/5 to-[#FF6B4A]/5 p-6 rounded-2xl border border-[#EE4D2D]/10">
              <h3 className="font-bold mb-6 text-lg">Thông tin trực tiếp</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Hotline</h4>
                    <p className="text-sm text-muted-foreground font-medium">1900 xxxx</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Miễn phí cuộc gọi</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Email</h4>
                    <p className="text-sm text-muted-foreground">support@foodieshop.vn</p>
                    <p className="text-sm text-muted-foreground">business@foodieshop.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Trụ sở chính</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Giờ làm việc</h4>
                    <p className="text-sm text-muted-foreground">T2 - T6: 08:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">T7 - CN: 09:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#EE4D2D] p-6 rounded-2xl text-white shadow-lg shadow-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-8 h-8 opacity-90" />
                <h3 className="font-bold">Hỗ trợ trực tuyến</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Nếu bạn cần hỗ trợ gấp về đơn hàng, vui lòng sử dụng tính năng Chat trực tiếp trên ứng dụng để được xử lý nhanh nhất.
              </p>
            </div>
          </div>

          {/* Cột phải: Form gửi tin nhắn */}
          <div className="bg-white">
            <h3 className="font-bold mb-6 text-lg">Gửi lời nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="09xx xxx xxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Tiêu đề</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  placeholder="Vấn đề cần hỗ trợ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nội dung tin nhắn *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Mô tả chi tiết yêu cầu của bạn..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 h-12 font-bold text-white shadow-md transition-all active:scale-[0.98]"
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