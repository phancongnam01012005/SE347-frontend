import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button'; // Đảm bảo bạn có file này
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'; // Đảm bảo bạn có file này
import { ImageWithFallback } from './figma/ImageWithFallback'; // Đảm bảo bạn có file này

export function ShoppingCart({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  // Tính toán các thông số giỏ hàng
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 100000 ? 0 : 15000;
  const discount = subtotal >= 200000 ? 20000 : 0;
  const total = subtotal + shippingFee - discount;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Giỏ hàng ({items.length} món)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Giỏ hàng của bạn đang trống</p>
            <p className="text-sm text-muted-foreground mt-2">
              Thêm món ăn yêu thích vào giỏ hàng nhé!
            </p>
          </div>
        ) : (
          <>
            {/* Danh sách món ăn */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-muted/30 p-3 rounded-lg"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="line-clamp-2 text-sm mb-2">{item.name}</h4>
                    <div className="text-[#EE4D2D]">
                      {item.price.toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>

                    <div className="flex items-center gap-2 border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Phần tổng kết tiền */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí giao hàng</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600">Miễn phí</span>
                  ) : (
                    `${shippingFee.toLocaleString('vi-VN')}đ`
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Giảm giá</span>
                  <span className="text-green-600">
                    -{discount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t">
                <span>Tổng cộng</span>
                <span className="text-[#EE4D2D]">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {subtotal < 100000 && (
                <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded">
                  Thêm {(100000 - subtotal).toLocaleString('vi-VN')}đ để được miễn phí ship
                </div>
              )}

              <Button
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                size="lg"
                onClick={onCheckout}
              >
                Thanh toán
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}