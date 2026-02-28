import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VendorOrderItemRow from "../../components/orders/VendorOrderItemRow";
import ProductDetailsModal from "../../components/product/ProductDetailsModal";
import { getVendorOrderItems, cancelVendorItem } from "../../api/orderApi";

export default function VendorOrders() {
  const navigate = useNavigate();
  const vendorId = useSelector((s) => s.auth.user?.id);

  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) return;

    setLoading(true);
    setError(null);

    getVendorOrderItems(vendorId)
      .then((res) => setItems(res.data || []))
      .catch(() => setError("Failed to load vendor orders"))
      .finally(() => setLoading(false));
  }, [vendorId]);

  const handleCancelItem = async (itemId) => {
    await cancelVendorItem(itemId, vendorId);

    setItems((prev) =>
      prev.map((i) =>
        i.orderItemId === itemId ? { ...i, itemStatus: "CANCELLED" } : i,
      ),
    );
  };

  if (!vendorId) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Vendor Orders</h1>

      {loading && <p className="text-gray-500">Loading…</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-gray-500">No orders yet</p>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {items.map((item) => (
            <VendorOrderItemRow
              key={item.orderItemId}
              item={item}
              onPreview={(product) => setPreview(product)}
              onCancel={() => handleCancelItem(item.orderItemId)}
              onOpenDetails={() =>
                navigate(`/vendor/orders/item/${item.orderItemId}`)
              }
            />
          ))}
        </div>
      )}

      <ProductDetailsModal
        open={!!preview}
        onClose={() => setPreview(null)}
        product={preview}
        canAddToCart={false}
      />
    </div>
  );
}
