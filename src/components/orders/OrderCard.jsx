import { Link } from "react-router-dom";
import { ArrowRight, ReceiptText } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {
  return (
    <Link to={`/orders/${order.orderId}`}>
      <div className="soft-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
              <ReceiptText size={21} />
            </div>
            <div>
              <span className="font-black text-slate-950">
                Order #{order.orderId}
              </span>
              {order.createdAt && (
                <p className="text-sm text-slate-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Total{" "}
            <span className="text-lg font-black text-slate-950">
              Rs. {order.grossTotal.toFixed(2)}
            </span>
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-700">
            View details
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
