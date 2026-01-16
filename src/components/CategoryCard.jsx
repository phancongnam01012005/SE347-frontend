import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CategoryCard({ name, image, itemCount }) {
  return (
    <button className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all hover:scale-105 group w-full max-w-[120px]">
      {/* Container của hình ảnh (hình tròn có gradient) */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#EE4D2D]/10 to-[#FF6F3D]/10 p-2 group-hover:from-[#EE4D2D]/20 group-hover:to-[#FF6F3D]/20 transition-all">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      
      {/* Tên danh mục và số lượng */}
      <div className="text-center">
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className="text-xs text-muted-foreground">{itemCount}+ món</div>
      </div>
    </button>
  );
}