import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog'; // Đảm bảo bạn có component UI này
import { Button } from './ui/button';

export function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex flex-col items-center text-center py-6 space-y-4">
          {/* Icon thành công */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          {/* Tiêu đề */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-green-600">Đặt hàng thành công!</h2>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã đặt hàng tại ShopeeFood
            </p>
          </div>

          {/* Hiển thị Mã đơn hàng */}
          <div className="bg-muted/50 p-4 rounded-lg w-full">
            <div className="text-sm text-muted-foreground mb-1">Mã đơn hàng</div>
            <div className="font-mono font-bold text-lg text-[#EE4D2D]">
              {orderNumber}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Đơn hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất.
          </div>

          {/* Nút đóng/tiếp tục */}
          <Button
            onClick={onClose}
            className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white py-6 text-lg"
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}