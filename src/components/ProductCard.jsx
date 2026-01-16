import React from 'react';
import { Star, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback'; // Đảm bảo bạn có file này
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ProductCard({ product, onAddToCart }) {
  // Kiểm tra nếu không có product thì không render để tránh lỗi
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-border overflow-hidden group">
      {/* Hình ảnh sản phẩm */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Nhãn giảm giá */}
        {product.discount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-[#EE4D2D] text-white">-{product.discount}%</Badge>
          </div>
        )}
        
        {/* Tag trạng thái (ví dụ: Bán chạy, Mới) */}
        {product.tag && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{product.tag}</Badge>
          </div>
        )}
      </div>

      {/* Nội dung thông tin món ăn */}
      <div className="p-4 space-y-3">
        <h3 className="line-clamp-2 min-h-[3em] font-medium text-gray-800">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Đánh giá sao */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} đánh giá)</span>
        </div>

        {/* Giá tiền và nút Thêm vào giỏ */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <div className="text-[#EE4D2D] font-bold text-lg">
              {product.price?.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>
          
          <Button
            size="icon"
            className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white rounded-full transition-colors"
            onClick={() => onAddToCart(product)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}