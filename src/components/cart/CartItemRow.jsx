function CartItemRow({ item, onInc, onDec }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">₹ {item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onDec} className="h-8 w-8 rounded-full bg-gray-100">
          −
        </button>

        <span className="min-w-6 text-center">{item.qunt}</span>

        <button onClick={onInc} className="h-8 w-8 rounded-full bg-gray-100">
          +
        </button>
      </div>

      <p className="font-medium">₹ {(item.price * item.qunt).toFixed(2)}</p>
    </div>
  );
}

export default CartItemRow;
