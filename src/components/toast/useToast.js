import { useToastContext } from "./ToastContext";

export default function useToast() {
  const { showToast } = useToastContext();

  return {
    success: (message, title = "Success") =>
      showToast({ type: "success", title, message }),

    error: (message, title = "Error") =>
      showToast({ type: "error", title, message }),

    info: (message, title = "Info") =>
      showToast({ type: "info", title, message }),

    warning: (message, title = "Warning") =>
      showToast({ type: "warning", title, message }),
  };
}
