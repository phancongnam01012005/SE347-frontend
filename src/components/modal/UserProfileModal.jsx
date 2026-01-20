import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Camera,
  Edit2,
  Store,
} from "lucide-react";

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  orders,
  reports,
  onUpdateProfile,
  onLogout,
  onAddProduct,
  onAddReport,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedPhone, setEditedPhone] = useState(user.phone);
  const [editedShopName, setEditedShopName] = useState(
    user.shopName || "",
  );
  const [editedShopAddress, setEditedShopAddress] = useState(
    user.shopAddress || "",
  );
  const [editedShopDescription, setEditedShopDescription] =
    useState(user.shopDescription || "");
  const [editedShopLogo, setEditedShopLogo] = useState(
    user.shopLogo || "",
  );
  const [editedShopCoverImage, setEditedShopCoverImage] =
    useState(user.shopCoverImage || "");
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");

  // Avatar change states
  const [isAvatarModalOpen, setIsAvatarModalOpen] =
    useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [previewAvatar, setPreviewAvatar] = useState(
    user.avatar || "",
  );

  const handleSaveProfile = () => {
    const updatedData = {
      name: editedName,
      phone: editedPhone,
    };

    if (user.userType === "seller") {
      updatedData.shopName = editedShopName;
      updatedData.shopAddress = editedShopAddress;
      updatedData.shopDescription = editedShopDescription;
      updatedData.shopLogo = editedShopLogo;
      updatedData.shopCoverImage = editedShopCoverImage;
    }

    onUpdateProfile(updatedData);
    setIsEditing(false);
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      processing: "Đang chuẩn bị",
      delivering: "Đang giao",
      completed: "Đã giao",
      cancelled: "Đã hủy",
      resolved: "Đã giải quyết",
    };
    return statusMap[status];
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      delivering: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      resolved: "bg-green-100 text-green-700",
    };
    return colorMap[status];
  };

  const handleAddReport = () => {
    if (onAddReport && reportTitle && reportContent) {
      onAddReport({
        title: reportTitle,
        content: reportContent,
      });
      setReportTitle("");
      setReportContent("");
      toast.success("Báo cáo đã được gửi thành công!");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin báo cáo.");
    }
  };

  // Avatar handlers
  const handleOpenAvatarModal = () => {
    setPreviewAvatar(user.avatar || "");
    setAvatarUrl(user.avatar || "");
    setIsAvatarModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewAvatar(result);
        setAvatarUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url) => {
    setAvatarUrl(url);
    setPreviewAvatar(url);
  };

  const handleSaveAvatar = () => {
    onUpdateProfile({ avatar: avatarUrl });
    setIsAvatarModalOpen(false);
    toast.success("Ảnh đại diện đã được cập nhật!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin cá nhân</DialogTitle>
          <DialogDescription>
            Quản lý thông tin tài khoản của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-[#EE4D2D] text-white text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleOpenAvatarModal}
                className="absolute bottom-0 right-0 bg-white border-2 border-background rounded-full p-2 shadow-md hover:bg-muted transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
              {user.userType === "seller" && (
                <Badge className="mt-2 bg-[#EE4D2D]">
                  <Store className="w-3 h-3 mr-1" />
                  Người bán
                </Badge>
              )}
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
              <Label htmlFor="profile-phone">
                Số điện thoại
              </Label>
              <Input
                id="profile-phone"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* Shop Information for Sellers */}
            {user.userType === "seller" && (
              <>
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Store className="w-5 h-5 text-[#EE4D2D]" />
                    <h4 className="font-semibold">Thông tin Shop</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="shop-name">
                        Tên Shop
                      </Label>
                      <Input
                        id="shop-name"
                        value={editedShopName}
                        onChange={(e) =>
                          setEditedShopName(e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="Nhập tên shop của bạn"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-address">
                        Địa chỉ Shop
                      </Label>
                      <Input
                        id="shop-address"
                        value={editedShopAddress}
                        onChange={(e) =>
                          setEditedShopAddress(e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="Nhập địa chỉ shop"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-description">
                        Mô tả Shop
                      </Label>
                      <Textarea
                        id="shop-description"
                        value={editedShopDescription}
                        onChange={(e) =>
                          setEditedShopDescription(
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                        placeholder="Giới thiệu về shop của bạn..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-logo">
                        Logo Shop (URL)
                      </Label>
                      <Input
                        id="shop-logo"
                        value={editedShopLogo}
                        onChange={(e) =>
                          setEditedShopLogo(e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="https://example.com/logo.png"
                      />
                      {editedShopLogo && (
                        <div className="mt-2 border rounded-lg overflow-hidden w-32 h-32">
                          <img
                            src={editedShopLogo}
                            alt="Shop Logo"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-cover-image">
                        Ảnh bìa Shop (URL)
                      </Label>
                      <Input
                        id="shop-cover-image"
                        value={editedShopCoverImage}
                        onChange={(e) =>
                          setEditedShopCoverImage(e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="https://example.com/cover.png"
                      />
                      {editedShopCoverImage && (
                        <div className="mt-2 border rounded-lg overflow-hidden w-32 h-32">
                          <img
                            src={editedShopCoverImage}
                            alt="Shop Cover Image"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

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
                    setEditedShopName(user.shopName || "");
                    setEditedShopAddress(
                      user.shopAddress || "",
                    );
                    setEditedShopDescription(
                      user.shopDescription || "",
                    );
                    setEditedShopLogo(user.shopLogo || "");
                    setEditedShopCoverImage(
                      user.shopCoverImage || "",
                    );
                  }}
                >
                  Hủy
                </Button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={onLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Avatar Change Modal */}
      <Dialog
        open={isAvatarModalOpen}
        onOpenChange={setIsAvatarModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
            <DialogDescription>
              Tải lên ảnh mới hoặc nhập URL ảnh
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previewAvatar} />
                <AvatarFallback className="bg-[#EE4D2D] text-white text-4xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">
                Xem trước ảnh đại diện
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar-upload">Tải ảnh lên</Label>
              <div className="flex gap-2">
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Chọn ảnh từ máy tính của bạn (JPG, PNG, GIF)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar-url">
                Hoặc nhập URL ảnh
              </Label>
              <div className="flex gap-2">
                <Input
                  id="avatar-url"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) =>
                    handleUrlChange(e.target.value)
                  }
                  placeholder="https://example.com/avatar.jpg"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Nhập đường dẫn URL của ảnh
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsAvatarModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSaveAvatar}
                className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                disabled={!avatarUrl}
              >
                Lưu ảnh đại diện
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}