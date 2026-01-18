import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

/**
 * OrderSuccessModal Component
 * Hiển thị thông báo sau khi người dùng đặt hàng thành công, kèm theo mã đơn hàng.
 */
export function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-8">
        {/* Tiêu đề ẩn cho Accessibility (Trình đọc màn hình) */}
        <DialogTitle className="sr-only">Đặt hàng thành công</DialogTitle>
        <DialogDescription className="sr-only">Thông báo xác nhận đơn hàng đã được hệ thống ghi nhận</DialogDescription>
        
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon Thành công với hiệu ứng lồng nhau */}
          <div className="relative">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          {/* Thông điệp chính */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Đặt hàng thành công!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cảm ơn bạn đã tin tưởng và lựa chọn <span className="font-bold text-[#EE4D2D]">FoodieShop</span>. <br />
              Đội ngũ đầu bếp đang bắt đầu chuẩn bị món ngon cho bạn!
            </p>
          </div>

          {/* Box hiển thị Mã đơn hàng */}
          <div className="bg-gray-50 border border-dashed border-gray-200 p-5 rounded-xl w-full group transition-colors hover:bg-orange-50/30 hover:border-[#EE4D2D]/20">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Mã số đơn hàng của bạn</div>
            <div className="text-2xl font-black text-[#EE4D2D] font-mono letter tracking-tighter">
              #{orderNumber}
            </div>
          </div>

          <div className="text-xs text-muted-foreground italic">
            Thông tin chi tiết đơn hàng đã được gửi vào lịch sử mua sắm của bạn.
          </div>

          {/* Nút hành động chính */}
          <Button
            onClick={onClose}
            className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold h-12 shadow-lg shadow-orange-100 transition-all hover:scale-[1.02] active:scale-95"
          >
            Tiếp tục khám phá món ngon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}