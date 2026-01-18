import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

/**
 * ContactModal Component
 * Cung cấp thông tin liên hệ của hệ thống và form gửi yêu cầu hỗ trợ cho người dùng.
 */
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
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }
    
    // Giả lập gửi dữ liệu
    toast.success('Gửi tin nhắn thành công! Đội ngũ hỗ trợ sẽ phản hồi bạn trong vòng 24h.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        {/* Header với điểm nhấn thương hiệu */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 px-8 py-6 border-b border-orange-100">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-[#EE4D2D] tracking-tight uppercase italic">
              Liên hệ chúng tôi
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
              Bạn có thắc mắc hay góp ý? Đừng ngần ngại kết nối với FoodieShop.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* CỘT TRÁI: Thông tin liên hệ */}
          <div className="p-8 space-y-8 bg-white md:border-r border-dashed border-gray-200">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Thông tin hỗ trợ</h3>
              
              <div className="space-y-5">
                {/* Điện thoại */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Phone className="w-6 h-6 text-[#EE4D2D]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase">Hotline</h4>
                    <p className="font-bold text-gray-900">1900 xxxx</p>
                    <p className="text-[10px] text-green-600 font-bold">Hoạt động 24/7</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase">Email hỗ trợ</h4>
                    <p className="font-bold text-gray-900">support@foodieshop.vn</p>
                  </div>
                </div>

                {/* Địa chỉ */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase">Văn phòng đại diện</h4>
                    <p className="font-bold text-gray-900">Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>

                {/* Giờ làm việc */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase">Giờ làm việc</h4>
                    <p className="font-bold text-gray-900">T2 - CN: 08:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner nhỏ hỗ trợ trực tuyến */}
            <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B4A] p-6 rounded-3xl text-white shadow-lg relative overflow-hidden group">
              <MessageCircle className="absolute -right-4 -bottom-4 w-20 h-20 opacity-20 group-hover:scale-110 transition-transform" />
              <h3 className="font-black text-lg mb-1 italic">Hỗ trợ Live Chat</h3>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                Chat trực tiếp với nhân viên tư vấn để được phản hồi ngay lập tức.
              </p>
              <button className="mt-4 bg-white text-[#EE4D2D] text-[10px] font-black px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors uppercase tracking-wider">
                Bắt đầu chat
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: Form liên hệ */}
          <div className="p-8 bg-gray-50/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[10px] font-black uppercase text-gray-400 ml-1">Họ và tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập họ tên của bạn"
                  className="rounded-xl border-gray-200 h-11 bg-white focus:ring-2 focus:ring-[#EE4D2D]/20"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase text-gray-400 ml-1">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@mail.com"
                    className="rounded-xl border-gray-200 h-11 bg-white"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase text-gray-400 ml-1">Điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="rounded-xl border-gray-200 h-11 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-[10px] font-black uppercase text-gray-400 ml-1">Chủ đề</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Bạn cần hỗ trợ về vấn đề gì?"
                  className="rounded-xl border-gray-200 h-11 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-[10px] font-black uppercase text-gray-400 ml-1">Nội dung tin nhắn *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Hãy chia sẻ chi tiết yêu cầu của bạn..."
                  rows={5}
                  className="rounded-2xl border-gray-200 bg-white resize-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-12 rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Gửi yêu cầu ngay <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}