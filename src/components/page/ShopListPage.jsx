import { useState, useEffect, useMemo } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ShopCard } from '../card';
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

export function ShopListPage({
  isOpen,
  shops,
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
  onShopClick,
  onFavoritesClick,
  favoritesCount,
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
  onSellerDashboardClick,
}) {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Reset filters and page when closing
  useEffect(() => {
    if (!isOpen) {
      setSelectedCities([]);
      setSelectedDistricts([]);
      setSelectedWards([]);
      setSelectedRatings([]);
      setSortBy('popular');
      setCurrentPage(1);
    }
  }, [isOpen]);

  // Get unique cities, districts, wards from shops
  const cities = useMemo(() => {
    return Array.from(new Set(shops.map(s => s.city)));
  }, [shops]);

  const districts = useMemo(() => {
    // If cities are selected, only show districts from selected cities
    const filteredShops = selectedCities.length > 0 
      ? shops.filter(s => selectedCities.includes(s.city))
      : shops;
    return Array.from(new Set(filteredShops.map(s => s.district)));
  }, [shops, selectedCities]);

  const wards = useMemo(() => {
    // If districts are selected, only show wards from selected districts
    const filteredShops = selectedDistricts.length > 0
      ? shops.filter(s => selectedDistricts.includes(s.district))
      : selectedCities.length > 0
      ? shops.filter(s => selectedCities.includes(s.city))
      : shops;
    return Array.from(new Set(filteredShops.map(s => s.ward)));
  }, [shops, selectedCities, selectedDistricts]);

  // Filter and sort shops
  const filteredShops = useMemo(() => {
    let filtered = [...shops];

    // Filter by city
    if (selectedCities.length > 0) {
      filtered = filtered.filter((s) =>
        selectedCities.includes(s.city)
      );
    }

    // Filter by district
    if (selectedDistricts.length > 0) {
      filtered = filtered.filter((s) =>
        selectedDistricts.includes(s.district)
      );
    }

    // Filter by ward
    if (selectedWards.length > 0) {
      filtered = filtered.filter((s) =>
        selectedWards.includes(s.ward)
      );
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((s) => {
        const shopRating = Math.floor(s.rating);
        return selectedRatings.includes(shopRating);
      });
    }

    // Sort shops
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'products':
        filtered.sort((a, b) => b.products - a.products);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [shops, selectedCities, selectedDistricts, selectedWards, selectedRatings, sortBy]);

  const toggleCity = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
    // Reset district and ward when city changes
    setSelectedDistricts([]);
    setSelectedWards([]);
  };

  const toggleDistrict = (district) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
    // Reset ward when district changes
    setSelectedWards([]);
  };

  const toggleWard = (ward) => {
    setSelectedWards((prev) =>
      prev.includes(ward)
        ? prev.filter((w) => w !== ward)
        : [...prev, ward]
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
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelectedWards([]);
    setSelectedRatings([]);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCities.length > 0 ||
    selectedDistricts.length > 0 ||
    selectedWards.length > 0 ||
    selectedRatings.length > 0;

  const FilterSection = () => (
    <div className="space-y-6">
      {/* City Filter */}
      <div>
        <h3 className="mb-4">Tỉnh/Thành phố</h3>
        <div className="space-y-3">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={selectedCities.includes(city)}
                onCheckedChange={() => toggleCity(city)}
              />
              <Label
                htmlFor={`city-${city}`}
                className="text-sm cursor-pointer"
              >
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* District Filter */}
      {districts.length > 0 && (
        <div>
          <h3 className="mb-4">Quận/Huyện</h3>
          <div className="space-y-3">
            {districts.map((district) => (
              <div key={district} className="flex items-center space-x-2">
                <Checkbox
                  id={`district-${district}`}
                  checked={selectedDistricts.includes(district)}
                  onCheckedChange={() => toggleDistrict(district)}
                />
                <Label
                  htmlFor={`district-${district}`}
                  className="text-sm cursor-pointer"
                >
                  {district}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ward Filter */}
      {wards.length > 0 && selectedDistricts.length > 0 && (
        <div>
          <h3 className="mb-4">Phường/Xã</h3>
          <div className="space-y-3">
            {wards.map((ward) => (
              <div key={ward} className="flex items-center space-x-2">
                <Checkbox
                  id={`ward-${ward}`}
                  checked={selectedWards.includes(ward)}
                  onCheckedChange={() => toggleWard(ward)}
                />
                <Label
                  htmlFor={`ward-${ward}`}
                  className="text-sm cursor-pointer"
                >
                  {ward}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

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
      />

      {/* Page Title */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold">Danh sách cửa hàng</h1>
              <p className="text-sm text-muted-foreground">
                {filteredShops.length} cửa hàng
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
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                {hasActiveFilters && (
                  <Badge variant="secondary">
                    {selectedCities.length + selectedDistricts.length + selectedWards.length + selectedRatings.length}
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
                        {selectedCities.length + selectedDistricts.length + selectedWards.length + selectedRatings.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Bộ lọc</SheetTitle>
                    <SheetDescription>
                      Lọc cửa hàng theo địa điểm và đánh giá
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
                    <SelectItem value="products">Nhiều sản phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">
                  Đang lọc:
                </span>
                {selectedCities.map((city) => (
                  <Badge
                    key={city}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleCity(city)}
                  >
                    {city}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {selectedDistricts.map((district) => (
                  <Badge
                    key={district}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleDistrict(district)}
                  >
                    {district}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {selectedWards.map((ward) => (
                  <Badge
                    key={ward}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleWard(ward)}
                  >
                    {ward}
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
              </div>
            )}

            {/* Shops Grid */}
            {filteredShops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((shop) => (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    onShopClick={onShopClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Không tìm thấy cửa hàng phù hợp
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredShops.length > itemsPerPage && (() => {
              const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
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