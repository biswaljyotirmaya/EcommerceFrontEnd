import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { X, ImageOff } from "lucide-react";
import { addProduct } from "../../api/productApi";
import ProductForm from "./ProductForm";
import useToast from "../toast/useToast";

export default function AddProductModal({ open, onClose, onSuccess }) {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brandName: "",
    price: "",
    quantity: "",
    image: "",
    category: "",
    subCategory: "",
    description: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      brandName: "",
      price: "",
      quantity: "",
      image: "",
      category: "",
      subCategory: "",
      description: "",
    });
    setPreviewError(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
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

      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };

      const res = await addProduct(payload);

      toast.success("Product added successfully");

      onSuccess?.(res.data);
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideIn">
          <button
            onClick={handleClose}
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
                Paste an image URL to preview the product
              </p>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

              <ProductForm
                form={form}
                setForm={setForm}
                previewError={previewError}
                setPreviewError={setPreviewError}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
