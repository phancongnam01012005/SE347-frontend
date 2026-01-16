import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css"; // Đảm bảo đường dẫn này đúng với file CSS bạn đã tạo
import { BrowserRouter } from "react-router-dom";

// Nếu bạn chưa có AuthContext, hãy tạm thời comment dòng import này lại 
// hoặc tạo file AuthContext như hướng dẫn ở bước dưới.
// import { AuthProvider } from "./context/AuthContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Tạm thời bỏ AuthProvider nếu chưa có file để tránh lỗi crash */}
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);