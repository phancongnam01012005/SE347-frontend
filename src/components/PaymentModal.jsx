import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2, ArrowLeft, Clock, Shield, Info } from 'lucide-react';

/**
 * PaymentModal Component
 * Giả lập giao diện thanh toán QR Code cho MoMo và ZaloPay.
 * Bao gồm bộ đếm ngược 15 phút và hiển thị thông tin đơn hàng.
 */
export function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  onBack,
  paymentMethod, // 'momo' hoặc 'zalopay'
  orderNumber,
  amount
}) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 phút tính bằng giây
  const [isPaid, setIsPaid] = useState(false);

  // Xử lý bộ đếm ngược
  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(900);
      setIsPaid(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Định dạng giây thành mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = () => {
    setIsPaid(true);
    // Giả lập quá trình xử lý thanh toán
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 1500);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    onClose();
  };

  // Cấu hình giao diện theo phương thức thanh toán
  const paymentConfig = {
    momo: {
      name: 'Ví MoMo',
      fullName: 'MoMo E-Wallet',
      bgGradient: 'from-[#A50064] via-[#D82D8B] to-[#A50064]',
      logoGradient: 'from-[#A50064] to-[#D82D8B]',
      accentColor: '#D82D8B',
      qrBorder: 'border-pink-400',
      logoText: 'M'
    },
    zalopay: {
      name: 'Ví ZaloPay',
      fullName: 'ZaloPay E-Wallet',
      bgGradient: 'from-[#0068FF] via-[#0084FF] to-[#0068FF]',
      logoGradient: 'from-[#0068FF] to-[#0084FF]',
      accentColor: '#0084FF',
      qrBorder: 'border-blue-400',
      logoText: 'Z'
    }
  };

  const config = paymentConfig[paymentMethod] || paymentConfig.momo;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 rounded-2xl border-none shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Thanh toán đơn hàng</DialogTitle>
          <DialogDescription>
            Quét mã QR để hoàn thành thanh toán đơn hàng #{orderNumber}
          </DialogDescription>
        </DialogHeader>

        {/* Thanh tiêu đề với nút quay lại và đồng hồ */}
        <div className={`bg-gradient-to-r ${config.bgGradient} text-white px-6 py-4 flex items-center justify-between shadow-md`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:bg-white/20 gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay về
          </Button>
          <div className="flex items-center gap-3 bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* CỘT TRÁI: Mã QR */}
          <div className="flex flex-col items-center justify-center p-10 space-y-8 bg-white">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Quét mã để thanh toán</h2>
              <p className="text-gray-500">
                Sử dụng ứng dụng <span className="font-bold text-gray-800">{config.name}</span> để quét mã
              </p>
            </div>

            {/* Container mã QR */}
            <div className="relative group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#EE4D2D] rounded-tl-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#EE4D2D] rounded-tr-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#EE4D2D] rounded-bl-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#EE4D2D] rounded-br-xl transition-all group-hover:scale-110"></div>

              <div className={`bg-white p-6 rounded-2xl shadow-xl border-2 ${config.qrBorder}`}>
                <div className="w-64 h-64 bg-white relative">
                  {/* SVG Vẽ mẫu QR giả lập */}
                  <svg viewBox="0 0 29 29" className="w-full h-full opacity-90">
                    <rect x="0" y="0" width="7" height="7" fill="#111" />
                    <rect x="1" y="1" width="5" height="5" fill="white" />
                    <rect x="2" y="2" width="3" height="3" fill="#111" />
                    <rect x="22" y="0" width="7" height="7" fill="#111" />
                    <rect x="23" y="1" width="5" height="5" fill="white" />
                    <rect x="24" y="2" width="3" height="3" fill="#111" />
                    <rect x="0" y="22" width="7" height="7" fill="#111" />
                    <rect x="1" y="23" width="5" height="5" fill="white" />
                    <rect x="2" y="24" width="3" height="3" fill="#111" />
                    {Array.from({ length: 300 }).map((_, i) => {
                      const x = i % 29;
                      const y = Math.floor(i / 29);
                      if ((x < 8 && y < 8) || (x > 20 && y < 8) || (x < 8 && y > 20)) return null;
                      return Math.random() > 0.4 ? <rect key={i} x={x} y={y} width="1" height="1" fill="#333" /> : null;
                    })}
                  </svg>
                  
                  {/* Logo chính giữa mã QR */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${config.logoGradient} rounded-xl w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white`}>
                    <span className="text-white font-black text-2xl">{config.logoText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hướng dẫn ngắn */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 w-full max-w-sm flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800 space-y-1 leading-relaxed">
                <p className="font-bold">Các bước thực hiện:</p>
                <p>1. Mở app ngân hàng hoặc ví điện tử</p>
                <p>2. Quét mã QR và kiểm tra số tiền</p>
                <p>3. Nhấn xác nhận thanh toán trên điện thoại</p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Thông tin đơn hàng */}
          <div className="bg-gray-50/50 border-l p-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Chi tiết thanh toán</h3>
              
              <div className={`bg-gradient-to-br ${config.bgGradient} rounded-2xl p-5 text-white shadow-lg`}>
                <p className="text-[10px] uppercase font-bold opacity-80 mb-1 tracking-wider">Hình thức thanh toán</p>
                <p className="text-xl font-black">{config.fullName}</p>
              </div>

              <div className="bg-white border rounded-2xl divide-y overflow-hidden shadow-sm">
                <div className="p-4 flex justify-between">
                  <span className="text-sm text-gray-400 font-medium">Mã đơn hàng</span>
                  <span className="font-mono font-bold text-gray-800">{orderNumber}</span>
                </div>
                <div className="p-4 flex justify-between">
                  <span className="text-sm text-gray-400 font-medium">Nhà cung cấp</span>
                  <span className="font-bold text-gray-800">FoodieShop VN</span>
                </div>
                <div className="p-6 bg-orange-50/50 flex flex-col items-center">
                  <p className="text-sm text-gray-500 font-medium mb-1">Tổng cộng</p>
                  <p className="text-4xl font-black text-[#EE4D2D]">
                    {amount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              {/* Thông tin bảo mật */}
              <div className="flex items-center gap-2 justify-center text-green-600 py-2">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Giao dịch bảo mật 256-bit SSL</span>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleConfirmPayment}
                disabled={isPaid || timeLeft === 0}
                className={`w-full h-14 text-lg font-bold rounded-xl transition-all shadow-lg active:scale-95 ${
                  isPaid 
                    ? 'bg-green-600 hover:bg-green-600' 
                    : `bg-gradient-to-r ${config.bgGradient} hover:brightness-110`
                }`}
              >
                {isPaid ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" /> Thành công
                  </span>
                ) : timeLeft === 0 ? (
                  'Hết hạn'
                ) : (
                  'Tôi đã thanh toán'
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full h-12 border-gray-200 text-gray-500 font-bold hover:bg-white rounded-xl"
              >
                Đổi phương thức khác
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}