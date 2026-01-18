import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Edit2, Trash2, Tag, Percent, ChevronLeft, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/**
 * SellerPromotionsModal Component
 * Kênh quản trị khuyến mãi dành cho chủ cửa hàng. Hỗ trợ tạo mã giảm giá theo Shop hoặc theo từng Sản phẩm cụ thể.
 */
export function SellerPromotionsModal({ isOpen, onClose }) {
  // Dữ liệu sản phẩm có sẵn để chọn cho khuyến mãi loại Product
  const availableProducts = [
    { id: '1', name: 'Trà Sữa Trân Châu Đường Đen', image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=100&h=100&fit=crop' },
    { id: '2', name: "Snack Khoai Tây Lay's Vị Phô Mai", image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=100&h=100&fit=crop' },
    { id: '3', name: 'Pizza Hải Sản Cao Cấp', image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=100&h=100&fit=crop' },
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
    setFormData({ ...promotion });
  };

  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.startDate || !formData.endDate) {
      toast.error('Vui lòng nhập đầy đủ các thông tin có đánh dấu (*)');
      return;
    }

    if (formData.type === 'product' && (!formData.applicableProducts || formData.applicableProducts.length === 0)) {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm áp dụng');
      return;
    }

    if (editingPromotion) {
      setPromotions(promotions.map(p => p.id === editingPromotion.id ? { ...p, ...formData } : p));
      toast.success('Cập nhật khuyến mãi thành công');
    } else {
      const newPromotion = {
        id: Date.now().toString(),
        ...formData,
        usedCount: 0
      };
      setPromotions([...promotions, newPromotion]);
      toast.success('Đã tạo chương trình khuyến mãi mới');
    }

    setIsEditing(false);
  };

  const formatDiscount = (p) => {
    if (p.discountType === 'percentage') {
      return `${p.discountValue}% ${p.maxDiscount ? `(Tối đa ${p.maxDiscount.toLocaleString()}đ)` : ''}`;
    }
    return `${p.discountValue.toLocaleString()}đ`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        <div className="sticky top-0 z-20 bg-white border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Tag className="text-[#EE4D2D]" /> Marketing & Khuyến mãi
            </DialogTitle>
            <DialogDescription className="font-medium">Tạo mã giảm giá để tăng tỉ lệ chốt đơn của khách hàng</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {!isEditing ? (
            /* DANH SÁCH KHUYẾN MÃI */
            <div className="space-y-6">
              <Button onClick={handleAdd} className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-12 rounded-xl shadow-lg">
                <Plus className="w-5 h-5 mr-2" /> Tạo chiến dịch khuyến mãi mới
              </Button>

              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-all bg-white relative overflow-hidden group">
                    {!promo.isActive && <div className="absolute inset-0 bg-gray-50/60 z-10 flex items-center justify-center font-bold text-gray-400 rotate-12 text-xl pointer-events-none">TẠM DỪNG</div>}
                    
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-orange-600 text-white font-mono font-black px-3 py-1 rounded-lg text-sm">{promo.code}</span>
                          <h3 className="font-bold text-gray-900">{promo.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-2 rounded-xl">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Loại giảm</p>
                            <p className="font-bold text-[#EE4D2D] text-xs">{formatDiscount(promo)}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-xl">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Đơn tối thiểu</p>
                            <p className="font-bold text-gray-700 text-xs">{promo.minOrderValue.toLocaleString()}đ</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-xl text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Đã dùng</p>
                            <p className="font-bold text-gray-700 text-xs">{promo.usedCount}/{promo.usageLimit || '∞'}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-xl text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Đối tượng</p>
                            <Badge variant="outline" className="text-[9px] font-black border-orange-200 text-orange-600">
                              {promo.type === 'shop' ? 'TOÀN SHOP' : 'SẢN PHẨM'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-dashed pt-4 md:pt-0 md:pl-6">
                        <Button variant="outline" size="sm" className="rounded-xl font-bold border-gray-200 hover:bg-gray-50" onClick={() => handleEdit(promo)}>
                          <Edit2 size={14} className="mr-2" /> Sửa
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-xl font-bold text-red-500 hover:bg-red-50" onClick={() => { if(window.confirm('Xóa mã này?')) setPromotions(promotions.filter(p => p.id !== promo.id)) }}>
                          <Trash2 size={14} className="mr-2" /> Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* FORM CHỈNH SỬA */
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <button onClick={() => setIsEditing(false)} className="text-sm font-black text-gray-400 hover:text-[#EE4D2D] flex items-center gap-1.5 uppercase tracking-widest">
                <ChevronLeft size={18} /> Quay lại danh sách
              </button>

              <div className="bg-gray-50 p-8 rounded-3xl border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Tên chương trình *</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Ví dụ: Siêu hội trà sữa giảm 20%" className="rounded-xl border-gray-200 h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Mã Voucher *</Label>
                    <Input value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} placeholder="VD: TRASUA20" className="rounded-xl border-gray-200 h-11 font-mono font-bold" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Loại khuyến mãi</Label>
                    <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                      <SelectTrigger className="rounded-xl h-11 font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="shop">Áp dụng toàn cửa hàng</SelectItem>
                        <SelectItem value="product">Áp dụng cho sản phẩm cụ thể</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Hình thức giảm *</Label>
                    <Select value={formData.discountType} onValueChange={(val) => setFormData({...formData, discountType: val})}>
                      <SelectTrigger className="rounded-xl h-11 font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="percentage">Giảm theo phần trăm (%)</SelectItem>
                        <SelectItem value="fixed">Giảm số tiền cố định (VNĐ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Giá trị giảm *</Label>
                    <Input type="number" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: parseInt(e.target.value) || 0})} className="rounded-xl border-gray-200 h-11 font-black text-[#EE4D2D]" />
                  </div>
                </div>

                {/* Phần chọn sản phẩm nếu type là product */}
                {formData.type === 'product' && (
                  <div className="space-y-3 bg-white p-6 rounded-2xl border border-dashed border-orange-200">
                    <Label className="text-xs font-black uppercase text-orange-600">Chọn sản phẩm tham gia chương trình</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                      {availableProducts.map(product => (
                        <div key={product.id} onClick={() => {
                          const current = formData.applicableProducts || [];
                          const updated = current.includes(product.id) ? current.filter(id => id !== product.id) : [...current, product.id];
                          setFormData({...formData, applicableProducts: updated});
                        }} className={`flex items-center gap-3 p-2 rounded-xl border-2 cursor-pointer transition-all ${formData.applicableProducts?.includes(product.id) ? 'border-[#EE4D2D] bg-orange-50' : 'border-gray-50 hover:border-gray-200'}`}>
                          <img src={product.image} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="text-xs font-bold text-gray-700 truncate">{product.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                   <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Calendar size={12}/> Ngày bắt đầu</Label>
                    <Input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="rounded-xl border-gray-200 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Calendar size={12}/> Ngày kết thúc</Label>
                    <Input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="rounded-xl border-gray-200 h-11" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 h-12 rounded-xl font-bold">Hủy bỏ</Button>
                  <Button onClick={handleSave} className="flex-1 h-12 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black rounded-xl shadow-lg">Lưu khuyến mãi</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}