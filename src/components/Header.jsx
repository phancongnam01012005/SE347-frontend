"use client";

import React from 'react';
import { Search, ShoppingCart, MapPin, User, Menu, LogIn, UserPlus, LogOut } from 'lucide-react';
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
 * @param {Object} props
 * @param {number} props.cartItemsCount - Số lượng mặt hàng trong giỏ
 * @param {Function} props.onCartClick - Xử lý khi click vào giỏ hàng
 * @param {boolean} props.isLoggedIn - Trạng thái đăng nhập
 * @param {string} props.userName - Tên người dùng
 * @param {string} props.userAvatar - URL ảnh đại diện
 * @param {Function} props.onLoginClick - Mở modal đăng nhập
 * @param {Function} props.onRegisterClick - Mở modal đăng ký
 * @param {Function} props.onProfileClick - Mở trang cá nhân/đơn hàng
 * @param {Function} props.onLogout - Xử lý đăng xuất
 */
export function Header({ 
  cartItemsCount = 0, 
  onCartClick, 
  isLoggedIn, 
  userName,
  userAvatar,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top Bar - Dải màu cam phía trên */}
      <div className="bg-[#EE4D2D] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Giao hàng đến: <strong>Quận 1, TP.HCM</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:opacity-80 transition-opacity">Trợ giúp</button>
            <button className="hover:opacity-80 transition-opacity">Khuyến mãi</button>
          </div>
        </div>
      </div>

      {/* Main Header - Khu vực Logo, Tìm kiếm và User */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-2xl font-bold text-[#EE4D2D]">
              <h1>FodieShop</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm món ăn, đồ uống..."
                className="pl-10 pr-4 py-6 w-full border-2 border-[#EE4D2D]/20 focus:border-[#EE4D2D] rounded-md transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 gap-2 hover:bg-muted">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-[#EE4D2D] text-white">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-medium">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={onProfileClick}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Đơn hàng của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    Địa chỉ giao hàng
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout} 
                    className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
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
                  <span className="hidden sm:inline-block">Đăng nhập</span>
                </Button>
                <Button 
                  onClick={onRegisterClick}
                  className="gap-2 bg-[#EE4D2D] hover:bg-[#EE4D2D]/90 text-white border-none shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline-block">Đăng ký</span>
                </Button>
              </div>
            )}

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-muted"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Navigation - Thanh danh mục phụ */}
      <div className="border-t border-border bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-6 text-sm overflow-x-auto no-scrollbar">
            <CategoryButton label="Tất cả" active />
            <CategoryButton label="Đồ ăn vặt" />
            <CategoryButton label="Trà sữa" />
            <CategoryButton label="Cơm - Phở - Bún" />
            <CategoryButton label="Đồ uống" />
            <CategoryButton label="Bánh ngọt" />
            <CategoryButton label="Fast Food" />
            <CategoryButton label="Ăn sáng" />
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper component cho các nút danh mục
function CategoryButton({ label, active = false }) {
  return (
    <button className={`whitespace-nowrap transition-colors hover:text-[#EE4D2D] ${active ? 'text-[#EE4D2D] font-bold' : 'text-muted-foreground'}`}>
      {label}
    </button>
  );
}