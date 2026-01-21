import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-background p-6 rounded-lg text-center shadow-sm">
            <Phone className="w-8 h-8 text-[#EE4D2D] mx-auto mb-3" />
            <h3 className="mb-2 font-medium">Hotline</h3>
            <p className="text-sm text-muted-foreground">1900-xxxx</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg text-center shadow-sm">
            <Mail className="w-8 h-8 text-[#EE4D2D] mx-auto mb-3" />
            <h3 className="mb-2 font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">support@foodieshop.vn</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg text-center shadow-sm">
            <MapPin className="w-8 h-8 text-[#EE4D2D] mx-auto mb-3" />
            <h3 className="mb-2 font-medium">Địa chỉ</h3>
            <p className="text-sm text-muted-foreground">TP. Hồ Chí Minh</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg text-center shadow-sm">
            <Clock className="w-8 h-8 text-[#EE4D2D] mx-auto mb-3" />
            <h3 className="mb-2 font-medium">Giờ làm việc</h3>
            <p className="text-sm text-muted-foreground">24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
}