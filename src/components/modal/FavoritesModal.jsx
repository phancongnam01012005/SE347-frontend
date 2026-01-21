import { X, Heart, Store, Package } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '../card/ProductCard';
import { ShopCard } from '../card/ShopCard';
import { Button } from '../ui/button';

export function FavoritesModal({
  isOpen,
  onClose,
  favoriteProducts,
  favoriteShops,
  onAddToCart,
  onProductClick,
  onShopClick,
  onToggleProductFavorite,
  onToggleShopFavorite
}) {
  const [activeTab, setActiveTab] = useState('products');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto backdrop-blur-sm animate-in fade-in duration-300">
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EE4D2D]/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#EE4D2D] fill-current" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Danh sách yêu thích</h2>
                  <p className="text-xs text-muted-foreground">Lưu giữ những hương vị bạn yêu</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
              </button>
            </div>

            {/* Tabs Điều hướng */}
            <div className="flex px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                  activeTab === 'products'
                    ? 'text-[#EE4D2D]'
                    : 'text-muted-foreground hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>Món ăn ({favoriteProducts.length})</span>
                </div>
                {activeTab === 'products' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EE4D2D] rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('shops')}
                className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                  activeTab === 'shops'
                    ? 'text-[#EE4D2D]'
                    : 'text-muted-foreground hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Store className="w-4 h-4" />
                  <span>Cửa hàng ({favoriteShops.length})</span>
                </div>
                {activeTab === 'shops' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EE4D2D] rounded-t-full" />
                )}
              </button>
            </div>
          </div>

          {/* Vùng hiển thị nội dung */}
          <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            {activeTab === 'products' ? (
              <div className="animate-in slide-in-from-left-4 duration-300">
                {favoriteProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onProductClick={onProductClick}
                        showFavoriteButton={true}
                        isFavorite={true}
                        onToggleFavorite={() => onToggleProductFavorite(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState 
                    icon={<Heart className="w-16 h-16" />}
                    title="Chưa có món ăn nào"
                    desc="Hãy thả tim những món ngon để chúng xuất hiện tại đây nhé!"
                    onAction={onClose}
                  />
                )}
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-300">
                {favoriteShops.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteShops.map((shop) => (
                      <ShopCard
                        key={shop.id}
                        shop={shop}
                        onShopClick={onShopClick}
                        // Giả định ShopCard có props xử lý favorite tương tự
                        isFavorite={true}
                        onToggleFavorite={() => onToggleShopFavorite(shop.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState 
                    icon={<Store className="w-16 h-16" />}
                    title="Chưa có shop yêu thích"
                    desc="Theo dõi các cửa hàng uy tín để nhận thông báo khuyến mãi sớm nhất."
                    onAction={onClose}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component phụ hiển thị trạng thái trống (Empty State)
function EmptyState({ icon, title, desc, onAction }) {
  return (
    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
      <div className="text-gray-300 mx-auto mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-xs mx-auto text-sm">
        {desc}
      </p>
      <Button onClick={onAction} className="bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 px-8 rounded-full shadow-lg shadow-red-100">
        Khám phá ngay
      </Button>
    </div>
  );
}