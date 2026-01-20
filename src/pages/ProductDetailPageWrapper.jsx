import { useParams, useNavigate } from "react-router-dom";
import { ProductDetailPage } from "../components/page";
import { products } from "../data/mockData";

export function ProductDetailPageWrapper({
  onAddToCart,
  onToggleFavorite,
  favoriteProductIds,
  isBuyer,
  isLoggedIn
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id) || null;

  const handleClose = () => {
    navigate(-1);
  };

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <ProductDetailPage
      isOpen={true}
      onClose={handleClose}
      product={product}
      onAddToCart={onAddToCart}
      onShopClick={handleShopClick}
      onToggleFavorite={onToggleFavorite}
      isFavorite={product ? favoriteProductIds.includes(product.id) : false}
      showFavoriteButton={isBuyer}
      isLoggedIn={isLoggedIn}
    />
  );
}