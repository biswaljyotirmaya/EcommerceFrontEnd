import api from "./axios";

export const addOrderItemsBulk = (orderId, items) =>
  api.post("/api/order-items/bulk", items, {
    params: { orderId },
  });
