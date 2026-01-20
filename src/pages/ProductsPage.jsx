import { useSearchParams, useNavigate } from "react-router-dom";
import { ProductListPage } from "../components/page";

export function ProductsPage({
  products,
  onAddToCart,
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
  favoriteProductIds,
  onToggleProductFavorite,
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || '';

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <ProductListPage
      isOpen={true}
      onClose={handleClose}
      products={products}
      onAddToCart={onAddToCart}
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
      initialCategory={category}
      onProductClick={handleProductClick}
      onFavoritesClick={onFavoritesClick}
      favoritesCount={favoritesCount}
      favoriteProductIds={favoriteProductIds}
      onToggleProductFavorite={onToggleProductFavorite}
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
      searchQuery={search}
    />
  );
}