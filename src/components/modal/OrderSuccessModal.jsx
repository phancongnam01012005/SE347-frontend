import { CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

export function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        {/* sr-only giúp hỗ trợ trình đọc màn hình mà không hiển thị tiêu đề thừa trên UI */}
        <DialogTitle className="sr-only">Đặt hàng thành công</DialogTitle>
        <DialogDescription className="sr-only">Thông báo xác nhận đơn hàng đã được hệ thống tiếp nhận</DialogDescription>
        
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          {/* Icon Thành công với hiệu ứng nhẹ */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-green-600">Đặt hàng thành công!</h2>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã tin tưởng và lựa chọn FoodieShop.
            </p>
          </div>

          {/* Box hiển thị mã đơn hàng */}
          <div className="bg-gray-50 border border-dashed border-gray-200 p-4 rounded-xl w-full">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold">
              Mã đơn hàng của bạn
            </div>
            <div className="text-xl font-mono font-bold text-[#EE4D2D]">
              {orderNumber}
            </div>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed px-4">
            Đơn hàng đang được nhà hàng chuẩn bị và sẽ sớm được giao đến địa chỉ của bạn.
          </div>

          <Button
            onClick={onClose}
            className="w-full h-12 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}