import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { MapPin, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

/**
 * AddressModal Component
 * Quản lý danh sách địa chỉ giao hàng của người dùng.
 */
export function AddressModal({ isOpen, onClose }) {
  // Dữ liệu mẫu ban đầu
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
      isDefault: true
    },
    {
      id: '2',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '456 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM',
      isDefault: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Xử lý khi nhấn nút "Thêm địa chỉ mới"
  const handleAdd = () => {
    setIsEditing(true);
    setEditingAddress(null);
    setFormData({ name: '', phone: '', address: '' });
  };

  // Xử lý khi nhấn nút "Chỉnh sửa" một địa chỉ
  const handleEdit = (address) => {
    setIsEditing(true);
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address
    });
  };

  // Xử lý xóa địa chỉ
  const handleDelete = (id) => {
    const address = addresses.find(a => a.id === id);
    if (address?.isDefault) {
      toast.error('Không thể xóa địa chỉ mặc định');
      return;
    }
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success('Đã xóa địa chỉ');
  };

  // Xử lý đặt địa chỉ làm mặc định
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    toast.success('Đã đặt làm địa chỉ mặc định');
  };

  // Xử lý lưu (Thêm mới hoặc Cập nhật)
  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingAddress) {
      // Cập nhật địa chỉ hiện có
      setAddresses(addresses.map(a =>
        a.id === editingAddress.id
          ? { ...a, ...formData }
          : a
      ));
      toast.success('Đã cập nhật địa chỉ');
    } else {
      // Thêm địa chỉ mới
      const newAddress = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0 // Tự động làm mặc định nếu là địa chỉ đầu tiên
      };
      setAddresses([...addresses, newAddress]);
      toast.success('Đã thêm địa chỉ mới');
    }

    setIsEditing(false);
    setEditingAddress(null);
    setFormData({ name: '', phone: '', address: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingAddress(null);
    setFormData({ name: '', phone: '', address: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#EE4D2D]">Địa chỉ giao hàng</DialogTitle>
          <DialogDescription>Quản lý địa chỉ giao hàng để đặt món nhanh hơn</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isEditing ? (
            <>
              {/* Nút thêm địa chỉ */}
              <Button
                onClick={handleAdd}
                className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm địa chỉ mới
              </Button>

              {/* Danh sách địa chỉ */}
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-xl p-5 transition-all ${
                      address.isDefault ? 'border-[#EE4D2D] bg-orange-50 shadow-sm' : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <MapPin className="w-4 h-4 text-[#EE4D2D]" />
                        <span className="font-bold">{address.name}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{address.phone}</span>
                        {address.isDefault && (
                          <Badge className="bg-[#EE4D2D] hover:bg-[#EE4D2D] pointer-events-none">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-blue-600"
                          onClick={() => handleEdit(address)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                          onClick={() => handleDelete(address.id)}
                          disabled={address.isDefault}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {address.address}
                    </p>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-gray-300 hover:bg-white hover:border-[#EE4D2D] hover:text-[#EE4D2D]"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Đặt làm mặc định
                      </Button>
                    )}
                  </div>
                ))}

                {addresses.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed rounded-xl bg-gray-50">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 font-medium">Bạn chưa lưu địa chỉ nào</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Form thêm/sửa địa chỉ */
            <div className="space-y-5 p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Họ và tên</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ và tên người nhận"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-semibold">Địa chỉ chi tiết</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 font-medium"
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold"
                >
                  {editingAddress ? 'Cập nhật địa chỉ' : 'Lưu địa chỉ mới'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}