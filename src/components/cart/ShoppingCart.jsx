import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  // Logic tính toán hóa đơn
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 100000 || items.length === 0 ? 0 : 15000;
  const discount = subtotal >= 200000 ? 20000 : 0;
  const total = subtotal + shippingFee - discount;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        {/* Header Giỏ hàng */}
        <div className="p-6 border-b">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-xl font-bold">
              <ShoppingBag className="w-6 h-6 text-[#EE4D2D]" />
              Giỏ hàng của bạn ({items.length})
            </SheetTitle>
            <SheetDescription>
              Kiểm tra danh sách món ăn trước khi thanh toán
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Trạng thái trống hoặc Danh sách sản phẩm */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">Giỏ hàng đang trống</p>
              <p className="text-sm text-muted-foreground mt-1">
                Có vẻ như bạn chưa chọn được món nào. <br />
                Quay lại thực đơn để chọn món ngon nhé!
              </p>
            </div>
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="rounded-full border-[#EE4D2D] text-[#EE4D2D] hover:bg-orange-50"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <>
            {/* List Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border rounded-2xl bg-white hover:border-[#EE4D2D]/30 transition-all shadow-sm"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-[#EE4D2D]">
                        {item.name}
                      </h4>
                      <div className="text-[#EE4D2D] font-bold text-base mt-1">
                        {item.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>

                    {/* Bộ điều khiển số lượng */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-xs font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout Section */}
            <div className="p-6 bg-gray-50 border-t space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-medium">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí giao hàng</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600 font-medium">Miễn phí</span>
                    ) : (
                      `${shippingFee.toLocaleString('vi-VN')}đ`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ưu đãi giảm giá</span>
                    <span className="text-green-600 font-medium">
                      -{discount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                )}
                
                {/* Thanh tiến độ Freeship */}
                {subtotal < 100000 && (
                  <div className="bg-orange-50 border border-orange-100 text-[#EE4D2D] text-[10px] p-2.5 rounded-xl font-bold flex items-center gap-2">
                    <span className="bg-[#EE4D2D] text-white p-0.5 rounded px-1.5 font-black uppercase">Tips</span>
                    Mua thêm {(100000 - subtotal).toLocaleString('vi-VN')}đ để được MIỄN PHÍ vận chuyển
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-lg">Tổng thanh toán</span>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#EE4D2D]">
                    {total.toLocaleString('vi-VN')}đ
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium italic">Đã bao gồm VAT</p>
                </div>
              </div>

              <Button
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
                onClick={onCheckout}
              >
                Tiến hành đặt hàng
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}