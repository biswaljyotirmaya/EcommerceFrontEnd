import { useState } from "react";
import { useSelector } from "react-redux";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditModal from "./ProductEditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteProduct } from "../../api/productApi";
import useToast from "../toast/useToast";

export default function ProductCard({ product, onDelete }) {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const toast = useToast();

  const isMyProduct = user?.role === "VENDOR" && user?.id === product.vendorId;

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Product deleted");
      setOpenDelete(false);
      onDelete(product.id);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div
        className="flex bg-white rounded-xl shadow p-4 gap-4 cursor-pointer"
        onClick={() => setOpenView(true)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-lg"
        />

        <div className="w-px bg-gray-200" />

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brandName}</p>
          <p className="font-bold mt-2">₹{product.price}</p>

          {isMyProduct && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEdit(true);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDelete(true);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductDetailsModal
        open={openView}
        onClose={() => setOpenView(false)}
        product={product}
        canAddToCart={isAuthenticated && user?.role === "CONSUMER"}
      />

      <ProductEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={product}
      />

      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
