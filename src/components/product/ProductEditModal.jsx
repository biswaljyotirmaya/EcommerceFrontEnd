import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { X, ImageOff } from "lucide-react";
import { updateProduct } from "../../api/productApi";
import useToast from "../toast/useToast";
import ProductForm from "./ProductForm";

export default function ProductEditModal({ open, onClose, product }) {
  const toast = useToast();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        brandName: product.brandName || "",
        price: product.price || "",
        quantity: product.quantity || "",
        image: product.image || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        description: product.description || "",
      });
      setPreviewError(false);
    }
  }, [product]);

  if (!form) return null;

  const handleUpdate = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.quantity ||
      !form.category ||
      !form.subCategory
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await updateProduct(product.id, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      toast.success("Product updated successfully");
      onClose(); // parent should update state (no reload)
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideIn">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={26} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-50 p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Product Preview</h2>

              <div className="flex-1 flex items-center justify-center rounded-xl bg-white border overflow-hidden">
                {!form.image || previewError ? (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImageOff size={48} />
                    <p className="mt-2 text-sm">Image preview unavailable</p>
                  </div>
                ) : (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="object-contain max-h-105"
                    onError={() => setPreviewError(true)}
                  />
                )}
              </div>

              <p className="mt-4 text-sm text-gray-500 text-center">
                Update image URL to refresh preview
              </p>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

              <ProductForm
                form={form}
                setForm={setForm}
                previewError={previewError}
                setPreviewError={setPreviewError}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
