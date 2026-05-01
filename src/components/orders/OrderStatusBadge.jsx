export default function OrderStatusBadge({ status }) {
  const map = {
    CREATED: "bg-sky-50 text-sky-700 ring-sky-100",
    CONFIRMED: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    ACCEPTED: "bg-teal-50 text-teal-700 ring-teal-100",
    PACKED: "bg-amber-50 text-amber-700 ring-amber-100",
    SHIPPED: "bg-amber-50 text-amber-700 ring-amber-100",
    DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    CANCELLED: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${
        map[status] || "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}
