import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUser } from "../../api/orderApi";
import OrderCard from "../../components/orders/OrderCard";

export default function MyOrders() {
  const { user, loading, isAuthenticated } = useSelector((s) => s.auth);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) return; 
    if (!isAuthenticated || !user) return;

    console.log("Fetching orders for:", user.firebaseUid);

    getOrdersByUser(user.firebaseUid)
      .then((res) => setOrders(res.data))
      .catch((e) => {
        console.error("Failed to fetch orders", e);
        setError("Failed to load orders");
      });
  }, [user, loading, isAuthenticated]);


  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">Loading your orders…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {orders.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">You haven’t placed any orders yet 📦</p>
        </div>
      ) : (
        orders.map((o) => <OrderCard key={o.orderId} order={o} />)
      )}
    </div>
  );
}
