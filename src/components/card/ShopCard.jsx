import { Star, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function ShopCard({ shop, onShopClick }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group rounded-2xl border-gray-100">
      <div 
        className="relative"
        onClick={() => onShopClick?.(shop)}
      >
        {/* Banner (Cover Image) */}
        <div className="h-32 bg-gradient-to-r from-orange-100 to-red-100 overflow-hidden">
          <img
            src={shop.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Shop Logo - Positioned half-on/half-off the banner */}
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
        {/* Shop Name & Verification */}
        <div className="flex items-center gap-1.5 min-h-[28px]">
          <h3 
            className="font-bold text-lg line-clamp-1 group-hover:text-[#EE4D2D] transition-colors decoration-[#EE4D2D] underline-offset-4"
            onClick={() => onShopClick?.(shop)}
          >
            {shop.name}
          </h3>
          {shop.isVerified && (
            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
          )}
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-[#EE4D2D]" />
          <span className="line-clamp-1">{shop.address}</span>
        </div>

        {/* Performance Stats */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-orange-700">{shop.rating?.toFixed(1)}</span>
            <span className="text-[10px] text-orange-400 font-medium">({shop.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground bg-gray-50 px-2 py-1 rounded-lg">
            <Package className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium">{shop.products} món</span>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">
          {shop.description}
        </p>

        {/* Call to Action */}
        <div className="pt-2">
          <Button
            className="w-full bg-[#EE4D2D] hover:bg-[#d73f1e] text-white rounded-xl font-bold shadow-md shadow-red-50 group-hover:shadow-red-200 transition-all active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              onShopClick?.(shop);
            }}
          >
            Ghé thăm quán
          </Button>
        </div>
      </div>
    </Card>
  );
}