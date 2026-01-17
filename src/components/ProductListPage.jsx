import { useState, useMemo } from 'react';
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
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  // Lấy danh sách danh mục duy nhất từ sản phẩm
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Lọc theo khoảng giá
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Lọc theo đánh giá
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) => {
        const productRating = Math.floor(p.rating);
        return selectedRatings.includes(productRating);
      });
    }

    // Sắp xếp
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
  }, [products, selectedCategories, priceRange, selectedRatings, sortBy]);

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
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedRatings.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 300000;

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Lọc danh mục */}
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Danh mục</h3>
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
                className="text-sm cursor-pointer font-normal"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Lọc khoảng giá */}
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Khoảng giá</h3>
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

      {/* Lọc đánh giá */}
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Đánh giá</h3>
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
                className="text-sm cursor-pointer flex items-center gap-1 font-normal"
              >
                {rating} sao trở lên
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Nút xóa bộ lọc */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-[#EE4D2D] text-[#EE4D2D] hover:bg-[#EE4D2D]/10"
        >
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={onCartClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
        onCategoryClick={onClose}
      />

      {/* Tiêu đề trang */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Danh sách món ăn</h1>
              <p className="text-sm text-muted-foreground">
                Tìm thấy {filteredProducts.length} món ăn phù hợp
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="hover:bg-gray-100">
              <X className="w-4 h-4 mr-2" />
              Đóng
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Bộ lọc bên trái - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="bg-[#EE4D2D]/10 text-[#EE4D2D]">
                    {selectedCategories.length +
                      selectedRatings.length +
                      (priceRange[0] !== 0 || priceRange[1] !== 300000 ? 1 : 0)}
                  </Badge>
                )}
              </div>
              <FilterSection />
            </div>
          </aside>

          {/* Nội dung chính */}
          <div className="flex-1">
            {/* Thanh công cụ */}
            <div className="flex items-center justify-between mb-6">
              {/* Nút lọc Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Bộ lọc
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1 bg-[#EE4D2D] text-white">
                        {selectedCategories.length +
                          selectedRatings.length +
                          (priceRange[0] !== 0 || priceRange[1] !== 300000 ? 1 : 0)}
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

              {/* Sắp xếp */}
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

            {/* Tags bộ lọc đang hoạt động */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Đang lọc:</span>
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="gap-1 cursor-pointer pr-1"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <X className="w-3 h-3 opacity-50 hover:opacity-100" />
                  </Badge>
                ))}
                {selectedRatings.map((rating) => (
                  <Badge
                    key={rating}
                    variant="secondary"
                    className="gap-1 cursor-pointer pr-1"
                    onClick={() => toggleRating(rating)}
                  >
                    {rating} sao+
                    <X className="w-3 h-3 opacity-50 hover:opacity-100" />
                  </Badge>
                ))}
                {(priceRange[0] !== 0 || priceRange[1] !== 300000) && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer pr-1"
                    onClick={() => setPriceRange([0, 300000])}
                  >
                    {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ
                    <X className="w-3 h-3 opacity-50 hover:opacity-100" />
                  </Badge>
                )}
              </div>
            )}

            {/* Lưới sản phẩm */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed">
                <p className="text-muted-foreground text-lg mb-4 font-medium">
                  Không tìm thấy món ăn phù hợp với yêu cầu của bạn
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-[#EE4D2D] text-[#EE4D2D]">
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}