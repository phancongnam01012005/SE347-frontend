import React, { useState, useMemo, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ShopCard } from './ShopCard';
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
 * ShopListPage Component
 * Trang danh sách các cửa hàng đối tác với hệ thống lọc địa điểm 3 cấp và sắp xếp theo hiệu suất.
 */
export function ShopListPage({
  isOpen,
  shops = [],
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

  // Reset bộ lọc khi đóng trang
  useEffect(() => {
    if (!isOpen) {
      clearFilters();
    }
  }, [isOpen]);

  // Logic lấy danh sách địa điểm duy nhất (Unique)
  const cities = useMemo(() => Array.from(new Set(shops.map(s => s.city))), [shops]);

  const districts = useMemo(() => {
    const data = selectedCities.length > 0 
      ? shops.filter(s => selectedCities.includes(s.city)) 
      : shops;
    return Array.from(new Set(data.map(s => s.district)));
  }, [shops, selectedCities]);

  const wards = useMemo(() => {
    const data = selectedDistricts.length > 0
      ? shops.filter(s => selectedDistricts.includes(s.district))
      : selectedCities.length > 0
      ? shops.filter(s => selectedCities.includes(s.city))
      : shops;
    return Array.from(new Set(data.map(s => s.ward)));
  }, [shops, selectedCities, selectedDistricts]);

  // Logic lọc và sắp xếp cửa hàng
  const filteredShops = useMemo(() => {
    let filtered = [...shops];

    if (selectedCities.length > 0) filtered = filtered.filter(s => selectedCities.includes(s.city));
    if (selectedDistricts.length > 0) filtered = filtered.filter(s => selectedDistricts.includes(s.district));
    if (selectedWards.length > 0) filtered = filtered.filter(s => selectedWards.includes(s.ward));
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(s => selectedRatings.includes(Math.floor(s.rating)));
    }

    switch (sortBy) {
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'products': filtered.sort((a, b) => b.products - a.products); break;
      default: filtered.sort((a, b) => b.reviews - a.reviews); break;
    }

    return filtered;
  }, [shops, selectedCities, selectedDistricts, selectedWards, selectedRatings, sortBy]);

  const toggleFilter = (item, state, setState) => {
    setState(state.includes(item) ? state.filter(i => i !== item) : [...state, item]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelectedWards([]);
    setSelectedRatings([]);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCities.length > 0 || selectedDistricts.length > 0 || selectedWards.length > 0 || selectedRatings.length > 0;

  // Component giao diện bộ lọc dùng chung
  const FilterSection = () => (
    <div className="space-y-8">
      {/* Tỉnh / Thành */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Khu vực</h3>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
          {cities.map(city => (
            <div key={city} className="flex items-center gap-2 group cursor-pointer" onClick={() => { toggleFilter(city, selectedCities, setSelectedCities); setSelectedDistricts([]); setSelectedWards([]); }}>
              <Checkbox id={`city-${city}`} checked={selectedCities.includes(city)} className="border-gray-300 data-[state=checked]:bg-[#EE4D2D]" />
              <Label className="text-sm font-bold text-gray-600 group-hover:text-[#EE4D2D] cursor-pointer">{city}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Quận / Huyện (Chỉ hiện khi đã chọn tỉnh hoặc có dữ liệu) */}
      {districts.length > 0 && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Quận / Huyện</h3>
          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
            {districts.map(d => (
              <div key={d} className="flex items-center gap-2 group cursor-pointer" onClick={() => { toggleFilter(d, selectedDistricts, setSelectedDistricts); setSelectedWards([]); }}>
                <Checkbox id={`district-${d}`} checked={selectedDistricts.includes(d)} className="border-gray-300" />
                <Label className="text-sm font-bold text-gray-600 group-hover:text-[#EE4D2D] cursor-pointer">{d}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Đánh giá */}
      <div className="space-y-4 pt-4 border-t border-dashed">
        <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Xếp hạng cửa hàng</h3>
        <div className="space-y-2.5">
          {[5, 4, 3].map(star => (
            <div key={star} className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleFilter(star, selectedRatings, setSelectedRatings)}>
              <Checkbox id={`rating-${star}`} checked={selectedRatings.includes(star)} className="border-gray-300" />
              <Label className="text-sm font-bold text-gray-600 group-hover:text-[#EE4D2D] cursor-pointer flex items-center gap-1.5">
                {star} sao trở lên
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" onClick={clearFilters} className="w-full text-[#EE4D2D] font-black border-2 border-dashed border-[#EE4D2D]/20 rounded-xl hover:bg-orange-50">
          XÓA TẤT CẢ BỘ LỌC
        </Button>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
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

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Đối tác cửa hàng</h1>
            <p className="text-gray-500 font-medium">Khám phá {filteredShops.length} quán ngon đang hoạt động</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] h-11 rounded-xl border-gray-200 font-bold bg-white shadow-sm">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent className="rounded-xl font-bold">
                <SelectItem value="popular">Yêu thích nhất</SelectItem>
                <SelectItem value="rating">Đánh giá tốt nhất</SelectItem>
                <SelectItem value="products">Nhiều món ăn nhất</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={onClose} className="h-11 rounded-xl font-bold border-gray-200 bg-white">
              <X className="w-4 h-4 mr-2" /> Đóng
            </Button>
          </div>
        </div>

        <div className="flex gap-10">
          {/* SIDEBAR FILTERS - DESKTOP */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 bg-white rounded-3xl border-2 border-gray-50 p-8 shadow-sm">
              <FilterSection />
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1 space-y-8">
            <div className="lg:hidden flex items-center justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-full border-gray-200 font-black px-6 shadow-sm gap-2">
                    <SlidersHorizontal size={16} /> LỌC ĐỊA ĐIỂM
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] rounded-r-3xl p-8">
                  <SheetHeader className="mb-8 text-left">
                    <SheetTitle className="text-2xl font-black">Tìm quanh đây</SheetTitle>
                    <SheetDescription>Lọc cửa hàng theo vị trí của bạn</SheetDescription>
                  </SheetHeader>
                  <FilterSection />
                </SheetContent>
              </Sheet>
            </div>

            {filteredShops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredShops
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map(shop => (
                    <ShopCard key={shop.id} shop={shop} onShopClick={onShopClick} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Store className="w-20 h-20 mx-auto mb-6 text-gray-200" />
                <h3 className="text-xl font-black text-gray-900 mb-2">Chưa tìm thấy quán phù hợp</h3>
                <p className="text-gray-400 mb-8 font-medium">Hãy thử mở rộng phạm vi tìm kiếm của bạn</p>
                <Button onClick={clearFilters} className="bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-black px-10 rounded-xl h-12 shadow-lg">
                  LÀM MỚI BỘ LỌC
                </Button>
              </div>
            )}

            {/* PHÂN TRANG */}
            {filteredShops.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-2 pt-10 border-t border-dashed">
                <Button variant="ghost" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="font-black text-gray-400">TRƯỚC</Button>
                {Array.from({ length: Math.ceil(filteredShops.length / itemsPerPage) }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-11 h-11 rounded-xl font-black ${currentPage === i + 1 ? "bg-[#EE4D2D] shadow-md shadow-orange-100" : "border-gray-200 text-gray-500"}`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button variant="ghost" onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredShops.length / itemsPerPage), prev + 1))} disabled={currentPage >= Math.ceil(filteredShops.length / itemsPerPage)} className="font-black text-gray-400">SAU</Button>
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