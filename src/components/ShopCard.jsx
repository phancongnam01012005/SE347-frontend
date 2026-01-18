import React from 'react';
import { Star, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

/**
 * ShopCard Component
 * Hiển thị thẻ thông tin cửa hàng bao gồm ảnh bìa, logo, đánh giá và số lượng sản phẩm.
 */
export function ShopCard({ shop, onShopClick }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-none bg-white rounded-2xl">
      <div 
        className="relative"
        onClick={() => onShopClick?.(shop)}
      >
        {/* Banner - Ảnh bìa cửa hàng */}
        <div className="h-32 bg-gradient-to-r from-orange-400 to-[#EE4D2D] overflow-hidden">
          <img
            src={shop.coverImage}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
          />
        </div>

        {/* Logo - Avatar cửa hàng đè lên banner */}
        <div className="absolute -bottom-10 left-4">
          <div className="w-20 h-20 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-12 p-5 space-y-3">
        {/* Shop Name & Verified Badge */}
        <div className="flex items-center gap-1.5">
          <h3 
            className="font-black text-gray-900 text-lg line-clamp-1 group-hover:text-[#EE4D2D] transition-colors"
            onClick={() => onShopClick?.(shop)}
          >
            {shop.name}
          </h3>
          {shop.isVerified && (
            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" title="Cửa hàng chính hãng" />
          )}
        </div>

        {/* Location - Địa chỉ */}
        <div className="flex items-start gap-1 text-xs font-medium text-gray-400">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#EE4D2D]" />
          <span className="line-clamp-1">{shop.address}</span>
        </div>

        {/* Stats - Chỉ số đánh giá và kho hàng */}
        <div className="flex items-center gap-4 py-1 border-y border-dashed border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm text-gray-700">{shop.rating?.toFixed(1)}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">({shop.reviews})</span>
          </div>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-gray-500">
            <Package className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{shop.products} <span className="font-medium">món</span></span>
          </div>
        </div>

        {/* Description - Mô tả ngắn */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-8">
          {shop.description}
        </p>

        {/* Action Button - Nút vào cửa hàng */}
        <Button
          className="w-full bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black rounded-xl h-11 shadow-lg shadow-orange-100 transition-all active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            onShopClick?.(shop);
          }}
        >
          Ghé thăm ngay
        </Button>
      </div>
    </Card>
  );
}