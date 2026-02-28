import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <div className="fixed top-20 left-1/2 z-9999 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body,
  );
}
