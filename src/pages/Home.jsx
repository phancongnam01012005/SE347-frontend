import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import api from "../services/api";
export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("http://localhost:8000/public/product/all");
        const mappedProducts = res.data.map((p) => ({
          id: p.productId,
          name: p.productName,
          price: p.price,
          image: p.image_url,
          shopName: p.shopName,
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Load sản phẩm fail:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách sản phẩm</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
            src={p.image}
            alt={p.name}
            style={{
              width: "100%",
              height: 140, 
              objectFit: "contain", 
              background: "#f5f5f5",
              borderRadius: 8,
              marginBottom: 8,
            }}
          />


            <h3 style={{ fontSize: 16 }}>{p.name}</h3>

            <p style={{ fontWeight: "bold", margin: "6px 0" }}>
              {p.price.toLocaleString()}đ
            </p>

            <p style={{ fontSize: 12, color: "#666", flexGrow: 1 }}>
              {p.shopName}
            </p>

            <button
              onClick={() => addToCart(p)}
              style={{
                marginTop: 8,
                padding: "8px 0",
                borderRadius: 6,
                border: "none",
                background: "#ff7a18",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
