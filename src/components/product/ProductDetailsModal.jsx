import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import useToast from "../toast/useToast";
import { addCartItem, getCart } from "../../api/cartApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

      toast.success("Added to cart 🛒");
      onClose();
    } catch (e) {
      console.error("Failed to add to cart", e);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white rounded-2xl w-full max-w-4xl p-6 animate-slideIn">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {product.name}
            </Dialog.Title>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="flex gap-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-72 h-72 object-cover rounded-xl"
            />

            <div className="w-px bg-gray-200" />

            <div className="flex-1 space-y-2 text-sm">
              <p>
                <b>Brand:</b> {product.brandName}
              </p>
              <p>
                <b>Category:</b> {product.category}
              </p>
              <p>
                <b>Sub-category:</b> {product.subCategory}
              </p>
              <p>
                <b>Price:</b> ₹{product.price}
              </p>
              <p>
                <b>Availability:</b> {product.availability}
              </p>
              <p className="mt-3 text-gray-600">{product.description}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>

            {canAddToCart && (
              <button
                onClick={handleAdd}
                disabled={!cartId || loadingCart}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                Add to Cart
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
