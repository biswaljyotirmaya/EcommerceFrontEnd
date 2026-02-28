export default function OrderItemRow({
  item,
  orderStatus,
  onCancel,
  onPreview,
  showCancel = false,
}) {
  const product = item.product; 

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition">
      <img
        src={product?.image || "/product-placeholder.png"}
        alt={item.productName}
        onClick={onPreview}
        className="h-20 w-20 rounded-lg object-cover cursor-pointer border"
      />

      <div className="flex-1">
        <p className="font-medium">{item.productName}</p>

        <p className="text-sm text-gray-500">
          ₹ {item.price} × {item.quantity}
        </p>

        {product?.vendorName && (
          <p className="text-xs text-gray-400">Sold by: {product.vendorName}</p>
        )}
      </div>

      {item.itemStatus === "CANCELLED" && (
        <span className="text-xs text-red-500 font-medium">
          Cancelled by vendor
        </span>
      )}

      <div className="text-right">
        <p className="font-semibold">₹ {item.totalPrice.toFixed(2)}</p>

        {showCancel && orderStatus === "CREATED" && (
          <button
            onClick={onCancel}
            className="mt-1 text-xs text-red-600 hover:underline"
          >
            Cancel item
          </button>
        )}
      </div>
    </div>
  );
}
