import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CreditCard, Wallet, MapPin, Clock, Tag, ChevronRight, ChevronDown, Store, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { promotions } from '../data/mockData';
import { toast } from 'sonner';

/**
 * FavoritesModal Component
 * Xử lý luồng thanh toán cuối cùng: Chọn địa chỉ, phương thức thanh toán và áp dụng mã giảm giá cho từng món.
 */
export function FavoritesModal({
  isOpen,
  onClose,
  items = [],
  onConfirmOrder,
  userAddresses = [],
  userName = '',
  userPhone = ''
}) {
  const [formData, setFormData] = useState({
    customerName: userName,
    phone: userPhone,
    address: userAddresses.find(a => a.isDefault)?.address || '',
    note: '',
    paymentMethod: 'cod',
    deliveryTime: 'now',
    scheduledDate: '',
  });
  
  const [useManualAddress, setUseManualAddress] = useState(!userAddresses || userAddresses.length === 0);
  const [selectedAddressId, setSelectedAddressId] = useState(
    userAddresses?.find(a => a.isDefault)?.id || userAddresses?.[0]?.id || null
  );

  const [expandedItems, setExpandedItems] = useState(new Set());
  const [itemPromotions, setItemPromotions] = useState(new Map());

  // --- Logic Xử lý địa chỉ ---
  const handleAddressSelection = (addr) => {
    setSelectedAddressId(addr.id);
    setFormData(prev => ({ ...prev, address: addr.address }));
  };

  const handleUseManualAddressToggle = (useManual) => {
    setUseManualAddress(useManual);
    if (!useManual && userAddresses.length > 0) {
      const defaultAddr = userAddresses.find(a => a.isDefault) || userAddresses[0];
      handleAddressSelection(defaultAddr);
    }
  };

  const toggleItemExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  // --- Logic Khuyến mãi ---
  const getProductPromotions = (productId) => 
    promotions.filter(p => p.type === 'product' && p.productId === productId);

  const getShopPromotions = (shopId, itemPrice, itemQuantity) => {
    const itemTotal = itemPrice * itemQuantity;
    return promotions.filter(p => p.type === 'shop' && p.shopId === shopId && (!p.minPurchase || itemTotal >= p.minPurchase));
  };

  const handleSelectPromotion = (itemId, promotion, promoType) => {
    const current = itemPromotions.get(itemId) || { itemId };
    const updated = { ...current, [promoType]: promotion || undefined };
    const newMap = new Map(itemPromotions);
    newMap.set(itemId, updated);
    setItemPromotions(newMap);
    
    if (promotion) toast.success(`Đã áp dụng mã: ${promotion.code}`);
  };

  // --- Logic Tính toán tài chính ---
  const calculateItemDiscount = (item) => {
    const itemPromo = itemPromotions.get(item.id);
    if (!itemPromo) return 0;
    
    let totalDiscount = 0;
    const itemTotal = item.price * item.quantity;
    
    [itemPromo.productPromotion, itemPromo.shopPromotion].forEach(promo => {
      if (promo) {
        if (promo.discountType === 'percentage') {
          totalDiscount += Math.round(itemTotal * promo.discount / 100);
        } else {
          totalDiscount += promo.discount * (promo.type === 'product' ? item.quantity : 1);
        }
      }
    });
    return totalDiscount;
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const calculateTotalDiscount = () => items.reduce((sum, item) => sum + calculateItemDiscount(item), 0);
  
  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = subtotal >= 100000 ? 0 : 15000;
    return subtotal + shippingFee - calculateTotalDiscount();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmOrder({
      ...formData,
      itemPromotions: Array.from(itemPromotions.values())
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b px-8 py-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight">Xác nhận thanh toán</DialogTitle>
            <DialogDescription className="font-medium text-gray-400">Vui lòng kiểm tra kỹ thông tin đơn hàng trước khi đặt</DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* 1. Thông tin giao hàng */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#EE4D2D] flex items-center gap-2">
              <MapPin size={18} /> Địa chỉ nhận hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Người nhận</Label>
                <Input value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} required className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Số điện thoại</Label>
                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <input type="checkbox" id="manual" checked={!useManualAddress} onChange={(e) => handleUseManualAddressToggle(!e.target.checked)} className="w-4 h-4 accent-[#EE4D2D]" />
                <Label htmlFor="manual" className="text-sm font-bold text-gray-700 cursor-pointer">Sử dụng địa chỉ đã lưu</Label>
              </div>
              
              {!useManualAddress && userAddresses.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {userAddresses.map(addr => (
                    <div 
                      key={addr.id} 
                      onClick={() => handleAddressSelection(addr)}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-[#EE4D2D] bg-orange-50 shadow-md scale-[1.01]' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-black text-gray-900 text-sm">{addr.label}</p>
                          <p className="text-xs text-gray-500 font-medium">{addr.address}</p>
                        </div>
                        {addr.isDefault && <Badge className="bg-[#EE4D2D] text-[9px] font-black uppercase">Mặc định</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Số nhà, tên đường, Phường/Xã..." required className="rounded-2xl border-gray-200" rows={3} />
              )}
            </div>
          </div>

          {/* 2. Phương thức & Thời gian */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <CreditCard size={18} /> Thanh toán
              </h3>
              <RadioGroup value={formData.paymentMethod} onValueChange={(val) => setFormData({...formData, paymentMethod: val})} className="grid gap-3">
                <div className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-[#EE4D2D] bg-orange-50' : 'border-gray-50'}`}>
                   <Label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="cod" />
                    <span className="font-bold text-sm">Tiền mặt (COD)</span>
                  </Label>
                  <Wallet size={18} className="text-gray-400" />
                </div>
                <div className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'momo' ? 'border-pink-500 bg-pink-50' : 'border-gray-50'}`}>
                   <Label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="momo" />
                    <span className="font-bold text-sm">Ví MoMo</span>
                  </Label>
                  <div className="bg-pink-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-lg">M</div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Clock size={18} /> Thời gian giao
              </h3>
              <RadioGroup value={formData.deliveryTime} onValueChange={(val) => setFormData({...formData, deliveryTime: val})} className="grid gap-3">
                <Label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer ${formData.deliveryTime === 'now' ? 'border-[#EE4D2D] bg-orange-50' : 'border-gray-50'}`}>
                  <RadioGroupItem value="now" className="mr-3" />
                  <span className="font-bold text-sm">Càng sớm càng tốt</span>
                </Label>
                <Label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer ${formData.deliveryTime === 'schedule' ? 'border-[#EE4D2D] bg-orange-50' : 'border-gray-50'}`}>
                  <RadioGroupItem value="schedule" className="mr-3" />
                  <span className="font-bold text-sm">Đặt lịch trước</span>
                </Label>
              </RadioGroup>
              {formData.deliveryTime === 'schedule' && (
                <Input type="date" value={formData.scheduledDate} onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})} className="rounded-xl border-[#EE4D2D]" required />
              )}
            </div>
          </div>

          {/* 3. Chi tiết món ăn & Khuyến mãi (Accordion style) */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Tag size={18} /> Chi tiết & Khuyến mãi
            </h3>
            <div className="space-y-3">
              {items.map((item) => {
                const isExpanded = expandedItems.has(item.id);
                const itemDiscount = calculateItemDiscount(item);
                const currentPromo = itemPromotions.get(item.id);

                return (
                  <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleItemExpanded(item.id)}>
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover border shadow-sm" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.name} <span className="text-gray-400">x{item.quantity}</span></p>
                          <div className="flex gap-2 mt-1">
                            {currentPromo?.productPromotion && <Badge className="bg-orange-100 text-[#EE4D2D] text-[9px]">GIẢM MÓN</Badge>}
                            {currentPromo?.shopPromotion && <Badge className="bg-blue-100 text-blue-600 text-[9px]">MÃ SHOP</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-black ${itemDiscount > 0 ? 'text-[#EE4D2D] text-sm' : 'text-gray-900'}`}>
                            {(item.price * item.quantity - itemDiscount).toLocaleString()}đ
                          </p>
                          {itemDiscount > 0 && <p className="text-[10px] text-gray-400 line-through">{(item.price * item.quantity).toLocaleString()}đ</p>}
                        </div>
                        {isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-gray-50/50 border-t border-dashed space-y-4 animate-in slide-in-from-top-2">
                        {/* Mục chọn mã giảm giá cho từng món */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Áp dụng mã giảm giá cho món này</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Danh sách Product Promo */}
                            {getProductPromotions(item.id).map(promo => (
                              <div 
                                key={promo.id} 
                                onClick={() => handleSelectPromotion(item.id, currentPromo?.productPromotion?.id === promo.id ? null : promo, 'productPromotion')}
                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${currentPromo?.productPromotion?.id === promo.id ? 'border-[#EE4D2D] bg-white' : 'border-white bg-white hover:border-gray-200'}`}
                              >
                                <p className="text-[11px] font-black text-[#EE4D2D] mb-0.5">{promo.code}</p>
                                <p className="text-[10px] text-gray-500 line-clamp-1">{promo.title}</p>
                              </div>
                            ))}
                            {/* Danh sách Shop Promo */}
                            {getShopPromotions(item.shopId, item.price, item.quantity).map(promo => (
                              <div 
                                key={promo.id} 
                                onClick={() => handleSelectPromotion(item.id, currentPromo?.shopPromotion?.id === promo.id ? null : promo, 'shopPromotion')}
                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${currentPromo?.shopPromotion?.id === promo.id ? 'border-blue-500 bg-white' : 'border-white bg-white hover:border-gray-200'}`}
                              >
                                <p className="text-[11px] font-black text-blue-600 mb-0.5">{promo.code}</p>
                                <p className="text-[10px] text-gray-500 line-clamp-1">{promo.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Tổng kết & Đặt hàng */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EE4D2D] rounded-full blur-[80px] opacity-20" />
            
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm opacity-60">
                <span>Tạm tính ({items.length} món)</span>
                <span>{calculateSubtotal().toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm text-green-400 font-bold">
                <span>Tổng giảm giá</span>
                <span>-{calculateTotalDiscount().toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm opacity-60">
                <span>Phí vận chuyển</span>
                <span>{calculateSubtotal() >= 100000 ? 'Miễn phí' : '15.000đ'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Tổng thanh toán</p>
                <p className="text-4xl font-black text-[#EE4D2D]">{calculateFinalTotal().toLocaleString()}đ</p>
              </div>
              <Button type="submit" className="bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-14 px-12 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
                ĐẶT ĐƠN NGAY
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}