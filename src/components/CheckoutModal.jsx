import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CreditCard, Wallet, MapPin, Clock } from 'lucide-react';

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  onConfirmOrder
}) {
  // Khởi tạo state cho Form
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
    deliveryTime: 'now'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đơn hàng ra ngoài component cha (thường là App.jsx)
    onConfirmOrder(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Xác nhận đơn hàng</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin giao hàng */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800">
              <MapPin className="w-5 h-5 text-[#EE4D2D]" />
              Thông tin giao hàng
            </h3>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  value={formData.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="space-y-2">
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

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ giao hàng</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Nhập địa chỉ chi tiết (Số nhà, tên đường, phường...)"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => updateField('note', e.target.value)}
                  placeholder="Yêu cầu đặc biệt: không cay, để trước cửa..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Thời gian giao hàng */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800">
              <Clock className="w-5 h-5 text-[#EE4D2D]" />
              Thời gian giao hàng
            </h3>
            <RadioGroup
              value={formData.deliveryTime}
              onValueChange={(value) => updateField('deliveryTime', value)}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now" className="flex-1 cursor-pointer font-normal">
                  Giao ngay (25-35 phút)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="flex-1 cursor-pointer font-normal">
                  Đặt lịch giao hàng
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Phương thức thanh toán */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800">
              <CreditCard className="w-5 h-5 text-[#EE4D2D]" />
              Phương thức thanh toán
            </h3>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => updateField('paymentMethod', value)}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer">
                <RadioGroupItem value="cod" id="cod" />
                <Wallet className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer font-normal">
                  Thanh toán khi nhận hàng (COD)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer">
                <RadioGroupItem value="momo" id="momo" />
                <div className="w-5 h-5 bg-pink-600 rounded text-white text-[10px] font-bold flex items-center justify-center">M</div>
                <Label htmlFor="momo" className="flex-1 cursor-pointer font-normal">
                  Ví MoMo
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer">
                <RadioGroupItem value="zalopay" id="zalopay" />
                <div className="w-5 h-5 bg-blue-500 rounded text-white text-[10px] font-bold flex items-center justify-center">Z</div>
                <Label htmlFor="zalopay" className="flex-1 cursor-pointer font-normal">
                  ZaloPay
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Tóm tắt đơn hàng ngắn gọn */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tổng số lượng</span>
              <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)} món</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold">
              <span>Tổng thanh toán</span>
              <span className="text-[#EE4D2D] text-lg">
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 py-6">
              Quay lại
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white py-6 font-bold"
            >
              Đặt hàng ngay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}