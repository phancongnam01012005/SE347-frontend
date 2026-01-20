import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/layout";

export function MainLayout({
  children,
  cartItemsCount,
  onCartClick,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout,
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
  onSearch
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={onCartClick}
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        userType={currentUser?.userType}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
        onCategoryClick={() => navigate('/products')}
        onSellerDashboardClick={onSellerProductsClick}
        onFavoritesClick={onFavoritesClick}
        favoritesCount={favoritesCount}
        onAddressClick={onAddressClick}
        onOrdersClick={onOrdersClick}
        onReportsClick={onReportsClick}
        onSellerOrdersClick={onSellerOrdersClick}
        onSellerProductsClick={onSellerProductsClick}
        onSellerStatisticsClick={onSellerStatisticsClick}
        onSellerPromotionsClick={onSellerPromotionsClick}
        onSearch={onSearch}
      />

      {children}

      <Footer
        onLogoClick={() => {
          navigate('/');
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
        userType={currentUser?.userType}
      />
    </div>
  );
}