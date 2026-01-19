import {
  Search,
  ShoppingCart,
  MapPin,
  User,
  Menu,
  LogIn,
  UserPlus,
  LogOut,
  Store,
  Heart,
  AlertTriangle,
  Package,
  TrendingUp,
  BarChart3,
  Tag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import iconImage from "../../assets/images/icon.png"; 
import { useState } from "react";

export function Header({
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
  onCategoryClick,
  onSellerDashboardClick,
  onFavoritesClick,
  favoritesCount = 0,
  onLogoClick,
  onAddressClick,
  onOrdersClick,
  onReportsClick,
  onSellerOrdersClick,
  onSellerProductsClick,
  onSellerStatisticsClick,
  onSellerPromotionsClick,
  onSearch,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-md">
      {/* Main Header */}
      <div className="py-5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            onClick={onLogoClick}
          >
            <img
              src={iconImage}
              alt="FoodieShop Icon"
              className="w-16 h-16 group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-[#EE4D2D] to-[#FF6B3D] bg-clip-text text-transparent">
                FoodieShop
              </h1>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Đồ ăn vặt ngon
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <form
              onSubmit={handleSearch}
              className="relative group"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#EE4D2D] transition-colors" />
              <Input
                type="text"
                placeholder="Tìm kiếm món ăn, đồ uống..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 w-full border-2 border-gray-200 focus:border-[#EE4D2D] rounded-xl shadow-sm focus:shadow-md transition-all duration-300"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} />
                      <AvatarFallback className="bg-[#EE4D2D] text-white">
                        {userName?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">
                      {userName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >
                  <DropdownMenuLabel>
                    Tài khoản của tôi
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>

                  {/* Buyer Menu */}
                  {userType === "buyer" && (
                    <>
                      <DropdownMenuItem onClick={onOrdersClick}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Đơn hàng của tôi
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onAddressClick}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Địa chỉ giao hàng
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* Seller Menu */}
                  {userType === "seller" && (
                    <>
                      <DropdownMenuItem
                        onClick={onSellerOrdersClick}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Quản lý đơn hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onSellerProductsClick}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Quản lý sản phẩm
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onSellerStatisticsClick}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Thống kê
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onSellerPromotionsClick}
                      >
                        <Tag className="w-4 h-4 mr-2" />
                        Khuyến mãi
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem onClick={onReportsClick}>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Báo cáo
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline-block">
                    Đăng nhập
                  </span>
                </Button>
                <Button
                  onClick={onRegisterClick}
                  className="gap-2 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline-block">
                    Đăng ký
                  </span>
                </Button>
              </div>
            )}

            {/* Seller Dashboard Button - Only visible when logged in as seller */}
            {isLoggedIn && userType === "seller" && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={onSellerDashboardClick}
                title="Kênh người bán"
              >
                <Store className="w-6 h-6 text-[#EE4D2D]" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onFavoritesClick}
            >
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}