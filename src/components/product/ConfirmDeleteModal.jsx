import { Dialog } from "@headlessui/react";

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-xl">
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex gap-3 justify-end">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
