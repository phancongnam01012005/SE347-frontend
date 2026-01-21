import { Star, MapPin, Package, BadgeCheck, Tag, Heart, Store, X } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '../card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Header } from '../layout';
import { Footer } from '../layout';

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
  onTermsClick,
  hideHeader = false,
  hideFooter = false
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen || !shop) return null;

  // Mock shop promotions
  const shopPromotions = shop.promotions || [
    {
      id: '1',
      title: 'Giảm 15% toàn bộ sản phẩm',
      description: 'Áp dụng cho tất cả sản phẩm trong cửa hàng',
      discount: 15,
      discountType: 'percentage',
      validUntil: '31/01/2026',
      code: 'SHOP15'
    },
    {
      id: '2',
      title: 'Freeship không giới hạn',
      description: 'Miễn phí vận chuyển cho mọi đơn hàng',
      discount: 0,
      discountType: 'fixed',
      validUntil: '28/01/2026'
    },
    {
      id: '3',
      title: 'Giảm 50k cho đơn từ 300k',
      description: 'Giảm ngay 50.000đ khi mua từ 300.000đ',
      discount: 50000,
      discountType: 'fixed',
      minPurchase: 300000,
      validUntil: '25/01/2026',
      code: 'SAVE50K'
    }
  ];

  const categories = ['all', ...new Set(shopProducts.map(p => p.category))];
  const filteredProducts = selectedCategory === 'all'
    ? shopProducts
    : shopProducts.filter(p => p.category === selectedCategory);

  // If hideHeader is true, use a simpler overlay without nested scrolling
  const containerClass = "fixed inset-0 z-50 bg-white overflow-hidden";

  return (
    <div className={containerClass}>
      <div className="h-full overflow-y-auto">
        {/* Header */}
        {!hideHeader && (
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
            onAboutClick={onAboutClick}
            onContactClick={onContactClick}
            onPolicyClick={onPolicyClick}
            onTermsClick={onTermsClick}
          />
        )}

        <div className="flex-1">
          {/* Shop Cover */}
          <div className="relative h-64 md:h-80">
            <img
              src={shop.coverImage}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white z-10"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
            
            {/* Shop Logo & Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-end gap-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={shop.logo}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-white text-2xl md:text-3xl font-bold">{shop.name}</h1>
                      {shop.isVerified && (
                        <BadgeCheck className="w-6 h-6 text-blue-400" />
                      )}
                      {shop.badge && (
                        <Badge className="bg-[#EE4D2D]">{shop.badge}</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{shop.rating}</span>
                        <span className="text-white/80">({shop.reviews.toLocaleString()} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{shop.products} sản phẩm</span>
                      </div>
                    </div>
                  </div>
                  {showFavoriteButton && onToggleFavorite && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => onToggleFavorite?.(shop.id)}
                      className="bg-white/90 hover:bg-white flex-shrink-0"
                    >
                      <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Shop Description & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-bold mb-2">Giới thiệu</h3>
                  <p className="text-sm text-muted-foreground">{shop.description}</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Địa chỉ</p>
                    <p className="text-sm text-muted-foreground">{shop.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3">Thống kê cửa hàng</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sản phẩm:</span>
                    <span className="font-medium">{shop.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đánh giá:</span>
                    <span className="font-medium">{shop.reviews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tỷ lệ phản hồi:</span>
                    <span className="text-green-600 font-medium">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thời gian phản hồi:</span>
                    <span className="font-medium">Trong vài giờ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Promotions */}
            {shopPromotions.length > 0 && (
              <div className="border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-[#EE4D2D]" />
                  <h3 className="text-sm font-bold">Khuyến mãi của cửa hàng</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {shopPromotions.map((promo) => (
                    <div key={promo.id} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium flex-1">{promo.title}</p>
                          {promo.code && (
                            <Badge variant="outline" className="text-xs flex-shrink-0 bg-orange-50 border-orange-200 text-orange-700">
                              {promo.code}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{promo.description}</p>
                        <p className="text-xs text-muted-foreground font-medium">HSD: {promo.validUntil}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="border-b">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#EE4D2D] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                Sản phẩm ({filteredProducts.length})
              </h3>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onProductClick={onProductClick}
                      showFavoriteButton={showFavoriteButton}
                      isFavorite={favoriteProducts.includes(product.id)}
                      onToggleFavorite={() => onToggleProductFavorite?.(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-muted-foreground">Không có sản phẩm trong danh mục này</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {!hideFooter && (
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
        )}
      </div>
    </div>
  );
}