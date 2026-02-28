import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import MyProducts from "./pages/dashboard/vendor/MyProducts";
import MyCart from "./pages/cart/MyCart";
import MyOrders from "./pages/orders/MyOrders";
import OrderDetails from "./pages/orders/OrderDetails";
import VendorOrders from "./pages/orders/VendorOrders";
import VendorItemDetails from "./components/orders/VendorItemDetails";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor/products" element={<MyProducts />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route
          path="/vendor/orders/item/:itemId"
          element={<VendorItemDetails />}
        />
      </Routes>
    </>
  );
}
