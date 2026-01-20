import { HeroSection, CategoryScroller } from "../section";
import { CategoryCard, ProductCard, ShopCard } from "../card";
import { categories, products, shops } from "../../data/mockData";

export function HomePage({ onCategoryClick, onShopClick, handleAddToCart, handleProductClick, favoriteProductIds, handleToggleProductFavorite, isBuyer, setIsShopListOpen, setIsProductListOpen, setSelectedCategory }) {
  return (
    <>
      <HeroSection />
      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Danh mục</h2>
        <CategoryScroller>
          <div 
            onClick={() => {
              setSelectedCategory(undefined);
              setIsProductListOpen(true);
            }} 
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
              <div key={index} onClick={() => onCategoryClick(category.name)} className="cursor-pointer flex-shrink-0">
                <CategoryCard name={category.name} image={category.image} itemCount={actualCount} />
              </div>
            );
          })}
        </CategoryScroller>
      </section>

      {/* Featured Shops */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-orange-50/50 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Cửa hàng nổi bật</h2>
          <button className="text-[#EE4D2D] hover:underline text-sm font-medium" onClick={() => setIsShopListOpen(true)}>Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shops.slice(0, 8).map((shop) => (
            <ShopCard key={shop.id} shop={shop} onShopClick={() => onShopClick(shop)} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Món ăn nổi bật</h2>
          <button className="text-[#EE4D2D] hover:underline text-sm font-medium" onClick={() => setIsProductListOpen(true)}>Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              isFavorite={favoriteProductIds.includes(product.id)}
              onToggleFavorite={() => handleToggleProductFavorite(product.id)}
              showFavoriteButton={isBuyer}
            />
          ))}
        </div>
      </section>
    </>
  );
}