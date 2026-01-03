import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return <h2>Sản phẩm không tồn tại</h2>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h1>{product.name}</h1>
        <p><strong>Cửa hàng:</strong> {product.shop}</p>
        <p>{product.description}</p>
        <h2>{product.price.toLocaleString()}đ</h2>

        <button>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}
