import { useNavigate } from "react-router-dom";
import { ShopListPage } from "../components/page";

export function ShopsPage({
  shops,
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
  onSellerDashboardClick,
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
  onTermsClick
}) {
  const navigate = useNavigate();

  const handleShopClick = (shop) => {
    navigate(`/shop/${shop.id}`);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <ShopListPage
      isOpen={true}
      onClose={handleClose}
      shops={shops}
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
      onShopClick={handleShopClick}
      onFavoritesClick={onFavoritesClick}
      favoritesCount={favoritesCount}
      onSellerDashboardClick={onSellerDashboardClick}
      onAddressClick={onAddressClick}
      onOrdersClick={onOrdersClick}
      onReportsClick={onReportsClick}
      onSellerOrdersClick={onSellerOrdersClick}
      onSellerProductsClick={onSellerProductsClick}
      onSellerStatisticsClick={onSellerStatisticsClick}
      onSellerPromotionsClick={onSellerPromotionsClick}
      onAboutClick={onAboutClick}
      onContactClick={onContactClick}
      onPolicyClick={onPolicyClick}
      onTermsClick={onTermsClick}
    />
  );
}