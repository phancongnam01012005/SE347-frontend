import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function OAuth2Success() {
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy token từ query param
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            authService.setToken(token); // lưu vào localStorage
            navigate("/");               // redirect về home
        } else {
            navigate("/");          // fallback nếu không có token
        }
    }, [navigate]);

    return <div>Logging you in...</div>;
}
