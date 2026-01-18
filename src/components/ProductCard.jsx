import React from 'react';
import { Star, Plus, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

/**
 * ProductCard Component
 * Hiển thị thông tin tóm tắt của một món ăn/sản phẩm.
 */
export function ProductCard({ 
  product, 
  onAddToCart, 
  onProductClick, 
  isFavorite = false, 
  onToggleFavorite, 
  showFavoriteButton = false 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-border overflow-hidden group h-full flex flex-col">
      {/* Hình ảnh sản phẩm */}
      <div 
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onProductClick?.(product)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Nhãn giảm giá */}
        {product.discount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-[#EE4D2D] text-white font-bold">-{product.discount}%</Badge>
          </div>
        )}
        
        {/* Nhãn tag (ví dụ: 'Bán chạy', 'Mới') */}
        {product.tag && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 font-medium">
              {product.tag}
            </Badge>
          </div>
        )}

        {/* Nút yêu thích */}
        {showFavoriteButton && onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute bottom-2 right-2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#EE4D2D] text-[#EE4D2D]' : 'text-gray-400'}`}
            />
          </button>
        )}
      </div>

      {/* Nội dung thông tin món ăn */}
      <div 
        className="p-4 flex flex-col flex-1 space-y-2 cursor-pointer"
        onClick={() => onProductClick?.(product)}
      >
        <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-[#EE4D2D] transition-colors">
          {product.name}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Đánh giá sao */}
        <div className="flex items-center gap-1.5 py-1">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{product.rating}</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">({product.reviews} nhận xét)</span>
        </div>

        {/* Giá và Nút thêm vào giỏ */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <div className="text-lg font-black text-[#EE4D2D]">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through font-medium">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>
          
          <Button
            size="icon"
            className="bg-[#EE4D2D] hover:bg-[#d73a1e] text-white rounded-full shadow-lg shadow-orange-100 transition-all hover:scale-110 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}