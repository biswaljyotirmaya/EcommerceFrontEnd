export default function OrderItemRow({
  item,
  orderStatus,
  onCancel,
  onPreview,
  showCancel = false,
}) {
  const product = item.product;

  return (
    <div className="soft-card flex flex-col gap-4 rounded-3xl p-4 transition hover:shadow-xl sm:flex-row sm:items-center">
      <img
        src={product?.image || "/product-placeholder.png"}
        alt={item.productName}
        onClick={onPreview}
        className="h-32 w-full cursor-pointer rounded-2xl border border-slate-100 object-cover sm:h-24 sm:w-24"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-black text-slate-950">{item.productName}</p>

        <p className="text-sm font-semibold text-slate-500">
          Rs. {item.price} x {item.quantity}
        </p>

        {product?.vendorName && (
          <p className="text-xs font-medium text-slate-400">
            Sold by: {product.vendorName}
          </p>
        )}
      </div>

      {item.itemStatus === "CANCELLED" && (
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
          Cancelled by vendor
        </span>
      )}

      <div className="text-right">
        <p className="text-lg font-black text-slate-950">
          Rs. {item.totalPrice.toFixed(2)}
        </p>

        {showCancel && orderStatus === "CREATED" && (
          <button
            onClick={onCancel}
            className="mt-1 text-xs font-bold text-rose-600 hover:underline"
          >
            Cancel item
          </button>
        )}
      </div>
    </div>
  );
}
