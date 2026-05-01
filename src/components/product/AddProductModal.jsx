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
      <div className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="glass-panel relative w-full max-w-6xl overflow-hidden rounded-3xl animate-slideIn">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-slate-500 hover:text-slate-950"
          >
            <X size={26} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col bg-slate-950 p-6 text-white">
              <h2 className="mb-4 text-lg font-black">Product Preview</h2>

              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {!form.image || previewError ? (
                  <div className="flex flex-col items-center text-white/60">
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

              <p className="mt-4 text-center text-sm text-white/60">
                Paste an image URL to preview the product
              </p>
            </div>

            <div className="p-6">
              <h1 className="mb-6 text-2xl font-black text-slate-950">
                Add New Product
              </h1>

              <ProductForm
                form={form}
                setForm={setForm}
                previewError={previewError}
                setPreviewError={setPreviewError}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="secondary-btn px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="primary-btn px-6 py-2 disabled:opacity-50"
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
