import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMyProducts } from "../../../api/productApi";
import ProductCard from "../../../components/product/ProductCard";
import AddProductModal from "../../../components/product/AddProductModal";
import useToast from "../../../components/toast/useToast";
import { Plus } from "lucide-react";

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
    <div className="page-shell space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Inventory
          </p>
          <h1 className="text-4xl font-black text-slate-950">My Products</h1>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="primary-btn px-5 py-3"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {products.length === 0 && (
        <div className="glass-panel rounded-3xl p-10 text-center text-slate-500">
          No products yet
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
