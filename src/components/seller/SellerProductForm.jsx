import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { X } from 'lucide-react';

export function SellerProductForm({
  isOpen,
  onClose,
  onSubmit,
}) {
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
    
    // Reset form
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đăng ký bán sản phẩm mới</DialogTitle>
          <DialogDescription>
            Điền thông tin sản phẩm của bạn để đăng ký bán trên trang web.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ví dụ: Trà sữa trân châu đường đen"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Giá (VNĐ) <span className="text-red-500">*</span>
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
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả sản phẩm</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả chi tiết về sản phẩm của bạn..."
              rows={4}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">URL hình ảnh</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleChange('image', '')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {formData.image && (
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                  }}
                />
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Để trống để sử dụng hình ảnh mặc định
            </p>
          </div>

          {/* Badge (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="badge">Nhãn đặc biệt (Tùy chọn)</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => handleChange('badge', e.target.value)}
              placeholder="Ví dụ: Giảm 20%, Best Seller, Mới"
            />
          </div>

          {/* Initial Rating and Reviews */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Đánh giá ban đầu</Label>
              <Select
                value={formData.rating}
                onValueChange={(value) => handleChange('rating', value)}
              >
                <SelectTrigger id="rating">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4.5, 4, 3.5, 3].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} sao
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviews">Số lượt đánh giá</Label>
              <Input
                id="reviews"
                type="number"
                value={formData.reviews}
                onChange={(e) => handleChange('reviews', e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
            >
              Đăng ký sản phẩm
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}