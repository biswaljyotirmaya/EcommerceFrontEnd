import { Dialog } from "@headlessui/react";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-sm">
          <Dialog.Title className="font-semibold mb-2">{title}</Dialog.Title>

          <p className="text-sm text-gray-600 mb-4">{message}</p>

          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
