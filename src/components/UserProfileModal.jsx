import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Edit2, Camera, Store, LogOut, ShieldCheck, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

/**
 * UserProfileModal Component
 * Quản lý thông tin cá nhân của người dùng. 
 * Hỗ trợ các tính năng chỉnh sửa thông tin cơ bản và thông tin cửa hàng (dành cho Người bán).
 */
export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateProfile,
  onLogout
}) {
  const [isEditing, setIsEditing] = useState(false);
  
  // State quản lý form chỉnh sửa
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [editedShopName, setEditedShopName] = useState(user?.shopName || '');
  const [editedShopAddress, setEditedShopAddress] = useState(user?.shopAddress || '');
  const [editedShopDescription, setEditedShopDescription] = useState(user?.shopDescription || '');
  const [editedShopLogo, setEditedShopLogo] = useState(user?.shopLogo || '');

  // Reset dữ liệu khi hủy chỉnh sửa
  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedPhone(user.phone);
    if (user.userType === 'seller') {
      setEditedShopName(user.shopName || '');
      setEditedShopAddress(user.shopAddress || '');
      setEditedShopDescription(user.shopDescription || '');
      setEditedShopLogo(user.shopLogo || '');
    }
  };

  const handleSaveProfile = () => {
    if (!editedName.trim() || !editedPhone.trim()) {
      toast.error('Họ tên và Số điện thoại không được để trống');
      return;
    }

    const updatedData = {
      name: editedName,
      phone: editedPhone
    };
    
    if (user.userType === 'seller') {
      updatedData.shopName = editedShopName;
      updatedData.shopAddress = editedShopAddress;
      updatedData.shopDescription = editedShopDescription;
      updatedData.shopLogo = editedShopLogo;
    }
    
    onUpdateProfile(updatedData);
    setIsEditing(false);
    toast.success('Cập nhật hồ sơ thành công!');
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        {/* Banner Header */}
        <div className="h-32 bg-gradient-to-r from-orange-400 to-[#EE4D2D]" />
        
        <div className="px-8 pb-8">
          {/* Avatar & Basic Info Section */}
          <div className="relative -mt-12 flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl rounded-3xl overflow-hidden">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback className="bg-orange-100 text-[#EE4D2D] text-4xl font-black">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 bg-white border-2 border-gray-50 rounded-xl p-2 shadow-lg hover:scale-110 transition-all text-gray-600 hover:text-[#EE4D2D]">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-gray-900 leading-none">{user.name}</h2>
                <Badge className={user.userType === 'seller' ? "bg-blue-500" : "bg-orange-500"}>
                  {user.userType === 'seller' ? <Store className="w-3 h-3 mr-1" /> : <ShieldCheck className="w-3 h-3 mr-1" />}
                  {user.userType === 'seller' ? 'Đối tác' : 'Thành viên'}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
            </div>

            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="rounded-xl font-bold border-gray-200 hover:bg-gray-50 mb-2"
              >
                <Edit2 className="w-4 h-4 mr-2" /> Chỉnh sửa hồ sơ
              </Button>
            )}
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Họ và tên</Label>
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                disabled={!isEditing}
                className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <Input
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  disabled={!isEditing}
                  className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Địa chỉ Email</Label>
              <Input value={user.email} disabled className="rounded-xl border-gray-100 bg-gray-100 italic" />
              <p className="text-[10px] text-gray-400 italic">* Email là thông tin định danh và không thể thay đổi</p>
            </div>

            {/* SELLER ONLY SECTION */}
            {user.userType === 'seller' && (
              <div className="md:col-span-2 mt-4 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center gap-2 border-l-4 border-[#EE4D2D] pl-4">
                  <Store className="w-5 h-5 text-[#EE4D2D]" />
                  <h4 className="font-black text-gray-900 uppercase text-sm tracking-tighter">Thông tin định danh Cửa hàng</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-orange-50/30 rounded-3xl border border-orange-100">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-orange-600">Tên thương hiệu Shop</Label>
                    <Input
                      value={editedShopName}
                      onChange={(e) => setEditedShopName(e.target.value)}
                      disabled={!isEditing}
                      placeholder="VD: Foodie Tea & Coffee"
                      className="rounded-xl border-white bg-white/80"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-orange-600">Địa chỉ kinh doanh</Label>
                    <Input
                      value={editedShopAddress}
                      onChange={(e) => setEditedShopAddress(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Số nhà, tên đường..."
                      className="rounded-xl border-white bg-white/80"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase text-orange-600">Mô tả ngắn gọn về Shop</Label>
                    <Textarea
                      value={editedShopDescription}
                      onChange={(e) => setEditedShopDescription(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Giới thiệu tinh hoa ẩm thực của quán bạn..."
                      rows={3}
                      className="rounded-2xl border-white bg-white/80 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase text-orange-600">Đường dẫn Logo (URL)</Label>
                    <Input
                      value={editedShopLogo}
                      onChange={(e) => setEditedShopLogo(e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://..."
                      className="rounded-xl border-white bg-white/80"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-8 border-dashed">
            <div className="flex gap-3 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1 sm:flex-none bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black px-8 rounded-xl shadow-lg shadow-orange-100"
                  >
                    Lưu thay đổi
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none rounded-xl font-bold"
                  >
                    Hủy bỏ
                  </Button>
                </>
              ) : (
                <div className="text-xs text-gray-400 font-medium">
                  ID Người dùng: <span className="font-mono font-bold uppercase">{user.id}</span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50 font-black rounded-xl gap-2"
            >
              <LogOut className="w-4 h-4" /> Đăng xuất tài khoản
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}