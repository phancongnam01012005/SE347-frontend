import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, Edit2, Trash2, Package, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/**
 * SellerProductsModal Component
 * Quản lý kho hàng dành cho Người bán: Thêm, sửa, xóa và theo dõi số lượng tồn kho/đã bán.
 */
export function SellerProductsModal({ isOpen, onClose }) {
  // Dữ liệu sản phẩm mẫu của Shop
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Trà Sữa Trân Châu Đường Đen',
      price: 35000,
      originalPrice: 40000,
      category: 'Đồ uống',
      description: 'Trà sữa ngon với trân châu đường đen dai ngọt',
      image: 'https://images.unsplash.com/photo-1670468642364-6cacadfb7bb0?w=200&h=200&fit=crop',
      stock: 50,
      sold: 120
    },
    {
      id: '2',
      name: "Snack Khoai Tây Lay's Vị Phô Mai",
      price: 15000,
      category: 'Snack',
      description: 'Snack khoai tây giòn rụm vị phô mai thơm ngon',
      image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?w=200&h=200&fit=crop',
      stock: 100,
      sold: 85
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    category: 'Đồ uống',
    description: '',
    image: '',
    stock: 0
  });

  const categories = ['Đồ uống', 'Snack', 'Đồ ăn nhanh', 'Đồ ăn vặt', 'Tráng miệng', 'Khác'];

  const handleAdd = () => {
    setIsEditing(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      originalPrice: 0,
      category: 'Đồ uống',
      description: '',
      image: '',
      stock: 0
    });
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi cửa hàng?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Đã xóa sản phẩm thành công');
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Vui lòng nhập đầy đủ các trường bắt buộc (*)');
      return;
    }

    if (editingProduct) {
      // Cập nhật sản phẩm cũ
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      ));
      toast.success('Cập nhật thông tin thành công');
    } else {
      // Thêm sản phẩm mới
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        sold: 0
      };
      setProducts([...products, newProduct]);
      toast.success('Đã thêm sản phẩm vào thực đơn');
    }

    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-white border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Thực Đơn</DialogTitle>
            <DialogDescription className="font-medium text-gray-500">Tối ưu danh mục sản phẩm để tăng doanh thu cho Shop</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {!isEditing ? (
            /* TRƯỜNG HỢP 1: DANH SÁCH SẢN PHẨM */
            <div className="space-y-6">
              <Button
                onClick={handleAdd}
                className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black h-12 rounded-xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.01]"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm món mới vào thực đơn
              </Button>

              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border-2 border-gray-100 rounded-2xl p-4 hover:border-orange-200 transition-all bg-white group">
                    <div className="flex gap-5">
                      <div className="relative shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                        <Badge className="absolute -top-2 -left-2 bg-white text-gray-900 border shadow-sm text-[10px] font-bold">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#EE4D2D] transition-colors">{product.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1 italic">{product.description}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(product)}>
                              <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-red-500 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-dashed">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-tighter">Giá bán</p>
                            <p className="font-black text-[#EE4D2D] text-sm">{product.price.toLocaleString()}đ</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Tồn kho</p>
                            <p className="font-bold text-gray-700 text-sm">{product.stock}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded-lg text-center">
                            <p className="text-[10px] font-black text-green-400 uppercase tracking-tighter">Đã bán</p>
                            <p className="font-bold text-green-700 text-sm">{product.sold}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {products.length === 0 && (
                  <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Kho hàng trống</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* TRƯỜNG HỢP 2: FORM CHỈNH SỬA / THÊM MỚI */
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <button onClick={handleCancel} className="text-sm font-black text-gray-400 hover:text-[#EE4D2D] flex items-center gap-1.5 transition-colors">
                <ChevronLeft size={18} /> QUAY LẠI KHO HÀNG
              </button>

              <div className="bg-gray-50 p-8 rounded-3xl border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Tên sản phẩm *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ví dụ: Bánh Mì Thịt Nướng Đặc Biệt"
                      className="rounded-xl border-gray-200 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Danh mục *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) => setFormData({ ...formData, category: val })}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 h-11 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Tồn kho ban đầu *</Label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-gray-200 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Giá bán (VNĐ) *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-gray-200 h-11 font-bold text-[#EE4D2D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Giá gốc (để hiển thị % giảm)</Label>
                    <Input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-gray-200 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">URL Hình ảnh</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/food.jpg"
                    className="rounded-xl border-gray-200 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-500 tracking-widest">Mô tả món ăn</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="rounded-2xl border-gray-200 resize-none"
                    placeholder="Nguyên liệu, cách chế biến hấp dẫn..."
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button variant="outline" onClick={handleCancel} className="flex-1 h-12 rounded-xl font-bold border-gray-300">
                    Hủy bỏ
                  </Button>
                  <Button onClick={handleSave} className="flex-1 h-12 bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black rounded-xl shadow-lg shadow-orange-100">
                    {editingProduct ? 'Cập nhật sản phẩm' : 'Đăng bán ngay'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}