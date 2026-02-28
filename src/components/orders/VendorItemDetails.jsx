import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import { getVendorOrderItemById } from "../../api/orderApi";

export default function VendorItemDetails() {
  const { itemId } = useParams();
  const vendorId = useSelector((s) => s.auth.user?.id);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!itemId || !vendorId) return;

    getVendorOrderItemById(itemId, vendorId)
      .then((res) => setItem(res.data))
      .finally(() => setLoading(false));
  }, [itemId, vendorId]);

  if (loading) return <p className="p-6">Loading…</p>;
  if (!item) return <p className="p-6 text-red-500">Item not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Order #{item.orderId}</h1>

      <OrderStatusBadge status={item.itemStatus} />

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <p className="font-medium">{item.productName}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ₹ {item.price}</p>
        <p className="font-semibold">Total: ₹ {item.totalPrice.toFixed(2)}</p>
      </div>

      <div className="text-sm text-gray-500">
        Buyer Firebase ID: {item.buyerFirebaseId}
      </div>
    </div>
  );
}
