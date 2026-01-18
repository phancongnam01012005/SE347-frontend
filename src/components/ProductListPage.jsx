import React, { useState, useMemo, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

/**
 * ProductListPage Component
 * Trang danh sách sản phẩm đầy đủ với các chức năng: Lọc (Filter), Sắp xếp (Sort) và Phân trang (Pagination).
 */
export function ProductListPage({
  isOpen,
  products = [],
  onAddToCart,
  onClose,
  cartItemsCount,
  onCartClick,
  isLoggedIn,
  userName,
  userAvatar,
  userType,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout,
  initialCategory,
  onProductClick,
  onFavoritesClick,
  favoritesCount,
  favoriteProductIds = [],
  onToggleProductFavorite,
  onAddressClick,
  onOrdersClick,
  onReportsClick,
  onSellerOrdersClick,
  onSellerProductsClick,
  onSellerStatisticsClick,
  onSellerPromotionsClick,
  onSellerDashboardClick,
  onAboutClick,
  onContactClick,
  onPolicyClick,
  onTermsClick,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Cấu hình ban đầu khi mở trang hoặc đóng trang
  useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategories([initialCategory]);
    } else if (!isOpen) {
      clearFilters();
    }
  }, [isOpen, initialCategory]);

  // Lấy danh sách danh mục duy nhất từ dữ liệu sản phẩm
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Xử lý Lọc và Sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) => {
        const productRating = Math.floor(p.rating);
        return selectedRatings.includes(productRating);
      });
    }

    switch (sortBy) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'popular': 
      default: filtered.sort((a, b) => b.reviews - a.reviews); break;
    }

    return filtered;
  }, [products, selectedCategories, priceRange, selectedRatings, sortBy]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300000]);
    setSelectedRatings([]);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedRatings.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 300000;

  // Thành phần giao diện Bộ lọc (Dùng chung cho Desktop và Mobile Sheet)
  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Danh mục</h3>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleCategory(category)}>
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                className="data-[state=checked]:bg-[#EE4D2D] border-gray-300"
              />
              <Label className="text-sm font-medium text-gray-600 group-hover:text-[#EE4D2D] cursor-pointer transition-colors">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Khoảng giá</h3>
        <div className="space-y-6 px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={300000}
            step={10000}
            className="text-[#EE4D2D]"
          />
          <div className="flex items-center justify-between text-xs font-bold text-[#EE4D2D] bg-orange-50 p-2 rounded-lg">
            <span>{priceRange[0].toLocaleString()}đ</span>
            <span>-</span>
            <span>{priceRange[1].toLocaleString()}đ</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Đánh giá</h3>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleRating(rating)}>
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                className="data-[state=checked]:bg-[#EE4D2D] border-gray-300"
              />
              <Label className="text-sm font-medium text-gray-600 group-hover:text-[#EE4D2D] cursor-pointer flex items-center gap-1.5">
                {rating} sao trở lên
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" onClick={clearFilters} className="w-full text-[#EE4D2D] hover:bg-orange-50 font-bold border border-dashed border-[#EE4D2D]/30">
          Thiết lập lại bộ lọc
        </Button>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto animate-in fade-in duration-300">
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
        onCategoryClick={onClose}
        onLogoClick={onClose}
        onSellerDashboardClick={onSellerDashboardClick}
        onAddressClick={onAddressClick}
        onOrdersClick={onOrdersClick}
        onReportsClick={onReportsClick}
        onSellerOrdersClick={onSellerOrdersClick}
        onSellerProductsClick={onSellerProductsClick}
        onSellerStatisticsClick={onSellerStatisticsClick}
        onSellerPromotionsClick={onSellerPromotionsClick}
        onProductClick={onProductClick}
        onFavoritesClick={onFavoritesClick}
        favoritesCount={favoritesCount}
        favoriteProductIds={favoriteProductIds}
        onToggleProductFavorite={onToggleProductFavorite}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Khám phá món ngon</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Tìm thấy {filteredProducts.length} kết quả phù hợp</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] rounded-xl border-gray-200 font-bold">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
                <SelectItem value="rating">Đánh giá tốt nhất</SelectItem>
                <SelectItem value="price-asc">Giá: Thấp đến Cao</SelectItem>
                <SelectItem value="price-desc">Giá: Cao đến Thấp</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={onClose} className="rounded-xl font-bold border-gray-200">
              <X className="w-4 h-4 mr-2" /> Đóng
            </Button>
          </div>
        </div>

        <div className="flex gap-10">
          {/* SIDEBAR BỘ LỌC - DESKTOP */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 bg-white rounded-3xl border p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-black text-gray-900 italic">BỘ LỌC</h2>
                {hasActiveFilters && (
                  <Badge className="bg-[#EE4D2D] hover:bg-[#EE4D2D] border-none font-black rounded-full w-6 h-6 flex items-center justify-center p-0">
                    !
                  </Badge>
                )}
              </div>
              <FilterSection />
            </div>
          </aside>

          {/* NỘI DUNG CHÍNH */}
          <div className="flex-1 space-y-8">
            {/* Thanh công cụ Mobile & Tags */}
            <div className="lg:hidden flex items-center justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-full border-gray-200 shadow-sm gap-2 font-bold px-6">
                    <SlidersHorizontal size={16} /> Lọc & Phân loại
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] rounded-r-3xl p-8">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-2xl font-black">Bộ lọc tìm kiếm</SheetTitle>
                    <SheetDescription>Tối ưu lựa chọn món ăn của bạn</SheetDescription>
                  </SheetHeader>
                  <FilterSection />
                </SheetContent>
              </Sheet>
            </div>

            {/* Hiển thị lưới sản phẩm */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onProductClick={onProductClick}
                      isFavorite={favoriteProductIds.includes(product.id)}
                      onToggleFavorite={() => onToggleProductFavorite?.(product.id)}
                      showFavoriteButton={isLoggedIn && userType === 'buyer'}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <X size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rất tiếc, không có kết quả</h3>
                <p className="text-gray-500 mb-8">Hãy thử thay đổi điều kiện lọc hoặc từ khóa tìm kiếm</p>
                <Button onClick={clearFilters} className="bg-[#EE4D2D] hover:bg-[#d73a1e] font-black px-10 rounded-xl">
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}

            {/* Phân trang tự động */}
            {filteredProducts.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-2 pt-10 border-t border-dashed">
                <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="rounded-xl font-bold">
                  Quay lại
                </Button>
                
                {/* Logic hiển thị số trang tinh gọn */}
                {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black ${currentPage === i + 1 ? "bg-[#EE4D2D] hover:bg-[#d73a1e] shadow-lg shadow-orange-100" : "border-gray-200"}`}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredProducts.length / itemsPerPage), prev + 1))} 
                  disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)} 
                  className="rounded-xl font-bold"
                >
                  Kế tiếp
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer
        onLogoClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
  );
}