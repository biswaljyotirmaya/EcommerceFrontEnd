import api from "./axios";

/* 🛒 CART */
export const getCart = (userId) =>
  api.get("/api/cart", {
    params: { userId },
  });

export const deleteCart = (userId) =>
  api.delete("/api/cart", {
    params: { userId },
  });

/* 🛍️ CART ITEMS */
export const getCartItems = (cartId) =>
  api.get("/api/cart/items/all", {
    params: { cartId },
  });

export const addCartItem = (cartId, product) =>
  api.post("/api/cart/items", product, {
    params: { cartId },
  });

export const updateCartItemQty = (itemId, quantity) =>
  api.put(`/api/cart/items/${itemId}`, null, {
    params: { quantity },
  });

export const deleteCartItem = (itemId) =>
  api.delete(`/api/cart/items/${itemId}`);
