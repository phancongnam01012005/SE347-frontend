import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Snack Lays", price: 12000 },
  { id: 2, name: "Snack Ostar", price: 15000 },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{p.name}</h3>
          <p>{p.price.toLocaleString()}đ</p>
          <button onClick={() => addToCart(p)}>
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
}
