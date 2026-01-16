"use client";

import React, { useState, useMemo } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
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
 * @param {Object} props
 * @param {boolean} props.isOpen - Trạng thái hiển thị trang danh sách
 * @param {Array} props.products - Toàn bộ danh sách sản phẩm gốc
 * @param {Function} props.onAddToCart - Hàm xử lý thêm vào giỏ hàng
 * @param {Function} props.onClose - Hàm đóng trang danh sách
 */
export function ProductListPage({
  isOpen,
  products = [],
  onAddToCart,
  onClose,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  // Lấy danh sách các danh mục duy nhất từ sản phẩm
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Logic Lọc và Sắp xếp sản phẩm
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

    // Lọc theo đánh giá (rating)
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

  // Component phụ cho phần giao diện bộ lọc (dùng chung cho Desktop và Mobile)
  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Danh mục</h3>
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

      <div>
        <h3 className="mb-4 font-semibold">Khoảng giá</h3>
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

      <div>
        <h3 className="mb-4 font-semibold">Đánh giá</h3>
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

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full text-red-500 hover:text-red-600"
        >
          Xóa tất cả bộ lọc
        </Button>
      )}
    </div>
  );
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-1 text-[#EE4D2D]">Khám phá món ăn</h1>
            <p className="text-sm text-muted-foreground">
              Tìm thấy {filteredProducts.length} món ăn phù hợp
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar Filter - Chỉ hiển thị trên Desktop (lg) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                {hasActiveFilters && (
                  <Badge className="bg-[#EE4D2D]">
                    {selectedCategories.length + selectedRatings.length + (priceRange[0] !== 0 || priceRange[1] !== 300000 ? 1 : 0)}
                  </Badge>
                )}
              </div>
              <FilterSection />
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex-1">
            {/* Toolbar: Sắp xếp & Nút lọc mobile */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Lọc món ăn
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader className="text-left">
                    <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                    <SheetDescription>Tối ưu lựa chọn món ăn của bạn</SheetDescription>
                  </SheetHeader>
                  <div className="mt-8">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sắp xếp theo:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao</SelectItem>
                    <SelectItem value="price-asc">Giá: Thấp đến Cao</SelectItem>
                    <SelectItem value="price-desc">Giá: Cao đến Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags lọc đang hoạt động */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="px-3 py-1 gap-1">
                    {cat} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                  </Badge>
                ))}
                {/* ... tương tự cho ratings và price ... */}
              </div>
            )}

            {/* Danh sách sản phẩm */}
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
              <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed">
                <p className="text-muted-foreground text-lg mb-4 font-medium">Rất tiếc, không tìm thấy món ăn bạn cần</p>
                <Button onClick={clearFilters} variant="default" className="bg-[#EE4D2D]">
                  Xem tất cả món ăn
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}