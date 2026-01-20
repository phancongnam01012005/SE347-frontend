import { useNavigate } from "react-router-dom";
import { HeroSection, CategoryScroller } from "../components/section";
import { CategoryCard, ProductCard, ShopCard } from "../components/card";
import { categories, products, shops } from "../data/mockData";

export function HomePage({
  onAddToCart,
  favoriteProductIds,
  onToggleProductFavorite,
  isBuyer
}) {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleShopClick = (shop) => {
    navigate(`/shop/${shop.id}`);
  };

  return (
    <>
      <HeroSection />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Danh mục</h2>
        <CategoryScroller>
          {/* "Tất cả" category */}
          <div 
            onClick={() => navigate('/products')} 
            className="cursor-pointer flex-shrink-0"
          >
            <CategoryCard
              name="Tất cả"
              image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop"
              itemCount={products.length}
            />
          </div>
          {categories.map((category, index) => {
            const actualCount = products.filter(p => p.category === category.name).length;
            return (
              <div 
                key={index} 
                onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)} 
                className="cursor-pointer flex-shrink-0"
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  itemCount={actualCount}
                />
              </div>
            );
          })}
        </CategoryScroller>
      </section>

      {/* Featured Shops */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-orange-50/50 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Cửa hàng nổi bật</h2>
          <button 
            className="text-[#EE4D2D] hover:underline text-sm"
            onClick={() => navigate('/shops')}
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shops.slice(0, 8).map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onShopClick={() => handleShopClick(shop)}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Món ăn nổi bật</h2>
          <button 
            className="text-[#EE4D2D] hover:underline text-sm"
            onClick={() => navigate('/products')}
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={handleProductClick}
              isFavorite={favoriteProductIds.includes(product.id)}
              onToggleFavorite={() => onToggleProductFavorite(product.id)}
              showFavoriteButton={isBuyer}
            />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-white">
              Ưu đãi đặc biệt hôm nay!
            </h2>
            <p className="text-white/90 mb-6">
              Giảm ngay 50.000đ cho đơn hàng từ 200.000đ.
              Freeship toàn bộ đơn hàng!
            </p>
            <button 
              className="bg-white text-[#EE4D2D] px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              onClick={() => navigate('/products')}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </section>
    </>
  );
}