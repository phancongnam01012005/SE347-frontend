// utils/storage.js

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};

export const saveOrders = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};
