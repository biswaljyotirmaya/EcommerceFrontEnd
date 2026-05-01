import { useState } from "react";
import { useSelector } from "react-redux";
import { Eye, Pencil, ShoppingBag, Tag, Trash2 } from "lucide-react";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditModal from "./ProductEditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteProduct } from "../../api/productApi";
import useToast from "../toast/useToast";
import noImage from "../../assets/noImage.webp";

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
      onDelete?.(product.id);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div
        className="group soft-card cursor-pointer overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/50"
        onClick={() => setOpenView(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.image || noImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
            <Tag size={13} className="text-teal-600" />
            {product.category || "Featured"}
          </div>
          <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-slate-950/85 text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100">
            <Eye size={17} />
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
              {product.brandName || "Independent seller"}
            </p>
            <h3 className="mt-1 line-clamp-2 text-lg font-black text-slate-950">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-400">Price</p>
              <p className="text-2xl font-black text-slate-950">
                Rs. {product.price}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
              <ShoppingBag size={14} />
              {product.availability || "In stock"}
            </span>
          </div>

          {isMyProduct && (
            <div className="flex gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEdit(true);
                }}
                className="secondary-btn flex-1 px-3 py-2 text-sm"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDelete(true);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 size={15} />
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
