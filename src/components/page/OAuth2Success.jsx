// OAuth2Success.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuth2Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 1. Lưu token
      localStorage.setItem("accessToken", token);

      // 2. (Optional) set axios header
      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 3. Redirect về home / profile
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Đang đăng nhập bằng Google... chill 🤙</p>;
}
