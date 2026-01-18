import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * ShoppingCart Component
 * Hiển thị danh sách món ăn trong giỏ hàng, cho phép thay đổi số lượng và tính toán tổng tiền.
 */
export function ShoppingCart({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  // Tính toán các chỉ số tài chính
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 100000 || subtotal === 0 ? 0 : 15000;
  const discount = subtotal >= 200000 ? 20000 : 0;
  const total = subtotal + shippingFee - discount;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 border-none shadow-2xl">
        {/* Header với nền trắng cố định */}
        <div className="p-6 border-b">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 text-xl font-black text-gray-900">
              <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#EE4D2D]" />
              </div>
              Giỏ hàng của bạn
              <span className="text-sm font-bold text-gray-400 ml-auto bg-gray-100 px-3 py-1 rounded-full">
                {items.length} món
              </span>
            </SheetTitle>
            <SheetDescription className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-2">
              Kiểm tra các món ăn trước khi thanh toán
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-200" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Giỏ hàng đang trống</p>
                <p className="text-sm text-gray-400 mt-1 max-w-[200px]">
                  Bụng đói rồi đấy! Thêm vài món ngon vào giỏ ngay thôi nào.
                </p>
              </div>
              <Button 
                onClick={onClose}
                className="mt-4 bg-[#EE4D2D] hover:bg-[#d73a1e] font-bold rounded-xl"
              >
                Khám phá thực đơn
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border-2 border-gray-50 rounded-2xl bg-white hover:border-orange-100 transition-all group"
                >
                  {/* Ảnh món ăn */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Thông tin món ăn */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1 leading-tight group-hover:text-[#EE4D2D] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[#EE4D2D] font-black text-sm mt-1">
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                    
                    {/* Bộ điều khiển số lượng */}
                    <div className="flex items-center gap-3 bg-gray-50 w-fit px-2 py-1 rounded-lg mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="text-gray-400 hover:text-[#EE4D2D] disabled:opacity-30 p-1 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-black text-gray-700 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-[#EE4D2D] p-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Nút xóa */}
                  <div className="flex flex-col items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tổng kết & Thanh toán */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-dashed space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Tạm tính</span>
                <span className="text-gray-900 font-bold">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Phí giao hàng</span>
                <span className={shippingFee === 0 ? "text-green-600 font-bold" : "text-gray-900 font-bold"}>
                  {shippingFee === 0 ? "MIỄN PHÍ" : `${shippingFee.toLocaleString('vi-VN')}đ`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm font-bold text-green-600">
                  <span>Giảm giá Shop</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
            </div>

            {/* Thông báo Freeship */}
            {subtotal < 100000 && (
              <div className="bg-orange-50 text-[#EE4D2D] text-[11px] font-bold p-3 rounded-xl border border-orange-100 animate-in fade-in zoom-in">
                🚀 Mua thêm <span className="underline">{(100000 - subtotal).toLocaleString('vi-VN')}đ</span> nữa để nhận ưu đãi <span className="uppercase">Freeship</span>!
              </div>
            )}

            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng cộng</p>
                <p className="text-2xl font-black text-[#EE4D2D] leading-none mt-1">
                  {total.toLocaleString('vi-VN')}đ
                </p>
              </div>
              <Button
                className="bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black px-10 h-14 rounded-2xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.02] active:scale-95"
                onClick={onCheckout}
              >
                ĐẶT MÓN NGAY
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}