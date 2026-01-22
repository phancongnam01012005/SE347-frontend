import { useState , useEffect ,useCallback} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; 
import api from "./service/api";
import { jwtDecode } from "jwt-decode";

// Layout
import { MainLayout } from "./layouts/MainLayout";

// Pages
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPageWrapper } from "./pages/ProductDetailPageWrapper";
import { ShopsPage } from "./pages/ShopsPage";
import { ShopDetailPageWrapper } from "./pages/ShopDetailPageWrapper";
import { AdminPageWrapper } from "./pages/AdminPageWrapper";
// LƯU Ý: Kiểm tra lại đường dẫn này xem file nằm trong "pages" hay "components/page"
import { OAuth2RedirectHandler } from "./components/page/OAuth2RedirectHandler"; 

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

// Data and types
import { shops } from "./data/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

function AppContent() {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Có thể dùng state này để hiện Loading toàn trang nếu muốn
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
  
  // Favorites states (only for buyer)
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoriteShopIds, setFavoriteShopIds] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [isAuthenticating, setIsAuthenticating] = useState(true); 
  // --- PHẦN LOGIC AUTHENTICATION ---

  // 1. Hàm Helper: Lấy thông tin user từ Token (Dùng chung)
  const fetchUserData = async (token) => {
    // Gắn token vào Header ngay lập tức
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    const decoded = jwtDecode(token);
    const userRes = await api.get("/user");
    const u = userRes.data;

    return {
      id: decoded.userId,
      name: u.name,
      email: u.email,
      phone: u.phone,
      userType: decoded.role?.toLowerCase(),
      addresses: u.addresses || [],
    };
  };

  // 2. useEffect: Kiểm tra đăng nhập khi F5 trang
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await fetchUserData(token); 
          setCurrentUser(userData);
          setIsLoggedIn(true);
          if (userData.userType === 'admin')
          {
            navigate("/admin");
          }
        } catch (err) {
          console.error("Token invalid", err);
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  // 3. Hàm xử lý khi Login Google thành công (Truyền cho OAuth2RedirectHandler)
  const handleOAuthLoginSuccess = useCallback(async (token) => {
  try {
    const userData = await fetchUserData(token);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    
    // Chỉ hiển thị toast nếu user chưa đăng nhập trước đó
    toast.success("Đăng nhập Google thành công! 🎉", { id: 'auth-success' });
  } catch (err) {
    console.error("Lỗi xác thực Google:", err);
    toast.error("Không thể lấy thông tin tài khoản Google");
  }
}, []);

  // --- KẾT THÚC PHẦN LOGIC AUTHENTICATION ---

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       try {
  //         const userData = await fetchUserData(token); 
  //         setCurrentUser(userData);
  //         setIsLoggedIn(true);
  //         // if(userData.userType.==='admin')
  //       } catch (err) {
  //         console.error("Token invalid", err);
  //         localStorage.removeItem("accessToken");
  //         delete api.defaults.headers.common["Authorization"];
  //       }
  //     }
  //     setIsLoading(false); 
  //   };
  //   initializeAuth();
  // }, []);

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

  const handleConfirmOrder = async (orderData) => {
    try {
      const orderRequest = {
        userId: currentUser.id,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items
      };

      const orderResponse = await api.post(
        "/order/create-new-order",
        orderRequest
      );

      const { orderId } = orderResponse.data;

      // MOMO
      if (orderData.paymentMethod === "momo") {
        const paymentResponse = await api.post("/public/api/payment/momo", {
          orderId,
          amount: calculateTotal(),
        });

        setCartItems([]);
        window.location.href = paymentResponse.data.payUrl;
        return;
      }

      // COD
      setCartItems([]);
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);

    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi tạo đơn");
    }
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
  

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post("/public/login", { email, password });
      const { token } = res.data;

      // 1. Lưu token và set Header
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 2. Giải mã token để lấy userId
      const decoded = jwtDecode(token);
      
      const userIdFromToken = decoded.userId; 
      const roleFromToken = decoded.role;

      // 3. Lấy thông tin chi tiết khác từ API /user
      const userRes = await api.get("/user");
      const u = userRes.data;

      setCurrentUser({
        id: userIdFromToken,
        name: u.name,
        email: u.email,
        phone: u.phone,
        userType: roleFromToken?.toLowerCase(),
        addresses: u.addresses || [],
      });
      
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      
      if (roleFromToken?.toLowerCase() === 'admin') {
        navigate("/admin");
        toast.success("Hello admin");
        return;
      }

      toast.success(`Xin chào ${roleFromToken?.toLowerCase()} 👋`);

    } catch (err) {
      console.error("Login error:", err);
      toast.error("Sai email hoặc mật khẩu");
    }
  };

  const handleRegister = async (name, email, phone, password, userType) => {
    try {
      const newUser = {
        name,
        email,
        password,
        phone,
        accountType: userType.charAt(0).toUpperCase() + userType.slice(1),
      };

      await api.post("public/register", newUser);

      toast.success("Đăng ký thành công! Đang đăng nhập...");
      await handleLogin(email, password); 
      
      setIsRegisterOpen(false);

    } catch (err) {
      console.error("Register error:", err);
      const errorMsg = err.response?.data?.message || "Đăng ký thất bại";
      toast.error(errorMsg);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
    
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserOrders([]);
    setUserReports([]);
    
    setIsProfileOpen(false);
    navigate('/');
    toast.success('Đã đăng xuất thành công');
  };
  
  const handleUpdateProfile = (updatedUser) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedUser });
      toast.success('Cập nhật thông tin thành công');
    }
  };

  const handleAddProduct = (product) => {
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
  
  const handleSearch = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const favoriteProducts = products.filter(p => favoriteProductIds.includes(p.id));
  const favoriteShops = shops.filter(s => favoriteShopIds.includes(s.id));
  const favoritesCount = favoriteProductIds.length + favoriteShopIds.length;
  const isBuyer = isLoggedIn && currentUser?.userType === 'buyer';
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Routes>
        <Route 
          path="/admin" 
          element={
            <AdminPageWrapper
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          } 
        />

        <Route 
          path="/*" 
          element={
            <MainLayout
              cartItemsCount={cartItemsCount}
              onCartClick={() => setIsCartOpen(true)}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLoginClick={() => setIsLoginOpen(true)}
              onRegisterClick={() => setIsRegisterOpen(true)}
              onProfileClick={() => setIsProfileOpen(true)}
              onLogout={handleLogout}
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
              onSearch={handleSearch}
            >
              <Routes>
                <Route path="/" element={<HomePage onAddToCart={handleAddToCart} favoriteProductIds={favoriteProductIds} onToggleProductFavorite={handleToggleProductFavorite} isBuyer={isBuyer} />} />
                <Route path="/products" element={<ProductsPage products={products} onAddToCart={handleAddToCart} cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} isLoggedIn={isLoggedIn} currentUser={currentUser} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onProfileClick={() => setIsProfileOpen(true)} onLogout={handleLogout} onFavoritesClick={() => setIsFavoritesOpen(true)} favoritesCount={isBuyer ? favoritesCount : 0} favoriteProductIds={favoriteProductIds} onToggleProductFavorite={handleToggleProductFavorite} onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)} onAddressClick={() => setIsAddressModalOpen(true)} onOrdersClick={() => setIsOrdersModalOpen(true)} onReportsClick={() => setIsReportsModalOpen(true)} onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)} onSellerProductsClick={() => setIsSellerProductsModalOpen(true)} onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)} onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)} onAboutClick={() => setIsAboutModalOpen(true)} onContactClick={() => setIsContactModalOpen(true)} onPolicyClick={() => setIsPolicyModalOpen(true)} onTermsClick={() => setIsTermsModalOpen(true)} />} />
                <Route path="/product/:id" element={<ProductDetailPageWrapper onAddToCart={handleAddToCart} onToggleFavorite={handleToggleProductFavorite} favoriteProductIds={favoriteProductIds} isBuyer={isBuyer} isLoggedIn={isLoggedIn} />} />
                <Route path="/shops" element={<ShopsPage shops={shops} cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} isLoggedIn={isLoggedIn} currentUser={currentUser} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onProfileClick={() => setIsProfileOpen(true)} onLogout={handleLogout} onFavoritesClick={() => setIsFavoritesOpen(true)} favoritesCount={isBuyer ? favoritesCount : 0} onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)} onAddressClick={() => setIsAddressModalOpen(true)} onOrdersClick={() => setIsOrdersModalOpen(true)} onReportsClick={() => setIsReportsModalOpen(true)} onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)} onSellerProductsClick={() => setIsSellerProductsModalOpen(true)} onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)} onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)} onAboutClick={() => setIsAboutModalOpen(true)} onContactClick={() => setIsContactModalOpen(true)} onPolicyClick={() => setIsPolicyModalOpen(true)} onTermsClick={() => setIsTermsModalOpen(true)} />} />
                <Route path="/shop/:id" element={<ShopDetailPageWrapper onAddToCart={handleAddToCart} onToggleFavorite={handleToggleShopFavorite} favoriteShopIds={favoriteShopIds} isBuyer={isBuyer} favoriteProductIds={favoriteProductIds} onToggleProductFavorite={handleToggleProductFavorite} cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} isLoggedIn={isLoggedIn} currentUser={currentUser} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onProfileClick={() => setIsProfileOpen(true)} onLogout={handleLogout} onCategoryClick={() => navigate('/products')} onSellerDashboardClick={() => setIsSellerProductsModalOpen(true)} onFavoritesClick={() => setIsFavoritesOpen(true)} favoritesCount={isBuyer ? favoritesCount : 0} onAddressClick={() => setIsAddressModalOpen(true)} onOrdersClick={() => setIsOrdersModalOpen(true)} onReportsClick={() => setIsReportsModalOpen(true)} onSellerOrdersClick={() => setIsSellerOrdersModalOpen(true)} onSellerProductsClick={() => setIsSellerProductsModalOpen(true)} onSellerStatisticsClick={() => setIsSellerStatisticsModalOpen(true)} onSellerPromotionsClick={() => setIsSellerPromotionsModalOpen(true)} onAboutClick={() => setIsAboutModalOpen(true)} onContactClick={() => setIsContactModalOpen(true)} onPolicyClick={() => setIsPolicyModalOpen(true)} onTermsClick={() => setIsTermsModalOpen(true)} />} />
                {/* Đã sửa phần này: Xóa text thừa và đảm bảo Route hoạt động */}
                <Route 
                  path="/oauth2/success" 
                  element={<OAuth2RedirectHandler onLoginSuccess={handleOAuthLoginSuccess} />} 
                />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} total={calculateTotal()} onConfirmOrder={handleConfirmOrder} userAddresses={currentUser?.addresses} userName={currentUser?.name} userPhone={currentUser?.phone} />
      <OrderSuccessModal isOpen={isOrderSuccessOpen} onClose={() => setIsOrderSuccessOpen(false)} orderNumber={orderNumber} />
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} paymentMethod={paymentMethod} orderNumber={orderNumber} amount={orderTotal} onPaymentSuccess={handlePaymentSuccess} onBack={() => { setIsPaymentOpen(false); setIsCheckoutOpen(true); }} />
      <Toaster position="top-center" />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onRegister={handleRegister} onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} onTermsClick={() => setIsTermsModalOpen(true)} onPolicyClick={() => setIsPolicyModalOpen(true)} />
      {currentUser && <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={currentUser} orders={userOrders} reports={userReports} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} onAddProduct={handleAddProduct} onAddReport={handleAddReport} />}
      <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} favoriteProducts={favoriteProducts} favoriteShops={favoriteShops} onAddToCart={handleAddToCart} onProductClick={(product) => { navigate(`/product/${product.id}`); setIsFavoritesOpen(false); }} onShopClick={(shop) => { navigate(`/shop/${shop.id}`); setIsFavoritesOpen(false); }} onToggleProductFavorite={handleToggleProductFavorite} onToggleShopFavorite={handleToggleShopFavorite} />
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
      <OrdersModal isOpen={isOrdersModalOpen} onClose={() => setIsOrdersModalOpen(false)} />
      <ReportsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
      <SellerOrdersModal isOpen={isSellerOrdersModalOpen} onClose={() => setIsSellerOrdersModalOpen(false)} />
      <SellerProductsModal isOpen={isSellerProductsModalOpen} onClose={() => setIsSellerProductsModalOpen(false)} />
      <SellerStatisticsModal isOpen={isSellerStatisticsModalOpen} onClose={() => setIsSellerStatisticsModalOpen(false)} />
      <SellerPromotionsModal isOpen={isSellerPromotionsModalOpen} onClose={() => setIsSellerPromotionsModalOpen(false)} />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <PolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}