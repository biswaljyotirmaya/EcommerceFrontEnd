import { Dialog } from "@headlessui/react";
import { ShoppingCart, Store, Tag, X } from "lucide-react";
import useToast from "../toast/useToast";
import { addCartItem, getCart } from "../../api/cartApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../assets/noImage.webp";

export default function ProductDetailsModal({
  open,
  onClose,
  product,
  canAddToCart,
}) {
  const toast = useToast();
  const user = useSelector((s) => s.auth.user);
  const [cartId, setCartId] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    if (!open || !user?.id) return;

    const loadCart = async () => {
      try {
        setLoadingCart(true);
        const { data } = await getCart(user.id);
        setCartId(data.id);
      } catch (e) {
        console.error("Failed to load cart", e);
        toast.error("Failed to load cart");
      } finally {
        setLoadingCart(false);
      }
    };

    loadCart();
  }, [open, user]);

  if (!product) return null;

  const handleAdd = async () => {
    if (!cartId) return;

    try {
      await addCartItem(cartId, {
        id: product.id,
        vendorId: product.vendorId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });

      toast.success("Added to cart");
      onClose();
    } catch (e) {
      console.error("Failed to add to cart", e);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto px-4 py-8">
        <Dialog.Panel className="glass-panel w-full max-w-5xl overflow-hidden rounded-3xl animate-slideIn">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-4">
            <Dialog.Title className="text-xl font-black text-slate-950">
              Product Details
            </Dialog.Title>
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-3xl bg-slate-100">
              <img
                src={product.image || noImage}
                alt={product.name}
                className="h-full min-h-80 w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                  <Store size={14} />
                  {product.brandName || "Independent seller"}
                </span>
                <h2 className="mt-4 text-3xl font-black text-slate-950">
                  {product.name}
                </h2>
                <p className="mt-3 text-4xl font-black text-slate-950">
                  Rs. {product.price}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Info label="Category" value={product.category} icon={Tag} />
                  <Info
                    label="Sub-category"
                    value={product.subCategory}
                    icon={Tag}
                  />
                  <Info
                    label="Availability"
                    value={product.availability || "In stock"}
                  />
                  <Info label="Vendor" value={product.vendorName || product.vendorId} />
                </div>

                {product.description && (
                  <p className="mt-6 leading-7 text-slate-600">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-5 sm:flex-row sm:justify-end">
                <button onClick={onClose} className="secondary-btn px-5 py-3">
                  Cancel
                </button>

                {canAddToCart && (
                  <button
                    onClick={handleAdd}
                    disabled={!cartId || loadingCart}
                    className="primary-btn px-5 py-3 disabled:opacity-50"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function Info({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {Icon && <Icon size={14} />}
        {label}
      </p>
      <p className="mt-1 font-bold text-slate-800">{value || "Not listed"}</p>
    </div>
  );
}
