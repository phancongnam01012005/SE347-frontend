import { useState, useMemo, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../card';
import { Header } from '../layout';
import { Footer } from '../layout';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

export function ProductListPage({
  isOpen,
  products,
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
  searchQuery,
  onProductClick,
  onFavoritesClick,
  favoritesCount,
  favoriteProductIds,
  onToggleProductFavorite,
  // Header callbacks
  onAddressClick,
  onOrdersClick,
  onReportsClick,
  onSellerOrdersClick,
  onSellerProductsClick,
  onSellerStatisticsClick,
  onSellerPromotionsClick,
  onSellerDashboardClick,
  // Footer callbacks
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
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const itemsPerPage = 15;

  // Get unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Set initial category when opening
  useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategories([initialCategory]);
    } else if (isOpen && initialCategory === undefined) {
      // When "Tất cả" is selected, select all categories
      setSelectedCategories(categories);
    } else if (!isOpen) {
      // Reset all filters when closing
      setSelectedCategories([]);
      setPriceRange([0, 300000]);
      setSelectedRatings([]);
      setSortBy('popular');
      setCurrentPage(1);
    }
  }, [isOpen, initialCategory, categories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    const query = internalSearchQuery || searchQuery;
    if (query && query.trim()) {
      const trimmedQuery = query.toLowerCase().trim();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(trimmedQuery) ||
        p.description?.toLowerCase().includes(trimmedQuery) ||
        p.category.toLowerCase().includes(trimmedQuery)
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) => {
        const productRating = Math.floor(p.rating);
        return selectedRatings.includes(productRating);
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [products, selectedCategories, priceRange, selectedRatings, sortBy, internalSearchQuery, searchQuery]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300000]);
    setSelectedRatings([]);
    setSortBy('popular');
    setCurrentPage(1);
    setInternalSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedRatings.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 300000;
  
  const handleInternalSearch = (query) => {
    setInternalSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div>
        <h3 className="mb-4">Danh mục</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="mb-4">Khoảng giá</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            min={0}
            max={300000}
            step={10000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString('vi-VN')}đ</span>
            <span>{priceRange[1].toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="mb-4">Đánh giá</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => toggleRating(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                {rating} sao trở lên
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
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
        onFavoritesClick={onFavoritesClick}
        favoritesCount={favoritesCount}
        onSearch={handleInternalSearch}
      />

      {/* Page Title */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Danh sách món ăn</h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} món ăn
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Đóng
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2>Bộ lọc</h2>
                {hasActiveFilters && (
                  <Badge variant="secondary">
                    {selectedCategories.length +
                      selectedRatings.length +
                      (priceRange[0] !== 0 || priceRange[1] !== 300000 ? 1 : 0)}
                  </Badge>
                )}
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Bộ lọc
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        {selectedCategories.length +
                          selectedRatings.length +
                          (priceRange[0] !== 0 || priceRange[1] !== 300000
                            ? 1
                            : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Bộ lọc</SheetTitle>
                    <SheetDescription>
                      Lọc món ăn theo danh mục, giá và đánh giá
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Sắp xếp:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao</SelectItem>
                    <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                    <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(hasActiveFilters || internalSearchQuery || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">
                  Đang lọc:
                </span>
                {(internalSearchQuery || searchQuery) && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => setInternalSearchQuery('')}
                  >
                    Tìm kiếm: "{internalSearchQuery || searchQuery}"
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {selectedRatings.map((rating) => (
                  <Badge
                    key={rating}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleRating(rating)}
                  >
                    {rating} sao+
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {(priceRange[0] !== 0 || priceRange[1] !== 300000) && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => setPriceRange([0, 300000])}
                  >
                    {priceRange[0].toLocaleString('vi-VN')}đ -{' '}
                    {priceRange[1].toLocaleString('vi-VN')}đ
                    <X className="w-3 h-3" />
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                    isFavorite={favoriteProductIds?.includes(product.id) || false}
                    onToggleFavorite={onToggleProductFavorite ? () => onToggleProductFavorite(product.id) : undefined}
                    showFavoriteButton={isLoggedIn && userType === 'buyer'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Không tìm thấy món ăn phù hợp
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > itemsPerPage && (() => {
              const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
              const maxPagesToShow = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
              let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
              
              if (endPage - startPage < maxPagesToShow - 1) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
              }
              
              const pageNumbers = [];
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
              }
              
              return (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </Button>
                  
                  {startPage > 1 && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </Button>
                      {startPage > 2 && <span className="px-2">...</span>}
                    </>
                  )}
                  
                  {pageNumbers.map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "bg-[#EE4D2D] hover:bg-[#EE4D2D]/90" : ""}
                    >
                      {pageNum}
                    </Button>
                  ))}
                  
                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && <span className="px-2">...</span>}
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Sau
                  </Button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer
        onLogoClick={() => {
          onClose();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
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