import { useState } from "react";
import { useSelector } from "react-redux";

import OrderStatusBadge from "./OrderStatusBadge";
import ConfirmModal from "../common/ConfirmModal";
import { updateVendorItemStatus } from "../../api/orderApi";

export default function VendorOrderItemRow({
  item,
  onPreview,
  onOpenDetails,
  onCancel,
}) {
  const vendorId = useSelector((s) => s.auth.user?.id);

  const product = item.product;

  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;

    try {
      await updateVendorItemStatus(item.orderItemId, vendorId, newStatus);
      item.itemStatus = newStatus;
    } catch {
      alert("Failed to update status");
    }
  };

  const handleConfirmCancel = async () => {
    await onCancel();
    setConfirmCancel(false);
  };

  return (
    <>
      <div
        onClick={onOpenDetails}
        className="flex items-center gap-4 rounded-xl bg-white p-4 shadow
                   hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={product?.image || "/product-placeholder.png"}
          alt={item.productName}
          onClick={(e) => {
            e.stopPropagation();
            onPreview(product);
          }}
          className="h-20 w-20 rounded-lg object-cover border cursor-zoom-in"
        />

        <div className="flex-1">
          <p className="font-medium">{item.productName}</p>

          <p className="text-sm text-gray-500">
            Qty: {item.quantity} × ₹ {item.price}
          </p>

          <p className="text-xs text-gray-400">
            Total: ₹ {item.totalPrice.toFixed(2)}
          </p>

          <div className="mt-1">
            <OrderStatusBadge status={item.itemStatus} />
          </div>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-2"
        >
          {item.itemStatus !== "CANCELLED" && (
            <select
              value={item.itemStatus}
              onChange={handleStatusChange}
              className="border rounded-lg px-3 py-1 text-sm bg-white"
            >
              <option value="CREATED">Created</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="PACKED">Packed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          )}

          {item.itemStatus !== "DELIVERED" &&
            item.itemStatus !== "CANCELLED" && (
              <button
                onClick={() => setConfirmCancel(true)}
                className="text-xs text-red-600 hover:underline"
              >
                Cancel Item
              </button>
            )}
        </div>
      </div>

      <ConfirmModal
        open={confirmCancel}
        title="Cancel this item?"
        message="Are you sure you want to cancel this order item? This action cannot be undone."
        onCancel={() => setConfirmCancel(false)}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
}
