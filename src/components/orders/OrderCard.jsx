import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {
  return (
    <Link to={`/orders/${order.orderId}`}>
      <div className="bg-white p-5 rounded-xl shadow space-y-3 hover:shadow-md hover:border-blue-500 border transition cursor-pointer">
        <div className="flex justify-between items-center">
          <span className="font-medium">Order #{order.orderId}</span>

          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            Total:{" "}
            <span className="font-medium text-gray-700">
              ₹ {order.grossTotal.toFixed(2)}
            </span>
          </p>

          {order.createdAt && (
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
