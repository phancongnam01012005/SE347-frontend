// services/authService.js
const API_URL = "http://localhost:8000";

// ===== Login =====
const login = async (email, password) => {
  const formBody = new URLSearchParams();
  formBody.append("email", email);
  formBody.append("password", password);

  const res = await fetch(`${API_URL}/public/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  let data = {};
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) throw new Error(data.message || "Login failed");

  if (data.token) localStorage.setItem("accessToken", data.token);

  return data;
};

// ===== Register =====
const register = async ({ email, password, name }) => {
  const formBody = new URLSearchParams();
  formBody.append("email", email);
  formBody.append("password", password);
  formBody.append("name", name);

  const res = await fetch(`${API_URL}/public/register`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  let data = {};
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) throw new Error(data.message || "Register failed");

  if (data.token) localStorage.setItem("accessToken", data.token);

  return data;
};

// ===== Logout =====
const logout = () => localStorage.removeItem("accessToken");

// ===== Get token =====
const getToken = () => localStorage.getItem("accessToken");

// ===== Set token manually (for Google OAuth) =====
const setToken = (token) => {
  if (token) localStorage.setItem("accessToken", token);
};

// ===== Check login =====
const isLoggedIn = () => !!getToken();

// ===== Get user info from JWT =====
const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.userId,
      email: payload.sub,
      role: payload.role,
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// ===== Export =====
export default {
  login,
  register,
  logout,
  getToken,
  setToken,
  isLoggedIn,
  getUserFromToken,
};
