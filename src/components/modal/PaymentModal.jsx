import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { CheckCircle2, ArrowLeft, Clock, Shield, Info } from 'lucide-react';

export function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  onBack,
  paymentMethod,
  orderNumber,
  amount
}) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 phút
  const [isPaid, setIsPaid] = useState(false);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = () => {
    setIsPaid(true);
    // Giả lập xử lý thanh toán trong 1 giây
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 1000);
  };

  const handleBack = () => {
    if (onBack) onBack();
    onClose();
  };

  const paymentConfig = {
    momo: {
      name: 'Ví MoMo',
      fullName: 'MoMo E-Wallet',
      bgGradient: 'from-[#A50064] via-[#D82D8B] to-[#A50064]',
      logoGradient: 'from-[#A50064] to-[#D82D8B]',
      qrBorder: 'border-pink-400',
      logoText: 'M'
    },
    zalopay: {
      name: 'Ví ZaloPay',
      fullName: 'ZaloPay E-Wallet',
      bgGradient: 'from-[#0068FF] via-[#0084FF] to-[#0068FF]',
      logoGradient: 'from-[#0068FF] to-[#0084FF]',
      qrBorder: 'border-blue-400',
      logoText: 'Z'
    }
  };

  const config = paymentConfig[paymentMethod] || paymentConfig.momo;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 rounded-2xl border-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Thanh toán đơn hàng</DialogTitle>
          <DialogDescription>
            Quét mã QR để hoàn thành thanh toán cho đơn hàng #{orderNumber}
          </DialogDescription>
        </DialogHeader>

        {/* Top Header Bar */}
        <div className={`bg-gradient-to-r ${config.bgGradient} text-white px-6 py-4 flex items-center justify-between shadow-lg`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:bg-white/20 gap-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Thay đổi phương thức
          </Button>
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Cột trái: QR Code Area */}
          <div className="flex flex-col items-center justify-center space-y-8 p-8 md:p-12 bg-white">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight">Mã QR Thanh Toán</h2>
              <p className="text-muted-foreground">
                Mở ứng dụng <span className="font-bold text-foreground">{config.name}</span> để quét mã
              </p>
            </div>

            {/* QR Code Container với hiệu ứng bo góc hiện đại */}
            <div className="relative group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#EE4D2D] rounded-tl-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#EE4D2D] rounded-tr-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#EE4D2D] rounded-bl-xl transition-all group-hover:scale-110"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#EE4D2D] rounded-br-xl transition-all group-hover:scale-110"></div>

              <div className={`bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-2 ${config.qrBorder}`}>
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                  {/* SVG QR giả lập trực quan */}
                  <svg viewBox="0 0 29 29" className="w-full h-full opacity-90">
                    <rect x="0" y="0" width="7" height="7" fill="black" />
                    <rect x="1" y="1" width="5" height="5" fill="white" />
                    <rect x="2" y="2" width="3" height="3" fill="black" />
                    <rect x="22" y="0" width="7" height="7" fill="black" />
                    <rect x="23" y="1" width="5" height="5" fill="white" />
                    <rect x="24" y="2" width="3" height="3" fill="black" />
                    <rect x="0" y="22" width="7" height="7" fill="black" />
                    <rect x="1" y="23" width="5" height="5" fill="white" />
                    <rect x="2" y="24" width="3" height="3" fill="black" />
                    {Array.from({ length: 300 }).map((_, i) => {
                      const x = i % 29; const y = Math.floor(i / 29);
                      if ((x < 8 && y < 8) || (x > 20 && y < 8) || (x < 8 && y > 20)) return null;
                      return Math.random() > 0.6 ? <rect key={i} x={x} y={y} width="1" height="1" fill="#1a1a1a" /> : null;
                    })}
                  </svg>
                  
                  {/* Logo trung tâm */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${config.logoGradient} rounded-2xl w-14 h-14 flex items-center justify-center shadow-xl border-4 border-white`}>
                    <span className="text-white font-black text-2xl">{config.logoText}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 w-full max-w-sm">
              <div className="flex gap-3 text-sm text-blue-800">
                <Info className="w-5 h-5 shrink-0 text-blue-600" />
                <div className="space-y-1 font-medium">
                  <p>Hướng dẫn nhanh:</p>
                  <p className="text-blue-600/80 font-normal">Quét mã QR - Kiểm tra số tiền - Xác nhận</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Order Summary */}
          <div className="bg-gray-50/50 border-l border-gray-100 p-8 md:p-12 space-y-8 flex flex-col justify-center">
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400">Chi tiết thanh toán</h3>
              
              <div className={`bg-gradient-to-br ${config.bgGradient} rounded-2xl p-6 text-white shadow-lg`}>
                <p className="text-xs opacity-80 uppercase font-bold mb-1">Phương thức</p>
                <p className="text-2xl font-black">{config.fullName}</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 divide-y overflow-hidden shadow-sm">
                <div className="p-5 flex justify-between">
                  <span className="text-muted-foreground">Mã đơn hàng</span>
                  <span className="font-mono font-bold">{orderNumber}</span>
                </div>
                <div className="p-5 flex justify-between items-center bg-orange-50/30">
                  <span className="text-muted-foreground">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-[#EE4D2D]">
                    {amount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100">
                <Shield className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-xs text-green-800 leading-tight">
                  <span className="font-bold">Giao dịch an toàn:</span> Mọi thông tin đều được bảo mật theo tiêu chuẩn PCI DSS.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <Button
                onClick={handleConfirmPayment}
                disabled={isPaid || timeLeft === 0}
                className={`w-full h-14 text-lg font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98] ${
                  isPaid 
                    ? 'bg-green-600 hover:bg-green-600 text-white' 
                    : `bg-gradient-to-r ${config.bgGradient} text-white`
                }`}
              >
                {isPaid ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" /> Thành công
                  </span>
                ) : (
                  'Xác nhận đã thanh toán'
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                Nhấn xác nhận để hoàn tất quy trình Demo
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}