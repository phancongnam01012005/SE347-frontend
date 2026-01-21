import { Star, Plus, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ProductCard({ 
  product, 
  onAddToCart, 
  onProductClick, 
  isFavorite = false, 
  onToggleFavorite, 
  showFavoriteButton = false 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      {/* Vùng hình ảnh */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer shrink-0"
        onClick={() => onProductClick?.(product)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge Giảm giá */}
        {product.discount && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#EE4D2D] text-white border-none px-2 py-0.5 rounded-lg shadow-sm">
              -{product.discount}%
            </Badge>
          </div>
        )}

        {/* Badge Tag (Ví dụ: Bán chạy, Món mới) */}
        {product.tag && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 border-none px-2 py-0.5 rounded-lg shadow-sm">
              {product.tag}
            </Badge>
          </div>
        )}

        {/* Nút yêu thích */}
        {showFavoriteButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        )}
      </div>

      {/* Vùng nội dung */}
      <div className="p-4 flex flex-col flex-1">
        <div 
          className="cursor-pointer flex-1 space-y-2"
          onClick={() => onProductClick?.(product)}
        >
          {/* Tên sản phẩm */}
          <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#EE4D2D] transition-colors">
            {product.name}
          </h3>
          
          {/* Mô tả ngắn */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Đánh giá & Danh mục */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-orange-50 px-1.5 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[11px] font-bold text-orange-700 ml-0.5">{product.rating}</span>
              </div>
              <span className="text-[11px] text-gray-400">({product.reviews})</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter bg-gray-50 px-1.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
        </div>

        {/* Giá & Nút thêm vào giỏ */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-dashed border-gray-100">
          <div className="flex flex-col">
            <div className="text-lg font-black text-[#EE4D2D]">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-gray-400 line-through font-medium">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>
          <Button
            size="icon"
            className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white rounded-xl h-10 w-10 shadow-md shadow-orange-100 transition-all hover:rotate-90 active:scale-95"
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