import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoryCard } from "./components/CategoryCard";
import { ProductCard } from "./components/ProductCard";
import { ShopCard } from "./components/ShopCard";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { ShopDetailPage } from "./components/ShopDetailPage";
import { ShopListPage } from "./components/ShopListPage";
import { FavoritesModal } from "./components/FavoritesModal";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderSuccessModal } from "./components/OrderSuccessModal";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { AddressModal } from "./components/AddressModal";
import { OrdersModal } from "./components/OrdersModal";
import { ReportsModal } from "./components/ReportsModal";
import { SellerOrdersModal } from "./components/SellerOrdersModal";
import { SellerProductsModal } from "./components/SellerProductsModal";
import { SellerStatisticsModal } from "./components/SellerStatisticsModal";
import { SellerPromotionsModal } from "./components/SellerPromotionsModal";
import { ProductListPage } from "./components/ProductListPage";
import { Footer } from "./components/Footer";
import { AboutModal } from "./components/AboutModal";
import { ContactModal } from "./components/ContactModal";
import { PolicyModal } from "./components/PolicyModal";
import { TermsModal } from "./components/TermsModal";
import { PaymentModal } from "./components/PaymentModal";
import { AdminPage } from "./components/AdminPage";
import { categories, products, shops } from "./data/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

/**
 * App Component chính của hệ thống FoodieShop.
 * Quản lý toàn bộ trạng thái (State) về Giỏ hàng, Đăng nhập, Modal và điều hướng trang.
 */
export default function App() {
  // --- Quản lý Giỏ hàng và Thanh toán ---
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [orderTotal, setOrderTotal] = useState(0);
  
  // --- Quản lý Xác thực và Người dùng ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userReports, setUserReports] = useState([]);
  
  // --- Quản lý Modal chức năng ---
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isSellerOrdersModalOpen, setIsSellerOrdersModalOpen] = useState(false);
  const [isSellerProductsModalOpen, setIsSellerProductsModalOpen] = useState(false);
  const [isSellerStatisticsModalOpen, setIsSellerStatisticsModalOpen] = useState(false);
  const [isSellerPromotionsModalOpen, setIsSellerPromotionsModalOpen] = useState(false);
  
  // --- Quản lý Modal thông tin (Footer) ---
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  // --- Quản lý Chi tiết Sản phẩm & Cửa hàng ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isShopDetailOpen, setIsShopDetailOpen] = useState(false);
  
  // --- Danh sách yêu thích ---
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoriteShopIds, setFavoriteShopIds] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  // --- Trang Danh sách & Admin ---
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [isShopListOpen, setIsShopListOpen] = useState(false);

  // --- Hàm xử lý Logic ---

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success(`Đã tăng số lượng "${product.name}" (+${quantity})`);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
        return [...prevItems, { ...product, quantity }];
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
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast.error("Đã xóa món ăn khỏi giỏ hàng");
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 100000 ? 0 : 15000;
    const discount = subtotal >= 200000 ? 20000 : 0;
    return subtotal + shippingFee - discount;
  };

  const handleConfirmOrder = (orderData) => {
    const newOrderNumber = `SF${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setOrderTotal(calculateTotal());
    
    if (orderData.paymentMethod === 'momo' || orderData.paymentMethod === 'zalopay') {
      setPaymentMethod(orderData.paymentMethod);
      setIsCheckoutOpen(false);
      setIsPaymentOpen(true);
      return;
    }
    
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: newOrderNumber,
      date: new Date().toLocaleString('vi-VN'),
      total: calculateTotal(),
      status: 'pending',
      items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price }))
    };
    
    if (isLoggedIn) setUserOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const handleLogin = (email, password) => {
    if (email === 'admin@foodieshop.com' && password === 'admin123') {
      const adminUser = { id: 'admin', name: 'Quản trị viên', email, userType: 'admin', addresses: [] };
      setCurrentUser(adminUser);
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      toast.success(`Chào mừng ${adminUser.name}!`);
      return;
    }
    
    const mockUser = {
      id: '1',
      name: 'Nguyễn Văn A',
      email: email,
      phone: '0123456789',
      userType: 'buyer',
      addresses: [{ id: '1', label: 'Nhà riêng', address: '123 Đường ABC, Quận 1, TP.HCM', isDefault: true }]
    };
    
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    toast.success(`Chào mừng ${mockUser.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserOrders([]);
    setIsProfileOpen(false);
    toast.success('Đã đăng xuất thành công');
  };

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setIsShopDetailOpen(true);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
      toast.error('Vui lòng đăng nhập để thanh toán');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isBuyer = isLoggedIn && currentUser?.userType === 'buyer';

  // --- Render logic cho Admin ---
  if (isLoggedIn && currentUser?.userType === 'admin') {
    return (
      <>
        <AdminPage currentUser={currentUser} onLogout={handleLogout} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        userType={currentUser?.userType}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
        onCategoryClick={() => setIsProductListOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        onAddressClick={() => setIsAddressModalOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReportsClick={() => setIsReportsModalOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
      />

      <HeroSection />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black mb-8 border-l-4 border-[#EE4D2D] pl-4">DANH MỤC PHỔ BIẾN</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <div key={i} onClick={() => { setSelectedCategory(cat.name); setIsProductListOpen(true); }} className="cursor-pointer">
              <CategoryCard {...cat} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <main className="space-y-16 pb-20">
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black border-l-4 border-[#EE4D2D] pl-4 uppercase tracking-tighter">Cửa hàng nổi bật</h2>
            <button onClick={() => setIsShopListOpen(true)} className="text-[#EE4D2D] font-bold text-sm hover:underline">XEM TẤT CẢ</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shops.slice(0, 4).map(shop => <ShopCard key={shop.id} shop={shop} onShopClick={() => handleShopClick(shop)} />)}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black border-l-4 border-[#EE4D2D] pl-4 uppercase tracking-tighter">Gợi ý hôm nay</h2>
            <button onClick={() => setIsProductListOpen(true)} className="text-[#EE4D2D] font-bold text-sm hover:underline">KHÁM PHÁ THỰC ĐƠN</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={handleAddToCart} 
                onProductClick={(prod) => { setSelectedProduct(prod); setIsProductDetailOpen(true); }}
                showFavoriteButton={isBuyer}
                isFavorite={favoriteProductIds.includes(p.id)}
                onToggleFavorite={() => setFavoriteProductIds(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id])}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer
        onAboutClick={() => setIsAboutModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* --- Overlay Modals & Pages --- */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} total={calculateTotal()} onConfirmOrder={handleConfirmOrder} userAddresses={currentUser?.addresses} userName={currentUser?.name} userPhone={currentUser?.phone} />
      <OrderSuccessModal isOpen={isOrderSuccessOpen} onClose={() => setIsOrderSuccessOpen(false)} orderNumber={orderNumber} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onRegister={handleLogin} onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} />
      
      {currentUser && (
        <UserProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          user={currentUser} 
          onLogout={handleLogout} 
          onUpdateProfile={(data) => setCurrentUser({...currentUser, ...data})} 
        />
      )}

      {/* Sub-Pages (Rendered as Full-screen Overlays) */}
      <ProductListPage isOpen={isProductListOpen} onClose={() => setIsProductListOpen(false)} products={products} onAddToCart={handleAddToCart} initialCategory={selectedCategory} isLoggedIn={isLoggedIn} />
      <ShopListPage isOpen={isShopListOpen} onClose={() => setIsShopListOpen(false)} shops={shops} onShopClick={handleShopClick} isLoggedIn={isLoggedIn} />
      <ProductDetailPage isOpen={isProductDetailOpen} onClose={() => setIsProductDetailOpen(false)} product={selectedProduct} onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} />
      <ShopDetailPage isOpen={isShopDetailOpen} onClose={() => setIsShopDetailOpen(false)} shop={selectedShop} shopProducts={products.filter(p => p.shopId === selectedShop?.id)} onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} />

      <Toaster position="top-center" richColors />
    </div>
  );
}