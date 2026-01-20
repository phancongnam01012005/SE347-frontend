import { useParams, useNavigate } from "react-router-dom";
import { ShopDetailPage } from "../components/page";
import { shops, products } from "../data/mockData";

export function ShopDetailPageWrapper({
  onAddToCart,
  onToggleFavorite,
  favoriteShopIds,
  isBuyer,
  favoriteProductIds,
  onToggleProductFavorite,
  cartItemsCount,
  onCartClick,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogout,
  onCategoryClick,
  onSellerDashboardClick,
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
  onTermsClick
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const shop = shops.find(s => s.id === id) || null;
  const shopProducts = shop ? products.filter(p => p.shopId === shop.id) : [];

  const handleClose = () => {
    navigate(-1);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <ShopDetailPage
      isOpen={true}
      onClose={handleClose}
      shop={shop}
      shopProducts={shopProducts}
      onAddToCart={onAddToCart}
      onProductClick={handleProductClick}
      onToggleFavorite={onToggleFavorite}
      isFavorite={shop ? favoriteShopIds.includes(shop.id) : false}
      showFavoriteButton={isBuyer}
      favoriteProducts={favoriteProductIds}
      onToggleProductFavorite={onToggleProductFavorite}
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
      onCategoryClick={onCategoryClick}
      onSellerDashboardClick={onSellerDashboardClick}
      onFavoritesClick={onFavoritesClick}
      favoritesCount={favoritesCount}
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