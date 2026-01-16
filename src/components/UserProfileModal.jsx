"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { User, MapPin, Clock, Package, Edit2, Camera } from 'lucide-react';

/**
 * UserProfileModal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Trạng thái đóng/mở modal
 * @param {Function} props.onClose - Hàm xử lý đóng modal
 * @param {Object} props.user - Thông tin người dùng
 * @param {Array} props.orders - Danh sách đơn hàng
 * @param {Function} props.onUpdateProfile - Hàm cập nhật thông tin
 * @param {Function} props.onLogout - Hàm đăng xuất
 */
export function UserProfileModal({
  isOpen,
  onClose,
  user,
  orders,
  onUpdateProfile,
  onLogout
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedPhone, setEditedPhone] = useState(user?.phone || "");

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editedName,
      phone: editedPhone
    });
    setIsEditing(false);
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Chờ xác nhận',
      processing: 'Đang chuẩn bị',
      delivering: 'Đang giao',
      completed: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      delivering: 'bg-purple-100 text-purple-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-700';
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tài khoản của tôi</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Thông tin</TabsTrigger>
            <TabsTrigger value="addresses">Địa chỉ</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-[#EE4D2D] text-white text-2xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-white border-2 border-background rounded-full p-2 shadow-md hover:bg-muted">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Họ và tên</Label>
                <Input
                  id="profile-name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  value={user.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email không thể thay đổi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Số điện thoại</Label>
                <Input
                  id="profile-phone"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                  >
                    Lưu thay đổi
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(user.name);
                      setEditedPhone(user.phone);
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="destructive"
                onClick={onLogout}
              >
                Đăng xuất
              </Button>
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4">
            {user.addresses?.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#EE4D2D]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{address.label}</span>
                        {address.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.address}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full"
            >
              + Thêm địa chỉ mới
            </Button>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {!orders || orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Bạn chưa có đơn hàng nào</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Đơn hàng #{order.orderNumber}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Tổng tiền</div>
                      <div className="text-[#EE4D2D] font-bold">
                        {order.total?.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Chi tiết
                    </Button>
                    {order.status === 'completed' && (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                      >
                        Đặt lại
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}