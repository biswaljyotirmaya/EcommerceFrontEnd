import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMyProducts } from "../../../api/productApi";
import ProductCard from "../../../components/product/ProductCard";
import AddProductModal from "../../../components/product/AddProductModal";
import useToast from "../../../components/toast/useToast";

export default function MyProducts() {
  const toast = useToast();
  const fetchedRef = useRef(false); // 🔒 guard

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    if (loading) return;
    if (!isAuthenticated) return;
    if (user?.role !== "VENDOR") return;

    fetchedRef.current = true;

    getMyProducts()
      .then((res) => setProducts(res.data || []))
      .catch(() => toast.error("Failed to load products"));
  }, [loading, isAuthenticated, user?.role]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Products</h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 && (
        <p className="text-gray-500">No products yet</p>
      )}

      <div className="space-y-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={(id) =>
              setProducts((prev) => prev.filter((x) => x.id !== id))
            }
          />
        ))}
      </div>

      <AddProductModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={(newProduct) => setProducts((prev) => [newProduct, ...prev])}
      />
    </div>
  );
}
