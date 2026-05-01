import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PackageOpen } from "lucide-react";
import { getOrdersByUser } from "../../api/orderApi";
import OrderCard from "../../components/orders/OrderCard";

export default function MyOrders() {
  const { user, loading, isAuthenticated } = useSelector((s) => s.auth);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || !user) return;

    getOrdersByUser(user.firebaseUid)
      .then((res) => setOrders(res.data))
      .catch((e) => {
        console.error("Failed to fetch orders", e);
        setError("Failed to load orders");
      });
  }, [user, loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="page-shell">
        <p className="text-slate-500">Loading your orders...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="page-shell">
        <p className="text-slate-500">Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
          Purchases
        </p>
        <h1 className="text-4xl font-black text-slate-950">My Orders</h1>
      </div>

      {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

      {orders.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center">
          <PackageOpen className="mx-auto text-teal-600" size={44} />
          <p className="mt-4 font-bold text-slate-700">
            You have not placed any orders yet
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <OrderCard key={o.orderId} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}
