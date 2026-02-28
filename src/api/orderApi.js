import api from "./axios";

/* 📦 ORDERS */
export const getOrdersByUser = (firebaseId) =>
  api.get(`/api/orders/user/${firebaseId}`);

export const getOrderById = (orderId) => api.get(`/api/orders/${orderId}`);

export const getOrderItems = (orderId) =>
  api.get(`/api/order-items/order/${orderId}`);

export const createOrder = (firebaseId) =>
  api.post("/api/orders", null, {
    params: { firebaseId },
  });

export const cancelOrder = (orderId) => api.delete(`/api/orders/${orderId}`);

export const getVendorOrderItems = (vendorId) =>
  api.get("/api/vendor/orders", {
    params: { vendorId },
  });

export const updateVendorItemStatus = (itemId, vendorId, status) =>
  api.put(`/api/vendor/orders/item/${itemId}/status`, null, {
    params: { vendorId, status },
  });

export const cancelVendorItem = (itemId, vendorId) =>
  api.put(`/api/vendor/orders/item/${itemId}/cancel`, null, {
    params: { vendorId },
  });

export const getVendorOrderItemById = (itemId, vendorId) =>
  api.get(`/api/vendor/orders/item/${itemId}`, {
    params: { vendorId },
  });
