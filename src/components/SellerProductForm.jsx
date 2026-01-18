import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X } from 'lucide-react';

/**
 * SellerProductForm Component
 * Form dành cho người bán để đăng ký các món ăn/sản phẩm mới lên hệ thống.
 */
export function SellerProductForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    rating: '5',
    reviews: '0',
    image: '',
    description: '',
    badge: '',
  });

  const categories = [
    'Đồ ăn vặt',
    'Trà sữa',
    'Fast Food',
    'Bánh ngọt',
    'Cà phê',
    'Kem',
    'Cơm - Phở - Bún',
    'Đồ uống'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      return;
    }

    // Chuyển đổi dữ liệu từ string sang đúng định dạng số trước khi submit
    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      description: formData.description,
      badge: formData.badge || undefined,
    };

    onSubmit(newProduct);
    
    // Reset form về trạng thái ban đầu
    setFormData({
      name: '',
      price: '',
      category: '',
      rating: '5',
      reviews: '0',
      image: '',
      description: '',
      badge: '',
    });
    
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-0 border-none">
        {/* Header với nền màu cam nhẹ tạo điểm nhấn cho merchant */}
        <div className="bg-orange-50/50 px-6 py-5 border-b border-orange-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Đăng ký món ăn mới</DialogTitle>
            <DialogDescription className="text-sm font-medium text-orange-800/70">
              Hãy cung cấp thông tin hấp dẫn nhất để thu hút khách hàng của bạn.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên sản phẩm */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="product-name" className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                Tên món ăn <span className="text-red-500">*</span>
              </Label>
              <Input
                id="product-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ví dụ: Trà sữa trân châu đường đen size L"
                required
                className="rounded-xl border-gray-200 focus:ring-[#EE4D2D]"
              />
            </div>

            {/* Danh mục */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                Danh mục <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
                required
              >
                <SelectTrigger id="category" className="rounded-xl border-gray-200">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Giá tiền */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                Giá bán (VNĐ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="35000"
                min="0"
                step="1000"
                required
                className="rounded-xl border-gray-200"
              />
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase text-gray-500 tracking-widest">Mô tả sản phẩm</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Gợi ý: Nguyên liệu chính, hương vị, khẩu phần..."
              rows={4}
              className="rounded-xl border-gray-200 resize-none"
            />
          </div>

          {/* Hình ảnh */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-xs font-bold uppercase text-gray-500 tracking-widest">Hình ảnh món ăn</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Dán URL hình ảnh tại đây..."
                className="rounded-xl border-gray-200"
              />
              {formData.image && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleChange('image', '')}
                  className="rounded-xl shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* Xem trước hình ảnh */}
            <div className="mt-3 relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                  }}
                />
              ) : (
                <div className="text-center p-6">
                  <p className="text-xs font-bold text-gray-400">CHƯA CÓ ẢNH PREVIEW</p>
                  <p className="text-[10px] text-gray-300">Dùng ảnh mặc định nếu để trống</p>
                </div>
              )}
            </div>
          </div>

          {/* Nhãn tag & Rating ban đầu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl">
            <div className="space-y-2">
              <Label htmlFor="badge" className="text-xs font-bold uppercase text-gray-500 tracking-widest">Nhãn đặc biệt (Badge)</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => handleChange('badge', e.target.value)}
                placeholder="Ví dụ: Bán chạy, Món mới"
                className="rounded-xl border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-xs font-bold uppercase text-gray-500 tracking-widest">Đánh giá ảo ban đầu</Label>
              <Select
                value={formData.rating}
                onValueChange={(value) => handleChange('rating', value)}
              >
                <SelectTrigger id="rating" className="rounded-xl border-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {[5, 4.5, 4, 3.5, 3].map((r) => (
                    <SelectItem key={r} value={r.toString()}>{r} sao</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Nút Submit */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl font-bold border-gray-200"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-95"
            >
              Đăng món ngay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}