import { useState, useEffect } from 'react'; // Đã thêm useEffect
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Camera, Edit2, Store, Upload } from 'lucide-react';
import { toast } from 'sonner';

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateProfile,
  onLogout
}) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sử dụng Optional Chaining (?.) và giá trị mặc định để tránh lỗi crash màn hình trắng
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [editedShopName, setEditedShopName] = useState(user?.shopName || '');
  const [editedShopAddress, setEditedShopAddress] = useState(user?.shopAddress || '');
  const [editedShopDescription, setEditedShopDescription] = useState(user?.shopDescription || '');
  const [editedShopLogo, setEditedShopLogo] = useState(user?.shopLogo || '');
  
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '');

  // Cập nhật lại các ô Input khi thông tin user thay đổi (ví dụ: sau khi Login thành công)
  useEffect(() => {
    if (user) {
      setEditedName(user.name || '');
      setEditedPhone(user.phone || '');
      setEditedShopName(user.shopName || '');
      setEditedShopAddress(user.shopAddress || '');
      setEditedShopDescription(user.shopDescription || '');
      setEditedShopLogo(user.shopLogo || '');
      setAvatarUrl(user.avatar || '');
      setPreviewAvatar(user.avatar || '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    const updatedData = {
      name: editedName,
      phone: editedPhone
    };
    
    if (user?.userType === 'seller') {
      updatedData.shopName = editedShopName;
      updatedData.shopAddress = editedShopAddress;
      updatedData.shopDescription = editedShopDescription;
      updatedData.shopLogo = editedShopLogo;
    }
    
    onUpdateProfile(updatedData);
    setIsEditing(false);
    toast.success('Hồ sơ đã được cập nhật!');
  };

  const handleOpenAvatarModal = () => {
    setPreviewAvatar(user?.avatar || '');
    setAvatarUrl(user?.avatar || '');
    setIsAvatarModalOpen(true);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveAvatar = () => {
    onUpdateProfile({ avatar: avatarUrl });
    setIsAvatarModalOpen(false);
    toast.success('Ảnh đại diện đã được cập nhật!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Thông tin cá nhân</DialogTitle>
          <DialogDescription>Cập nhật thông tin tài khoản và cửa hàng của bạn</DialogDescription>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gray-50 rounded-2xl">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                <AvatarImage src={user?.avatar} className="object-cover" />
                <AvatarFallback className="bg-[#EE4D2D] text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <button 
                onClick={handleOpenAvatarModal}
                className="absolute bottom-0 right-0 bg-white border-2 border-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform text-[#EE4D2D]"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold">{user?.name || 'Người dùng'}</h3>
                {user?.userType === 'seller' && (
                  <Badge className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 border-none">
                    <Store className="w-3 h-3 mr-1" /> Người bán
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mt-4 rounded-full px-6"
                >
                  <Edit2 className="w-3 h-3 mr-2" /> Chỉnh sửa hồ sơ
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name" className="font-bold text-xs uppercase tracking-wider text-gray-400">Họ và tên</Label>
                <Input
                  id="profile-name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 rounded-xl bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone" className="font-bold text-xs uppercase tracking-wider text-gray-400">Số điện thoại</Label>
                <Input
                  id="profile-phone"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-wider text-gray-400">Email (Cố định)</Label>
              <Input
                value={user?.email || ''}
                disabled
                className="h-11 rounded-xl bg-gray-100 italic"
              />
            </div>

            {user?.userType === 'seller' && (
              <div className="pt-6 border-t space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-orange-50 rounded-lg"><Store className="w-5 h-5 text-[#EE4D2D]" /></div>
                  <h4 className="font-bold text-lg">Quản lý Cửa hàng</h4>
                </div>
                <div className="grid gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="shop-name">Tên hiển thị của Quán</Label>
                    <Input
                      id="shop-name"
                      value={editedShopName}
                      onChange={(e) => setEditedShopName(e.target.value)}
                      disabled={!isEditing}
                      placeholder="VD: Tiệm Trà Sữa Nhà Làm"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-address">Địa chỉ kinh doanh</Label>
                    <Input
                      id="shop-address"
                      value={editedShopAddress}
                      onChange={(e) => setEditedShopAddress(e.target.value)}
                      disabled={!isEditing}
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-description">Giới thiệu ngắn về Quán</Label>
                    <Textarea
                      id="shop-description"
                      value={editedShopDescription}
                      onChange={(e) => setEditedShopDescription(e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="rounded-xl resize-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="shop-logo">Logo cửa hàng (Link ảnh)</Label>
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
                        {editedShopLogo ? (
                          <img src={editedShopLogo} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <Store className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <Input
                        id="shop-logo"
                        value={editedShopLogo}
                        onChange={(e) => setEditedShopLogo(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Dán URL logo vào đây"
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-6 border-t">
            {isEditing ? (
              <>
                <Button onClick={handleSaveProfile} className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 h-12 rounded-xl font-bold">
                  Lưu thay đổi hồ sơ
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 h-12 rounded-xl">
                  Hủy bỏ
                </Button>
              </>
            ) : (
              <Button variant="destructive" onClick={onLogout} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-red-50">
                Đăng xuất tài khoản
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
      
      {/* Mini Modal thay đổi Avatar */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-8">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-black">Cập nhật ảnh đại diện</DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32 ring-4 ring-orange-50">
                <AvatarImage src={previewAvatar} className="object-cover" />
                <AvatarFallback className="bg-[#EE4D2D] text-white text-4xl">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase">Tải ảnh từ thiết bị</Label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="h-12 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50">
                    <Upload className="w-4 h-4" /> Chọn tệp hình ảnh
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase">Hoặc dán URL ảnh</Label>
                <Input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => {setAvatarUrl(e.target.value); setPreviewAvatar(e.target.value);}}
                  placeholder="https://images.com/my-photo.jpg"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsAvatarModalOpen(false)} className="flex-1 rounded-xl h-12">Đóng</Button>
              <Button onClick={handleSaveAvatar} disabled={!avatarUrl} className="flex-1 bg-[#EE4D2D] h-12 rounded-xl font-bold">Cập nhật</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}