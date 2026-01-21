import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Plus, Edit2, Trash2, Tag, Percent } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function SellerPromotionsModal({ isOpen, onClose }) {
  // Mock products data - in real app, fetch from backend
  const availableProducts = [
    { id: '1', name: 'Trà Sữa Trân Châu Đường Đen', image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=100&h=100&fit=crop' },
    { id: '2', name: 'Snack Khoai Tây Lay\'s Vị Phô Mai', image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop' },
    { id: '3', name: 'Pizza Hải Sản Cao Cấp', image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop' },
    { id: '4', name: 'Bánh Mì Pate', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=100&h=100&fit=crop' },
    { id: '5', name: 'Cơm Gà Xối Mỡ', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=100&h=100&fit=crop' },
  ];
  
  const [promotions, setPromotions] = useState([
    {
      id: '1',
      code: 'SHOP50K',
      name: 'Giảm 50K cho đơn từ 200K',
      type: 'shop',
      discountType: 'fixed',
      discountValue: 50000,
      minOrderValue: 200000,
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      usageLimit: 100,
      usedCount: 35,
      description: 'Giảm 50.000đ cho đơn hàng từ 200.000đ',
      isActive: true
    },
    {
      id: '2',
      code: 'TRASUA20',
      name: 'Giảm 20% Trà Sữa',
      type: 'product',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 0,
      maxDiscount: 30000,
      startDate: '2026-01-15',
      endDate: '2026-02-15',
      usedCount: 12,
      description: 'Giảm 20% cho tất cả sản phẩm trà sữa, giảm tối đa 30.000đ',
      isActive: true,
      applicableProducts: ['1', '2']
    },
    {
      id: '3',
      code: 'FREESHIP',
      name: 'Miễn phí vận chuyển',
      type: 'shop',
      discountType: 'fixed',
      discountValue: 15000,
      minOrderValue: 100000,
      startDate: '2026-01-10',
      endDate: '2026-01-25',
      usedCount: 45,
      description: 'Miễn phí vận chuyển cho đơn từ 100.000đ',
      isActive: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'shop',
    discountType: 'percentage',
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: undefined,
    startDate: '',
    endDate: '',
    usageLimit: undefined,
    description: '',
    isActive: true,
    applicableProducts: []
  });

  const handleAdd = () => {
    setIsEditing(true);
    setEditingPromotion(null);
    setFormData({
      code: '',
      name: '',
      type: 'shop',
      discountType: 'percentage',
      discountValue: 0,
      minOrderValue: 0,
      maxDiscount: undefined,
      startDate: '',
      endDate: '',
      usageLimit: undefined,
      description: '',
      isActive: true,
      applicableProducts: []
    });
  };

  const handleEdit = (promotion) => {
    setIsEditing(true);
    setEditingPromotion(promotion);
    setFormData({
      code: promotion.code,
      name: promotion.name,
      type: promotion.type,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      minOrderValue: promotion.minOrderValue,
      maxDiscount: promotion.maxDiscount,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: promotion.usageLimit,
      description: promotion.description,
      isActive: promotion.isActive,
      applicableProducts: promotion.applicableProducts || []
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter(p => p.id !== id));
      toast.success('Đã xóa khuyến mãi');
    }
  };

  const handleToggleActive = (id) => {
    setPromotions(promotions.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
    const promotion = promotions.find(p => p.id === id);
    if (promotion) {
      toast.success(promotion.isActive ? 'Đã tắt khuyến mãi' : 'Đã kích hoạt khuyến mãi');
    }
  };

  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.startDate || !formData.endDate) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (formData.type === 'product' && (!formData.applicableProducts || formData.applicableProducts.length === 0)) {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm cho khuyến mãi loại Product');
      return;
    }

    if (editingPromotion) {
      setPromotions(promotions.map(p =>
        p.id === editingPromotion.id
          ? { ...p, ...formData }
          : p
      ));
      toast.success('Đã cập nhật khuyến mãi');
    } else {
      const newPromotion = {
        id: Date.now().toString(),
        ...formData,
        usedCount: 0
      };
      setPromotions([...promotions, newPromotion]);
      toast.success('Đã thêm khuyến mãi mới');
    }

    setIsEditing(false);
    setEditingPromotion(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPromotion(null);
  };

  const formatDiscount = (promotion) => {
    if (promotion.discountType === 'percentage') {
      return `${promotion.discountValue}%${promotion.maxDiscount ? ` (Tối đa ${promotion.maxDiscount.toLocaleString('vi-VN')}đ)` : ''}`;
    } else {
      return `${promotion.discountValue.toLocaleString('vi-VN')}đ`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quản lý khuyến mãi</DialogTitle>
          <DialogDescription>Tạo và quản lý các chương trình khuyến mãi cho cửa hàng</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isEditing ? (
            <>
              <Button
                onClick={handleAdd}
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo khuyến mãi mới
              </Button>

              <div className="space-y-3">
                {promotions.map((promotion) => (
                  <div key={promotion.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{promotion.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={promotion.type === 'shop' ? 'border-blue-500 text-blue-700' : 'border-purple-500 text-purple-700'}
                          >
                            {promotion.type === 'shop' ? (
                              <><Tag className="w-3 h-3 mr-1" /> Shop</>
                            ) : (
                              <><Percent className="w-3 h-3 mr-1" /> Product</>
                            )}
                          </Badge>
                          <Badge 
                            className={promotion.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                          >
                            {promotion.isActive ? 'Đang chạy' : 'Tạm dừng'}
                          </Badge>
                        </div>
                        
                        <div className="text-sm space-y-1 mb-2">
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-[#EE4D2D]">Mã:</span>
                            <code className="px-2 py-0.5 bg-muted rounded">{promotion.code}</code>
                          </p>
                          <p className="text-muted-foreground">{promotion.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-muted-foreground">
                              Giảm: <span className="font-medium text-foreground">{formatDiscount(promotion)}</span>
                            </span>
                            {promotion.minOrderValue > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-muted-foreground">
                                  Đơn tối thiểu: <span className="font-medium text-foreground">{promotion.minOrderValue.toLocaleString('vi-VN')}đ</span>
                                </span>
                              </>
                            )}
                          </div>
                          {promotion.type === 'product' && promotion.applicableProducts && (
                            <div className="mt-2">
                              <span className="text-xs text-muted-foreground">
                                Áp dụng cho {promotion.applicableProducts.length} sản phẩm
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground text-xs">
                              {new Date(promotion.startDate).toLocaleDateString('vi-VN')} - {new Date(promotion.endDate).toLocaleDateString('vi-VN')}
                            </span>
                            <span className="text-muted-foreground text-xs ml-4">
                              • Đã dùng: {promotion.usedCount}{promotion.usageLimit ? `/${promotion.usageLimit}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(promotion.id)}
                        >
                          {promotion.isActive ? 'Tắt' : 'Bật'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(promotion)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(promotion.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {promotions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Chưa có khuyến mãi nào</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Tên khuyến mãi *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Giảm 50K cho đơn từ 200K"
                  />
                </div>

                <div>
                  <Label htmlFor="code">Mã khuyến mãi *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="VD: SHOP50K"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Loại khuyến mãi *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shop">Khuyến mãi Shop</SelectItem>
                      <SelectItem value="product">Khuyến mãi sản phẩm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountType">Hình thức giảm *</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value) => setFormData({ ...formData, discountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Phần trăm (%)</SelectItem>
                      <SelectItem value="fixed">Số tiền cố định (VNĐ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountValue">
                    Giá trị giảm * {formData.discountType === 'percentage' ? '(%)' : '(VNĐ)'}
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: parseInt(e.target.value) || 0 })}
                    placeholder={formData.discountType === 'percentage' ? '20' : '50000'}
                  />
                </div>

                {formData.discountType === 'percentage' && (
                  <div>
                    <Label htmlFor="maxDiscount">Giảm tối đa (VNĐ)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      value={formData.maxDiscount || ''}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: parseInt(e.target.value) || undefined })}
                      placeholder="30000"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="minOrderValue">Giá trị đơn tối thiểu (VNĐ)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">Ngày kết thúc *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="usageLimit">Giới hạn số lượt dùng</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit || ''}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || undefined })}
                    placeholder="Để trống nếu không giới hạn"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả chi tiết về chương trình khuyến mãi..."
                    rows={2}
                  />
                </div>

                {formData.type === 'product' && (
                  <div className="col-span-2">
                    <Label className="mb-2 block">Chọn sản phẩm áp dụng khuyến mãi *</Label>
                    <div className="border rounded-lg p-3 max-h-60 overflow-y-auto bg-muted/20">
                      <div className="space-y-2">
                        {availableProducts.map((product) => {
                          const isSelected = formData.applicableProducts?.includes(product.id) || false;
                          
                          return (
                            <div
                              key={product.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-[#EE4D2D]/10 border-[#EE4D2D]' 
                                  : 'bg-background hover:bg-muted/50'
                              }`}
                              onClick={() => {
                                const currentProducts = formData.applicableProducts || [];
                                if (isSelected) {
                                  setFormData({
                                    ...formData,
                                    applicableProducts: currentProducts.filter(id => id !== product.id)
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    applicableProducts: [...currentProducts, product.id]
                                  });
                                }
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="w-4 h-4 accent-[#EE4D2D]"
                              />
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                              </div>
                              {isSelected && (
                                <Badge className="bg-[#EE4D2D] text-white">Đã chọn</Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Kích hoạt ngay sau khi tạo
                  </Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                >
                  {editingPromotion ? 'Cập nhật' : 'Tạo mới'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}