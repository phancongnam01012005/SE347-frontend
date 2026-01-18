import React, { useState } from 'react';
import { Star, MapPin, Package, BadgeCheck, Tag, Heart, Store, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * ShopDetailPage Component
 * Trang chi tiết cửa hàng hiển thị toàn bộ thực đơn, các chương trình khuyến mãi riêng của shop và thông tin liên hệ.
 */
export function ShopDetailPage({
  isOpen,
  onClose,
  shop,
  shopProducts = [],
  onAddToCart,
  onProductClick,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
  favoriteProducts = [],
  onToggleProductFavorite,
  cartItemsCount = 0,
  onCartClick,
  isLoggedIn = false,
  userName,
  userAvatar,
  userType,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout,
  onCategoryClick,
  onSellerDashboardClick,
  onFavoritesClick,
  favoritesCount = 0,
  onAddressClick,
  onOrdersClick,
  onReportsClick,
  onSellerOrdersClick,
  onSellerProductsClick,
  onSellerStatisticsClick,
  onSellerPromotionsClick,
  onAboutClick,
  onContactClick,
  onPolicyClick,
  onTermsClick
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Không render nếu modal không mở hoặc không có dữ liệu shop
  if (!isOpen || !shop) return null;

  // Dữ liệu khuyến mãi mặc định nếu shop không có
  const shopPromotions = shop.promotions || [
    {
      id: '1',
      title: 'Giảm 15% toàn bộ sản phẩm',
      description: 'Áp dụng cho tất cả sản phẩm trong cửa hàng',
      validUntil: '31/01/2026',
      code: 'SHOP15'
    },
    {
      id: '2',
      title: 'Freeship không giới hạn',
      description: 'Miễn phí vận chuyển cho mọi đơn hàng',
      validUntil: '28/01/2026'
    }
  ];

  // Xử lý danh mục và lọc sản phẩm
  const categories = ['all', ...new Set(shopProducts.map(p => p.category))];
  const filteredProducts = selectedCategory === 'all'
    ? shopProducts
    : shopProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-screen flex flex-col">
        
        {/* Header điều hướng tích hợp */}
        <Header
          cartItemsCount={cartItemsCount}
          onCartClick={onCartClick}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userAvatar={userAvatar}
          userType={userType}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          onProfileClick={onProfileClick}
          onLogout={onLogout}
          onCategoryClick={onCategoryClick}
          onSellerDashboardClick={onSellerDashboardClick}
          onFavoritesClick={onFavoritesClick}
          favoritesCount={favoritesCount}
          onLogoClick={onClose}
          onAddressClick={onAddressClick}
          onOrdersClick={onOrdersClick}
          onReportsClick={onReportsClick}
          onSellerOrdersClick={onSellerOrdersClick}
          onSellerProductsClick={onSellerProductsClick}
          onSellerStatisticsClick={onSellerStatisticsClick}
          onSellerPromotionsClick={onSellerPromotionsClick}
        />

        <main className="flex-1">
          {/* Shop Header: Cover & Logo Section */}
          <div className="relative h-72 md:h-96">
            <img
              src={shop.coverImage}
              alt={shop.name}
              className="w-full h-full object-cover shadow-inner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl border-4 border-white overflow-hidden bg-white shadow-2xl shrink-0 transform -rotate-1">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 pb-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter">
                      {shop.name}
                    </h1>
                    {shop.isVerified && (
                      <BadgeCheck className="w-8 h-8 text-blue-400 fill-current" />
                    )}
                    {shop.badge && (
                      <Badge className="bg-[#EE4D2D] hover:bg-[#EE4D2D] text-white font-bold py-1 px-3">
                        {shop.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-bold">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg">{shop.rating}</span>
                      <span className="text-white/60 font-medium">({shop.reviews.toLocaleString()} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Package className="w-4 h-4" />
                      <span>{shop.products} món ăn</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#EE4D2D]" />
                      <span className="line-clamp-1">{shop.address}</span>
                    </div>
                  </div>
                </div>

                {showFavoriteButton && onToggleFavorite && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onToggleFavorite(shop.id)}
                    className={`rounded-2xl font-black h-14 px-8 shadow-lg transition-all active:scale-95 ${
                      isFavorite 
                        ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
                        : 'bg-white/90 backdrop-blur-md border-none text-gray-900 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Đã yêu thích' : 'Yêu thích quán'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Cột trái: Thông tin Shop */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Giới thiệu cửa hàng</h3>
                <p className="text-sm text-gray-600 leading-relaxed italic border-l-4 border-orange-200 pl-4">
                  "{shop.description}"
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-4 shadow-sm">
                <h3 className="font-bold text-gray-900">Chỉ số hoạt động</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-400">Tỷ lệ phản hồi:</span>
                    <span className="text-green-600 font-bold">99%</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-400">Chuẩn bị món:</span>
                    <span className="text-gray-900 font-bold">~15 phút</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-400">Tham gia từ:</span>
                    <span className="text-gray-900 font-bold">2 năm trước</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Cột phải: Menu & Khuyến mãi */}
            <div className="lg:col-span-3 space-y-10">
              
              {/* Promotion Banner Section */}
              {shopPromotions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter italic">
                    <Tag className="text-[#EE4D2D]" /> Ưu đãi từ quán
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shopPromotions.map((promo) => (
                      <div key={promo.id} className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border border-orange-100 shadow-sm group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-black text-gray-900">{promo.title}</p>
                            <p className="text-xs text-gray-500 font-medium">{promo.description}</p>
                            <p className="text-[10px] text-[#EE4D2D] font-bold mt-2 uppercase tracking-widest">HSD: {promo.validUntil}</p>
                          </div>
                          {promo.code && (
                            <Badge className="bg-white text-[#EE4D2D] border-[#EE4D2D] font-mono font-bold px-3 py-1">
                              {promo.code}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thực đơn & Filter */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-10 bg-white/80 backdrop-blur-md py-4 border-b">
                  <h3 className="text-2xl font-black text-gray-900">Thực đơn của quán</h3>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-xs transition-all ${
                          selectedCategory === cat
                            ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-100 scale-105'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {cat === 'all' ? 'Tất cả món' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onProductClick={onProductClick}
                        showFavoriteButton={true}
                        isFavorite={favoriteProducts.includes(product.id)}
                        onToggleFavorite={() => onToggleProductFavorite?.(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="font-bold text-gray-400 uppercase tracking-widest">Danh mục này hiện chưa có món</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer 
          onLogoClick={onClose}
          onAboutClick={onAboutClick}
          onContactClick={onContactClick}
          onPolicyClick={onPolicyClick}
          onTermsClick={onTermsClick}
          onCartClick={onCartClick}
          onOrdersClick={onOrdersClick}
          onFavoritesClick={onFavoritesClick}
          onSellerOrdersClick={onSellerOrdersClick}
          onSellerProductsClick={onSellerProductsClick}
          onSellerStatisticsClick={onSellerStatisticsClick}
          onSellerPromotionsClick={onSellerPromotionsClick}
          isLoggedIn={isLoggedIn}
          userType={userType}
        />
      </div>
    </div>
  );
}