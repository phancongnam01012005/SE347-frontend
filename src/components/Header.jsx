import React from 'react';
import { Search, ShoppingCart, MapPin, User, LogIn, UserPlus, LogOut, Store, Heart, AlertTriangle, Package, BarChart3, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

/**
 * Header Component
 * Thanh điều hướng chính của ứng dụng, hỗ trợ tìm kiếm, quản lý giỏ hàng và menu người dùng linh hoạt.
 */
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
  onSellerPromotionsClick
}) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-md">
      {/* Main Header Area */}
      <div className="py-5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          
          {/* Logo & Branding */}
          <div 
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            onClick={onLogoClick}
          >
            <div className="bg-gradient-to-br from-[#EE4D2D] to-[#FF6B3D] p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#EE4D2D] to-[#FF6B3D] bg-clip-text text-transparent">
                FoodieShop
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Món ngon mọi nơi</p>
            </div>
          </div>

          {/* Dynamic Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#EE4D2D] transition-colors" />
              <Input
                type="text"
                placeholder="Tìm kiếm món ăn, đồ uống..."
                className="pl-12 pr-4 py-6 w-full border-2 border-gray-100 focus:border-[#EE4D2D] rounded-xl shadow-sm focus:shadow-md transition-all duration-300 bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isLoggedIn ? (
              /* User authenticated: Custom dropdown by UserType */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 gap-2 hover:bg-gray-100 rounded-full pr-4">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-[#EE4D2D] text-white">
                        {userName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-bold text-sm text-gray-700">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-xl shadow-xl">
                  <DropdownMenuLabel className="text-xs uppercase text-gray-400 font-bold">Quản lý tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer py-2.5">
                    <User className="w-4 h-4 mr-2 text-gray-500" /> Thông tin cá nhân
                  </DropdownMenuItem>
                  
                  {/* Buyer Specific Actions */}
                  {userType === 'buyer' && (
                    <>
                      <DropdownMenuItem onClick={onOrdersClick} className="cursor-pointer py-2.5">
                        <ShoppingCart className="w-4 h-4 mr-2 text-gray-500" /> Đơn hàng của tôi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onAddressClick} className="cursor-pointer py-2.5">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" /> Địa chỉ giao hàng
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {/* Seller Specific Actions */}
                  {userType === 'seller' && (
                    <>
                      <DropdownMenuItem onClick={onSellerOrdersClick} className="cursor-pointer py-2.5 font-medium text-orange-600">
                        <ShoppingCart className="w-4 h-4 mr-2" /> Quản lý đơn hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onSellerProductsClick} className="cursor-pointer py-2.5">
                        <Package className="w-4 h-4 mr-2 text-gray-500" /> Quản lý sản phẩm
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onSellerStatisticsClick} className="cursor-pointer py-2.5">
                        <BarChart3 className="w-4 h-4 mr-2 text-gray-500" /> Thống kê doanh thu
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onSellerPromotionsClick} className="cursor-pointer py-2.5">
                        <Tag className="w-4 h-4 mr-2 text-gray-500" /> Chương trình khuyến mãi
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={onReportsClick} className="cursor-pointer py-2.5">
                    <AlertTriangle className="w-4 h-4 mr-2 text-gray-500" /> Báo cáo / Hỗ trợ
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer py-2.5 font-bold">
                    <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Guest user: Login/Register triggers */
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={onLoginClick}
                  className="font-bold text-gray-600 hover:text-[#EE4D2D]"
                >
                  <LogIn className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline-block">Đăng nhập</span>
                </Button>
                <Button 
                  onClick={onRegisterClick}
                  className="bg-[#EE4D2D] hover:bg-[#d73a1e] text-white font-bold shadow-md shadow-orange-100 px-6 rounded-lg"
                >
                  <UserPlus className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline-block">Đăng ký</span>
                </Button>
              </div>
            )}
            
            {/* Quick Access Buttons with Badges */}
            <div className="flex items-center gap-1.5 ml-2 pl-4 border-l">
              {/* Seller Hub Shortcut */}
              {isLoggedIn && userType === 'seller' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
                  onClick={onSellerDashboardClick}
                  title="Kênh Người Bán"
                >
                  <Store className="w-6 h-6" />
                </Button>
              )}
              
              {/* Shopping Cart Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-gray-100"
                onClick={onCartClick}
              >
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
              
              {/* Favorites Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-gray-100"
                onClick={onFavoritesClick}
              >
                <Heart className="w-6 h-6 text-gray-600" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}