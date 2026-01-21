import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CategoryCard({ name, image, itemCount }) {
  return (
    <button className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-orange-50/50 transition-all duration-300 hover:scale-110 group border border-transparent hover:border-orange-100">
      {/* Hình ảnh danh mục dạng tròn với Gradient nền */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#EE4D2D]/5 to-[#FF6F3D]/10 p-1.5 group-hover:from-[#EE4D2D]/20 group-hover:to-[#FF6F3D]/30 transition-all shadow-sm group-hover:shadow-md">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-6"
          />
        </div>
      </div>

      {/* Thông tin văn bản */}
      <div className="text-center space-y-0.5">
        <div className="text-sm font-bold text-gray-800 group-hover:text-[#EE4D2D] transition-colors">
          {name}
        </div>
        <div className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {itemCount}+ món ngon
        </div>
      </div>
    </button>
  );
}