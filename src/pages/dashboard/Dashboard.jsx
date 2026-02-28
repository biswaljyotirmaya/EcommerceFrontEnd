import { useSelector } from "react-redux";
import ConsumerDashboard from "./ConsumerDashboard";
import VendorDashboard from "./VendorDashboard";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "VENDOR") {
    return <VendorDashboard />;
  }

  return <ConsumerDashboard />;
}
