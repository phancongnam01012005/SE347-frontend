import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge'; // <-- THÊM DÒNG NÀY
import { Plus, Edit2, Trash2, Package, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';


export function SellerProductsModal({ isOpen, onClose }) {
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
      name: 'Snack Khoai Tây Lay\'s Vị Phô Mai',
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
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Đã xóa sản phẩm thành công');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      ));
      toast.success('Cập nhật sản phẩm thành công');
    } else {
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        sold: 0
      };
      setProducts([newProduct, ...products]);
      toast.success('Đã thêm sản phẩm mới vào thực đơn');
    }

    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-2xl border-none">
        <DialogHeader className="p-6 bg-gray-50/50 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-[#EE4D2D]" />
            Kho hàng của Quán
          </DialogTitle>
          <DialogDescription>Quản lý thực đơn và kiểm soát lượng hàng tồn kho</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {!isEditing ? (
            <div className="space-y-6">
              <Button
                onClick={handleAdd}
                className="w-full bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white h-12 rounded-xl shadow-lg shadow-red-100 font-bold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm món mới vào thực đơn
              </Button>

              <div className="grid gap-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="group border rounded-2xl p-4 hover:border-[#EE4D2D]/30 transition-all bg-white hover:shadow-md">
                      <div className="flex gap-5">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg leading-tight mb-1">{product.name}</h3>
                              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {product.category}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600" onClick={() => handleEdit(product)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(product.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-dashed">
                            <div className="space-y-0.5">
                              <p className="text-[10px] uppercase font-bold text-gray-400">Giá bán</p>
                              <p className="font-bold text-[#EE4D2D]">{product.price.toLocaleString()}đ</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] uppercase font-bold text-gray-400">Tồn kho</p>
                              <p className="font-bold">{product.stock}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] uppercase font-bold text-gray-400">Đã bán</p>
                              <p className="font-bold text-green-600">{product.sold}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-muted-foreground">Chưa có món nào trong thực đơn của bạn.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Form thêm/sửa sản phẩm */
            <form onSubmit={handleSave} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="gap-2 -ml-2 text-[#EE4D2D] hover:bg-orange-50">
                <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
              </Button>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="font-bold">Tên món ăn *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="VD: Cơm Tấm Sườn Bì Chả"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold">Danh mục *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">Số lượng tồn kho *</Label>
                      <Input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold">Giá bán hiện tại *</Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="h-11 rounded-xl font-bold text-[#EE4D2D]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-gray-400">Giá niêm yết (nếu có)</Label>
                      <Input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                        className="h-11 rounded-xl text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="font-bold">Hình ảnh sản phẩm</Label>
                    <div className="flex gap-4 items-start">
                      <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                        {formData.image ? (
                          <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Dán link ảnh (URL) tại đây..."
                          className="h-11 rounded-xl text-xs"
                        />
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                          * Khuyên dùng ảnh vuông (tỉ lệ 1:1), định dạng JPG/PNG để hiển thị tốt nhất.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Mô tả chi tiết</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Thành phần, hương vị đặc trưng..."
                      rows={4}
                      className="rounded-xl resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" type="button" onClick={handleCancel} className="flex-1 h-12 rounded-xl font-bold">Hủy bỏ</Button>
                <Button type="submit" className="flex-1 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white h-12 rounded-xl font-bold shadow-lg shadow-red-100">
                  {editingProduct ? 'Cập nhật món ăn' : 'Đăng bán ngay'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}