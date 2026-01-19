import { useState } from "react";

// Layout components
import { Header, Footer } from "./components/layout";

// Section components
import { HeroSection, CategoryScroller } from "./components/section";

// Card components
import { CategoryCard, ProductCard, ShopCard } from "./components/card";

// Page components
import { ProductDetailPage, ProductListPage, ShopDetailPage, ShopListPage, AdminPage } from "./components/page";

// Modal components
import { 
  FavoritesModal, 
  AboutModal, 
  ContactModal, 
  AddressModal,
  LoginModal,
  PolicyModal,
  TermsModal,
  OrderSuccessModal,
  CheckoutModal, 
  PaymentModal, 
  RegisterModal, 
  UserProfileModal, 
  OrdersModal, 
  ReportsModal, 
  SellerOrdersModal, 
  SellerProductsModal, 
  SellerStatisticsModal, 
  SellerPromotionsModal
} from "./components/modal";

// Cart components
import { ShoppingCart } from "./components/cart";

// Data
import { categories, products, shops } from "./data/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [orderTotal, setOrderTotal] = useState(0);
  
  // User authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userReports, setUserReports] = useState([]);
  
  // New modal states
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isSellerOrdersModalOpen, setIsSellerOrdersModalOpen] = useState(false);
  const [isSellerProductsModalOpen, setIsSellerProductsModalOpen] = useState(false);
  const [isSellerStatisticsModalOpen, setIsSellerStatisticsModalOpen] = useState(false);
  const [isSellerPromotionsModalOpen, setIsSellerPromotionsModalOpen] = useState(false);
  
  // Footer modal states
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  // Product and Shop detail states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isShopDetailOpen, setIsShopDetailOpen] = useState(false);
  
  // Favorites states (only for buyer)
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoriteShopIds, setFavoriteShopIds] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  // Product list page state
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Shop list page state
  const [isShopListOpen, setIsShopListOpen] = useState(false);
  
  // Admin dashboard state
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shippingFee = subtotal >= 100000 ? 0 : 15000;
    const discount = subtotal >= 200000 ? 20000 : 0;
    return subtotal + shippingFee - discount;
  };

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        toast.success(`Đã tăng số lượng "${product.name}" (x${quantity})`, {
          duration: 2000,
        });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        toast.success(
          `Đã thêm "${product.name}" vào giỏ hàng (x${quantity})`,
          {
            duration: 2000,
          },
        );
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const handleRemoveItem = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
    if (item) {
      toast.error(`Đã xóa "${item.name}" khỏi giỏ hàng`);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
      toast.error('Vui lòng đăng nhập để thanh toán đơn hàng');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
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
  
  const handlePaymentSuccess = () => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: orderNumber,
      date: new Date().toLocaleString('vi-VN'),
      total: orderTotal,
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
    setIsPaymentOpen(false);
    setIsOrderSuccessOpen(true);
    toast.success('Thanh toán thành công!');
  };
  
  const handleLogin = (email, password) => {
    if (email === 'admin@foodieshop.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        name: 'Quản trị viên',
        email: 'admin@foodieshop.com',
        phone: '0999999999',
        userType: 'admin',
        addresses: []
      };
      setCurrentUser(adminUser);
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      setIsAdminDashboardOpen(true);
      toast.success(`Chào mừng ${adminUser.name}!`);
      return;
    }
    
    const mockUser = {
      id: '1',
      name: 'Nguyễn Văn A',
      email: email,
      phone: '0123456789',
      userType: 'buyer',
      addresses: [
        { id: '1', label: 'Nhà riêng', address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM', isDefault: true },
        { id: '2', label: 'Văn phòng', address: '456 Đường XYZ, Phường 2, Quận 3, TP.HCM', isDefault: false }
      ]
    };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    toast.success(`Chào mừng ${mockUser.name}!`);
  };
  
  const handleRegister = (name, email, phone, password, userType) => {
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      phone: phone,
      userType: userType,
      addresses: []
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setIsRegisterOpen(false);
    toast.success(`Đăng ký thành công! Chào mừng ${name}!`);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserOrders([]);
    setUserReports([]);
    setIsProfileOpen(false);
    toast.success('Đã đăng xuất thành công');
  };
  
  const handleUpdateProfile = (updatedUser) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedUser });
      toast.success('Cập nhật thông tin thành công');
    }
  };

  const handleAddProduct = (product) => {
    const newProduct = { ...product, id: `seller-${Date.now()}` };
    toast.success(`Sản phẩm "${product.name}" đã được đăng ký thành công!`, {
      description: 'Sản phẩm của bạn đang chờ duyệt và sẽ xuất hiện trên nền tảng sau khi được phê duyệt.',
      duration: 5000
    });
  };

  const handleAddReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'pending'
    };
    setUserReports(prev => [newReport, ...prev]);
  };

  const handleToggleProductFavorite = (productId) => {
    if (!isLoggedIn || currentUser?.userType !== 'buyer') {
      toast.error('Vui lòng đăng nhập với tài khoản Buyer để sử dụng tính năng này');
      return;
    }
    if (favoriteProductIds.includes(productId)) {
      setFavoriteProductIds(prev => prev.filter(id => id !== productId));
      const product = products.find(p => p.id === productId);
      toast.info(`Đã bỏ yêu thích "${product?.name}"`);
    } else {
      setFavoriteProductIds(prev => [...prev, productId]);
      const product = products.find(p => p.id === productId);
      toast.success(`Đã thêm "${product?.name}" vào yêu thích`);
    }
  };

  const handleToggleShopFavorite = (shopId) => {
    if (!isLoggedIn || currentUser?.userType !== 'buyer') {
      toast.error('Vui lòng đăng nhập với tài khoản Buyer để sử dụng tính năng này');
      return;
    }
    if (favoriteShopIds.includes(shopId)) {
      setFavoriteShopIds(prev => prev.filter(id => id !== shopId));
      const shop = shops.find(s => s.id === shopId);
      toast.info(`Đã bỏ yêu thích "${shop?.name}"`);
    } else {
      setFavoriteShopIds(prev => [...prev, shopId]);
      const shop = shops.find(s => s.id === shopId);
      toast.success(`Đã thêm "${shop?.name}" vào yêu thích`);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setIsShopDetailOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(undefined);
    setIsProductListOpen(true);
  };

  const favoriteProducts = products.filter(p => favoriteProductIds.includes(p.id));
  const favoriteShops = shops.filter(s => favoriteShopIds.includes(s.id));
  const favoritesCount = favoriteProductIds.length + favoriteShopIds.length;
  const isBuyer = isLoggedIn && currentUser?.userType === 'buyer';

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = isLoggedIn && currentUser?.userType === 'admin';
  
  if (isAdmin && currentUser) {
    return (
      <>
        <AdminPage currentUser={currentUser} onLogout={handleLogout} />
        <Toaster position="top-center" />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
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
        onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        favoritesCount={isBuyer ? favoritesCount : 0}
        onAddressClick={() => setIsAddressModalOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReportsClick={() => setIsReportsModalOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
        onSearch={handleSearch}
      />

      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Danh mục</h2>
        <CategoryScroller>
          <div 
            onClick={() => {
              setSelectedCategory(undefined);
              setIsProductListOpen(true);
            }} 
            className="cursor-pointer flex-shrink-0"
          >
            <CategoryCard
              name="Tất cả"
              image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop"
              itemCount={products.length}
            />
          </div>
          {categories.map((category, index) => {
            const actualCount = products.filter(p => p.category === category.name).length;
            return (
              <div 
                key={index} 
                onClick={() => {
                  setSelectedCategory(category.name);
                  setIsProductListOpen(true);
                }} 
                className="cursor-pointer flex-shrink-0"
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  itemCount={actualCount}
                />
              </div>
            );
          })}
        </CategoryScroller>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-orange-50/50 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Cửa hàng nổi bật</h2>
          <button 
            className="text-[#EE4D2D] hover:underline text-sm font-medium"
            onClick={() => setIsShopListOpen(true)}
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shops.slice(0, 8).map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onShopClick={() => handleShopClick(shop)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Món ăn nổi bật</h2>
          <button 
            className="text-[#EE4D2D] hover:underline text-sm font-medium"
            onClick={() => setIsProductListOpen(true)}
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              isFavorite={favoriteProductIds.includes(product.id)}
              onToggleFavorite={() => handleToggleProductFavorite(product.id)}
              showFavoriteButton={isBuyer}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-white text-3xl font-bold">Ưu đãi đặc biệt hôm nay!</h2>
            <p className="text-white/90 mb-6 text-lg">
              Giảm ngay 50.000đ cho đơn hàng từ 200.000đ. Freeship toàn bộ đơn hàng!
            </p>
            <button 
              className="bg-white text-[#EE4D2D] px-6 py-3 rounded-lg hover:bg-white/90 transition-colors font-bold"
              onClick={() => setIsProductListOpen(true)}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </section>

      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <PolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />

      <Footer
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
        isLoggedIn={isLoggedIn}
        userType={currentUser?.userType}
      />

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
        userAddresses={currentUser?.addresses}
        userName={currentUser?.name}
        userPhone={currentUser?.phone}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderNumber={orderNumber}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        paymentMethod={paymentMethod}
        orderNumber={orderNumber}
        amount={orderTotal}
        onPaymentSuccess={handlePaymentSuccess}
        onBack={() => {
          setIsPaymentOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Toaster position="top-center" />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
      />
      
      {currentUser && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          orders={userOrders}
          reports={userReports}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
          onAddProduct={handleAddProduct}
          onAddReport={handleAddReport}
        />
      )}
      
      <ProductListPage
        isOpen={isProductListOpen}
        onClose={() => {
          setIsProductListOpen(false);
          setSelectedCategory(undefined);
          setSearchQuery('');
        }}
        products={products}
        onAddToCart={handleAddToCart}
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
        initialCategory={selectedCategory}
        onProductClick={handleProductClick}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        favoritesCount={isBuyer ? favoritesCount : 0}
        favoriteProductIds={favoriteProductIds}
        onToggleProductFavorite={handleToggleProductFavorite}
        onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)}
        onAddressClick={() => setIsAddressModalOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReportsClick={() => setIsReportsModalOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        searchQuery={searchQuery}
      />
      
      <ProductDetailPage
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onShopClick={(shopId) => {
          const shop = shops.find(s => s.id === shopId);
          if (shop) {
            handleShopClick(shop);
            setIsProductDetailOpen(false);
          }
        }}
        onToggleFavorite={handleToggleProductFavorite}
        isFavorite={selectedProduct ? favoriteProductIds.includes(selectedProduct.id) : false}
        showFavoriteButton={isBuyer}
        isLoggedIn={isLoggedIn}
      />
      
      <ShopDetailPage
        isOpen={isShopDetailOpen}
        onClose={() => setIsShopDetailOpen(false)}
        shop={selectedShop}
        shopProducts={selectedShop ? products.filter(p => p.shopId === selectedShop.id) : []}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
        onToggleFavorite={handleToggleShopFavorite}
        isFavorite={selectedShop ? favoriteShopIds.includes(selectedShop.id) : false}
        showFavoriteButton={isBuyer}
        favoriteProducts={favoriteProductIds}
        onToggleProductFavorite={handleToggleProductFavorite}
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
        onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        favoritesCount={isBuyer ? favoritesCount : 0}
        onAddressClick={() => setIsAddressModalOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReportsClick={() => setIsReportsModalOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
      />
      
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteProducts={favoriteProducts}
        favoriteShops={favoriteShops}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
        onShopClick={handleShopClick}
        onToggleProductFavorite={handleToggleProductFavorite}
        onToggleShopFavorite={handleToggleShopFavorite}
      />
      
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
      <OrdersModal isOpen={isOrdersModalOpen} onClose={() => setIsOrdersModalOpen(false)} />
      <ReportsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
      <SellerOrdersModal isOpen={isSellerOrdersModalOpen} onClose={() => setIsSellerOrdersModalOpen(false)} />
      <SellerProductsModal isOpen={isSellerProductsModalOpen} onClose={() => setIsSellerProductsModalOpen(false)} />
      <SellerStatisticsModal isOpen={isSellerStatisticsModalOpen} onClose={() => setIsSellerStatisticsModalOpen(false)} />
      <SellerPromotionsModal isOpen={isSellerPromotionsModalOpen} onClose={() => setIsSellerPromotionsModalOpen(false)} />
      
      <ShopListPage
        isOpen={isShopListOpen}
        onClose={() => setIsShopListOpen(false)}
        shops={shops}
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
        onShopClick={handleShopClick}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        favoritesCount={isBuyer ? favoritesCount : 0}
        onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)}
        onAddressClick={() => setIsAddressModalOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReportsClick={() => setIsReportsModalOpen(true)}
        onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)}
        onSellerProductsClick={() => setIsSellerProductsModalOpen(true)}
        onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)}
        onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onPolicyClick={() => setIsPolicyModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
      />
    </div>
  );
}