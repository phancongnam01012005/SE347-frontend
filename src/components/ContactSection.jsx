import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gửi tin nhắn thực tế sẽ được thêm ở đây
    toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề mục */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#EE4D2D]">Liên hệ với chúng tôi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cột thông tin liên hệ */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#EE4D2D]">Thông tin liên hệ</h3>
            
            <div className="space-y-6">
              {/* Địa chỉ */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Địa chỉ</h4>
                  <p className="text-sm text-gray-500">
                    123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                  </p>
                </div>
              </div>

              {/* Điện thoại */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Điện thoại</h4>
                  <p className="text-sm text-gray-500">Hotline: 1900-xxxx</p>
                  <p className="text-sm text-gray-500">Hỗ trợ: 028-xxxx-xxxx</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm text-gray-500">support@foodieshop.vn</p>
                  <p className="text-sm text-gray-500">info@foodieshop.vn</p>
                </div>
              </div>

              {/* Giờ làm việc */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EE4D2D]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Giờ làm việc</h4>
                  <p className="text-sm text-gray-500">Thứ 2 - Thứ 7: 8:00 - 22:00</p>
                  <p className="text-sm text-gray-500">Chủ nhật: 9:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Form gửi tin nhắn */}
          <div className="bg-gray-50 p-8 rounded-2xl border">
            <h3 className="text-xl font-bold mb-6 text-[#EE4D2D]">Gửi tin nhắn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Họ và tên</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Tin nhắn</Label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập nội dung tin nhắn..."
                  required
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#EE4D2D] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-bold py-6"
              >
                Gửi tin nhắn
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}