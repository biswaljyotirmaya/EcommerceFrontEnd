import api from "./axios";

/* PUBLIC */
export const getAllProducts = () => api.get("/api/products");

/* VENDOR */
export const getMyProducts = () => api.get("/api/vendor/products");
export const addProduct = (data) => api.post("/api/vendor/products", data);
export const updateProduct = (id, data) =>
  api.put(`/api/vendor/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/vendor/products/${id}`);
