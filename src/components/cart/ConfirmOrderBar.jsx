export default function ConfirmOrderBar({ total, onConfirm }) {
  return (
    <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-xl font-semibold text-green-600">₹ {total}</p>
      </div>

      <button
        onClick={onConfirm}
        className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  );
}
