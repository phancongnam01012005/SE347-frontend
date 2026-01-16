"use client";

import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoryCard } from "./components/CategoryCard";
import { ProductCard } from "./components/ProductCard";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderSuccessModal } from "./components/OrderSuccessModal";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { ProductListPage } from "./components/ProductListPage";
import { categories, products } from "./data/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  // --- States cho Giỏ hàng & Thanh toán ---
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // --- States cho Người dùng & Auth ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  
  // --- State cho Trang danh sách sản phẩm ---
  const [isProductListOpen, setIsProductListOpen] = useState(false);

  // --- Logic Giỏ hàng ---
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success(`Đã tăng số lượng "${product.name}"`, { duration: 2000 });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng`, { duration: 2000 });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== productId));
    if (item) toast.error(`Đã xóa "${item.name}" khỏi giỏ hàng`);
  };

  // --- Logic Tính toán & Đặt hàng ---
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 100000 ? 0 : 15000;
    const discount = subtotal >= 200000 ? 20000 : 0;
    return subtotal + shippingFee - discount;
  };

  const handleConfirmOrder = (orderData) => {
    const newOrderNumber = `SF${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: newOrderNumber,
      date: new Date().toLocaleString('vi-VN'),
      total: calculateTotal(),
      status: 'pending',
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
    
    if (isLoggedIn) setUserOrders(prev => [newOrder, ...prev]);

    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  // --- Logic Auth (Mock API) ---
  const handleLogin = (email, password) => {
    const mockUser = {
      id: '1',
      name: 'Nguyễn Văn A',
      email: email,
      phone: '0123456789',
      addresses: [
        { id: '1', label: 'Nhà riêng', address: '123 Đường ABC, Quận 1, TP.HCM', isDefault: true },
        { id: '2', label: 'Văn phòng', address: '456 Đường XYZ, Quận 3, TP.HCM', isDefault: false }
      ]
    };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    toast.success(`Chào mừng ${mockUser.name}!`);
  };

  const handleRegister = (name, email, phone, password) => {
    const newUser = { id: Date.now().toString(), name, email, phone, addresses: [] };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setIsRegisterOpen(false);
    toast.success(`Đăng ký thành công!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserOrders([]);
    setIsProfileOpen(false);
    toast.success('Đã đăng xuất thành công');
  };

  const handleUpdateProfile = (updatedUser) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedUser });
      toast.success('Cập nhật thông tin thành công');
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
        onCategoryClick={() => setIsProductListOpen(true)}
      />

      <HeroSection />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Danh mục</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div key={index} onClick={() => setIsProductListOpen(true)} className="cursor-pointer">
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Món ăn nổi bật</h2>
          <button className="text-[#EE4D2D] hover:underline" onClick={() => setIsProductListOpen(true)}>
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4 font-bold text-[#EE4D2D] text-xl">FodieShop</h3>
              <p className="text-sm text-muted-foreground">Giao đồ ăn nhanh chóng, đa dạng từ các nhà hàng uy tín.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Về chúng tôi</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-foreground">Tuyển dụng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-foreground">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Liên hệ</h4>
              <p className="text-sm text-muted-foreground">Hotline: 1900-xxxx</p>
              <p className="text-sm text-muted-foreground">Email: support@shopeefood.vn</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2026 ShopeeFood. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>

      {/* Các Modals quản lý trạng thái */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={calculateTotal()}
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderNumber={orderNumber}
      />

      <Toaster position="top-center" richColors />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
      />
      
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
      />
      
      {currentUser && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          orders={userOrders}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}
      
      <ProductListPage
        isOpen={isProductListOpen}
        onClose={() => setIsProductListOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}