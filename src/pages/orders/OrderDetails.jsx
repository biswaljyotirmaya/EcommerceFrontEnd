import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, cancelOrder, getOrderItems } from "../../api/orderApi";
import ConfirmModal from "../../components/common/ConfirmModal";
import ProductDetailsModal from "../../components/product/ProductDetailsModal";
import useToast from "../../components/toast/useToast";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import OrderTimeline from "./OrderTimeline";
import OrderItemRow from "../../components/orders/OrderItemRow";

export default function OrderDetails() {
  const { orderId } = useParams();
  const toast = useToast();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getOrderById(orderId).then((res) => {
      setOrder(res.data);
    });

    getOrderItems(orderId).then((res) => {
      setItems(res.data);
    });
  }, [orderId]);

  const handleCancel = async () => {
    await cancelOrder(orderId);
    toast.success("Order cancelled");
    setOrder((o) => ({ ...o, orderStatus: "CANCELLED" }));
    setConfirmCancel(false);
  };

  const total = items
    .filter((i) => i.itemStatus !== "CANCELLED")
    .reduce((sum, i) => sum + i.totalPrice, 0);

  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order #{order.orderId}</h1>

        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <OrderTimeline status={order.orderStatus} />

      <div className="space-y-4">
        {items.map((item) => (
          <OrderItemRow
            key={item.id}
            item={item}
            orderStatus={order.orderStatus}
            showCancel={true}
            onCancel={() => console.log("Cancel item", item.id)}
            onPreview={() => setPreview(item.product)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow">
        <p className="text-lg font-semibold">Total: ₹ {total.toFixed(2)}</p>

        {order.orderStatus === "CREATED" && (
          <button
            onClick={() => setConfirmCancel(true)}
            className="text-red-600 hover:underline"
          >
            Cancel Order
          </button>
        )}
      </div>

      <ConfirmModal
        open={confirmCancel}
        title="Cancel order?"
        message="This action cannot be undone."
        onCancel={() => setConfirmCancel(false)}
        onConfirm={handleCancel}
      />

      <ProductDetailsModal
        open={!!preview}
        onClose={() => setPreview(null)}
        product={preview}
        canAddToCart={false}
      />
    </div>
  );
}
