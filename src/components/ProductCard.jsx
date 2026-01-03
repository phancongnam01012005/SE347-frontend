import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.shop}</p>
      <strong>{product.price.toLocaleString()}đ</strong>
      <br />
      <Link to={`/product/${product.id}`}>
        <button>Xem chi tiết</button>
      </Link>
    </div>
  );
}
