import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CreditCard, Wallet, MapPin, Clock, Tag, ChevronRight, ChevronDown, Store } from 'lucide-react';
import { Badge } from '../ui/badge';
import { promotions } from '../../data/mockData';
import { toast } from 'sonner';

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  onConfirmOrder,
  userAddresses,
  userName,
  userPhone
}) {
  const [formData, setFormData] = useState({
    customerName: userName || '',
    phone: userPhone || '',
    address: '',
    note: '',
    paymentMethod: 'cod',
    deliveryTime: 'now',
    itemPromotions: []
  });
  
  const [useManualAddress, setUseManualAddress] = useState(!userAddresses || userAddresses.length === 0);
  const [selectedAddressId, setSelectedAddressId] = useState(
    userAddresses?.find(a => a.isDefault)?.id || userAddresses?.[0]?.id || null
  );

  const [expandedItems, setExpandedItems] = useState(new Set());
  const [itemPromotions, setItemPromotions] = useState(new Map());
  
  // Set initial address from saved addresses
  const handleAddressSelection = (addressId) => {
    const address = userAddresses?.find(a => a.id === addressId);
    if (address) {
      setSelectedAddressId(addressId);
      setFormData(prev => ({ ...prev, address: address.address }));
    }
  };
  
  // When switching to saved addresses, auto-select default or first address
  const handleUseManualAddressChange = (useManual) => {
    setUseManualAddress(useManual);
    if (!useManual && userAddresses && userAddresses.length > 0) {
      const defaultAddr = userAddresses.find(a => a.isDefault) || userAddresses[0];
      setSelectedAddressId(defaultAddr.id);
      setFormData(prev => ({ ...prev, address: defaultAddr.address }));
    }
  };

  const toggleItemExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getProductPromotions = (productId) => {
    return promotions.filter(p => p.type === 'product' && p.productId === productId);
  };

  const getShopPromotions = (shopId, itemPrice, itemQuantity) => {
    const itemTotal = itemPrice * itemQuantity;
    return promotions.filter(p => {
      if (p.type === 'shop' && p.shopId === shopId) {
        // Check minimum purchase
        if (p.minPurchase && itemTotal < p.minPurchase) {
          return false;
        }
        return true;
      }
      return false;
    });
  };

  const handleSelectProductPromotion = (itemId, promotion) => {
    const current = itemPromotions.get(itemId) || { itemId };
    const updated = { ...current, productPromotion: promotion || undefined };
    const newMap = new Map(itemPromotions);
    newMap.set(itemId, updated);
    setItemPromotions(newMap);
    
    if (promotion) {
      toast.success(`Đã áp dụng khuyến mãi sản phẩm: ${promotion.title}`);
    } else {
      toast.info('Đã bỏ chọn khuyến mãi sản phẩm');
    }
  };

  const handleSelectShopPromotion = (itemId, promotion, item) => {
    const itemTotal = item.price * item.quantity;
    
    // Check minimum purchase
    if (promotion && promotion.minPurchase && itemTotal < promotion.minPurchase) {
      toast.error(`Đơn hàng tối thiểu ${promotion.minPurchase.toLocaleString('vi-VN')}đ để sử dụng mã này`);
      return;
    }
    
    const current = itemPromotions.get(itemId) || { itemId };
    const updated = { ...current, shopPromotion: promotion || undefined };
    const newMap = new Map(itemPromotions);
    newMap.set(itemId, updated);
    setItemPromotions(newMap);
    
    if (promotion) {
      toast.success(`Đã áp dụng khuyến mãi shop: ${promotion.title}`);
    } else {
      toast.info('Đã bỏ chọn khuyến mãi shop');
    }
  };

  const calculateItemDiscount = (item) => {
    const itemPromo = itemPromotions.get(item.id);
    if (!itemPromo) return 0;
    
    let totalDiscount = 0;
    const itemTotal = item.price * item.quantity;
    
    // Product promotion
    if (itemPromo.productPromotion) {
      const promo = itemPromo.productPromotion;
      if (promo.discountType === 'percentage') {
        totalDiscount += Math.round(itemTotal * promo.discount / 100);
      } else {
        totalDiscount += promo.discount * item.quantity;
      }
    }
    
    // Shop promotion
    if (itemPromo.shopPromotion) {
      const promo = itemPromo.shopPromotion;
      if (promo.discountType === 'percentage') {
        totalDiscount += Math.round(itemTotal * promo.discount / 100);
      } else {
        totalDiscount += promo.discount;
      }
    }
    
    return totalDiscount;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotalDiscount = () => {
    return items.reduce((sum, item) => sum + calculateItemDiscount(item), 0);
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateTotalDiscount();
    const shippingFee = subtotal >= 100000 ? 0 : 15000;
    
    return subtotal + shippingFee - discount;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.address.trim()) {
    toast.error('Địa chỉ giao hàng không được để trống');
    return;
  }

  const payload = {
    shippingAddress: formData.address,
    paymentMethod: formData.paymentMethod,
    items: items.map(item => ({
      productid: item.id,
      qty: item.quantity
    }))
  };

  onConfirmOrder(payload);
};

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Xác nhận đơn hàng</DialogTitle>
          <DialogDescription>Điền thông tin giao hàng và chọn khuyến mãi</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Delivery Info */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#EE4D2D]" />
              Thông tin giao hàng
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  value={formData.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!useManualAddress}
                  onChange={(e) => handleUseManualAddressChange(!e.target.checked)}
                />
                <Label className="cursor-pointer">Sử dụng địa chỉ đã lưu</Label>
              </div>
              
              {!useManualAddress && userAddresses && userAddresses.length > 0 && (
                <div className="space-y-2">
                  {userAddresses.map(addr => (
                    <div
                      key={addr.id}
                      className={`border p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAddressId === addr.id ? 'bg-orange-50 border-[#EE4D2D]' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleAddressSelection(addr.id)}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          checked={selectedAddressId === addr.id}
                          readOnly
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{addr.label}</p>
                            {addr.isDefault && (
                              <Badge variant="outline" className="text-xs bg-orange-50 text-[#EE4D2D] border-[#EE4D2D]">
                                Mặc định
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {useManualAddress && (
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Nhập địa chỉ chi tiết"
                  required
                  rows={2}
                />
              )}
            </div>

            <div>
              <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder="Yêu cầu đặc biệt cho đơn hàng..."
                rows={2}
              />
            </div>
          </div>

          {/* Delivery Time */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#EE4D2D]" />
              Thời gian giao hàng
            </h3>
            <RadioGroup
              value={formData.deliveryTime}
              onValueChange={(value) => updateField('deliveryTime', value)}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now" className="flex-1 cursor-pointer">
                  Giao ngay (25-35 phút)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="flex-1 cursor-pointer">
                  Đặt lịch giao hàng
                </Label>
              </div>
            </RadioGroup>
            
            {/* Scheduled Date Picker */}
            {formData.deliveryTime === 'schedule' && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="scheduledDate">Chọn ngày giao hàng</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={formData.scheduledDate || ''}
                  onChange={(e) => updateField('scheduledDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Chọn ngày giao hàng trong tương lai
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#EE4D2D]" />
              Phương thức thanh toán
            </h3>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => updateField('paymentMethod', value)}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Wallet className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  Thanh toán khi nhận hàng (COD)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <RadioGroupItem value="momo" id="momo" />
                <div className="w-5 h-5 bg-pink-600 rounded text-white text-xs flex items-center justify-center">M</div>
                <Label htmlFor="momo" className="flex-1 cursor-pointer">
                  Ví MoMo
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <RadioGroupItem value="zalopay" id="zalopay" />
                <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">Z</div>
                <Label htmlFor="zalopay" className="flex-1 cursor-pointer">
                  ZaloPay
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Promotions for each item */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#EE4D2D]" />
              Khuyến mãi sản phẩm
            </h3>

            <div className="space-y-3">
              {items.map((item) => {
                const isExpanded = expandedItems.has(item.id);
                const productPromotions = getProductPromotions(item.id);
                const shopPromotions = getShopPromotions(item.shopId || '', item.price, item.quantity);
                const itemPromo = itemPromotions.get(item.id);
                const itemDiscount = calculateItemDiscount(item);
                
                return (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div 
                      className="p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleItemExpanded(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline" className="text-xs">
                              x{item.quantity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Store className="w-3 h-3" />
                            <span>{item.shopName}</span>
                          </div>
                          {itemDiscount > 0 && (
                            <p className="text-sm text-green-600 mt-1">
                              Đã giảm: {itemDiscount.toLocaleString('vi-VN')}đ
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            {itemDiscount > 0 ? (
                              <>
                                <p className="text-xs text-muted-foreground line-through">
                                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                </p>
                                <p className="font-medium text-[#EE4D2D]">
                                  {((item.price * item.quantity) - itemDiscount).toLocaleString('vi-VN')}đ
                                </p>
                              </>
                            ) : (
                              <p className="font-medium">
                                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                              </p>
                            )}
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 space-y-4 border-t">
                        {/* Product Promotions */}
                        {productPromotions.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-[#EE4D2D]" />
                              <p className="text-sm font-medium">Khuyến mãi sản phẩm</p>
                            </div>
                            <div className="space-y-2">
                              {productPromotions.map((promo) => (
                                <div
                                  key={promo.id}
                                  className={`border p-2 rounded-lg cursor-pointer transition-colors ${
                                    itemPromo?.productPromotion?.id === promo.id
                                      ? 'bg-orange-50 border-[#EE4D2D]'
                                      : 'hover:bg-muted/50'
                                  }`}
                                  onClick={() => {
                                    if (itemPromo?.productPromotion?.id === promo.id) {
                                      handleSelectProductPromotion(item.id, null);
                                    } else {
                                      handleSelectProductPromotion(item.id, promo);
                                    }
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      checked={itemPromo?.productPromotion?.id === promo.id}
                                      readOnly
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-[#EE4D2D]">{promo.title}</p>
                                      <p className="text-xs text-muted-foreground">{promo.description}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        HSD: {promo.validUntil}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Shop Promotions */}
                        {shopPromotions.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4 text-[#EE4D2D]" />
                              <p className="text-sm font-medium">Khuyến mãi cửa hàng</p>
                            </div>
                            <div className="space-y-2">
                              {shopPromotions.map((promo) => (
                                <div
                                  key={promo.id}
                                  className={`border p-2 rounded-lg cursor-pointer transition-colors ${
                                    itemPromo?.shopPromotion?.id === promo.id
                                      ? 'bg-blue-50 border-blue-500'
                                      : 'hover:bg-muted/50'
                                  }`}
                                  onClick={() => {
                                    if (itemPromo?.shopPromotion?.id === promo.id) {
                                      handleSelectShopPromotion(item.id, null, item);
                                    } else {
                                      handleSelectShopPromotion(item.id, promo, item);
                                    }
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      checked={itemPromo?.shopPromotion?.id === promo.id}
                                      readOnly
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-blue-600">{promo.title}</p>
                                      <p className="text-xs text-muted-foreground">{promo.description}</p>
                                      {promo.minPurchase && (
                                        <p className="text-xs text-muted-foreground">
                                          Đơn tối thiểu: {promo.minPurchase.toLocaleString('vi-VN')}đ
                                        </p>
                                      )}
                                      <p className="text-xs text-muted-foreground mt-1">
                                        HSD: {promo.validUntil}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {productPromotions.length === 0 && shopPromotions.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-2">
                            Không có khuyến mãi khả dụng cho sản phẩm này
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tạm tính</span>
              <span>{calculateSubtotal().toLocaleString('vi-VN')}đ</span>
            </div>
            {calculateTotalDiscount() > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Giảm giá</span>
                <span>-{calculateTotalDiscount().toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Phí vận chuyển</span>
              <span>{calculateSubtotal() >= 100000 ? 'Miễn phí' : '15.000đ'}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Tổng thanh toán</span>
              <span className="text-[#EE4D2D] text-lg">
                {calculateFinalTotal().toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Quay lại
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
            >
              Đặt hàng
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}