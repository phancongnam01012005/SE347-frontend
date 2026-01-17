import { useState } from "react";
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
import { Footer } from "./components/Footer";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { PolicySection } from "./components/PolicySection";
import { TermsSection } from "./components/TermsSection";
import { categories, products } from "./data/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  // --- QUẢN LÝ GIỎ HÀNG ---
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // --- QUẢN LÝ NGƯỜI DÙNG ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  
  // --- QUẢN LÝ DANH SÁCH SẢN PHẨM ---
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  // --- LOGIC XỬ LÝ GIỎ HÀNG ---
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success(`Đã tăng số lượng "${product.name}"`, { duration: 2000 });
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    if (item) {
      toast.error(`Đã xóa "${item.name}" khỏi giỏ hàng`);
    }
  };

  // --- LOGIC THANH TOÁN ---
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 100000 || subtotal === 0 ? 0 : 15000;
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
    
    if (isLoggedIn) {
      setUserOrders(prev => [newOrder, ...prev]);
    }

    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };
  
  // --- LOGIC TÀI KHOẢN ---
  const handleLogin = (email, password) => {
    const mockUser = {
      id: '1',
      name: 'Nguyễn Văn A',
      email: email,
      phone: '0123456789',
      addresses: [
        { id: '1', label: 'Nhà riêng', address: '123 Đường ABC, Quận 1, TP.HCM', isDefault: true }
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
    toast.success(`Đăng ký thành công! Chào mừng ${name}!`);
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

      {/* Danh mục */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Danh mục</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => {
                setSelectedCategory(category.name);
                setIsProductListOpen(true);
              }} 
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </section>

      {/* Món ăn nổi bật */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Món ăn nổi bật</h2>
          <button className="text-[#EE4D2D] hover:underline text-sm font-medium" onClick={() => setIsProductListOpen(true)}>
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Banner Khuyến mãi */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-400 to-[#EE4D2D] rounded-2xl p-8 md:p-12 text-white shadow-lg">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ưu đãi đặc biệt hôm nay!</h2>
            <p className="text-white/90 mb-6 text-lg">Giảm ngay 50.000đ cho đơn hàng từ 200.000đ. Freeship toàn bộ đơn hàng!</p>
            <button className="bg-white text-[#EE4D2D] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md" onClick={() => setIsProductListOpen(true)}>
              Đặt ngay
            </button>
          </div>
        </div>
      </section>

      {/* Danh sách món ăn trang chủ */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Tất cả món ăn</h2>
          <button className="text-[#EE4D2D] hover:underline text-sm font-medium" onClick={() => setIsProductListOpen(true)}>
            Xem tất cả với bộ lọc
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={`all-${product.id}`} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Các Section thông tin */}
      <AboutSection />
      <ContactSection />
      <PolicySection />
      <TermsSection />

      <Footer />

      {/* --- CÁC THÀNH PHẦN MODAL & OVERLAYS --- */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
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
        onClose={() => { setIsProductListOpen(false); setSelectedCategory(undefined); }}
        products={products}
        onAddToCart={handleAddToCart}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
        initialCategory={selectedCategory}
      />
      <Toaster position="top-center" richColors />
    </div>
  );
}